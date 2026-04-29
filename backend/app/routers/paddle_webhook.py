import hashlib
import hmac
import json
import logging

import httpx
from fastapi import APIRouter, Request, Response
from fastapi.responses import JSONResponse
from app.config import (
    PADDLE_WEBHOOK_SECRET,
    PADDLE_PRICE_BASIC,
    PADDLE_PRICE_PRO,
    PADDLE_API_KEY,
    PADDLE_ENV,
)
from app.db import supabase

router = APIRouter()
logger = logging.getLogger(__name__)

PADDLE_API_BASE = (
    "https://api.paddle.com"
    if PADDLE_ENV == "production"
    else "https://sandbox-api.paddle.com"
)


def _verify_signature(raw_body: bytes, signature_header: str) -> bool:
    try:
        parts = dict(p.split("=", 1) for p in signature_header.split(";"))
        ts = parts["ts"]
        h1 = parts["h1"]
    except (ValueError, KeyError):
        return False

    message = f"{ts}:{raw_body.decode('utf-8')}".encode("utf-8")
    expected = hmac.new(
        PADDLE_WEBHOOK_SECRET.encode("utf-8"), message, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, h1)


def _update_profile(user_id: str, updates: dict) -> None:
    supabase.table("profiles").update(updates).eq("id", user_id).execute()


def _resolve_plan(price_id: str) -> str | None:
    if price_id == PADDLE_PRICE_BASIC:
        return "basic"
    if price_id == PADDLE_PRICE_PRO:
        return "pro"
    return None


@router.post("/paddle/webhook")
async def paddle_webhook(request: Request):
    raw_body = await request.body()
    signature_header = request.headers.get("paddle-signature", "")
    logger.info("Paddle webhook received. Signature header: %s", signature_header or "MISSING")

    if not _verify_signature(raw_body, signature_header):
        logger.warning("Paddle webhook signature verification failed")
        return Response(status_code=401)

    try:
        payload = json.loads(raw_body)
    except Exception:
        return Response(status_code=200)

    event_type = payload.get("event_type", "")
    data = payload.get("data", {})
    custom_data = data.get("custom_data") or {}
    user_id = custom_data.get("user_id")

    if not user_id and event_type != "transaction.completed":
        logger.warning("paddle_webhook: missing user_id for event %s", event_type)
        return Response(status_code=200)

    if event_type in ("subscription.created", "subscription.activated", "subscription.updated"):
        status = data.get("status")
        # subscription.updated can arrive with status=canceled/past_due when the user cancels
        # during trial — treat it as a downgrade without waiting for subscription.canceled.
        if status in ("canceled", "past_due"):
            logger.info(
                "paddle_webhook: %s with status=%s — downgrading user %s to free",
                event_type, status, user_id,
            )
            if user_id:
                _update_profile(user_id, {"subscription_plan": "free"})
        else:
            # subscription.created fires at the start of trial (status=trialing) or on immediate
            # payment (status=active). Either way the user should have plan access immediately.
            try:
                price_id = data["items"][0]["price"]["id"]
            except (KeyError, IndexError, TypeError):
                logger.error("paddle_webhook: cannot read price_id from %s", event_type)
                return Response(status_code=200)

            updates = {}
            plan = _resolve_plan(price_id)
            if plan:
                updates["subscription_plan"] = plan
                logger.info(
                    "paddle_webhook: updating user %s to plan=%s (event=%s, status=%s)",
                    user_id, plan, event_type, status,
                )
            else:
                logger.warning(
                    "paddle_webhook: unrecognized price_id=%s or missing user_id=%s",
                    price_id, user_id,
                )

            subscription_id = data.get("id")
            customer_id = data.get("customer_id")
            if subscription_id:
                updates["paddle_subscription_id"] = subscription_id
            if customer_id:
                updates["paddle_customer_id"] = customer_id

            if updates and user_id:
                _update_profile(user_id, updates)

    elif event_type in ("subscription.canceled", "subscription.past_due"):
        if user_id:
            _update_profile(user_id, {"subscription_plan": "free"})

    elif event_type == "transaction.completed":
        logger.info("paddle_webhook: transaction.completed — %s", data.get("id"))

    else:
        logger.info("paddle_webhook: unhandled event %s", event_type)

    return Response(status_code=200)


@router.get("/paddle/portal")
async def get_paddle_portal(request: Request):
    user_id = request.headers.get("x-user-id")
    if not user_id:
        return JSONResponse({"detail": "No autenticado"}, status_code=401)

    result = (
        supabase.table("profiles")
        .select("paddle_customer_id, paddle_subscription_id")
        .eq("id", user_id)
        .maybeSingle()
        .execute()
    )
    profile = result.data or {}
    customer_id = profile.get("paddle_customer_id")
    subscription_id = profile.get("paddle_subscription_id")

    if not customer_id:
        return JSONResponse(
            {"detail": "No se encontró una suscripción activa de Paddle para este usuario."},
            status_code=404,
        )

    if not PADDLE_API_KEY:
        logger.error("paddle_portal: PADDLE_API_KEY no configurado")
        return JSONResponse({"detail": "Error de configuración del servidor"}, status_code=500)

    body: dict = {}
    if subscription_id:
        body["subscription_ids"] = [subscription_id]

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{PADDLE_API_BASE}/customers/{customer_id}/portal-sessions",
            headers={
                "Authorization": f"Bearer {PADDLE_API_KEY}",
                "Content-Type": "application/json",
            },
            json=body,
            timeout=10,
        )

    if resp.status_code not in (200, 201):
        logger.error("paddle_portal: Paddle API error %s — %s", resp.status_code, resp.text)
        return JSONResponse({"detail": "Error al generar el portal de Paddle"}, status_code=502)

    url = resp.json().get("data", {}).get("urls", {}).get("general", {}).get("overview")
    if not url:
        return JSONResponse({"detail": "No se pudo obtener la URL del portal"}, status_code=502)

    return {"url": url}
