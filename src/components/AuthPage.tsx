import { useState, type FormEvent } from 'react';
import { BookOpen, Loader2, MailCheck } from 'lucide-react';
import type { AuthError } from '@supabase/supabase-js';
import { authErrorKey } from '@/auth/authErrors';
import { useAuth } from '@/auth/useAuth';
import { useLanguage } from '@/i18n/useLanguage';
import type { TranslationKey } from '@/i18n/translations';

type AuthMode = 'signin' | 'signup' | 'forgot' | 'verify';

interface AuthPageProps {
  onDone: () => void;
}

const inputClass =
  'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 transition-colors focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200';

const titleKeys: Record<AuthMode | 'recovery', TranslationKey> = {
  signin: 'auth.signin.title',
  signup: 'auth.signup.title',
  forgot: 'auth.forgot.title',
  recovery: 'auth.recovery.title',
  verify: 'auth.verify.title',
};

const subtitleKeys: Record<AuthMode | 'recovery', TranslationKey | null> = {
  signin: 'auth.signin.subtitle',
  signup: 'auth.signup.subtitle',
  forgot: 'auth.forgot.subtitle',
  recovery: 'auth.recovery.subtitle',
  verify: null,
};

const submitKeys: Record<AuthMode | 'recovery', TranslationKey> = {
  signin: 'auth.submit.signin',
  signup: 'auth.submit.signup',
  forgot: 'auth.submit.forgot',
  recovery: 'auth.submit.recovery',
  verify: 'auth.submit.signin',
};

const linkClass =
  'text-sm font-medium text-teal-800 underline-offset-4 transition-colors hover:text-teal-950 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded';

export function AuthPage({ onDone }: AuthPageProps) {
  const { t } = useLanguage();
  const { recoveryPending, signIn, signUp, requestPasswordReset, updatePassword, resendVerification } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<TranslationKey | null>(null);
  const [noticeKey, setNoticeKey] = useState<TranslationKey | null>(null);

  const isRecovery = recoveryPending;
  const activeMode = isRecovery ? 'recovery' : mode;

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setErrorKey(null);
    setNoticeKey(null);
  };

  const showError = (error: AuthError) => {
    setErrorKey(authErrorKey(error));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorKey(null);
    setNoticeKey(null);
    const trimmedEmail = email.trim();

    if (activeMode === 'signin') {
      const error = await signIn(trimmedEmail, password);
      setSubmitting(false);
      if (error) showError(error);
      else onDone();
      return;
    }

    if (activeMode === 'signup') {
      const { error, needsVerification } = await signUp(trimmedEmail, password);
      setSubmitting(false);
      if (error) {
        showError(error);
        return;
      }
      if (needsVerification) {
        setPassword('');
        setMode('verify');
      } else {
        onDone();
      }
      return;
    }

    if (activeMode === 'forgot') {
      const error = await requestPasswordReset(trimmedEmail);
      setSubmitting(false);
      if (error) showError(error);
      else setNoticeKey('auth.forgot.sent');
      return;
    }

    if (activeMode === 'recovery') {
      const error = await updatePassword(password);
      setSubmitting(false);
      if (error) {
        showError(error);
      } else {
        setPassword('');
        onDone();
      }
    }
  };

  const handleResend = async () => {
    setSubmitting(true);
    setErrorKey(null);
    setNoticeKey(null);
    const error = await resendVerification(email.trim());
    setSubmitting(false);
    if (error) showError(error);
    else setNoticeKey('auth.verify.resent');
  };

  const titleKey = titleKeys[activeMode];
  const subtitleKey = subtitleKeys[activeMode];
  const submitKey = submitKeys[activeMode];

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-12 sm:px-6 md:py-20">
      <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700 text-white">
          {activeMode === 'verify' ? <MailCheck className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />}
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-stone-900">{t(titleKey)}</h1>
        {subtitleKey && <p className="mt-2 text-sm leading-relaxed text-stone-600">{t(subtitleKey)}</p>}

        {activeMode === 'verify' ? (
          <div className="mt-8 space-y-6">
            <p className="leading-relaxed text-stone-700">{t('auth.verify.body', { email: email.trim() })}</p>
            <p className="text-sm leading-relaxed text-stone-600">{t('auth.verify.spam')}</p>
            {noticeKey && <Notice text={t(noticeKey)} />}
            {errorKey && <ErrorText text={t(errorKey)} />}
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleResend}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition-colors hover:border-teal-600 hover:text-teal-800 disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {t('auth.verify.resend')}
              </button>
              <button type="button" onClick={() => switchMode('signin')} className={`${linkClass} self-center`}>
                {t('auth.link.back')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {activeMode !== 'recovery' && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">{t('auth.email')}</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                />
              </label>
            )}

            {activeMode !== 'forgot' && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">
                  {activeMode === 'recovery' ? t('auth.password.new') : t('auth.password')}
                </span>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete={activeMode === 'signin' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                />
                {(activeMode === 'signup' || activeMode === 'recovery') && (
                  <span className="mt-2 block text-xs text-stone-500">{t('auth.password.hint')}</span>
                )}
              </label>
            )}

            {activeMode === 'signin' && (
              <div className="flex justify-end">
                <button type="button" onClick={() => switchMode('forgot')} className={linkClass}>
                  {t('auth.link.forgot')}
                </button>
              </div>
            )}

            {noticeKey && <Notice text={t(noticeKey)} />}
            {errorKey && <ErrorText text={t(errorKey)} />}
            {errorKey === 'auth.error.notConfirmed' && (
              <button
                type="button"
                onClick={handleResend}
                disabled={submitting || !email.trim()}
                className={linkClass}
              >
                {t('auth.verify.resend')}
              </button>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? t('auth.submit.busy') : t(submitKey)}
            </button>

            {activeMode === 'signin' && (
              <p className="text-center text-sm text-stone-600">
                <button type="button" onClick={() => switchMode('signup')} className={linkClass}>
                  {t('auth.link.toSignup')}
                </button>
              </p>
            )}
            {activeMode === 'signup' && (
              <p className="text-center text-sm text-stone-600">
                <button type="button" onClick={() => switchMode('signin')} className={linkClass}>
                  {t('auth.link.toSignin')}
                </button>
              </p>
            )}
            {activeMode === 'forgot' && (
              <p className="text-center text-sm text-stone-600">
                <button type="button" onClick={() => switchMode('signin')} className={linkClass}>
                  {t('auth.link.back')}
                </button>
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      {text}
    </p>
  );
}

function Notice({ text }: { text: string }) {
  return (
    <p role="status" className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
      {text}
    </p>
  );
}
