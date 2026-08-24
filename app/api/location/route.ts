import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/requestInfo";

export const dynamic = "force-dynamic";

type IpWhoResponse = {
  success?: unknown;
  city?: unknown;
};

function cleanCity(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 120);
}

function getVercelCity(headers: Headers) {
  const value = headers.get("x-vercel-ip-city");
  if (!value) return "";

  try {
    return cleanCity(decodeURIComponent(value));
  } catch {
    return cleanCity(value);
  }
}

function isLookupCandidate(ipAddress: string) {
  if (!isIP(ipAddress)) return false;

  const normalized = ipAddress.toLowerCase();
  return normalized !== "127.0.0.1"
    && normalized !== "::1"
    && !normalized.startsWith("10.")
    && !normalized.startsWith("192.168.")
    && !normalized.startsWith("169.254.")
    && !normalized.startsWith("fc")
    && !normalized.startsWith("fd")
    && !normalized.startsWith("fe8")
    && !normalized.startsWith("fe9")
    && !normalized.startsWith("fea")
    && !normalized.startsWith("feb");
}

function locationResponse(city: string | null) {
  return NextResponse.json(
    { city },
    {
      headers: {
        "Cache-Control": "private, max-age=3600",
      },
    },
  );
}

export async function GET(request: Request) {
  const ipAddress = getClientIp(request.headers);
  const vercelCity = getVercelCity(request.headers);

  if (!isLookupCandidate(ipAddress)) {
    return locationResponse(vercelCity || null);
  }

  try {
    const lookupUrl = new URL(`https://ipwho.is/${encodeURIComponent(ipAddress)}`);
    lookupUrl.searchParams.set("fields", "success,city");

    const response = await fetch(lookupUrl, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(2500),
    });

    if (response.ok) {
      const result = await response.json() as IpWhoResponse;
      const city = result.success === true ? cleanCity(result.city) : "";
      if (city) return locationResponse(city);
    }
  } catch (error) {
    console.warn("IP city lookup failed", error instanceof Error ? error.message : error);
  }

  return locationResponse(vercelCity || null);
}
