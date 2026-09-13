import React from 'react';
import type { QRType } from '../utils/qrFormatters';
import type { QRCategory } from '../types/template';
import { QR_TYPE_DEFINITIONS } from '../types/template';
import {
  Globe,
  FileText,
  User,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  MapPin,
  Link2,
  Users,
  Compass,
} from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface QRTypeSelectorProps {
  selectedType?: QRType;
  onSelectType: (type: QRType) => void;
  compact?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Wifi: <Wifi className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
};

const CATEGORIES: { id: QRCategory; titleKey: any; icon: React.ReactNode }[] = [
  { id: 'content', titleKey: 'categoryContent', icon: <Link2 className="w-4 h-4 text-indigo-500" /> },
  { id: 'communication', titleKey: 'categoryCommunication', icon: <Users className="w-4 h-4 text-emerald-500" /> },
  { id: 'practical', titleKey: 'categoryPractical', icon: <Compass className="w-4 h-4 text-amber-500" /> },
];

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({
  selectedType,
  onSelectType,
  compact = false,
}) => {
  const { t } = useTranslation();

  if (compact) {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {t('selectTypeLabel')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {QR_TYPE_DEFINITIONS.map((def) => {
            const isSelected = selectedType === def.id;
            const icon = ICON_MAP[def.iconName] || <Globe className="w-4 h-4" />;
            return (
              <button
                key={def.id}
                type="button"
                onClick={() => onSelectType(def.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs font-semibold'
                    : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                aria-pressed={isSelected}
              >
                <span className={isSelected ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}>
                  {icon}
                </span>
                <span className="truncate">{t(def.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {CATEGORIES.map((cat) => {
        const typesInCat = QR_TYPE_DEFINITIONS.filter((def) => def.category === cat.id);
        if (typesInCat.length === 0) return null;

        return (
          <div key={cat.id} className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200/60 dark:border-slate-800/60 pb-1.5">
              {cat.icon}
              <span>{t(cat.titleKey)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {typesInCat.map((def) => {
                const isSelected = selectedType === def.id;
                const icon = ICON_MAP[def.iconName] || <Globe className="w-5 h-5" />;

                return (
                  <button
                    key={def.id}
                    type="button"
                    onClick={() => onSelectType(def.id)}
                    className={`group relative flex flex-col justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-400 shadow-xs ring-1 ring-indigo-500/30'
                        : 'bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/60 dark:group-hover:text-indigo-300'
                        }`}
                      >
                        {icon}
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {t(def.labelKey)}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        {t(def.descKey)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
