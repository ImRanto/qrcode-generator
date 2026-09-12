import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';

interface DynamicFormProps {
  name: string;
  setName: (val: string) => void;
  destinationUrl: string;
  setDestinationUrl: (val: string) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  name,
  setName,
  destinationUrl,
  setDestinationUrl,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="dynamic-qr-name-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          {t('dynamicNameLabel')}
        </label>
        <input
          id="dynamic-qr-name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('dynamicNamePlaceholder')}
          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
        />
      </div>

      <div>
        <label
          htmlFor="dynamic-qr-dest-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          {t('dynamicDestLabel')}
        </label>
        <input
          id="dynamic-qr-dest-input"
          type="text"
          value={destinationUrl}
          onChange={(e) => setDestinationUrl(e.target.value)}
          placeholder={t('websitePlaceholder')}
          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
        />
      </div>
    </div>
  );
};
