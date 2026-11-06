import { useLanguage } from '@/i18n/useLanguage';
import type { WordStatus } from '@/data/useWordProgress';

interface WordStatusControlProps {
  status: WordStatus;
  signedIn: boolean;
  saveError: boolean;
  onChange: (status: WordStatus) => void;
  onRequestSignIn: () => void;
}

const statusOptions: WordStatus[] = ['new', 'learning', 'learned'];

const statusLabelKeys = {
  new: 'progress.status.new',
  learning: 'progress.status.learning',
  learned: 'progress.status.learned',
} as const;

export function WordStatusControl({ status, signedIn, saveError, onChange, onRequestSignIn }: WordStatusControlProps) {
  const { t } = useLanguage();

  if (!signedIn) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-4 text-center">
        <p className="text-sm text-stone-600">{t('progress.signinPrompt')}</p>
        <button
          type="button"
          onClick={onRequestSignIn}
          className="rounded-full border border-teal-700 px-5 py-2 text-sm font-medium text-teal-800 transition-colors hover:bg-teal-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        >
          {t('auth.submit.signin')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-center text-sm font-medium text-stone-600">{t('progress.label')}</p>
      <div role="group" aria-label={t('progress.label')} className="grid grid-cols-3 gap-2 rounded-full bg-stone-200 p-1">
        {statusOptions.map((option) => {
          const active = status === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                active ? 'bg-white text-teal-900 shadow-sm' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {t(statusLabelKeys[option])}
            </button>
          );
        })}
      </div>
      {saveError && (
        <p role="alert" className="text-center text-sm text-red-700">
          {t('progress.saveError')}
        </p>
      )}
    </div>
  );
}
