import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, Check, Copy } from 'lucide-react';
import type { QRSize } from './QRCustomization';

interface QRPreviewProps {
  qrText: string;
  fgColor: string;
  bgColor: string;
  size: QRSize;
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
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [genError, setGenError] = useState<string | null>(null);

  const numericSize = SIZE_MAP[size];

  useEffect(() => {
    if (!qrText || qrText.trim() === '') {
      setDownloadUrl(null);
      setGenError(null);
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
          setDownloadUrl(null);
        } else {
          setGenError(null);
          try {
            const dataUrl = canvas.toDataURL('image/png');
            setDownloadUrl(dataUrl);
          } catch (e) {
            console.error('Failed to convert canvas to Data URL:', e);
          }
        }
      }
    );
  }, [qrText, fgColor, bgColor, numericSize]);

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-xs transition-all">
      {hasQR ? (
        <div className="flex flex-col items-center w-full animate-fadeIn">
          {/* QR Code Container with white quiet zone padding */}
          <div
            className="p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center max-w-full overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto object-contain transition-all"
            />
          </div>

          {/* Text/URL Preview */}
          <div className="mt-5 w-full max-w-sm flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate mr-2">
              {qrText}
            </span>
            <button
              onClick={handleCopyText}
              title="Copy text to clipboard"
              className="p-1 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Download PNG Button */}
          <button
            onClick={handleDownload}
            disabled={!downloadUrl}
            className="mt-5 w-full max-w-sm inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] text-white dark:text-slate-900 font-medium text-sm shadow-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 max-w-sm">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-4 border border-slate-200/60 dark:border-slate-700/50">
            <QrCode className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1">
            Your QR code will appear here
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {genError || 'Enter some text or a URL to generate your QR code.'}
          </p>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};
