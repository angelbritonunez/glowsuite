import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "*").rstrip("/")

PADDLE_WEBHOOK_SECRET = os.getenv("PADDLE_WEBHOOK_SECRET", "")
PADDLE_PRICE_BASIC = os.getenv("PADDLE_PRICE_BASIC", "")
PADDLE_PRICE_PRO = os.getenv("PADDLE_PRICE_PRO", "")
PADDLE_API_KEY = os.getenv("PADDLE_API_KEY", "")
PADDLE_ENV = os.getenv("PADDLE_ENV", "sandbox")

LS_WEBHOOK_SECRET = os.getenv("LS_WEBHOOK_SECRET", "")
LS_VARIANT_BASIC = os.getenv("LS_VARIANT_BASIC", "")
LS_VARIANT_PRO = os.getenv("LS_VARIANT_PRO", "")
LS_API_KEY = os.getenv("LS_API_KEY", "")