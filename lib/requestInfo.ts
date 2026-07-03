function cleanHeaderValue(value: string, maxLength: number) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

function cleanIpAddress(value: string) {
  const cleaned = cleanHeaderValue(value, 128)
    .split(",")[0]
    .trim()
    .replace(/^"|"$/g, "")
    .replace(/^\[|\]$/g, "");

  return cleaned || "unknown";
}

function getForwardedIp(value: string) {
  const match = value.match(/(?:^|;|,)\s*for=(?:"?\[?([^";,\]]+)\]?"?)/i);
  return match?.[1] ? cleanIpAddress(match[1]) : "";
}

export function getClientIp(headers: Headers) {
  const cloudflareIp = headers.get("cf-connecting-ip");
  if (cloudflareIp) {
    return cleanIpAddress(cloudflareIp);
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return cleanIpAddress(realIp);
  }

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return cleanIpAddress(forwardedFor);
  }

  const vercelForwardedFor = headers.get("x-vercel-forwarded-for");
  if (vercelForwardedFor) {
    return cleanIpAddress(vercelForwardedFor);
  }

  const forwarded = headers.get("forwarded");
  if (forwarded) {
    return getForwardedIp(forwarded) || "unknown";
  }

  return "unknown";
}

export function getUserAgent(headers: Headers) {
  return cleanHeaderValue(headers.get("user-agent") ?? "", 500);
}
