import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | undefined;

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || databaseUrl.includes("PASTE_NEON")) {
    throw new Error("DATABASE_URL must be set to your Neon Postgres connection string.");
  }

  sql ??= neon(databaseUrl);
  return sql;
}
