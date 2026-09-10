import React from 'react';
import {
  Globe,
  FileText,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  User,
  MapPin,
} from 'lucide-react';
import type { QRType } from '../utils/qrFormatters';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

interface TypeOption {
  id: QRType;
  label: string;
  icon: React.ElementType;
}

const TYPE_OPTIONS: TypeOption[] = [
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'text', label: 'Text', icon: FileText },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'contact', label: 'Contact', icon: User },
  { id: 'location', label: 'Location', icon: MapPin },
];

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        What do you want to create?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TYPE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedType === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectType(opt.id)}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="truncate">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
