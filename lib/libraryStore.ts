import { getSql } from "./neonClient";

export type LibraryBook = {
  slug: string;
  title: string;
  author: string;
  category: string;
  publicationYear: string;
  description: string;
};

type LibraryBookRow = {
  id: number;
  slug: string;
  title: string;
  author: string;
  category: string;
  publication_year: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type LibraryBookInput = {
  title: string;
  author: string;
  category: string;
  publicationYear: string;
  description: string;
};

let ensureTablePromise: Promise<void> | undefined;

function cleanInput(input: LibraryBookInput): LibraryBookInput {
  return {
    title: input.title.trim().slice(0, 180),
    author: input.author.trim().slice(0, 180),
    category: input.category.trim().slice(0, 120),
    publicationYear: input.publicationYear.trim().slice(0, 24),
    description: input.description.trim().slice(0, 20000),
  };
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "book";
}

function mapBook(row: LibraryBookRow): LibraryBook {
  return {
    slug: row.slug,
    title: row.title,
    author: row.author,
    category: row.category,
    publicationYear: row.publication_year,
    description: row.description,
  };
}

async function ensureLibraryTable() {
  ensureTablePromise ??= (async () => {
    const db = getSql();

    await db`
      CREATE TABLE IF NOT EXISTS library_books (
        id BIGSERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        category TEXT NOT NULL,
        publication_year TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await db`
      CREATE INDEX IF NOT EXISTS library_books_created_at_idx
      ON library_books (created_at DESC)
    `;
  })();

  return ensureTablePromise;
}

async function createUniqueSlug(title: string, author: string) {
  await ensureLibraryTable();

  const db = getSql();
  const baseSlug = slugify(`${title}-${author}`);
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const rows = (await db`
      SELECT 1
      FROM library_books
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

export async function listLibraryBooks() {
  await ensureLibraryTable();

  const rows = (await getSql()`
    SELECT id, slug, title, author, category, publication_year, description, created_at, updated_at
    FROM library_books
    ORDER BY id ASC
  `) as LibraryBookRow[];

  return rows.map(mapBook);
}

export async function getLibraryBook(slug: string) {
  await ensureLibraryTable();

  const rows = (await getSql()`
    SELECT id, slug, title, author, category, publication_year, description, created_at, updated_at
    FROM library_books
    WHERE slug = ${slug}
    LIMIT 1
  `) as LibraryBookRow[];

  return rows[0] ? mapBook(rows[0]) : undefined;
}

export async function createLibraryBook(input: LibraryBookInput) {
  const book = cleanInput(input);

  if (!book.title || !book.author || !book.category || !book.publicationYear || !book.description) {
    throw new Error("Title, author, category, year, and description are required.");
  }

  const slug = await createUniqueSlug(book.title, book.author);

  await getSql()`
    INSERT INTO library_books (slug, title, author, category, publication_year, description)
    VALUES (
      ${slug},
      ${book.title},
      ${book.author},
      ${book.category},
      ${book.publicationYear},
      ${book.description}
    )
  `;

  return getLibraryBook(slug);
}

export async function updateLibraryBook(slug: string, input: LibraryBookInput) {
  await ensureLibraryTable();

  const book = cleanInput(input);

  if (!book.title || !book.author || !book.category || !book.publicationYear || !book.description) {
    throw new Error("Title, author, category, year, and description are required.");
  }

  const rows = (await getSql()`
    UPDATE library_books
    SET title = ${book.title},
        author = ${book.author},
        category = ${book.category},
        publication_year = ${book.publicationYear},
        description = ${book.description},
        updated_at = NOW()
    WHERE slug = ${slug}
    RETURNING id, slug, title, author, category, publication_year, description, created_at, updated_at
  `) as LibraryBookRow[];

  return rows[0] ? mapBook(rows[0]) : undefined;
}

export async function deleteLibraryBook(slug: string) {
  await ensureLibraryTable();

  const rows = (await getSql()`
    DELETE FROM library_books
    WHERE slug = ${slug}
    RETURNING id, slug, title, author, category, publication_year, description, created_at, updated_at
  `) as LibraryBookRow[];

  return rows[0] ? mapBook(rows[0]) : undefined;
}
