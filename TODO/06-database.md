# Phase 6 — Database

## 6.1 ☐ Verify migrations apply cleanly in CI
Migrations exist (`supabase/migrations/`) but nothing verifies them. Add a
CI step that applies the migrations to a throwaway Postgres/Supabase
instance so schema drift is caught before deploy.

## 6.2 ☐ Confirm production database is at parity
It is unknown whether the live Supabase project matches this repo's
migration files (the exact problem that cost Frelux 70 pending migrations).
Run a ledger check (`supabase_migrations.schema_migrations`) against the
live project and reconcile any drift with idempotent guards
(`DROP POLICY IF EXISTS` / `IF NOT EXISTS`) — the migration files already
use drop-guards for policies, which is good, but this must be verified
against the actual live state, not assumed.

## 6.3 ☐ RLS coverage audit
64 policies exist with drop guards and role helpers (`is_admin`,
`is_editor_or_admin`) — decent baseline. Audit every table for:
- public tables that should not be publicly readable
- `newsletter_subscribers`, `consultations`, `audit_logs` — confirm anon can
  only INSERT where intended and never SELECT
- any table where authenticated users can read other users' data

## 6.4 ☐ Backup & restore check
No documented backup/restore verification for the Supabase project.
Confirm backups are enabled and a restore has been tested once.
