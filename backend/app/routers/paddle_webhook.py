import hashlib
import hmac
import json
import logging

from fastapi import APIRouter, Request, Response
from app.config import PADDLE_WEBHOOK_SECRET, PADDLE_PRICE_BASIC, PADDLE_PRICE_PRO
from app.db import supabase

router = APIRouter()
logger = logging.getLogger(__name__)


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


def _update_plan(user_id: str, plan: str) -> None:
    supabase.table("profiles").update({"subscription_plan": plan}).eq("id", user_id).execute()


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
        # subscription.created fires at the start of trial (status=trialing) or on immediate
        # payment (status=active). Either way the user should have plan access immediately.
        try:
            price_id = data["items"][0]["price"]["id"]
        except (KeyError, IndexError, TypeError):
            logger.error("paddle_webhook: cannot read price_id from %s", event_type)
            return Response(status_code=200)

        plan = _resolve_plan(price_id)
        if plan and user_id:
            logger.info(
                "paddle_webhook: updating user %s to plan=%s (event=%s, status=%s)",
                user_id, plan, event_type, data.get("status"),
            )
            _update_plan(user_id, plan)
        else:
            logger.warning(
                "paddle_webhook: unrecognized price_id=%s or missing user_id=%s",
                price_id, user_id,
            )

    elif event_type in ("subscription.canceled", "subscription.past_due"):
        if user_id:
            _update_plan(user_id, "free")

    elif event_type == "transaction.completed":
        logger.info("paddle_webhook: transaction.completed — %s", data.get("id"))

    else:
        logger.info("paddle_webhook: unhandled event %s", event_type)

    return Response(status_code=200)
