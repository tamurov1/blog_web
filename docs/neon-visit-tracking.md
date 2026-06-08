# Neon Visit Tracking

The construction page stores visit data in Neon Postgres through the
`/api/construction-visit` route.

Each `ip_address` can appear once per `user_agent`. If the same IP and same
browser/device returns, the existing row is updated. If the same IP appears with
a different `user_agent`, Neon stores a separate row.

## Environment

Set this variable locally and in Vercel:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOSTNAME/DBNAME?sslmode=require"
```

Use the pooled connection string from Neon for Vercel/serverless deployments.

## Schema

The app runs the required table/index migration automatically before inserting a
visit. You can also run this file manually in the Neon SQL Editor:

```bash
db/construction_visit_events.sql
```

## Useful Query

```sql
SELECT
  visit_id,
  event,
  ip_address,
  event_at,
  time_spent_seconds,
  user_agent
FROM construction_visit_events
ORDER BY event_at DESC
LIMIT 100;
```

## Unique Device Lookup

```sql
SELECT
  ip_address,
  user_agent,
  event,
  event_at,
  time_spent_seconds
FROM construction_visit_events
ORDER BY event_at DESC;
```
