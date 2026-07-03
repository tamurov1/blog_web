import { NextResponse } from "next/server";
import { trackVisitor } from "@/lib/analyticsStore";
import { getClientIp, getUserAgent } from "@/lib/requestInfo";

export const dynamic = "force-dynamic";

type AnalyticsBody = {
  path?: unknown;
  timeSpentMs?: unknown;
  timeSpentSeconds?: unknown;
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
    const timeSpentSeconds =
      body.timeSpentSeconds === undefined
        ? Math.round(toNumber(body.timeSpentMs) / 1000)
        : toNumber(body.timeSpentSeconds);

    await trackVisitor({
      ipAddress: getClientIp(request.headers),
      userAgent: getUserAgent(request.headers),
      path: typeof body.path === "string" ? body.path : "",
      timeSpentSeconds,
    });
  } catch (error) {
    console.error("Failed to track visitor", error);
  }

  return NextResponse.json({ ok: true });
}
