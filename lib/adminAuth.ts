import { cookies } from "next/headers";
import crypto from "node:crypto";

const cookieName = "journal_admin_session";
const sessionLengthMs = 1000 * 60 * 60 * 8;

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

function timingSafeEqualText(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function getAdminPath() {
  return getRequiredEnv("JOURNAL_ADMIN_PATH");
}

export function getAdminUsername() {
  return getRequiredEnv("JOURNAL_ADMIN_USERNAME");
}

export function verifyAdminPassword(password: string) {
  const hash = getRequiredEnv("JOURNAL_ADMIN_PASSWORD_HASH");
  const [algorithm, cost, blockSize, parallelization, salt, expected] = hash.split("$");

  if (algorithm !== "scrypt" || !cost || !blockSize || !parallelization || !salt || !expected) {
    return false;
  }

  const actual = crypto
    .scryptSync(password, salt, Buffer.from(expected, "base64url").length, {
      N: Number(cost),
      r: Number(blockSize),
      p: Number(parallelization),
    })
    .toString("base64url");

  return timingSafeEqualText(actual, expected);
}

function sign(payload: string) {
  return crypto
    .createHmac("sha256", getRequiredEnv("JOURNAL_SESSION_SECRET"))
    .update(payload)
    .digest("base64url");
}

function createSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({
      sub: "journal-admin",
      exp: Date.now() + sessionLengthMs,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

function verifySessionToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature || !timingSafeEqualText(sign(payload), signature)) {
    return false;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      sub?: string;
      exp?: number;
    };

    return session.sub === "journal-admin" && typeof session.exp === "number" && session.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(cookieName)?.value);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createSessionToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLengthMs / 1000,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
