import { getSql } from "./neonClient";

export type Comment = {
  id: number;
  journalSlug: string;
  username: string;
  body: string;
  createdAt: string;
};

type CommentRow = {
  id: number;
  journal_slug: string;
  username: string;
  body: string;
  created_at: string;
};

type CommentInput = {
  journalSlug: string;
  username: string;
  body: string;
};

let ensureTablePromise: Promise<void> | undefined;

function cleanText(value: string, maxLength: number, allowNewLines = false) {
  const controlPattern = allowNewLines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;

  return value
    .replace(controlPattern, "")
    .replace(/\s+$/g, "")
    .trimStart()
    .slice(0, maxLength);
}

function mapComment(row: CommentRow): Comment {
  return {
    id: row.id,
    journalSlug: row.journal_slug,
    username: row.username,
    body: row.body,
    createdAt: row.created_at,
  };
}

async function ensureCommentTable() {
  ensureTablePromise ??= (async () => {
    const db = getSql();

    await db`
      CREATE TABLE IF NOT EXISTS journal_comments (
        id BIGSERIAL PRIMARY KEY,
        journal_slug TEXT NOT NULL REFERENCES journals(slug) ON DELETE CASCADE,
        username TEXT NOT NULL DEFAULT 'Anonymous',
        body TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await db`
      CREATE INDEX IF NOT EXISTS journal_comments_journal_created_idx
      ON journal_comments (journal_slug, created_at ASC)
    `;
  })();

  return ensureTablePromise;
}

export async function listComments(journalSlug: string) {
  await ensureCommentTable();

  const rows = (await getSql()`
    SELECT id, journal_slug, username, body, created_at
    FROM journal_comments
    WHERE journal_slug = ${journalSlug}
    ORDER BY created_at ASC, id ASC
  `) as CommentRow[];

  return rows.map(mapComment);
}

export async function createComment(input: CommentInput) {
  await ensureCommentTable();

  const journalSlug = cleanText(input.journalSlug, 220);
  const username = cleanText(input.username, 80) || "Anonymous";
  const body = cleanText(input.body, 2000, true);

  if (!journalSlug || body.length < 1) {
    throw new Error("Comment is required.");
  }

  const rows = (await getSql()`
    INSERT INTO journal_comments (journal_slug, username, body)
    VALUES (${journalSlug}, ${username}, ${body})
    RETURNING id, journal_slug, username, body, created_at
  `) as CommentRow[];

  return rows[0] ? mapComment(rows[0]) : undefined;
}
