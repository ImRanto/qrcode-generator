import React from 'react';
import type { QRType } from '../utils/qrFormatters';
import {
  Globe,
  FileText,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  User,
  MapPin
} from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const { t } = useTranslation();

  const types: { id: QRType; labelKey: any; icon: React.ReactNode }[] = [
    { id: 'website', labelKey: 'typeWebsite', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'text', labelKey: 'typeText', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'wifi', labelKey: 'typeWifi', icon: <Wifi className="w-3.5 h-3.5" /> },
    { id: 'email', labelKey: 'typeEmail', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'phone', labelKey: 'typePhone', icon: <Phone className="w-3.5 h-3.5" /> },
    { id: 'sms', labelKey: 'typeSms', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'contact', labelKey: 'typeContact', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'location', labelKey: 'typeLocation', icon: <MapPin className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        {t('selectTypeLabel')}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {types.map((type) => {
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onSelectType(type.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-2xs font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className={isSelected ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}>
                {type.icon}
              </span>
              <span className="truncate">{t(type.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
