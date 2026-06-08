CREATE TABLE IF NOT EXISTS construction_visit_events (
  id BIGSERIAL PRIMARY KEY,
  visit_id TEXT NOT NULL,
  event TEXT NOT NULL CHECK (
    event IN ('started', 'active', 'hidden', 'leaving', 'unmounted')
  ),
  ip_address TEXT NOT NULL,
  event_at TIMESTAMPTZ NOT NULL,
  started_at TIMESTAMPTZ,
  elapsed_ms INTEGER NOT NULL DEFAULT 0,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  user_agent TEXT NOT NULL DEFAULT 'unknown',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

UPDATE construction_visit_events
SET user_agent = 'unknown'
WHERE user_agent IS NULL OR user_agent = '';

DELETE FROM construction_visit_events duplicate
USING construction_visit_events keeper
WHERE duplicate.ip_address = keeper.ip_address
  AND duplicate.user_agent = keeper.user_agent
  AND duplicate.id < keeper.id;

ALTER TABLE construction_visit_events
  ALTER COLUMN user_agent SET DEFAULT 'unknown';

ALTER TABLE construction_visit_events
  ALTER COLUMN user_agent SET NOT NULL;

CREATE INDEX IF NOT EXISTS construction_visit_events_visit_id_idx
  ON construction_visit_events (visit_id);

CREATE INDEX IF NOT EXISTS construction_visit_events_event_at_idx
  ON construction_visit_events (event_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS construction_visit_events_ip_user_agent_uidx
  ON construction_visit_events (ip_address, user_agent);
