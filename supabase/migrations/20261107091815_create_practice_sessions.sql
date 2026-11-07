/*
# Create practice_sessions table

1. New Tables
- `practice_sessions`: one row per finished practice round, storing the game type, the number of correct answers, the total number of answers and when it happened.
  - `user_id` (owner, defaults to the signed-in user)
  - `mode` ('choice', 'fill' or 'matching')
  - `correct` and `total` (answer counts, with correct never above total)
  - `created_at` (timestamp)
- Index on (user_id, created_at) for fast history lookups.

2. Security
- Row level security enabled.
- Anonymous visitors receive no access; only `authenticated` is granted SELECT and INSERT.
- Two policies restrict reading and inserting to rows owned by the current user.
- No update or delete access is granted, so practice history cannot be altered after it is recorded.

3. Notes
- Existing data is not changed.
*/

CREATE TABLE IF NOT EXISTS practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  mode text NOT NULL CHECK (mode IN ('choice', 'fill', 'matching')),
  correct integer NOT NULL CHECK (correct >= 0),
  total integer NOT NULL CHECK (total >= correct),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS practice_sessions_user_created_idx ON practice_sessions (user_id, created_at DESC);

ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON practice_sessions FROM anon;

GRANT SELECT, INSERT ON practice_sessions TO authenticated;

DROP POLICY IF EXISTS "select_own_practice_sessions" ON practice_sessions;
CREATE POLICY "select_own_practice_sessions" ON practice_sessions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_practice_sessions" ON practice_sessions;
CREATE POLICY "insert_own_practice_sessions" ON practice_sessions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
