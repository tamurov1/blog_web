import { getSql } from "./neonClient";

type CertificateDocumentRow = {
  filename: string;
  mime_type: string;
  document_base64: string;
};

export type CertificateDocument = {
  filename: string;
  mimeType: string;
  contentBase64: string;
};

let certificateDocumentTablePromise: Promise<void> | undefined;

async function ensureCertificateDocumentTable() {
  certificateDocumentTablePromise ??= (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS certificate_documents (
        slug TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        document BYTEA NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
  })();

  return certificateDocumentTablePromise;
}

export async function getCertificateDocument(slug: string): Promise<CertificateDocument | undefined> {
  await ensureCertificateDocumentTable();
  const sql = getSql();
  const rows = await sql`
    SELECT filename, mime_type, encode(document, 'base64') AS document_base64
    FROM certificate_documents
    WHERE slug = ${slug}
    LIMIT 1
  ` as CertificateDocumentRow[];
  const document = rows[0];

  return document
    ? { filename: document.filename, mimeType: document.mime_type, contentBase64: document.document_base64 }
    : undefined;
}
