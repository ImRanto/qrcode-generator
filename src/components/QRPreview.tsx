import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Check, Copy, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import type { QRSize } from './QRCustomization';
import type { QRType } from '../utils/qrFormatters';
import { analyzeQRParameters } from '../utils/contrastValidator';
import { DownloadMenu } from './DownloadMenu';
import { useTranslation } from '../i18n/useTranslation';

interface QRPreviewProps {
  qrText: string;
  fgColor: string;
  bgColor: string;
  size: QRSize;
  selectedType?: QRType;
}

const SIZE_MAP: Record<QRSize, number> = {
  Small: 200,
  Medium: 280,
  Large: 360,
};

export const QRPreview: React.FC<QRPreviewProps> = ({
  qrText,
  fgColor,
  bgColor,
  size,
  selectedType,
}) => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [genError, setGenError] = useState<string | null>(null);

  const numericSize = SIZE_MAP[size];

  useEffect(() => {
    if (!qrText || qrText.trim() === '') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(
      canvas,
      qrText,
      {
        width: numericSize,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: 'M',
      },
      (err) => {
        if (err) {
          console.error('QR code generation error:', err);
          setGenError('Failed to generate QR code for this input.');
        } else {
          setGenError(null);
        }
      }
    );
  }, [qrText, fgColor, bgColor, numericSize]);

  const handleCopyText = async () => {
    if (!qrText) return;
    try {
      await navigator.clipboard.writeText(qrText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  const hasQR = Boolean(qrText && qrText.trim().length > 0 && !genError);
  const diagnostics = analyzeQRParameters(fgColor, bgColor, qrText || '');

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-xs transition-all relative">
      {/* Real-Time Live Preview Header Badge */}
      <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('livePreviewBadge')}</span>
        </div>
        {hasQR && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
            {t('stepVerification')}
          </span>
        )}
      </div>

      {hasQR ? (
        <div className="flex flex-col items-center w-full animate-fadeIn">
          {/* QR Code Container with quiet zone padding */}
          <div
            className="p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center max-w-full overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto object-contain transition-all"
            />
          </div>

          {/* Visual Validation / Contrast Diagnostics Banner */}
          <div className="mt-4 w-full max-w-sm space-y-2">
            {diagnostics.isContrastOptimal ? (
              <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{t('contrastOptimal')}</span>
              </div>
            ) : (
              <div className="flex items-start gap-1.5 px-3 py-2 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/70 text-amber-800 dark:text-amber-200 text-xs font-medium leading-tight">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <span>{t('contrastWeakWarning')}</span>
              </div>
            )}

            {diagnostics.isPayloadTooLong && (
              <div className="flex items-start gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium leading-tight">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500 mt-0.5" />
                <span>{t('payloadLengthWarning')}</span>
              </div>
            )}
          </div>

          {/* Text/URL Preview */}
          <div className="mt-3 w-full max-w-sm flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate mr-2">
              {qrText}
            </span>
            <button
              onClick={handleCopyText}
              title={copied ? t('copiedPayload') : t('copyPayload')}
              className="p-1 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Multi-Format Download Menu */}
          <DownloadMenu
            qrText={qrText}
            fgColor={fgColor}
            bgColor={bgColor}
            selectedType={selectedType}
          />
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 max-w-sm">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-4 border border-slate-200/60 dark:border-slate-700/50">
            <QrCode className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
            {t('emptyStateTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {genError || t('emptyStateSubtitle')}
          </p>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};
