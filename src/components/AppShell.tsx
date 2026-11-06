import { useState } from 'react';
import { AuthPage } from '@/components/AuthPage';
import { Header, type View } from '@/components/Header';
import { HomePage } from '@/components/HomePage';
import { WordLibrary } from '@/components/WordLibrary';
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
  } else {
    content = <WordLibrary onRequestSignIn={() => setView('auth')} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <Header view={view} onNavigate={setView} />
      <main>{content}</main>
    </div>
  );
}
