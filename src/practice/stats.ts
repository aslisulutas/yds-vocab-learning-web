import type { PracticeSession } from '@/data/practiceSessions';

export const DAILY_GOAL = 20;
const STREAK_BADGE_DAYS = 3;
const LEARNED_BADGE_COUNT = 5;
const ACCURACY_BADGE_MIN_QUESTIONS = 20;
const ACCURACY_BADGE_RATIO = 0.8;

export type BadgeId = 'first' | 'streak' | 'learned' | 'accuracy';

export interface HardWord {
  word: string;
  misses: number;
}

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function summarize(sessions: PracticeSession[]) {
  return sessions.reduce(
    (sum, session) => ({ correct: sum.correct + session.correct, total: sum.total + session.total }),
    { correct: 0, total: 0 }
  );
}

export function accuracyPercent(sessions: PracticeSession[]): number | null {
  const { correct, total } = summarize(sessions);
  return total === 0 ? null : Math.round((correct / total) * 100);
}

export function dailyTotals(sessions: PracticeSession[], days: number, now: Date) {
  const totals = new Map<string, number>();
  for (const session of sessions) {
    const key = dayKey(session.createdAt);
    totals.set(key, (totals.get(key) ?? 0) + session.total);
  }

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (days - 1 - index));
    return { date, total: totals.get(dayKey(date)) ?? 0 };
  });
}

export function currentStreak(sessions: PracticeSession[], now: Date): number {
  const activeDays = new Set(sessions.map((session) => dayKey(session.createdAt)));
  const cursor = new Date(now);
  if (!activeDays.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (activeDays.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function hardWords(missedWords: string[], limit: number): HardWord[] {
  const counts = new Map<string, number>();
  for (const word of missedWords) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return Array.from(counts, ([word, misses]) => ({ word, misses }))
    .sort((a, b) => b.misses - a.misses || a.word.localeCompare(b.word))
    .slice(0, limit);
}

export function earnedBadges(
  sessions: PracticeSession[],
  streak: number,
  learnedCount: number
): Record<BadgeId, boolean> {
  const { correct, total } = summarize(sessions);
  return {
    first: sessions.length > 0,
    streak: streak >= STREAK_BADGE_DAYS,
    learned: learnedCount >= LEARNED_BADGE_COUNT,
    accuracy: total >= ACCURACY_BADGE_MIN_QUESTIONS && correct / total >= ACCURACY_BADGE_RATIO,
  };
}
