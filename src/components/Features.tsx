import React from 'react';
import { Zap, Shield, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 mt-4 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {t('featureFastTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {t('featureFastDesc')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {t('featurePrivateTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {t('featurePrivateDesc')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {t('featureFreeTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {t('featureFreeDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
