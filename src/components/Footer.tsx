import React from 'react';
import { QrCode } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900">
            <QrCode className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">
            {t('appTitle')}
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          {t('footerSub')}
        </p>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          {t('footerCopyright')}
        </p>
      </div>
    </footer>
  );
};
