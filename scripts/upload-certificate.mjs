import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { neon } from "@neondatabase/serverless";

const sourcePath = process.argv[2];

if (!sourcePath) {
  throw new Error("Usage: node --env-file=.env.local scripts/upload-certificate.mjs <certificate.pdf>");
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required.");
}

const sql = neon(process.env.DATABASE_URL);
const filePath = resolve(sourcePath);
const documentBase64 = readFileSync(filePath).toString("base64");

await sql`
  CREATE TABLE IF NOT EXISTS certificate_documents (
    slug TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    document BYTEA NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

await sql`
  INSERT INTO certificate_documents (slug, filename, mime_type, document, updated_at)
  VALUES (
    ${"comptia-security-plus"},
    ${basename(filePath)},
    ${"application/pdf"},
    decode(${documentBase64}, 'base64'),
    NOW()
  )
  ON CONFLICT (slug) DO UPDATE SET
    filename = EXCLUDED.filename,
    mime_type = EXCLUDED.mime_type,
    document = EXCLUDED.document,
    updated_at = NOW()
`;

console.log("Certificate document uploaded to Postgres.");
