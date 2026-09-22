import React from 'react';
import { Palette, RefreshCw, LayoutTemplate, Eye, Shapes, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import type { TranslationKeys } from '../i18n/translations';

export type QRSize = 'Small' | 'Medium' | 'Large';
export type ModuleStyle = 'square' | 'rounded' | 'dots';
export type EyeStyle = 'square' | 'rounded' | 'circle';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type GradientType = 'none' | 'linear' | 'radial';

export interface QRDesignOptions {
  fgColor: string;
  bgColor: string;
  transparentBg: boolean;
  eyeColor: string;
  useCustomEyeColor: boolean;
  moduleStyle: ModuleStyle;
  eyeStyle: EyeStyle;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  gradientType: GradientType;
  gradientColor: string;
}

interface QRCustomizationProps {
  fgColor: string;
  setFgColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  size: QRSize;
  setSize: (size: QRSize) => void;
  designOptions: QRDesignOptions;
  setDesignOptions: React.Dispatch<React.SetStateAction<QRDesignOptions>>;
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
  designOptions,
  setDesignOptions,
  onReset,
}) => {
  const { t } = useTranslation();

  const presets = [
    {
      id: 'minimal',
      labelKey: 'presetMinimal' as TranslationKeys,
      apply: () => {
        setFgColor('#0F172A');
        setBgColor('#FFFFFF');
        setDesignOptions({
          fgColor: '#0F172A',
          bgColor: '#FFFFFF',
          transparentBg: false,
          eyeColor: '#0F172A',
          useCustomEyeColor: false,
          moduleStyle: 'square',
          eyeStyle: 'square',
          errorCorrectionLevel: 'M',
          margin: 2,
          gradientType: 'none',
          gradientColor: '#2563EB',
        });
      },
    },
    {
      id: 'business',
      labelKey: 'presetBusiness' as TranslationKeys,
      apply: () => {
        setFgColor('#1E3A8A');
        setBgColor('#F8FAFC');
        setDesignOptions({
          fgColor: '#1E3A8A',
          bgColor: '#F8FAFC',
          transparentBg: false,
          eyeColor: '#0284C7',
          useCustomEyeColor: true,
          moduleStyle: 'rounded',
          eyeStyle: 'rounded',
          errorCorrectionLevel: 'Q',
          margin: 2,
          gradientType: 'linear',
          gradientColor: '#0284C7',
        });
      },
    },
    {
      id: 'restaurant',
      labelKey: 'presetRestaurant' as TranslationKeys,
      apply: () => {
        setFgColor('#78350F');
        setBgColor('#FEF3C7');
        setDesignOptions({
          fgColor: '#78350F',
          bgColor: '#FEF3C7',
          transparentBg: false,
          eyeColor: '#B45309',
          useCustomEyeColor: true,
          moduleStyle: 'rounded',
          eyeStyle: 'rounded',
          errorCorrectionLevel: 'H',
          margin: 2,
          gradientType: 'none',
          gradientColor: '#B45309',
        });
      },
    },
    {
      id: 'wifi',
      labelKey: 'presetWifi' as TranslationKeys,
      apply: () => {
        setFgColor('#065F46');
        setBgColor('#ECFDF5');
        setDesignOptions({
          fgColor: '#065F46',
          bgColor: '#ECFDF5',
          transparentBg: false,
          eyeColor: '#059669',
          useCustomEyeColor: true,
          moduleStyle: 'dots',
          eyeStyle: 'circle',
          errorCorrectionLevel: 'M',
          margin: 2,
          gradientType: 'linear',
          gradientColor: '#10B981',
        });
      },
    },
    {
      id: 'social',
      labelKey: 'presetSocial' as TranslationKeys,
      apply: () => {
        setFgColor('#5B21B6');
        setBgColor('#FAF5FF');
        setDesignOptions({
          fgColor: '#5B21B6',
          bgColor: '#FAF5FF',
          transparentBg: false,
          eyeColor: '#DB2777',
          useCustomEyeColor: true,
          moduleStyle: 'dots',
          eyeStyle: 'rounded',
          errorCorrectionLevel: 'Q',
          margin: 2,
          gradientType: 'linear',
          gradientColor: '#E11D48',
        });
      },
    },
  ];

  return (
    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-6">
      {/* Presets Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <LayoutTemplate className="w-3.5 h-3.5 text-slate-500" />
          <span>{t('templatesTitle')}</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={p.apply}
              className="px-3 py-1.5 rounded-xl border text-xs font-medium bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shrink-0 transition-colors cursor-pointer"
            >
              {t(p.labelKey)}
            </button>
          ))}
        </div>
      </div>

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

      {/* Colors & Gradient Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* QR Primary Color */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
            {t('qrColorLabel')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => {
                setFgColor(e.target.value);
                setDesignOptions((prev) => ({ ...prev, fgColor: e.target.value }));
              }}
              aria-label={t('qrColorLabel')}
              className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent"
            />
            <div className="flex items-center gap-1">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setFgColor(color);
                    setDesignOptions((prev) => ({ ...prev, fgColor: color }));
                  }}
                  aria-label={`Select color ${color}`}
                  style={{ backgroundColor: color }}
                  className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                    fgColor === color
                      ? 'scale-110 border-slate-900 dark:border-white ring-2 ring-slate-900/20 dark:ring-white/20'
                      : 'border-transparent hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Background Color & Transparent Toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              {t('bgColorLabel')}
            </label>
            <label className="inline-flex items-center gap-1 text-[11px] text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={designOptions.transparentBg}
                onChange={(e) =>
                  setDesignOptions((prev) => ({ ...prev, transparentBg: e.target.checked }))
                }
                className="rounded text-slate-900 dark:text-white"
              />
              <span>{t('transparentBgLabel')}</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              disabled={designOptions.transparentBg}
              value={bgColor}
              onChange={(e) => {
                setBgColor(e.target.value);
                setDesignOptions((prev) => ({ ...prev, bgColor: e.target.value }));
              }}
              aria-label={t('bgColorLabel')}
              className={`w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent ${
                designOptions.transparentBg ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            />
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
              {designOptions.transparentBg ? 'Transparent' : bgColor}
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
              const labelKey: TranslationKeys = s === 'Small' ? 'sizeSmall' : s === 'Medium' ? 'sizeMedium' : 'sizeLarge';
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`flex-1 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    size === s
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gradient Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
            {t('gradientLabel')}
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
            {(['none', 'linear', 'radial'] as GradientType[]).map((gt) => {
              const labelKey: TranslationKeys =
                gt === 'none' ? 'gradientTypeNone' : gt === 'linear' ? 'gradientTypeLinear' : 'gradientTypeRadial';
              const isSelected = designOptions.gradientType === gt;
              return (
                <button
                  key={gt}
                  type="button"
                  onClick={() => setDesignOptions((prev) => ({ ...prev, gradientType: gt }))}
                  aria-pressed={isSelected}
                  className={`py-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        {designOptions.gradientType !== 'none' && (
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              {t('gradientColorLabel')}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={designOptions.gradientColor}
                onChange={(e) =>
                  setDesignOptions((prev) => ({ ...prev, gradientColor: e.target.value }))
                }
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent"
              />
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
                {designOptions.gradientColor}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Shapes & Modules & Eye Markers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        {/* Module Style */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Shapes className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('moduleStyleLabel')}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
            {(['square', 'rounded', 'dots'] as ModuleStyle[]).map((ms) => {
              const labelKey: TranslationKeys =
                ms === 'square' ? 'styleSquare' : ms === 'rounded' ? 'styleRounded' : 'styleDots';
              const isSelected = designOptions.moduleStyle === ms;
              return (
                <button
                  key={ms}
                  type="button"
                  onClick={() => setDesignOptions((prev) => ({ ...prev, moduleStyle: ms }))}
                  aria-pressed={isSelected}
                  className={`py-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Eye Style */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('eyeStyleLabel')}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
            {(['square', 'rounded', 'circle'] as EyeStyle[]).map((es) => {
              const labelKey: TranslationKeys =
                es === 'square' ? 'styleSquare' : es === 'rounded' ? 'styleRounded' : 'styleDots';
              const isSelected = designOptions.eyeStyle === es;
              return (
                <button
                  key={es}
                  type="button"
                  onClick={() => setDesignOptions((prev) => ({ ...prev, eyeStyle: es }))}
                  aria-pressed={isSelected}
                  className={`py-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Eye Color & EC Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        {/* Custom Eye Color Toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              {t('eyeColorLabel')}
            </label>
            <label className="inline-flex items-center gap-1 text-[11px] text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={designOptions.useCustomEyeColor}
                onChange={(e) =>
                  setDesignOptions((prev) => ({ ...prev, useCustomEyeColor: e.target.checked }))
                }
                className="rounded text-slate-900 dark:text-white"
              />
              <span>{t('customEyeColorLabel')}</span>
            </label>
          </div>
          {designOptions.useCustomEyeColor && (
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={designOptions.eyeColor}
                onChange={(e) =>
                  setDesignOptions((prev) => ({ ...prev, eyeColor: e.target.value }))
                }
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent"
              />
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
                {designOptions.eyeColor}
              </span>
            </div>
          )}
        </div>

        {/* Error Correction Level */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('ecLevelLabel')}</span>
          </div>
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
            {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((ec) => {
              const isSelected = designOptions.errorCorrectionLevel === ec;
              return (
                <button
                  key={ec}
                  type="button"
                  onClick={() => setDesignOptions((prev) => ({ ...prev, errorCorrectionLevel: ec }))}
                  aria-pressed={isSelected}
                  className={`py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {ec}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
