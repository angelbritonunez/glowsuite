ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS ls_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS ls_subscription_id TEXT;
