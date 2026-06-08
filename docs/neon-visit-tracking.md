# Neon Visit Tracking

The construction page stores visit events in Neon Postgres through the
`/api/construction-visit` route.

## Environment

Set this variable locally and in Vercel:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOSTNAME/DBNAME?sslmode=require"
```

Use the pooled connection string from Neon for Vercel/serverless deployments.

## Schema

The app runs `CREATE TABLE IF NOT EXISTS` automatically before inserting a visit
event. You can also run this file manually in the Neon SQL Editor:

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
