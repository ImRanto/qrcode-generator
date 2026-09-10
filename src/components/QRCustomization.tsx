import React from 'react';
import { RotateCcw, Palette, Maximize2 } from 'lucide-react';

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

const COLOR_PRESETS = [
  { name: 'Default Dark', fg: '#111827', bg: '#FFFFFF' },
  { name: 'Indigo', fg: '#3730A3', bg: '#EEF2FF' },
  { name: 'Forest', fg: '#064E3B', bg: '#ECFDF5' },
  { name: 'Charcoal Light', fg: '#1E293B', bg: '#F8FAFC' },
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
  return (
    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Customize Appearance
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Foreground Color */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            QR Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
            <span className="text-xs font-mono uppercase text-slate-700 dark:text-slate-300">
              {fgColor}
            </span>
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
            <span className="text-xs font-mono uppercase text-slate-700 dark:text-slate-300">
              {bgColor}
            </span>
          </div>
        </div>
      </div>

      {/* Preset Swatches */}
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1">
          <Palette className="w-3 h-3" /> Color Presets
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {COLOR_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setFgColor(preset.fg);
                setBgColor(preset.bg);
              }}
              title={preset.name}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer"
            >
              <span
                className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600"
                style={{ backgroundColor: preset.fg }}
              />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1">
          <Maximize2 className="w-3 h-3" /> Size
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Small', 'Medium', 'Large'] as QRSize[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                size === s
                  ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
