import React from 'react';
import type { ContactData } from '../../utils/qrFormatters';

interface ContactFormProps {
  data: ContactData;
  onChange: (updated: ContactData) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-first-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            First Name
          </label>
          <input
            id="contact-first-name"
            type="text"
            value={data.firstName}
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
            placeholder="John"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          />
        </div>

        <div>
          <label
            htmlFor="contact-last-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            Last Name
          </label>
          <input
            id="contact-last-name"
            type="text"
            value={data.lastName}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            placeholder="Doe"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-organization"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          Organization
        </label>
        <input
          id="contact-organization"
          type="text"
          value={data.organization}
          onChange={(e) => onChange({ ...data, organization: e.target.value })}
          placeholder="Acme Corp"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+1 234 567 8900"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-website"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          Website
        </label>
        <input
          id="contact-website"
          type="text"
          value={data.website}
          onChange={(e) => onChange({ ...data, website: e.target.value })}
          placeholder="https://example.com"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
        />
      </div>
    </div>
  );
};
