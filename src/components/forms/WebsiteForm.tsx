import React from 'react';

interface WebsiteFormProps {
  url: string;
  setUrl: (val: string) => void;
}

export const WebsiteForm: React.FC<WebsiteFormProps> = ({ url, setUrl }) => {
  return (
    <div>
      <label
        htmlFor="website-url"
        className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
      >
        Website URL
      </label>
      <input
        id="website-url"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
      />
    </div>
  );
};
