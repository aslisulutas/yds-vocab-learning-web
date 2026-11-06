import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/auth/useAuth';
import { fetchWordProgress, removeWordProgress, saveWordProgress, type ProgressStatus } from '@/data/wordProgress';

export type WordStatus = ProgressStatus | 'new';

export function useWordProgress() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [statuses, setStatuses] = useState<Record<string, ProgressStatus>>({});
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    setStatuses({});
    setLoadError(false);
    if (!userId) return;

    let active = true;
    fetchWordProgress()
      .then((rows) => {
        if (active) setStatuses(rows);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const setStatus = useCallback(
    async (word: string, next: WordStatus) => {
      if (!userId) return;
      const previous = statuses[word];
      setSaveError(false);
      setStatuses((current) => {
        const copy = { ...current };
        if (next === 'new') delete copy[word];
        else copy[word] = next;
        return copy;
      });

      try {
        if (next === 'new') await removeWordProgress(word);
        else await saveWordProgress(word, next);
      } catch {
        setStatuses((current) => {
          const copy = { ...current };
          if (previous) copy[word] = previous;
          else delete copy[word];
          return copy;
        });
        setSaveError(true);
      }
    },
    [userId, statuses]
  );

  return { statuses, loadError, saveError, setStatus };
}
