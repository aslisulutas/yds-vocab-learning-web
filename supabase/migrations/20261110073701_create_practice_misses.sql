/*
# Create practice_misses table

1. New Tables
- `practice_misses`: one row for every wrong answer a signed-in user gives during practice.
  - `id` (uuid, primary key)
  - `user_id` (owner, defaults to the signed-in user)
  - `word` (the English word that was answered wrongly, 1 to 100 characters)
  - `created_at` (timestamp)
- Index on (user_id, word) for counting misses per word.

2. Security
- Row level security enabled.
- Anonymous visitors receive no access; only `authenticated` is granted SELECT and INSERT.
- Two policies restrict reading and inserting to rows owned by the current user.
- No update or delete access is granted.

3. Notes
- Existing data is not changed.
*/

CREATE TABLE IF NOT EXISTS practice_misses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  word text NOT NULL CHECK (char_length(word) BETWEEN 1 AND 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS practice_misses_user_word_idx ON practice_misses (user_id, word);

ALTER TABLE practice_misses ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON practice_misses FROM anon;

GRANT SELECT, INSERT ON practice_misses TO authenticated;

DROP POLICY IF EXISTS "select_own_practice_misses" ON practice_misses;
CREATE POLICY "select_own_practice_misses" ON practice_misses FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_practice_misses" ON practice_misses;
CREATE POLICY "insert_own_practice_misses" ON practice_misses FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
