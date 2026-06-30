-- Run this in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS permisos (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Insert default config
INSERT INTO permisos (key, value) 
VALUES ('config', '{"admins":["rygcontenidos"],"sinRespuestas":["mikuuchan00"]}')
ON CONFLICT (key) DO NOTHING;

-- Allow service role to access (RLS bypass)
ALTER TABLE permisos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service can manage permisos" ON permisos FOR ALL USING (true);
