import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { FlashcardViewer } from '@/components/FlashcardViewer';
import { topicIds, topicLabelKeys, vocabulary, type TopicId } from '@/data/words';
import { useWordProgress, type WordStatus } from '@/data/useWordProgress';
import { useAuth } from '@/auth/useAuth';
import { useLanguage } from '@/i18n/useLanguage';

type TopicFilter = TopicId | 'all';

interface WordLibraryProps {
  onRequestSignIn: () => void;
}

const statusChipClass: Record<Exclude<WordStatus, 'new'>, string> = {
  learning: 'bg-amber-100 text-amber-900',
  learned: 'bg-emerald-100 text-emerald-900',
};

export function WordLibrary({ onRequestSignIn }: WordLibraryProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { statuses, loadError, saveError, setStatus } = useWordProgress();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<TopicFilter>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return vocabulary.filter((item) => {
      if (topic !== 'all' && item.topic !== topic) return false;
      if (!needle) return true;
      return item.word.toLowerCase().includes(needle) || item.meaning.toLowerCase().includes(needle);
    });
  }, [query, topic]);

  const filters: TopicFilter[] = ['all', ...topicIds];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">{t('words.title')}</h1>
        <p className="mt-3 text-lg leading-relaxed text-stone-600">{t('words.subtitle')}</p>
      </div>

      {loadError && (
        <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {t('progress.loadError')}
        </p>
      )}

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative flex w-full items-center md:max-w-sm">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-stone-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('words.search')}
            className="w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-11 text-sm text-stone-900 placeholder:text-stone-500 transition-colors focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
          {query && (
            <button
              type="button"
              aria-label={t('words.clear')}
              onClick={() => setQuery('')}
              className="absolute right-3 rounded-full p-1 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        <div className="flex flex-wrap gap-2" role="group" aria-label={t('words.title')}>
          {filters.map((id) => {
            const active = topic === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setTopic(id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                  active
                    ? 'border-teal-700 bg-teal-700 text-white shadow-sm'
                    : 'border-stone-300 bg-white text-stone-700 hover:border-teal-600 hover:text-teal-800'
                }`}
              >
                {id === 'all' ? t('words.filter.all') : t(topicLabelKeys[id])}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-8 text-sm font-medium text-stone-500">{t('words.count', { count: filtered.length })}</p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center text-stone-600">
          {t('words.empty')}
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => {
            const status = statuses[item.word];
            return (
              <li key={item.word}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group flex h-full w-full flex-col rounded-2xl border border-stone-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                      {t(topicLabelKeys[item.topic])}
                    </span>
                    {status && (
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusChipClass[status]}`}>
                        {t(status === 'learned' ? 'progress.status.learned' : 'progress.status.learning')}
                      </span>
                    )}
                  </span>
                  <span className="mt-3 text-2xl font-semibold text-stone-900">{item.word}</span>
                  <span className="mt-2 text-base text-stone-600">{item.meaning}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {activeIndex !== null && (
        <FlashcardViewer
          words={filtered}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
          statuses={statuses}
          signedIn={user !== null}
          saveError={saveError}
          onStatusChange={setStatus}
          onRequestSignIn={onRequestSignIn}
        />
      )}
    </section>
  );
}
