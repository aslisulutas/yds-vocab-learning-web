import { useLanguage } from '@/i18n/useLanguage';
import { vocabulary } from '@/data/words';
import type { HardWord } from '@/practice/stats';

interface HardWordsCardProps {
  words: HardWord[];
  loading: boolean;
}

const meaningByWord = new Map(vocabulary.map((item) => [item.word, item.meaning]));

export function HardWordsCard({ words, loading }: HardWordsCardProps) {
  const { t } = useLanguage();

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-stone-900">{t('progress.hardWords.title')}</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-700">{t('progress.hardWords.hint')}</p>

      {loading && <p className="mt-6 text-sm text-stone-700">{t('common.loading')}</p>}

      {!loading && words.length === 0 && (
        <p className="mt-6 text-sm text-stone-700">{t('progress.hardWords.empty')}</p>
      )}

      {!loading && words.length > 0 && (
        <ol className="mt-6 divide-y divide-stone-200">
          {words.map((item) => (
            <li key={item.word} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="font-medium text-stone-900">{item.word}</p>
                <p className="truncate text-sm text-stone-700">{meaningByWord.get(item.word) ?? ''}</p>
              </div>
              <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-medium tabular-nums text-red-900">
                {t('progress.hardWords.misses', { count: item.misses })}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
