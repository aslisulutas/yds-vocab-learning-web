/*
# Revoke anonymous access to word_progress

1. Modified Tables
- `word_progress`: removed all privileges previously granted to the `anon` role.

2. Security
- Supabase grants new public tables to `anon` by default. Only `authenticated` should reach progress data, since each row belongs to a signed-in user.
- Row level security was already blocking anonymous access; this removes the grant as well so access is limited to the intended role.

3. Notes
- No data is changed or deleted.
*/

REVOKE ALL ON word_progress FROM anon;
