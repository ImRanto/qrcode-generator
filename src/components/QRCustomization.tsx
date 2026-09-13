import React from 'react';
import { Palette, RefreshCw } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export type QRSize = 'Small' | 'Medium' | 'Large';

interface QRCustomizationProps {
  fgColor: string;
  setFgColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  size: QRSize;
  setSize: (size: QRSize) => void;
  onReset: () => void;
}

const PRESET_COLORS = [
  '#111827', // Slate Dark
  '#2563EB', // Blue
  '#059669', // Emerald
  '#7C3AED', // Violet
  '#DC2626', // Red
];

export const QRCustomization: React.FC<QRCustomizationProps> = ({
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  size,
  setSize,
  onReset,
}) => {
  const { t } = useTranslation();

  return (
    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Palette className="w-3.5 h-3.5 text-slate-500" />
          <span>{t('customizeTitle')}</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          aria-label={t('resetBtn')}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>{t('resetBtn')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* QR Color */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            {t('qrColorLabel')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <div className="flex items-center gap-1.5">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFgColor(color)}
                  aria-label={`Select color ${color}`}
                  style={{ backgroundColor: color }}
                  className={`w-6 h-6 rounded-full border transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    fgColor === color
                      ? 'scale-110 border-slate-900 dark:border-white ring-2 ring-indigo-500/50 shadow-xs'
                      : 'border-slate-200/50 dark:border-slate-700/50 hover:scale-105 hover:opacity-90'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Background Color */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
            {t('bgColorLabel')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent"
            />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
              {bgColor}
            </span>
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
            {t('sizeLabel')}
          </label>
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/80 dark:border-slate-700/80">
            {(['Small', 'Medium', 'Large'] as QRSize[]).map((s) => {
              const labelKey = s === 'Small' ? 'sizeSmall' : s === 'Medium' ? 'sizeMedium' : 'sizeLarge';
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`flex-1 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    size === s
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t(labelKey as any)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
