import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-8 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs text-center transition-colors">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:text-left gap-1">
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">QR Generator</span>
          <span>Simple QR code generation, entirely in your browser.</span>
        </div>
        <div className="flex flex-col sm:text-right gap-1">
          <span>© 2026 QR Generator</span>
          <span className="text-slate-400 dark:text-slate-500">Made with React & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
