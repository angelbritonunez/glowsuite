from datetime import datetime, timezone
from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.db import supabase

router = APIRouter(tags=["feature_flags"])


def _get_caller_role(x_user_id: Optional[str]) -> str:
    if not x_user_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    profile = supabase.table("profiles").select("role").eq("id", x_user_id).single().execute()
    role = profile.data.get("role") if profile.data else None
    if role not in ("admin", "operador"):
        raise HTTPException(status_code=403, detail="Acceso denegado")
    return role


class PatchFlagRequest(BaseModel):
    enabled: bool


@router.get("/feature-flags")
def get_feature_flags():
    res = supabase.table("feature_flags").select("key, enabled, updated_at, description").execute()
    flags = {row["key"]: row["enabled"] for row in (res.data or [])}
    return flags


@router.get("/feature-flags/detail")
def get_feature_flags_detail(x_user_id: Optional[str] = Header(None)):
    _get_caller_role(x_user_id)
    res = supabase.table("feature_flags").select("key, enabled, updated_at, description").execute()
    return res.data or []


@router.patch("/feature-flags/{key}")
def patch_feature_flag(key: str, body: PatchFlagRequest, x_user_id: Optional[str] = Header(None)):
    _get_caller_role(x_user_id)
    res = supabase.table("feature_flags").update({
        "enabled": body.enabled,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }).eq("key", key).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Flag no encontrado")
    return {"status": "success"}
