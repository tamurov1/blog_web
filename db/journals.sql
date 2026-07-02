CREATE TABLE IF NOT EXISTS journals (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS journals_created_at_idx
  ON journals (created_at DESC);

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
);

CREATE INDEX IF NOT EXISTS library_books_created_at_idx
  ON library_books (created_at DESC);

CREATE TABLE IF NOT EXISTS journal_comments (
  id BIGSERIAL PRIMARY KEY,
  journal_slug TEXT NOT NULL REFERENCES journals(slug) ON DELETE CASCADE,
  username TEXT NOT NULL DEFAULT 'Anonymous',
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS journal_comments_journal_created_idx
  ON journal_comments (journal_slug, created_at ASC);

CREATE TABLE IF NOT EXISTS library_comments (
  id BIGSERIAL PRIMARY KEY,
  library_slug TEXT NOT NULL REFERENCES library_books(slug) ON DELETE CASCADE,
  username TEXT NOT NULL DEFAULT 'Anonymous',
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS library_comments_library_created_idx
  ON library_comments (library_slug, created_at ASC);
