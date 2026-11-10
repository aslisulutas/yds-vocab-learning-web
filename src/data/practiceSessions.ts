import { supabase } from '@/lib/supabase';
import type { GameKind, Score } from '@/practice/quiz';

export interface PracticeSession {
  correct: number;
  total: number;
  createdAt: Date;
}

export async function savePracticeSession(game: GameKind, score: Score): Promise<void> {
  const { error } = await supabase.from('practice_sessions').insert({
    mode: game,
    correct: score.correct,
    total: score.total,
  });
  if (error) throw error;

  if (score.missed.length > 0) {
    const { error: missError } = await supabase
      .from('practice_misses')
      .insert(score.missed.map((word) => ({ word })));
    if (missError) throw missError;
  }
}

export async function fetchPracticeSessions(): Promise<PracticeSession[]> {
  const { data, error } = await supabase
    .from('practice_sessions')
    .select('correct, total, created_at')
    .order('created_at', { ascending: false })
    .limit(1000);
  if (error) throw error;

  return (data ?? []).map((row) => ({
    correct: Number(row.correct),
    total: Number(row.total),
    createdAt: new Date(row.created_at),
  }));
}

export async function fetchMissedWords(): Promise<string[]> {
  const { data, error } = await supabase
    .from('practice_misses')
    .select('word')
    .order('created_at', { ascending: false })
    .limit(2000);
  if (error) throw error;

  return (data ?? []).map((row) => String(row.word));
}
