import type { PracticeSession } from '@/data/practiceSessions';

export const DAILY_GOAL = 20;

function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
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
