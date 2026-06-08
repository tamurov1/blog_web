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
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS construction_visit_events_visit_id_idx
  ON construction_visit_events (visit_id);

CREATE INDEX IF NOT EXISTS construction_visit_events_event_at_idx
  ON construction_visit_events (event_at DESC);
