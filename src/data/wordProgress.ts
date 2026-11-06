import { supabase } from '@/lib/supabase';

export type ProgressStatus = 'learning' | 'learned';

export async function fetchWordProgress(): Promise<Record<string, ProgressStatus>> {
  const { data, error } = await supabase.from('word_progress').select('word, status');
  if (error) throw error;

  const statuses: Record<string, ProgressStatus> = {};
  for (const row of data ?? []) {
    if (row.status === 'learning' || row.status === 'learned') {
      statuses[row.word] = row.status;
    }
  }
  return statuses;
}

export async function saveWordProgress(word: string, status: ProgressStatus): Promise<void> {
  const { error } = await supabase
    .from('word_progress')
    .upsert({ word, status, updated_at: new Date().toISOString() }, { onConflict: 'user_id,word' });
  if (error) throw error;
}

export async function removeWordProgress(word: string): Promise<void> {
  const { error } = await supabase.from('word_progress').delete().eq('word', word);
  if (error) throw error;
}
