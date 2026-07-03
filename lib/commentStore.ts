import { getSql } from "./neonClient";

export type Comment = {
  id: number;
  parentSlug: string;
  username: string;
  body: string;
  createdAt: string;
};

type JournalCommentRow = {
  id: number;
  journal_slug: string;
  username: string;
  body: string;
  created_at: string;
  ip_address: string;
};

type LibraryCommentRow = {
  id: number;
  library_slug: string;
  username: string;
  body: string;
  created_at: string;
  ip_address: string;
};

type JournalCommentInput = {
  journalSlug: string;
  username: string;
  body: string;
  ipAddress: string;
};

type LibraryCommentInput = {
  librarySlug: string;
  username: string;
  body: string;
  ipAddress: string;
};

let ensureJournalTablePromise: Promise<void> | undefined;
let ensureLibraryTablePromise: Promise<void> | undefined;

function cleanText(value: string, maxLength: number, allowNewLines = false) {
  const controlPattern = allowNewLines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;

  return value
    .replace(controlPattern, "")
    .replace(/\s+$/g, "")
    .trimStart()
    .slice(0, maxLength);
}

function mapJournalComment(row: JournalCommentRow): Comment {
  return {
    id: row.id,
    parentSlug: row.journal_slug,
    username: row.username,
    body: row.body,
    createdAt: row.created_at,
  };
}

function mapLibraryComment(row: LibraryCommentRow): Comment {
  return {
    id: row.id,
    parentSlug: row.library_slug,
    username: row.username,
    body: row.body,
    createdAt: row.created_at,
  };
}

async function ensureCommentTable() {
  ensureJournalTablePromise ??= (async () => {
    const db = getSql();

    await db`
      CREATE TABLE IF NOT EXISTS journal_comments (
        id BIGSERIAL PRIMARY KEY,
        journal_slug TEXT NOT NULL REFERENCES journals(slug) ON DELETE CASCADE,
        username TEXT NOT NULL DEFAULT 'Anonymous',
        body TEXT NOT NULL,
        ip_address TEXT NOT NULL DEFAULT 'unknown',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await db`
      ALTER TABLE journal_comments
      ADD COLUMN IF NOT EXISTS ip_address TEXT NOT NULL DEFAULT 'unknown'
    `;

    await db`
      CREATE INDEX IF NOT EXISTS journal_comments_journal_created_idx
      ON journal_comments (journal_slug, created_at ASC)
    `;
  })();

  return ensureJournalTablePromise;
}

async function ensureLibraryCommentTable() {
  ensureLibraryTablePromise ??= (async () => {
    const db = getSql();

    await db`
      CREATE TABLE IF NOT EXISTS library_comments (
        id BIGSERIAL PRIMARY KEY,
        library_slug TEXT NOT NULL REFERENCES library_books(slug) ON DELETE CASCADE,
        username TEXT NOT NULL DEFAULT 'Anonymous',
        body TEXT NOT NULL,
        ip_address TEXT NOT NULL DEFAULT 'unknown',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await db`
      ALTER TABLE library_comments
      ADD COLUMN IF NOT EXISTS ip_address TEXT NOT NULL DEFAULT 'unknown'
    `;

    await db`
      CREATE INDEX IF NOT EXISTS library_comments_library_created_idx
      ON library_comments (library_slug, created_at ASC)
    `;
  })();

  return ensureLibraryTablePromise;
}

export async function listComments(journalSlug: string) {
  await ensureCommentTable();

  const rows = (await getSql()`
    SELECT id, journal_slug, username, body, created_at
    FROM journal_comments
    WHERE journal_slug = ${journalSlug}
    ORDER BY created_at ASC, id ASC
  `) as JournalCommentRow[];

  return rows.map(mapJournalComment);
}

export async function createComment(input: JournalCommentInput) {
  await ensureCommentTable();

  const journalSlug = cleanText(input.journalSlug, 220);
  const username = cleanText(input.username, 80) || "Anonymous";
  const body = cleanText(input.body, 2000, true);
  const ipAddress = cleanText(input.ipAddress, 128) || "unknown";

  if (!journalSlug || body.length < 1) {
    throw new Error("Comment is required.");
  }

  const rows = (await getSql()`
    INSERT INTO journal_comments (journal_slug, username, body, ip_address)
    VALUES (${journalSlug}, ${username}, ${body}, ${ipAddress})
    RETURNING id, journal_slug, username, body, created_at
  `) as JournalCommentRow[];

  return rows[0] ? mapJournalComment(rows[0]) : undefined;
}

export async function listLibraryComments(librarySlug: string) {
  await ensureLibraryCommentTable();

  const rows = (await getSql()`
    SELECT id, library_slug, username, body, created_at
    FROM library_comments
    WHERE library_slug = ${librarySlug}
    ORDER BY created_at ASC, id ASC
  `) as LibraryCommentRow[];

  return rows.map(mapLibraryComment);
}

export async function createLibraryComment(input: LibraryCommentInput) {
  await ensureLibraryCommentTable();

  const librarySlug = cleanText(input.librarySlug, 220);
  const username = cleanText(input.username, 80) || "Anonymous";
  const body = cleanText(input.body, 2000, true);
  const ipAddress = cleanText(input.ipAddress, 128) || "unknown";

  if (!librarySlug || body.length < 1) {
    throw new Error("Comment is required.");
  }

  const rows = (await getSql()`
    INSERT INTO library_comments (library_slug, username, body, ip_address)
    VALUES (${librarySlug}, ${username}, ${body}, ${ipAddress})
    RETURNING id, library_slug, username, body, created_at
  `) as LibraryCommentRow[];

  return rows[0] ? mapLibraryComment(rows[0]) : undefined;
}
