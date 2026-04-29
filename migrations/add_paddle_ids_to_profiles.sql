-- Agrega columnas para rastrear el customer y subscription de Paddle por usuario
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS paddle_customer_id text,
  ADD COLUMN IF NOT EXISTS paddle_subscription_id text;
