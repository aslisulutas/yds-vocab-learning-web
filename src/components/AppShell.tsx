import { useState } from 'react';
import { AuthPage } from '@/components/AuthPage';
import { Header, type View } from '@/components/Header';
import { HomePage } from '@/components/HomePage';
import { WordLibrary } from '@/components/WordLibrary';
import { PracticePage } from '@/components/practice/PracticePage';
import { ProgressPage } from '@/components/ProgressPage';
import { useAuth } from '@/auth/useAuth';

export function AppShell() {
  const [view, setView] = useState<View>('home');
  const { recoveryPending } = useAuth();
  const showAuth = recoveryPending || view === 'auth';

  let content;
  if (showAuth) {
    content = <AuthPage onDone={() => setView('words')} />;
  } else if (view === 'home') {
    content = <HomePage onStart={() => setView('words')} />;
  } else if (view === 'words') {
    content = <WordLibrary onRequestSignIn={() => setView('auth')} />;
  } else if (view === 'practice') {
    content = (
      <PracticePage onRequestSignIn={() => setView('auth')} onViewProgress={() => setView('progress')} />
    );
  } else {
    content = <ProgressPage onRequestSignIn={() => setView('auth')} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <Header view={view} onNavigate={setView} />
      <main>{content}</main>
    </div>
  );
}
