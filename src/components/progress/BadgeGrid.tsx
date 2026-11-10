import { Check, Lock } from 'lucide-react';
import type { TranslationKey } from '@/i18n/translations';
import { useLanguage } from '@/i18n/useLanguage';
import type { BadgeId } from '@/practice/stats';

interface BadgeGridProps {
  earned: Record<BadgeId, boolean>;
}

const BADGES: { id: BadgeId; titleKey: TranslationKey; bodyKey: TranslationKey }[] = [
  { id: 'first', titleKey: 'progress.badge.first.title', bodyKey: 'progress.badge.first.body' },
  { id: 'streak', titleKey: 'progress.badge.streak.title', bodyKey: 'progress.badge.streak.body' },
  { id: 'learned', titleKey: 'progress.badge.learned.title', bodyKey: 'progress.badge.learned.body' },
  { id: 'accuracy', titleKey: 'progress.badge.accuracy.title', bodyKey: 'progress.badge.accuracy.body' },
];

export function BadgeGrid({ earned }: BadgeGridProps) {
  const { t } = useLanguage();

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {BADGES.map((badge) => {
        const isEarned = earned[badge.id];
        return (
          <li
            key={badge.id}
            className={`flex items-start gap-4 rounded-2xl border p-4 ${
              isEarned ? 'border-teal-200 bg-teal-50' : 'border-stone-200 bg-stone-50'
            }`}
          >
            <span
              aria-hidden
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                isEarned ? 'bg-teal-700 text-white' : 'bg-stone-200 text-stone-600'
              }`}
            >
              {isEarned ? <Check className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
            </span>
            <div className="min-w-0">
              <p className="font-medium text-stone-900">{t(badge.titleKey)}</p>
              <p className="mt-1 text-sm leading-relaxed text-stone-700">{t(badge.bodyKey)}</p>
              <p className={`mt-2 text-xs font-medium ${isEarned ? 'text-teal-800' : 'text-stone-600'}`}>
                {t(isEarned ? 'progress.badge.earned' : 'progress.badge.locked')}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
