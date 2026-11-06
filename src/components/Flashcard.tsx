import { useState } from 'react';
import type { VocabularyWord } from '@/data/words';
import { topicLabelKeys } from '@/data/words';
import { useLanguage } from '@/i18n/useLanguage';

interface FlashcardProps {
  word: VocabularyWord;
}

export function Flashcard({ word }: FlashcardProps) {
  const { language, t } = useLanguage();
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={t('card.flip')}
      className="group block w-full rounded-3xl text-left [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
    >
      <div
        className="grid transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="flex min-h-[20rem] flex-col items-center justify-center rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-lg [grid-area:1/1] [backface-visibility:hidden]">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            {t(topicLabelKeys[word.topic])}
          </span>
          <span className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">{word.word}</span>
          <span className="mt-8 text-sm text-stone-500 transition-colors group-hover:text-teal-800">
            {t('card.hint')}
          </span>
        </div>

        <div className="flex min-h-[20rem] flex-col justify-center rounded-3xl bg-teal-800 p-8 text-white shadow-lg [grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-200">{t('card.meaning')}</p>
          <p className="mt-2 text-3xl font-semibold">{word.meaning}</p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed">
            <div>
              <p className="font-semibold text-teal-200">{t('card.definition')}</p>
              <p className="mt-1 text-white">{word.definition[language]}</p>
            </div>
            <div>
              <p className="font-semibold text-teal-200">{t('card.example')}</p>
              <p className="mt-1 italic text-white">{word.example.en}</p>
              <p className="mt-1 text-teal-100">{word.example.tr}</p>
            </div>
            {word.synonyms.length > 0 && (
              <div>
                <p className="font-semibold text-teal-200">{t('card.synonyms')}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {word.synonyms.map((synonym) => (
                    <span key={synonym} className="rounded-full bg-white/15 px-3 py-1 text-white">
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
