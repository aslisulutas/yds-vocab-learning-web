import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/useLanguage';
import { emptyScore, MATCH_SIZE, recordAnswer, shuffle, type GameProps, type Score } from '@/practice/quiz';

export function MatchingGame({ words, onScore, onFinish }: GameProps) {
  const { t } = useLanguage();
  const [pairs] = useState(() => shuffle(words).slice(0, MATCH_SIZE));
  const [meanings] = useState(() => shuffle(pairs.map((pair) => pair.meaning)));
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState(false);
  const [score, setScore] = useState<Score>(emptyScore);

  useEffect(() => {
    if (!wrongPair) return;
    const id = window.setTimeout(() => {
      setSelectedWord(null);
      setSelectedMeaning(null);
      setWrongPair(false);
    }, 800);
    return () => window.clearTimeout(id);
  }, [wrongPair]);

  const choose = (kind: 'word' | 'meaning', value: string) => {
    if (wrongPair) return;
    const word = kind === 'word' ? value : selectedWord;
    const meaning = kind === 'meaning' ? value : selectedMeaning;
    if (kind === 'word') setSelectedWord(value);
    else setSelectedMeaning(value);
    if (!word || !meaning) return;

    const isMatch = pairs.some((pair) => pair.word === word && pair.meaning === meaning);
    const next = recordAnswer(score, word, isMatch);
    setScore(next);
    onScore(next);

    if (!isMatch) {
      setWrongPair(true);
      return;
    }

    const nextMatched = [...matched, word];
    setMatched(nextMatched);
    setSelectedWord(null);
    setSelectedMeaning(null);
    if (nextMatched.length === pairs.length) onFinish(next);
  };

  const wordClass = (word: string) => {
    if (matched.includes(word)) return 'border-emerald-700 bg-emerald-50 text-emerald-950';
    if (wrongPair && selectedWord === word) return 'border-red-700 bg-red-50 text-red-950';
    if (selectedWord === word) return 'border-teal-700 bg-teal-50 text-teal-950 ring-2 ring-teal-600/30';
    return 'border-stone-300 bg-white text-stone-800 hover:border-teal-600 hover:bg-teal-50';
  };

  const meaningClass = (meaning: string) => {
    const pair = pairs.find((item) => item.meaning === meaning);
    if (pair && matched.includes(pair.word)) return 'border-emerald-700 bg-emerald-50 text-emerald-950';
    if (wrongPair && selectedMeaning === meaning) return 'border-red-700 bg-red-50 text-red-950';
    if (selectedMeaning === meaning) return 'border-teal-700 bg-teal-50 text-teal-950 ring-2 ring-teal-600/30';
    return 'border-stone-300 bg-white text-stone-800 hover:border-teal-600 hover:bg-teal-50';
  };

  const tileBase =
    'rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 disabled:cursor-default sm:text-base';

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm text-stone-600">{t('practice.matching.hint')}</p>
      <p
        role="status"
        className={`mt-2 min-h-5 text-sm font-medium text-red-800 ${wrongPair ? '' : 'invisible'}`}
      >
        {t('practice.matching.wrong')}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="flex flex-col gap-3">
          {pairs.map((pair) => (
            <button
              key={pair.word}
              type="button"
              disabled={matched.includes(pair.word) || wrongPair}
              onClick={() => choose('word', pair.word)}
              className={`${tileBase} ${wordClass(pair.word)}`}
            >
              {pair.word}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {meanings.map((meaning) => {
            const pair = pairs.find((item) => item.meaning === meaning);
            const isMatched = pair !== undefined && matched.includes(pair.word);
            return (
              <button
                key={meaning}
                type="button"
                disabled={isMatched || wrongPair}
                onClick={() => choose('meaning', meaning)}
                className={`${tileBase} ${meaningClass(meaning)}`}
              >
                {meaning}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
