import React from 'react';
import type { ContactData } from '../../utils/qrFormatters';
import { useTranslation } from '../../i18n/LanguageContext';

interface ContactFormProps {
  data: ContactData;
  onChange: (updated: ContactData) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ data, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-first-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            {t('contactFirstNameLabel')}
          </label>
          <input
            id="contact-first-name"
            type="text"
            value={data.firstName}
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
            placeholder={t('contactFirstNamePlaceholder')}
            className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          />
        </div>

        <div>
          <label
            htmlFor="contact-last-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            {t('contactLastNameLabel')}
          </label>
          <input
            id="contact-last-name"
            type="text"
            value={data.lastName}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            placeholder={t('contactLastNamePlaceholder')}
            className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-org"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          {t('contactOrgLabel')}
        </label>
        <input
          id="contact-org"
          type="text"
          value={data.organization}
          onChange={(e) => onChange({ ...data, organization: e.target.value })}
          placeholder={t('contactOrgPlaceholder')}
          className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            {t('contactPhoneLabel')}
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder={t('phonePlaceholder')}
            className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            {t('contactEmailLabel')}
          </label>
          <input
            id="contact-email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder={t('emailAddressPlaceholder')}
            className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-website"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          {t('contactWebsiteLabel')}
        </label>
        <input
          id="contact-website"
          type="text"
          value={data.website}
          onChange={(e) => onChange({ ...data, website: e.target.value })}
          placeholder={t('websitePlaceholder')}
          className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
        />
      </div>
    </div>
  );
};
