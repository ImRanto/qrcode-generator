import React from 'react';
import type { SmsData } from '../../utils/qrFormatters';
import { useTranslation } from '../../i18n/useTranslation';

interface SmsFormProps {
  data: SmsData;
  onChange: (updated: SmsData) => void;
}

export const SmsForm: React.FC<SmsFormProps> = ({ data, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="sms-phone"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          {t('smsPhoneLabel')}
        </label>
        <input
          id="sms-phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
          placeholder={t('smsPhonePlaceholder')}
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
        />
      </div>

      <div>
        <label
          htmlFor="sms-message"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          {t('smsMessageLabel')}
        </label>
        <textarea
          id="sms-message"
          rows={3}
          value={data.message}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          placeholder={t('smsMessagePlaceholder')}
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 resize-none"
        />
      </div>
    </div>
  );
};
