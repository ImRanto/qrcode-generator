import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';

interface PhoneFormProps {
  phone: string;
  setPhone: (val: string) => void;
}

export const PhoneForm: React.FC<PhoneFormProps> = ({ phone, setPhone }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label
        htmlFor="phone-number"
        className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
      >
        {t('phoneNumberLabel')}
      </label>
      <input
        id="phone-number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t('phonePlaceholder')}
        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
      />
    </div>
  );
};
