import React from 'react';

interface TextFormProps {
  text: string;
  setText: (val: string) => void;
}

export const TextForm: React.FC<TextFormProps> = ({ text, setText }) => {
  return (
    <div>
      <label
        htmlFor="plain-text"
        className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
      >
        Your Text
      </label>
      <textarea
        id="plain-text"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter any text or note..."
        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 resize-y"
      />
    </div>
  );
};
