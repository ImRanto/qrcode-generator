import React, { useState } from 'react';
import { QRInput } from './QRInput';
import { QRCustomization } from './QRCustomization';
import type { QRSize } from './QRCustomization';
import { QRPreview } from './QRPreview';

const DEFAULT_FG = '#111827';
const DEFAULT_BG = '#FFFFFF';
const DEFAULT_SIZE: QRSize = 'Medium';

export const QRGenerator: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [qrText, setQrText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [fgColor, setFgColor] = useState<string>(DEFAULT_FG);
  const [bgColor, setBgColor] = useState<string>(DEFAULT_BG);
  const [size, setSize] = useState<QRSize>(DEFAULT_SIZE);

  const handleGenerate = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setError('Please enter a text or URL to generate a QR code.');
      setQrText('');
      return;
    }

    setError(null);
    setQrText(trimmed);
  };

  const handleReset = () => {
    setInputVal('');
    setQrText('');
    setError(null);
    setFgColor(DEFAULT_FG);
    setBgColor(DEFAULT_BG);
    setSize(DEFAULT_SIZE);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input and Customization */}
        <div className="lg:col-span-6 space-y-6 bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <QRInput
            inputVal={inputVal}
            setInputVal={setInputVal}
            error={error}
            setError={setError}
            onGenerate={handleGenerate}
          />

          <QRCustomization
            fgColor={fgColor}
            setFgColor={setFgColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            size={size}
            setSize={setSize}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-6 h-full min-h-[380px]">
          <QRPreview
            qrText={qrText}
            fgColor={fgColor}
            bgColor={bgColor}
            size={size}
          />
        </div>
      </div>
    </section>
  );
};
