import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="text-center pt-10 pb-6 px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 mb-4">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        100% Client-Side & Private
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-2xl mx-auto">
        Generate QR Codes Instantly
      </h1>
      <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
        Create clean, customizable QR codes from any text or URL in seconds.
      </p>
    </section>
  );
};
