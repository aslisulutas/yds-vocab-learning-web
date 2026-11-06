import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, X } from 'lucide-react';
import { Flashcard } from '@/components/Flashcard';
import { WordStatusControl } from '@/components/WordStatusControl';
import type { VocabularyWord } from '@/data/words';
import type { WordStatus } from '@/data/useWordProgress';
import { useLanguage } from '@/i18n/useLanguage';
import type { ProgressStatus } from '@/data/wordProgress';

interface FlashcardViewerProps {
  words: VocabularyWord[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  statuses: Record<string, ProgressStatus>;
  signedIn: boolean;
  saveError: boolean;
  onStatusChange: (word: string, status: WordStatus) => void;
  onRequestSignIn: () => void;
}

const navButtonClass =
  'inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 transition-all hover:border-teal-600 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600';

export function FlashcardViewer({
  words,
  index,
  onIndexChange,
  onClose,
  statuses,
  signedIn,
  saveError,
  onStatusChange,
  onRequestSignIn,
}: FlashcardViewerProps) {
  const { t } = useLanguage();
  const word = words[index];
  const hasPrev = index > 0;
  const hasNext = index < words.length - 1;
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && hasPrev) onIndexChange(index - 1);
      if (event.key === 'ArrowRight' && hasNext) onIndexChange(index + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, hasPrev, hasNext, onClose, onIndexChange]);

  if (!word) return null;

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-stone-50 p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-stone-600">
            {t('card.progress', { current: index + 1, total: words.length })}
          </span>
          <button
            type="button"
            aria-label={t('card.close')}
            onClick={onClose}
            className="rounded-full p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <Flashcard key={word.word} word={word} />
        </div>

        <div className="mt-6">
          <WordStatusControl
            status={statuses[word.word] ?? 'new'}
            signedIn={signedIn}
            saveError={saveError}
            onChange={(status) => onStatusChange(word.word, status)}
            onRequestSignIn={onRequestSignIn}
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            aria-label={t('card.prev')}
            disabled={!hasPrev}
            onClick={() => onIndexChange(index - 1)}
            className={navButtonClass}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={speak}
            disabled={!speechSupported}
            title={speechSupported ? t('card.speak') : t('card.speakUnsupported')}
            className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <Volume2 className="h-4 w-4" />
            {t('card.speak')}
          </button>
          <button
            type="button"
            aria-label={t('card.next')}
            disabled={!hasNext}
            onClick={() => onIndexChange(index + 1)}
            className={navButtonClass}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
