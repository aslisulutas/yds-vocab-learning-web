import { useEffect, useRef, useState } from 'react';
import { Award, Loader2 } from 'lucide-react';
import { useAuth } from '@/auth/useAuth';
import { savePracticeSession } from '@/data/practiceSessions';
import { useLanguage } from '@/i18n/useLanguage';
import type { GameKind, Score } from '@/practice/quiz';

interface GameResultProps {
  game: GameKind;
  score: Score;
  onRetry: () => void;
  onRequestSignIn: () => void;
  onViewProgress: () => void;
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export function GameResult({ game, score, onRetry, onRequestSignIn, onViewProgress }: GameResultProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const savedRef = useRef(false);

  useEffect(() => {
    if (!user || score.total === 0 || savedRef.current) return;
    savedRef.current = true;
    setSaveState('saving');
    savePracticeSession(game, score)
      .then(() => setSaveState('saved'))
      .catch(() => setSaveState('error'));
  }, [user, game, score]);

  const percent = score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-800">
        <Award className="h-7 w-7" aria-hidden />
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-stone-900">{t('practice.result.title')}</h2>
      <p className="mt-2 text-lg text-stone-700">
        {t('practice.result.score', { correct: score.correct, total: score.total })}
      </p>
      <p className="mt-1 text-sm text-stone-600">{percent}%</p>

      <p role="status" className="mt-6 flex min-h-6 items-center justify-center gap-2 text-sm text-stone-700">
        {!user && (
          <button
            type="button"
            onClick={onRequestSignIn}
            className="font-medium text-teal-800 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            {t('practice.result.signinPrompt')}
          </button>
        )}
        {user && saveState === 'saving' && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {t('practice.result.saving')}
          </>
        )}
        {user && saveState === 'saved' && t('practice.result.saved')}
        {user && saveState === 'error' && (
          <span className="text-red-800">{t('practice.result.saveError')}</span>
        )}
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-teal-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        >
          {t('practice.result.again')}
        </button>
        {user && (
          <button
            type="button"
            onClick={onViewProgress}
            className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition-colors hover:border-teal-600 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            {t('practice.result.progress')}
          </button>
        )}
      </div>
    </div>
  );
}
