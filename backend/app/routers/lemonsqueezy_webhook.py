import hashlib
import hmac
import json
import logging
from fastapi import APIRouter, Request, HTTPException, Header
from app.db import supabase
from app.config import LS_WEBHOOK_SECRET, LS_VARIANT_BASIC, LS_VARIANT_PRO

logger = logging.getLogger(__name__)

router = APIRouter()

PLAN_MAP = {
    LS_VARIANT_BASIC: "basic",
    LS_VARIANT_PRO:   "pro",
}


def _verify_signature(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        key=secret.encode(), msg=body, digestmod=hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


@router.post("/lemonsqueezy/webhook")
async def lemonsqueezy_webhook(
    request: Request,
    x_signature: str = Header(..., alias="X-Signature"),
):
    body = await request.body()

    if not _verify_signature(body, x_signature, LS_WEBHOOK_SECRET):
        raise HTTPException(status_code=401, detail="Invalid signature")

    payload = json.loads(body)
    event = payload.get("meta", {}).get("event_name", "")
    data = payload.get("data", {})
    attrs = data.get("attributes", {})

    user_id = payload.get("meta", {}).get("custom_data", {}).get("user_id")

    logger.info(f"LS Webhook recibido — event: {event}")
    logger.info(f"meta: {payload.get('meta', {})}")
    logger.info(f"custom_data: {payload.get('meta', {}).get('custom_data', {})}")
    logger.info(f"user_id extraído: {user_id}")

    if not user_id:
        return {"status": "ignored", "reason": "no user_id"}

    variant_id = str(attrs.get("variant_id", ""))

    logger.info(f"variant_id: {variant_id}")
    ls_customer_id = str(attrs.get("customer_id", ""))
    ls_subscription_id = str(data.get("id", ""))

    if event in (
        "subscription_created",
        "subscription_updated",
        "subscription_resumed",
        "subscription_plan_changed",
    ):
        plan = PLAN_MAP.get(variant_id, "free")
        supabase.table("profiles").update({
            "subscription_plan": plan,
            "ls_customer_id": ls_customer_id,
            "ls_subscription_id": ls_subscription_id,
        }).eq("id", user_id).execute()

    elif event in (
        "subscription_cancelled",
        "subscription_expired",
        "subscription_payment_failed",
    ):
        supabase.table("profiles").update({
            "subscription_plan": "free",
        }).eq("id", user_id).execute()

    return {"status": "ok"}


@router.get("/lemonsqueezy/portal")
async def lemonsqueezy_portal(request: Request):
    user_id = request.headers.get("x-user-id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Missing user_id")

    result = supabase.table("profiles").select(
        "ls_customer_id, ls_subscription_id"
    ).eq("id", user_id).single().execute()

    profile = result.data
    if not profile or not profile.get("ls_customer_id"):
        raise HTTPException(status_code=404, detail="No Lemon Squeezy customer found")

    return {"url": "https://app.lemonsqueezy.com/my-orders"}
