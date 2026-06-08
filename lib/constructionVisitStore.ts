import { neon } from '@neondatabase/serverless'

export type ConstructionVisitEvent =
  | 'started'
  | 'active'
  | 'hidden'
  | 'leaving'
  | 'unmounted'

export type ConstructionVisitRecord = {
  visitId: string
  event: ConstructionVisitEvent
  ipAddress: string
  eventAt: string
  startedAt?: string
  elapsedMs: number
  timeSpentSeconds: number
  userAgent?: string
}

let sql: ReturnType<typeof neon> | null = null
let ensureTablePromise: Promise<void> | null = null
const UNKNOWN_USER_AGENT = 'unknown'

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be set to your Neon Postgres connection string')
  }

  sql ??= neon(process.env.DATABASE_URL)
  return sql
}

export function parseElapsedMs(value: unknown) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    return 0
  }

  return Math.round(value)
}

export async function ensureConstructionVisitTable() {
  ensureTablePromise ??= (async () => {
    const db = getSql()

    await db`
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
      )
    `

    await db`
      UPDATE construction_visit_events
      SET user_agent = ${UNKNOWN_USER_AGENT}
      WHERE user_agent IS NULL OR user_agent = ''
    `

    await db`
      DELETE FROM construction_visit_events duplicate
      USING construction_visit_events keeper
      WHERE duplicate.ip_address = keeper.ip_address
        AND duplicate.user_agent = keeper.user_agent
        AND duplicate.id < keeper.id
    `

    await db`
      ALTER TABLE construction_visit_events
      ALTER COLUMN user_agent SET DEFAULT 'unknown'
    `

    await db`
      ALTER TABLE construction_visit_events
      ALTER COLUMN user_agent SET NOT NULL
    `

    await db`
      CREATE INDEX IF NOT EXISTS construction_visit_events_visit_id_idx
      ON construction_visit_events (visit_id)
    `

    await db`
      CREATE INDEX IF NOT EXISTS construction_visit_events_event_at_idx
      ON construction_visit_events (event_at DESC)
    `

    await db`
      CREATE UNIQUE INDEX IF NOT EXISTS construction_visit_events_ip_user_agent_uidx
      ON construction_visit_events (ip_address, user_agent)
    `
  })()

  return ensureTablePromise
}

export async function saveConstructionVisit(record: ConstructionVisitRecord) {
  await ensureConstructionVisitTable()

  const db = getSql()

  await db`
    INSERT INTO construction_visit_events (
      visit_id,
      event,
      ip_address,
      event_at,
      started_at,
      elapsed_ms,
      time_spent_seconds,
      user_agent
    )
    VALUES (
      ${record.visitId},
      ${record.event},
      ${record.ipAddress},
      ${record.eventAt},
      ${record.startedAt ?? null},
      ${record.elapsedMs},
      ${record.timeSpentSeconds},
      ${record.userAgent || UNKNOWN_USER_AGENT}
    )
    ON CONFLICT (ip_address, user_agent)
    DO UPDATE SET
      visit_id = EXCLUDED.visit_id,
      event = EXCLUDED.event,
      event_at = EXCLUDED.event_at,
      started_at = COALESCE(construction_visit_events.started_at, EXCLUDED.started_at),
      elapsed_ms = GREATEST(construction_visit_events.elapsed_ms, EXCLUDED.elapsed_ms),
      time_spent_seconds = GREATEST(
        construction_visit_events.time_spent_seconds,
        EXCLUDED.time_spent_seconds
      )
  `
}
