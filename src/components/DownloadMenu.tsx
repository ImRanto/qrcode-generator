import React, { useState } from 'react';
import { Download, Check, Copy, Share2 } from 'lucide-react';
import type { QRType } from '../utils/qrFormatters';
import { exportPNG, exportSVG, exportPDF, sanitizeFilename, getQRPngFile } from '../utils/qrExporter';
import { useTranslation } from '../i18n/useTranslation';

interface DownloadMenuProps {
  qrText: string;
  fgColor: string;
  bgColor: string;
  selectedType?: QRType;
  disabled?: boolean;
}

type ExportFormat = 'png' | 'svg' | 'pdf';

export const DownloadMenu: React.FC<DownloadMenuProps> = ({
  qrText,
  fgColor,
  bgColor,
  selectedType,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [rawFilename, setRawFilename] = useState('mon-qr-code');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Quick Action States
  const [copied, setCopied] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const previewFinalName = sanitizeFilename(rawFilename, selectedFormat);

  const handleCopy = async () => {
    if (!qrText || disabled) return;
    try {
      await navigator.clipboard.writeText(qrText);
      setCopied(true);
      setFeedbackMsg(t('copiedPayload'));
      setTimeout(() => {
        setCopied(false);
        setFeedbackMsg(null);
      }, 2500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const handleShare = async () => {
    if (!qrText || disabled) return;

    try {
      const shareTitle = rawFilename.trim() || 'QR Code';
      if (navigator.share) {
        let fileToShare: File | null = null;
        try {
          fileToShare = await getQRPngFile(qrText, fgColor, bgColor, rawFilename);
        } catch {
          fileToShare = null;
        }

        const shareData: ShareData = {
          title: shareTitle,
          text: qrText,
        };

        if (fileToShare && navigator.canShare && navigator.canShare({ files: [fileToShare] })) {
          shareData.files = [fileToShare];
        }

        await navigator.share(shareData);
        setFeedbackMsg(t('sharedSuccess'));
        setTimeout(() => setFeedbackMsg(null), 2500);
      } else {
        // Fallback for browsers without Web Share API
        await navigator.clipboard.writeText(qrText);
        setFeedbackMsg(t('shareFallbackDesc'));
        setTimeout(() => setFeedbackMsg(null), 3500);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed', err);
      }
    }
  };

  const handleDownload = async () => {
    if (!qrText || disabled || isExporting) return;
    setIsExporting(true);

    try {
      if (selectedFormat === 'png') {
        await exportPNG(qrText, fgColor, bgColor, rawFilename);
      } else if (selectedFormat === 'svg') {
        await exportSVG(qrText, fgColor, bgColor, rawFilename);
      } else if (selectedFormat === 'pdf') {
        await exportPDF(qrText, fgColor, bgColor, selectedType, rawFilename);
      }

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error(`Export ${selectedFormat} error:`, err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-sm mt-5 space-y-4">
      {/* Quick Actions Bar [ Copy ] [ Share ] [ Download ] */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          disabled={disabled || !qrText}
          onClick={handleCopy}
          aria-label={t('copyBtn')}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? t('copiedPayload') : t('copyBtn')}</span>
        </button>

        <button
          type="button"
          disabled={disabled || !qrText}
          onClick={handleShare}
          aria-label={t('shareBtn')}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t('shareBtn')}</span>
        </button>

        <button
          type="button"
          disabled={disabled || isExporting || !qrText}
          onClick={handleDownload}
          aria-label={t('downloadBtn')}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-semibold transition-all cursor-pointer shadow-2xs disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t('downloadBtn')}</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {(downloadSuccess || feedbackMsg) && (
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200 text-xs font-medium flex items-center justify-center gap-2 animate-fadeIn text-center">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{feedbackMsg || t('downloadSuccess')}</span>
        </div>
      )}

      {/* Customizable Filename Field */}
      <div>
        <label
          htmlFor="export-filename-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
        >
          {t('filenameLabel')}
        </label>
        <input
          id="export-filename-input"
          type="text"
          value={rawFilename}
          onChange={(e) => setRawFilename(e.target.value)}
          placeholder={t('filenamePlaceholder')}
          className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
        />
      </div>

      {/* Format Selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
          Format
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['png', 'svg', 'pdf'] as ExportFormat[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setSelectedFormat(fmt)}
              aria-label={`Select format ${fmt.toUpperCase()}`}
              className={`py-1.5 text-xs font-semibold uppercase rounded-lg border transition-all cursor-pointer ${
                selectedFormat === fmt
                  ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Bonus UX: Live Sanitized Filename Preview & Hint */}
      <div className="space-y-1 text-center">
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
          {t('finalFilenameLabel')} <span className="font-semibold text-slate-800 dark:text-slate-200">{previewFinalName}</span>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
          {t('filenameHint')}
        </p>
      </div>

      {/* Main Download Button */}
      <button
        type="button"
        disabled={disabled || isExporting}
        onClick={handleDownload}
        aria-label={
          selectedFormat === 'png'
            ? t('downloadPngBtn')
            : selectedFormat === 'svg'
            ? t('downloadSvgBtn')
            : t('downloadPdfBtn')
        }
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] text-white dark:text-slate-900 font-medium text-sm shadow-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4" />
        <span>
          {selectedFormat === 'png'
            ? t('downloadPngBtn')
            : selectedFormat === 'svg'
            ? t('downloadSvgBtn')
            : t('downloadPdfBtn')}
        </span>
      </button>
    </div>
  );
};
