import { useState, type FormEvent } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { emptyScore, recordAnswer, ROUND_SIZE, shuffle, type GameProps, type Score } from '@/practice/quiz';

export function FillGame({ words, onScore, onFinish }: GameProps) {
  const { language, t } = useLanguage();
  const [questions] = useState(() => shuffle(words).slice(0, ROUND_SIZE));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState<Score>(emptyScore);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const question = questions[index];
  const isLast = index + 1 >= questions.length;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (result !== null || answer.trim() === '') return;
    const isCorrect = answer.trim().toLowerCase() === question.word.toLowerCase();
    const next = recordAnswer(score, question.word, isCorrect);
    setResult(isCorrect ? 'correct' : 'wrong');
    setScore(next);
    onScore(next);
  };

  const advance = () => {
    if (isLast) {
      onFinish(score);
      return;
    }
    setIndex(index + 1);
    setAnswer('');
    setResult(null);
  };

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10">
      <p className="text-sm font-medium text-stone-500">
        {t('card.progress', { current: index + 1, total: questions.length })}
      </p>
      <p className="mt-6 text-sm font-medium uppercase tracking-wide text-teal-800">{t('practice.fill.prompt')}</p>
      <p className="mt-3 text-xl leading-relaxed text-stone-900 sm:text-2xl">
        {question.definition[language]}
      </p>

      <form key={index} onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          disabled={result !== null}
          autoFocus
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-label={t('practice.fill.placeholder')}
          placeholder={t('practice.fill.placeholder')}
          className="min-w-0 flex-1 rounded-2xl border border-stone-300 bg-white px-5 py-3 text-base text-stone-900 placeholder:text-stone-500 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30 disabled:bg-stone-100"
        />
        {result === null && (
          <button
            type="submit"
            disabled={answer.trim() === ''}
            className="rounded-full bg-teal-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
          >
            {t('practice.check')}
          </button>
        )}
      </form>

      {result !== null && (
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            role="status"
            className={`flex items-center gap-2 text-sm font-medium ${result === 'correct' ? 'text-emerald-800' : 'text-red-800'}`}
          >
            {result === 'correct' ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : <XCircle className="h-5 w-5" aria-hidden />}
            {result === 'correct' ? t('practice.correct') : t('practice.wrong', { answer: question.word })}
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
