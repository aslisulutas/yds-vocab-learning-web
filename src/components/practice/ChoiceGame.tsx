import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import {
  buildChoiceQuestions,
  emptyScore,
  recordAnswer,
  ROUND_SIZE,
  type GameProps,
  type Score,
} from '@/practice/quiz';

export function ChoiceGame({ words, onScore, onFinish }: GameProps) {
  const { t } = useLanguage();
  const [questions] = useState(() => buildChoiceQuestions(words, ROUND_SIZE));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState<Score>(emptyScore);
  const [picked, setPicked] = useState<string | null>(null);

  const question = questions[index];
  const isLast = index + 1 >= questions.length;
  const wasCorrect = picked === question.word.meaning;

  const choose = (option: string) => {
    if (picked !== null) return;
    const next = recordAnswer(score, question.word.word, option === question.word.meaning);
    setPicked(option);
    setScore(next);
    onScore(next);
  };

  const advance = () => {
    if (isLast) {
      onFinish(score);
      return;
    }
    setIndex(index + 1);
    setPicked(null);
  };

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
      <p className="text-sm font-medium text-stone-500">
        {t('card.progress', { current: index + 1, total: questions.length })}
      </p>
      <p className="mt-6 text-center text-4xl font-semibold tracking-tight text-stone-900">
        {question.word.word}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          let style = 'border-stone-300 bg-white text-stone-800 hover:border-teal-600 hover:bg-teal-50';
          if (picked !== null) {
            if (option === question.word.meaning) {
              style = 'border-emerald-700 bg-emerald-50 text-emerald-950';
            } else if (option === picked) {
              style = 'border-red-700 bg-red-50 text-red-950';
            } else {
              style = 'border-stone-200 bg-white text-stone-500';
            }
          }
          return (
            <button
              key={option}
              type="button"
              disabled={picked !== null}
              onClick={() => choose(option)}
              className={`rounded-2xl border px-5 py-4 text-left text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:cursor-default ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            role="status"
            className={`flex items-center gap-2 text-sm font-medium ${wasCorrect ? 'text-emerald-800' : 'text-red-800'}`}
          >
            {wasCorrect ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : <XCircle className="h-5 w-5" aria-hidden />}
            {wasCorrect
              ? t('practice.correct')
              : t('practice.wrong', { answer: question.word.meaning })}
          </p>
          <button
            type="button"
            onClick={advance}
            className="rounded-full bg-teal-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            {isLast ? t('practice.finish') : t('practice.next')}
          </button>
        </div>
      )}
    </div>
  );
}
