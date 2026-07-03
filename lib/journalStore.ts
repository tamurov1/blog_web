import { getSql } from "./neonClient";

export type Journal = {
  slug: string;
  date: string;
  title: string;
  body: string;
};

type JournalRow = Journal & {
  id: number;
  created_at: string;
  updated_at: string;
};

type JournalInput = {
  date: string;
  title: string;
  body: string;
};

let ensureTablePromise: Promise<void> | undefined;

function cleanInput(input: JournalInput): JournalInput {
  return {
    date: input.date.trim().slice(0, 120),
    title: input.title.trim().slice(0, 180),
    body: input.body.trim().slice(0, 20000),
  };
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "journal";
}

function mapJournal(row: JournalRow): Journal {
  return {
    slug: row.slug,
    date: row.date,
    title: row.title,
    body: row.body,
  };
}

async function ensureJournalTable() {
  ensureTablePromise ??= (async () => {
    const db = getSql();

    await db`
      CREATE TABLE IF NOT EXISTS journals (
        id BIGSERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        date TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await db`
      CREATE INDEX IF NOT EXISTS journals_created_at_idx
      ON journals (created_at DESC)
    `;

  })();

  return ensureTablePromise;
}

async function createUniqueSlug(title: string) {
  await ensureJournalTable();

  const db = getSql();
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const rows = (await db`
      SELECT 1
      FROM journals
      WHERE slug = ${slug}
      LIMIT 1
    `) as Array<{ "?column?": number }>;

    if (rows.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function listJournals() {
  await ensureJournalTable();

  const rows = (await getSql()`
    SELECT id, slug, date, title, body, created_at, updated_at
    FROM journals
    ORDER BY id ASC
  `) as JournalRow[];

  return rows.map(mapJournal);
}

export async function getJournal(slug: string) {
  await ensureJournalTable();

  const rows = (await getSql()`
    SELECT id, slug, date, title, body, created_at, updated_at
    FROM journals
    WHERE slug = ${slug}
    LIMIT 1
  `) as JournalRow[];

  return rows[0] ? mapJournal(rows[0]) : undefined;
}

export async function createJournal(input: JournalInput) {
  const journal = cleanInput(input);

  if (!journal.date || !journal.title || !journal.body) {
    throw new Error("Date, title, and body are required.");
  }

  const slug = await createUniqueSlug(journal.title);

  await getSql()`
    INSERT INTO journals (slug, date, title, body)
    VALUES (${slug}, ${journal.date}, ${journal.title}, ${journal.body})
  `;

  return getJournal(slug);
}

export async function updateJournal(slug: string, input: JournalInput) {
  await ensureJournalTable();

  const journal = cleanInput(input);

  if (!journal.date || !journal.title || !journal.body) {
    throw new Error("Date, title, and body are required.");
  }

  const rows = (await getSql()`
    UPDATE journals
    SET date = ${journal.date},
        title = ${journal.title},
        body = ${journal.body},
        updated_at = NOW()
    WHERE slug = ${slug}
    RETURNING id, slug, date, title, body, created_at, updated_at
  `) as JournalRow[];

  return rows[0] ? mapJournal(rows[0]) : undefined;
}

export async function deleteJournal(slug: string) {
  await ensureJournalTable();

  const rows = (await getSql()`
    DELETE FROM journals
    WHERE slug = ${slug}
    RETURNING id, slug, date, title, body, created_at, updated_at
  `) as JournalRow[];

  return rows[0] ? mapJournal(rows[0]) : undefined;
}
