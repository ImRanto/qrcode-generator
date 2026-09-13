import React from 'react';
import type { QRTemplate } from '../types/template';
import { TEMPLATES_LIST } from '../types/template';
import { useTranslation } from '../i18n/useTranslation';
import {
  Globe,
  Wifi,
  UserCheck,
  Calendar,
  Share2,
  Utensils,
  Sparkles,
} from 'lucide-react';

interface QRTemplatesProps {
  onSelectTemplate: (template: QRTemplate) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-4 h-4" />,
  Wifi: <Wifi className="w-4 h-4" />,
  UserCheck: <UserCheck className="w-4 h-4" />,
  CalendarEvent: <Calendar className="w-4 h-4" />,
  Share2: <Share2 className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
};

export const QRTemplates: React.FC<QRTemplatesProps> = ({ onSelectTemplate }) => {
  const { t } = useTranslation();

  return (
    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('needInspirationTitle')}
          </h2>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">
          {t('needInspirationDesc')}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {TEMPLATES_LIST.map((tpl) => {
          const icon = ICON_MAP[tpl.iconName] || <Globe className="w-4 h-4" />;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl)}
              className="group flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-left transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-colors shrink-0 shadow-2xs">
                {icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t(tpl.titleKey)}
                </h3>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
