import React from 'react';
import type { QRTemplate } from '../types/template';
import { TEMPLATES_LIST } from '../types/template';
import { useTranslation } from '../i18n/useTranslation';
import {
  Globe,
  Wifi,
  UserCheck,
  Mail,
  PhoneCall,
  MessageCircle,
  MapPin,
  Calendar,
  Share2,
  Utensils,
  LayoutGrid
} from 'lucide-react';

interface QRTemplatesProps {
  onSelectTemplate: (template: QRTemplate) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-4 h-4" />,
  Wifi: <Wifi className="w-4 h-4" />,
  UserCheck: <UserCheck className="w-4 h-4" />,
  Mail: <Mail className="w-4 h-4" />,
  PhoneCall: <PhoneCall className="w-4 h-4" />,
  MessageCircle: <MessageCircle className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  CalendarEvent: <Calendar className="w-4 h-4" />,
  Share2: <Share2 className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
};

export const QRTemplates: React.FC<QRTemplatesProps> = ({ onSelectTemplate }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        <LayoutGrid className="w-4 h-4 text-slate-500" />
        <h2>{t('startWithTemplate')}</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {TEMPLATES_LIST.map((tpl) => {
          const icon = ICON_MAP[tpl.iconName] || <Globe className="w-4 h-4" />;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl)}
              className="group flex flex-col items-start p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-left transition-all duration-200 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
            >
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors mb-2">
                {icon}
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                {t(tpl.titleKey)}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2 mt-0.5">
                {t(tpl.descKey)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
