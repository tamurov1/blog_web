import { getSql } from "./neonClient";

type VisitorInput = {
  ipAddress: string;
  userAgent: string;
  path: string;
  timeSpentMs: number;
};

let ensureVisitorTablePromise: Promise<void> | undefined;

function cleanText(value: string, maxLength: number) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

function cleanTimeSpent(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(Math.round(value), 30 * 60 * 1000));
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
        total_time_spent_ms BIGINT NOT NULL DEFAULT 0,
        last_time_spent_ms INTEGER NOT NULL DEFAULT 0,
        visit_events INTEGER NOT NULL DEFAULT 0,
        last_path TEXT NOT NULL DEFAULT '',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
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
  const timeSpentMs = cleanTimeSpent(input.timeSpentMs);

  await getSql()`
    INSERT INTO site_visitors (
      ip_address,
      user_agent,
      total_time_spent_ms,
      last_time_spent_ms,
      visit_events,
      last_path
    )
    VALUES (${ipAddress}, ${userAgent}, ${timeSpentMs}, ${timeSpentMs}, 1, ${path})
    ON CONFLICT (ip_address)
    DO UPDATE SET
      user_agent = EXCLUDED.user_agent,
      last_seen_at = NOW(),
      total_time_spent_ms = site_visitors.total_time_spent_ms + EXCLUDED.total_time_spent_ms,
      last_time_spent_ms = EXCLUDED.last_time_spent_ms,
      visit_events = site_visitors.visit_events + 1,
      last_path = EXCLUDED.last_path,
      updated_at = NOW()
  `;
}
