-- Migration: add_feature_flags
-- Apply in DEV first (glowsuite-dev), then PROD (glowsuite) via Supabase MCP

CREATE TABLE feature_flags (
  key         TEXT PRIMARY KEY,
  enabled     BOOLEAN DEFAULT FALSE,
  updated_at  TIMESTAMPTZ DEFAULT now(),
  description TEXT
);

INSERT INTO feature_flags (key, enabled, description) VALUES
  ('plan_basic_available', true, 'Habilita el checkout de Basic en /planes'),
  ('plan_pro_available',   true, 'Habilita el checkout de Pro en /planes');

ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "feature_flags_read" ON feature_flags
  FOR SELECT USING (true);
