import { NextResponse } from "next/server";
import { trackVisitor } from "@/lib/analyticsStore";
import { getClientIp, getUserAgent } from "@/lib/requestInfo";

export const dynamic = "force-dynamic";

type AnalyticsBody = {
  path?: unknown;
  timeSpentMs?: unknown;
};

function toNumber(value: unknown) {
  return typeof value === "number" ? value : Number(value);
}

export async function POST(request: Request) {
  let body: AnalyticsBody = {};

  try {
    body = (await request.json()) as AnalyticsBody;
  } catch {
    body = {};
  }

  try {
    await trackVisitor({
      ipAddress: getClientIp(request.headers),
      userAgent: getUserAgent(request.headers),
      path: typeof body.path === "string" ? body.path : "",
      timeSpentMs: toNumber(body.timeSpentMs),
    });
  } catch (error) {
    console.error("Failed to track visitor", error);
  }

  return NextResponse.json({ ok: true });
}
