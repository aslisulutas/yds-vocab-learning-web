import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ListChecks, PenLine, Shuffle, Timer, type LucideIcon } from 'lucide-react';
import { ChoiceGame } from '@/components/practice/ChoiceGame';
import { FillGame } from '@/components/practice/FillGame';
import { GameResult } from '@/components/practice/GameResult';
import { MatchingGame } from '@/components/practice/MatchingGame';
import { vocabulary } from '@/data/words';
import { useLanguage } from '@/i18n/useLanguage';
import type { TranslationKey } from '@/i18n/translations';
import type { GameKind, Score } from '@/practice/quiz';

const TIME_LIMIT_SECONDS = 60;

type Phase =
  | { kind: 'select' }
  | { kind: 'play'; game: GameKind }
  | { kind: 'result'; game: GameKind; score: Score };

interface PracticePageProps {
  onRequestSignIn: () => void;
  onViewProgress: () => void;
}

const games: { kind: GameKind; icon: LucideIcon; titleKey: TranslationKey; bodyKey: TranslationKey }[] = [
  {
    kind: 'choice',
    icon: ListChecks,
    titleKey: 'practice.game.choice.title',
    bodyKey: 'practice.game.choice.body',
  },
  {
    kind: 'fill',
    icon: PenLine,
    titleKey: 'practice.game.fill.title',
    bodyKey: 'practice.game.fill.body',
  },
  {
    kind: 'matching',
    icon: Shuffle,
    titleKey: 'practice.game.matching.title',
    bodyKey: 'practice.game.matching.body',
  },
];

export function PracticePage({ onRequestSignIn, onViewProgress }: PracticePageProps) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>({ kind: 'select' });
  const [timed, setTimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const latestScore = useRef<Score>({ correct: 0, total: 0 });

  useEffect(() => {
    if (phase.kind !== 'play' || !timed) return;
    if (timeLeft <= 0) {
      setPhase({ kind: 'result', game: phase.game, score: latestScore.current });
      return;
    }
    const id = window.setTimeout(() => setTimeLeft((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, timed, timeLeft]);

  const startGame = (game: GameKind) => {
    latestScore.current = { correct: 0, total: 0 };
    setTimeLeft(TIME_LIMIT_SECONDS);
    setPhase({ kind: 'play', game });
  };

  if (phase.kind === 'result') {
    return (
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <GameResult
          game={phase.game}
          score={phase.score}
          onRetry={() => startGame(phase.game)}
          onRequestSignIn={onRequestSignIn}
          onViewProgress={onViewProgress}
        />
      </section>
    );
  }

  if (phase.kind === 'play') {
    const game = phase.game;
    const handleScore = (score: Score) => {
      latestScore.current = score;
    };
    const handleFinish = (score: Score) => setPhase({ kind: 'result', game, score });
    const gameProps = { words: vocabulary, onScore: handleScore, onFinish: handleFinish };

    return (
      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setPhase({ kind: 'select' })}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t('practice.back')}
          </button>
          {timed && (
            <span
              className={`rounded-full px-4 py-1.5 text-sm font-semibold tabular-nums ${timeLeft <= 10 ? 'bg-red-50 text-red-900' : 'bg-teal-50 text-teal-900'}`}
            >
              <Timer className="mr-1.5 inline h-4 w-4 align-[-3px]" aria-hidden />
              {t('practice.timeLeft', { seconds: timeLeft })}
            </span>
          )}
        </div>
        <div className="mt-6">
          {game === 'choice' && <ChoiceGame {...gameProps} />}
          {game === 'fill' && <FillGame {...gameProps} />}
          {game === 'matching' && <MatchingGame {...gameProps} />}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{t('practice.title')}</h1>
        <p className="mt-3 text-base leading-relaxed text-stone-700">{t('practice.subtitle')}</p>
      </div>

      <button
        type="button"
        aria-pressed={timed}
        onClick={() => setTimed((value) => !value)}
        className={`mt-8 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${timed ? 'border-teal-700 bg-teal-700 text-white' : 'border-stone-300 bg-white text-stone-800 hover:border-teal-600'}`}
      >
        <Timer className="h-4 w-4" aria-hidden />
        {t('practice.timed')}
      </button>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {games.map(({ kind, icon: Icon, titleKey, bodyKey }) => (
          <button
            key={kind}
            type="button"
            onClick={() => startGame(kind)}
            className="group flex flex-col rounded-3xl border border-stone-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-800 transition-colors group-hover:bg-teal-700 group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="mt-5 text-lg font-semibold text-stone-900">{t(titleKey)}</span>
            <span className="mt-2 text-sm leading-relaxed text-stone-700">{t(bodyKey)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
