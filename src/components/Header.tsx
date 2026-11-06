import { BookOpen, Languages, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/auth/useAuth';
import { useLanguage } from '@/i18n/useLanguage';

export type View = 'home' | 'words' | 'auth';

interface HeaderProps {
  view: View;
  onNavigate: (view: View) => void;
}

export function Header({ view, onNavigate }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  const navItems: { id: View; label: string }[] = [
    { id: 'home', label: t('nav.home') },
    { id: 'words', label: t('nav.words') },
  ];

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 rounded-lg text-lg font-semibold tracking-tight text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white">
            <BookOpen className="h-4 w-4" />
          </span>
          {t('app.name')}
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 sm:px-4 ${
                    active ? 'bg-teal-100 text-teal-900' : 'text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {user ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-800 transition-all hover:border-teal-600 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t('auth.signout')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('auth')}
              aria-current={view === 'auth' ? 'page' : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">{t('auth.submit.signin')}</span>
            </button>
          )}

          <button
            type="button"
            aria-label={t('lang.label')}
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-800 transition-all hover:border-teal-600 hover:text-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{t('lang.toggle')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
