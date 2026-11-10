import { useEffect, useState } from 'react';
import { useAuth } from '@/auth/useAuth';
import { fetchMissedWords, fetchPracticeSessions, type PracticeSession } from '@/data/practiceSessions';

export function usePracticeSessions() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [missedWords, setMissedWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSessions([]);
    setMissedWords([]);
    setError(false);
    if (!userId) return;

    let active = true;
    setLoading(true);
    Promise.all([fetchPracticeSessions(), fetchMissedWords()])
      .then(([rows, missed]) => {
        if (!active) return;
        setSessions(rows);
        setMissedWords(missed);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  return { sessions, missedWords, loading, error };
}
