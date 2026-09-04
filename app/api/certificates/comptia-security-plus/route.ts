import { getCertificateDocument } from "@/lib/certificateDocumentStore";

export const runtime = "nodejs";

export async function GET() {
  try {
    const document = await getCertificateDocument("comptia-security-plus");

    if (!document) {
      return new Response("Certificate document not found.", { status: 404 });
    }

    return new Response(Buffer.from(document.contentBase64, "base64"), {
      headers: {
        "Content-Type": document.mimeType,
        "Content-Disposition": `inline; filename="${document.filename.replaceAll('"', "")}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Certificate document service is unavailable.", { status: 503 });
  }
}
