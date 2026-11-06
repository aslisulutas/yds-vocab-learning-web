import { LanguageProvider } from '@/i18n/LanguageContext';
import { AuthProvider } from '@/auth/AuthContext';
import { AppShell } from '@/components/AppShell';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
