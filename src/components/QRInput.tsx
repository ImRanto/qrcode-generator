import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface QRInputProps {
  inputVal: string;
  setInputVal: (val: string) => void;
  error: string | null;
  setError: (err: string | null) => void;
  onGenerate: () => void;
}

export const QRInput: React.FC<QRInputProps> = ({
  inputVal,
  setInputVal,
  error,
  setError,
  onGenerate,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    if (error && e.target.value.trim() !== '') {
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="qr-text-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          Text or URL
        </label>
        <div className="relative">
          <input
            id="qr-text-input"
            type="text"
            value={inputVal}
            onChange={handleChange}
            placeholder="https://example.com"
            className={`w-full px-4 py-3 text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:ring-2 ${
              error
                ? 'border-red-500 focus:ring-red-500/20'
                : 'border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-600 focus:ring-slate-900/10 dark:focus:ring-white/10'
            }`}
          />
        </div>
        {error && (
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-red-600 dark:text-red-400">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] text-white dark:text-slate-900 font-medium text-sm shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20"
      >
        <Sparkles className="w-4 h-4" />
        <span>Generate QR Code</span>
      </button>
    </form>
  );
};
