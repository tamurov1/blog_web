# Dmytrii Tamurov

Minimal Next.js website for dmytriitamurov.com.

## Commands

```bash
npm run dev
npm run build
npm run start
```

## Environment

Set these locally and in production:

```bash
DATABASE_URL="postgresql://..."
JOURNAL_ADMIN_PATH="random-private-path"
JOURNAL_ADMIN_USERNAME="username"
JOURNAL_ADMIN_PASSWORD_HASH="scrypt$..."
JOURNAL_SESSION_SECRET="random-secret"
```

The app creates the Neon `journals` table automatically. The schema is also in
`db/journals.sql`.
