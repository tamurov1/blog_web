import { getSql } from "./neonClient";

type VisitorInput = {
  ipAddress: string;
  userAgent: string;
  path: string;
  timeSpentSeconds: number;
};

let ensureVisitorTablePromise: Promise<void> | undefined;

function cleanText(value: string, maxLength: number) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

function cleanTimeSpentSeconds(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(Math.round(value), 30 * 60));
}

async function ensureVisitorTable() {
  ensureVisitorTablePromise ??= (async () => {
    const db = getSql();

    await db`
      CREATE TABLE IF NOT EXISTS site_visitors (
        id BIGSERIAL PRIMARY KEY,
        ip_address TEXT NOT NULL UNIQUE,
        user_agent TEXT NOT NULL DEFAULT '',
        first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        total_time_spent_seconds BIGINT NOT NULL DEFAULT 0,
        last_time_spent_seconds INTEGER NOT NULL DEFAULT 0,
        visit_events INTEGER NOT NULL DEFAULT 0,
        last_path TEXT NOT NULL DEFAULT '',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await db`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'site_visitors'
            AND column_name = 'total_time_spent_ms'
        ) AND NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'site_visitors'
            AND column_name = 'total_time_spent_seconds'
        ) THEN
          ALTER TABLE site_visitors
          RENAME COLUMN total_time_spent_ms TO total_time_spent_seconds;

          UPDATE site_visitors
          SET total_time_spent_seconds = CEIL(total_time_spent_seconds::numeric / 1000)::bigint;
        END IF;

        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'site_visitors'
            AND column_name = 'last_time_spent_ms'
        ) AND NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'site_visitors'
            AND column_name = 'last_time_spent_seconds'
        ) THEN
          ALTER TABLE site_visitors
          RENAME COLUMN last_time_spent_ms TO last_time_spent_seconds;

          UPDATE site_visitors
          SET last_time_spent_seconds = CEIL(last_time_spent_seconds::numeric / 1000)::integer;
        END IF;
      END $$;
    `;

    await db`
      ALTER TABLE site_visitors
      ADD COLUMN IF NOT EXISTS total_time_spent_seconds BIGINT NOT NULL DEFAULT 0
    `;

    await db`
      ALTER TABLE site_visitors
      ADD COLUMN IF NOT EXISTS last_time_spent_seconds INTEGER NOT NULL DEFAULT 0
    `;

    await db`
      ALTER TABLE site_visitors
      DROP COLUMN IF EXISTS total_time_spent_ms,
      DROP COLUMN IF EXISTS last_time_spent_ms
    `;

    await db`
      CREATE INDEX IF NOT EXISTS site_visitors_last_seen_idx
      ON site_visitors (last_seen_at DESC)
    `;
  })();

  return ensureVisitorTablePromise;
}

export async function trackVisitor(input: VisitorInput) {
  await ensureVisitorTable();

  const ipAddress = cleanText(input.ipAddress, 128) || "unknown";
  const userAgent = cleanText(input.userAgent, 500);
  const path = cleanText(input.path, 300);
  const timeSpentSeconds = cleanTimeSpentSeconds(input.timeSpentSeconds);

  await getSql()`
    INSERT INTO site_visitors (
      ip_address,
      user_agent,
      total_time_spent_seconds,
      last_time_spent_seconds,
      visit_events,
      last_path
    )
    VALUES (${ipAddress}, ${userAgent}, ${timeSpentSeconds}, ${timeSpentSeconds}, 1, ${path})
    ON CONFLICT (ip_address)
    DO UPDATE SET
      user_agent = EXCLUDED.user_agent,
      last_seen_at = NOW(),
      total_time_spent_seconds = site_visitors.total_time_spent_seconds + EXCLUDED.total_time_spent_seconds,
      last_time_spent_seconds = EXCLUDED.last_time_spent_seconds,
      visit_events = site_visitors.visit_events + 1,
      last_path = EXCLUDED.last_path,
      updated_at = NOW()
  `;
}
