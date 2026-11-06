import type { AuthError } from '@supabase/supabase-js';
import type { TranslationKey } from '@/i18n/translations';

export function authErrorKey(error: AuthError): TranslationKey {
  const message = error.message.toLowerCase();
  if (message.includes('invalid login credentials')) return 'auth.error.invalidCredentials';
  if (message.includes('email not confirmed')) return 'auth.error.notConfirmed';
  if (message.includes('already registered') || message.includes('already been registered')) {
    return 'auth.error.exists';
  }
  if (message.includes('password') && message.includes('characters')) return 'auth.error.weakPassword';
  if (message.includes('rate limit') || message.includes('too many')) return 'auth.error.rateLimit';
  if (message.includes('failed to fetch') || message.includes('network')) return 'auth.error.network';
  return 'auth.error.generic';
}
