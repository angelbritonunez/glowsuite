import jwt
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.db import supabase
from app.config import ALLOWED_ORIGIN, SUPABASE_JWT_SECRET

from app.routers import clients, products, sales, followups, metrics, dashboard, admin, auth

app = FastAPI()

if ALLOWED_ORIGIN == "*":
    allowed_origins = ["*"]
else:
    base = ALLOWED_ORIGIN.rstrip("/")
    www = base.replace("://", "://www.") if "://www." not in base else base
    nowww = base.replace("://www.", "://") if "://www." in base else base
    allowed_origins = list({base, www, nowww})

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["x-user-id", "content-type", "authorization"],
)


@app.middleware("http")
async def validate_jwt_middleware(request: Request, call_next):
    x_user_id = request.headers.get("x-user-id")
    # Public endpoints (no x-user-id) or dev without secret configured — skip
    if not x_user_id or not SUPABASE_JWT_SECRET:
        return await call_next(request)

    authorization = request.headers.get("authorization")
    if not authorization or not authorization.startswith("Bearer "):
        return JSONResponse(status_code=401, content={"detail": "Token de autorización requerido"})

    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"], audience="authenticated")
    except jwt.ExpiredSignatureError:
        return JSONResponse(status_code=401, content={"detail": "Sesión expirada"})
    except jwt.InvalidTokenError:
        return JSONResponse(status_code=401, content={"detail": "Token inválido"})

    if payload.get("sub") != x_user_id:
        return JSONResponse(status_code=403, content={"detail": "Token no corresponde al usuario"})

    return await call_next(request)


app.include_router(clients.router)
app.include_router(products.router)
app.include_router(sales.router)
app.include_router(followups.router)
app.include_router(metrics.router)
app.include_router(dashboard.router)
app.include_router(admin.router)
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "API running"}
