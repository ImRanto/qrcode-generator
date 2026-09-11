import React from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { ShieldCheck, MonitorCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="text-center py-6 sm:py-8 px-4 max-w-2xl mx-auto space-y-3">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
        {t('heroTitle')}
      </h1>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
        {t('heroSubtitle')}
      </p>

      {/* Explicit Client-Side Privacy Prompts */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
          <MonitorCheck className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
          <span>{t('browserGenerationPrivacy')}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
          <span>{t('deviceDataPrivacy')}</span>
        </div>
      </div>
    </section>
  );
};
