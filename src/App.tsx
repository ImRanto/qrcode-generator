import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QRGenerator } from './components/QRGenerator';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Download, X } from 'lucide-react';
import { useTranslation } from './i18n/useTranslation';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function App() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* PWA Install Prompt Banner */}
      {deferredPrompt && showInstallBanner && (
        <div className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-2.5 shadow-md">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{t('pwaInstallTitle')}:</span>
              <span className="opacity-80 hidden sm:inline">{t('pwaInstallDesc')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallApp}
                className="px-3 py-1 bg-white text-slate-900 dark:bg-slate-900 dark:text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('pwaInstallBtn')}</span>
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
                title={t('pwaDismissBtn')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-5xl w-full mx-auto py-6">
        <Hero />
        <QRGenerator />
        <Features />
      </main>

      <Footer />
    </div>
  );
}

export default App;
