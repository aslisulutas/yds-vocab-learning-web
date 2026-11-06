import { ArrowRight, Layers, Sparkles, Volume2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Flashcard } from '@/components/Flashcard';
import { vocabulary } from '@/data/words';
import { useLanguage } from '@/i18n/useLanguage';
import type { TranslationKey } from '@/i18n/translations';

interface HomePageProps {
  onStart: () => void;
}

const features: { icon: LucideIcon; title: TranslationKey; body: TranslationKey }[] = [
  { icon: Layers, title: 'home.feature.topics.title', body: 'home.feature.topics.body' },
  { icon: Sparkles, title: 'home.feature.cards.title', body: 'home.feature.cards.body' },
  { icon: Volume2, title: 'home.feature.audio.title', body: 'home.feature.audio.body' },
];

export function HomePage({ onStart }: HomePageProps) {
  const { t } = useLanguage();
  const sample = vocabulary[0];

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 md:grid-cols-2 md:pt-24">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-900">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            {t('home.badge')}
          </p>
          <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-stone-900 md:text-5xl">
            {t('home.title')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">{t('home.subtitle')}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={onStart}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-7 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              {t('home.start')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-7 py-3.5 text-base font-medium text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-100"
            >
              {t('home.browse')}
            </a>
          </div>
        </div>

        {sample && (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-stone-500">{t('home.sample')}</p>
            <div className="w-full max-w-md">
              <Flashcard word={sample} />
            </div>
          </div>
        )}
      </section>

      <section id="features" className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-stone-200 bg-stone-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-800 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-stone-900">{t(title)}</h2>
                <p className="mt-3 leading-relaxed text-stone-600">{t(body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
