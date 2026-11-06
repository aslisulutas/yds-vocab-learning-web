/*
# Create word_progress table

1. New Tables
- `word_progress`: one row per signed-in user and English word, recording whether the user is currently learning it or has learned it.
  - `user_id` (uuid, owner, defaults to the signed-in user)
  - `word` (text, the English word, matching the app's built-in word list)
  - `status` (text, either 'learning' or 'learned')
  - `updated_at` (timestamp, set on every change)
  - Primary key on (user_id, word) so each user has at most one status per word.

2. Security
- Row level security enabled on `word_progress`.
- Only the `authenticated` role is granted access; anonymous visitors cannot read or write progress.
- Four separate policies (select, insert, update, delete) restrict every operation to rows owned by the current user.

3. Notes
- Words that have no row are treated as "new" by the app.
- Rows are removed automatically if the owning account is deleted.
*/

CREATE TABLE IF NOT EXISTS word_progress (
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  word text NOT NULL,
  status text NOT NULL CHECK (status IN ('learning', 'learned')),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, word)
);

ALTER TABLE word_progress ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON word_progress TO authenticated;

DROP POLICY IF EXISTS "select_own_word_progress" ON word_progress;
CREATE POLICY "select_own_word_progress" ON word_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_word_progress" ON word_progress;
CREATE POLICY "insert_own_word_progress" ON word_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_word_progress" ON word_progress;
CREATE POLICY "update_own_word_progress" ON word_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_word_progress" ON word_progress;
CREATE POLICY "delete_own_word_progress" ON word_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
