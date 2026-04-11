import random
import string
from fastapi import APIRouter, Header, HTTPException
from typing import Optional, Literal
from pydantic import BaseModel
from app.db import supabase

router = APIRouter(prefix="/admin", tags=["admin"])

ROLES = ("consultora", "admin", "operador")


# ── Helpers ────────────────────────────────────────────────────────────────────

def get_caller_role(x_user_id: Optional[str]) -> str:
    """Returns the role of the caller, raises 403 if not admin/operador."""
    if not x_user_id:
        raise HTTPException(status_code=400, detail="Missing x-user-id")
    profile = supabase.table("profiles").select("role").eq("id", x_user_id).single().execute()
    role = profile.data.get("role") if profile.data else None
    if role not in ("admin", "operador"):
        raise HTTPException(status_code=403, detail="Acceso denegado")
    return role


def generate_password(length: int = 10) -> str:
    chars = string.ascii_letters + string.digits
    return "".join(random.choices(chars, k=length))


# ── Schemas ────────────────────────────────────────────────────────────────────

class CreateUserRequest(BaseModel):
    email: str
    first_name: str
    last_name: Optional[str] = ""
    phone: Optional[str] = ""
    role: str = "consultora"


class PatchUserRequest(BaseModel):
    is_active: Optional[bool] = None
    notes: Optional[str] = None


# ── Endpoints ──────────────────────────────────────────────────────────────────

@router.get("/users")
def list_users(x_user_id: Optional[str] = Header(None)):
    caller_role = get_caller_role(x_user_id)

    query = supabase.table("profiles").select(
        "id, email, first_name, last_name, role, is_active, notes, created_at"
    )
    # Operador only sees consultoras
    if caller_role == "operador":
        query = query.eq("role", "consultora")
    profiles_res = query.execute()
    profiles = profiles_res.data or []

    clients_res   = supabase.table("clients").select("user_id").execute()
    sales_res     = supabase.table("sales").select("user_id").execute()
    followups_res = supabase.table("followups").select("user_id, status").execute()

    client_counts = {}
    for r in (clients_res.data or []):
        client_counts[r["user_id"]] = client_counts.get(r["user_id"], 0) + 1

    sales_counts = {}
    for r in (sales_res.data or []):
        sales_counts[r["user_id"]] = sales_counts.get(r["user_id"], 0) + 1

    followup_counts = {}
    for r in (followups_res.data or []):
        if r["status"] == "pending":
            followup_counts[r["user_id"]] = followup_counts.get(r["user_id"], 0) + 1

    auth_users = {}
    try:
        for u in supabase.auth.admin.list_users():
            auth_users[str(u.id)] = {"last_sign_in_at": u.last_sign_in_at}
    except Exception:
        pass

    result = []
    for p in profiles:
        uid = p["id"]
        result.append({
            **p,
            "clients_count":     client_counts.get(uid, 0),
            "sales_count":       sales_counts.get(uid, 0),
            "followups_pending": followup_counts.get(uid, 0),
            "last_sign_in_at":   auth_users.get(uid, {}).get("last_sign_in_at"),
        })

    return {"status": "success", "data": result}


@router.post("/users")
def create_user(body: CreateUserRequest, x_user_id: Optional[str] = Header(None)):
    caller_role = get_caller_role(x_user_id)

    # Operador can only create consultoras
    if body.role not in ROLES:
        raise HTTPException(status_code=400, detail="Rol inválido")
    if caller_role == "operador" and body.role != "consultora":
        raise HTTPException(status_code=403, detail="El operador solo puede crear consultoras")

    password = generate_password()

    try:
        user_res = supabase.auth.admin.create_user({
            "email": body.email,
            "password": password,
            "email_confirm": True,
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creando usuario: {str(e)}")

    new_user = user_res.user
    if not new_user:
        raise HTTPException(status_code=500, detail="No se pudo crear el usuario")

    # Upsert profile — trigger may have already created a row on auth.users insert
    supabase.table("profiles").upsert({
        "id": str(new_user.id),
        "email": body.email,
        "first_name": body.first_name,
        "last_name": body.last_name,
        "phone": body.phone or "",
        "role": body.role,
        "is_active": True,
        "must_change_password": True,
    }).execute()

    return {
        "status": "success",
        "user_id": str(new_user.id),
        "email": body.email,
        "temp_password": password,
    }


@router.patch("/users/{user_id}")
def patch_user(user_id: str, body: PatchUserRequest, x_user_id: Optional[str] = Header(None)):
    get_caller_role(x_user_id)  # admin or operador

    payload = {}
    if body.is_active is not None:
        payload["is_active"] = body.is_active
    if body.notes is not None:
        payload["notes"] = body.notes

    if not payload:
        raise HTTPException(status_code=400, detail="Nada que actualizar")

    supabase.table("profiles").update(payload).eq("id", user_id).execute()
    return {"status": "success"}


@router.delete("/users/{user_id}")
def delete_user(user_id: str, x_user_id: Optional[str] = Header(None)):
    caller_role = get_caller_role(x_user_id)

    if caller_role != "admin":
        raise HTTPException(status_code=403, detail="Solo el admin puede eliminar usuarios")

    # Prevent self-deletion
    if user_id == x_user_id:
        raise HTTPException(status_code=400, detail="No puedes eliminarte a ti mismo")

    # Only allow deleting consultoras and operadores
    target = supabase.table("profiles").select("role").eq("id", user_id).single().execute()
    if not target.data:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    if target.data.get("role") == "admin":
        raise HTTPException(status_code=403, detail="No se puede eliminar un admin")

    try:
        supabase.auth.admin.delete_user(user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error eliminando usuario: {str(e)}")

    return {"status": "success"}


@router.post("/users/{user_id}/reset-password")
def reset_password(user_id: str, x_user_id: Optional[str] = Header(None)):
    get_caller_role(x_user_id)  # admin or operador

    new_password = generate_password()

    try:
        supabase.auth.admin.update_user_by_id(user_id, {"password": new_password})
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reseteando contraseña: {str(e)}")

    return {"status": "success", "temp_password": new_password}
