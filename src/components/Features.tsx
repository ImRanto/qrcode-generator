import React from 'react';
import { Zap, ShieldCheck, Sparkles } from 'lucide-react';

export const Features: React.FC = () => {
  const items = [
    {
      icon: Zap,
      title: 'Fast',
      description: 'Instant generation in your browser with real-time updates.',
    },
    {
      icon: ShieldCheck,
      title: 'Private',
      description: 'No data leaves your device. Entirely client-side processing.',
    },
    {
      icon: Sparkles,
      title: 'Free',
      description: 'No subscriptions, sign-ups, or usage limits required.',
    },
  ];

  return (
    <section className="py-12 border-t border-slate-200/80 dark:border-slate-800/80 mt-12">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xs flex flex-col items-center text-center transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
