import { LogIn, Target } from 'lucide-react';
import { usePracticeSessions } from '@/data/usePracticeSessions';
import { useAuth } from '@/auth/useAuth';
import { useLanguage } from '@/i18n/useLanguage';
import { DAILY_GOAL, dailyTotals } from '@/practice/stats';

interface ProgressPageProps {
  onRequestSignIn: () => void;
}

export function ProgressPage({ onRequestSignIn }: ProgressPageProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { sessions, loading, error } = usePracticeSessions();

  if (!user) {
    return (
      <section className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <p className="text-base text-stone-700">{t('progress.signinRequired')}</p>
        <button
          type="button"
          onClick={onRequestSignIn}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        >
          <LogIn className="h-4 w-4" aria-hidden />
          {t('auth.submit.signin')}
        </button>
      </section>
    );
  }

  const days = dailyTotals(sessions, 7, new Date());
  const todayDone = days[days.length - 1].total;
  const goalPercent = Math.min(100, Math.round((todayDone / DAILY_GOAL) * 100));
  const chartMax = Math.max(DAILY_GOAL, ...days.map((day) => day.total));
  const locale = language === 'tr' ? 'tr-TR' : 'en-US';

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{t('progress.title')}</h1>
        <p className="mt-3 text-base leading-relaxed text-stone-700">{t('progress.subtitle')}</p>
      </div>

      {error && (
        <p role="alert" className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          {t('progress.loadError')}
        </p>
      )}

      <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-stone-700">
              <Target className="h-4 w-4 text-teal-800" aria-hidden />
              {t('progress.goal')}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
              {loading ? t('common.loading') : t('progress.goalValue', { done: todayDone, goal: DAILY_GOAL })}
            </p>
          </div>
          <span className="text-2xl font-semibold tabular-nums text-teal-800">{goalPercent}%</span>
        </div>

        <div
          role="progressbar"
          aria-label={t('progress.goal')}
          aria-valuemin={0}
          aria-valuemax={DAILY_GOAL}
          aria-valuenow={Math.min(todayDone, DAILY_GOAL)}
          className="mt-6 h-3 w-full overflow-hidden rounded-full bg-stone-200"
        >
          <div
            className="h-full rounded-full bg-teal-700 transition-[width] duration-700 ease-out"
            style={{ width: `${goalPercent}%` }}
          />
        </div>

        <div className="mt-10">
          <p className="text-sm font-medium text-stone-700">{t('progress.chart')}</p>
          <div className="mt-4 grid grid-cols-7 gap-2 sm:gap-4">
            {days.map((day) => {
              const height = day.total === 0 ? 0 : Math.max(8, Math.round((day.total / chartMax) * 100));
              return (
                <div key={day.date.toISOString()} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-medium tabular-nums text-stone-700">{day.total}</span>
                  <div className="flex h-36 w-full items-end rounded-xl bg-stone-100 p-1">
                    <div
                      className="w-full rounded-lg bg-teal-600 transition-[height] duration-700 ease-out"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs text-stone-600">
                    {day.date.toLocaleDateString(locale, { weekday: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {!loading && !error && sessions.length === 0 && (
          <p className="mt-8 text-sm text-stone-700">{t('progress.empty')}</p>
        )}
      </div>
    </section>
  );
}
