import { useEffect, useState } from 'react';
import { useAuth } from '@/auth/useAuth';
import { fetchPracticeSessions, type PracticeSession } from '@/data/practiceSessions';

export function usePracticeSessions() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSessions([]);
    setError(false);
    if (!userId) return;

    let active = true;
    setLoading(true);
    fetchPracticeSessions()
      .then((rows) => {
        if (active) setSessions(rows);
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

  return { sessions, loading, error };
}
