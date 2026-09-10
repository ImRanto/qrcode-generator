import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, Check, FileImage, FileCode, FileText } from 'lucide-react';
import type { QRType } from '../utils/qrFormatters';
import { exportPNG, exportSVG, exportPDF } from '../utils/qrExporter';

interface DownloadMenuProps {
  qrText: string;
  fgColor: string;
  bgColor: string;
  selectedType?: QRType;
  disabled?: boolean;
}

export const DownloadMenu: React.FC<DownloadMenuProps> = ({
  qrText,
  fgColor,
  bgColor,
  selectedType,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerDownload = async (format: 'png' | 'svg' | 'pdf') => {
    if (!qrText || disabled || isExporting) return;
    setIsExporting(true);
    setIsOpen(false);

    try {
      if (format === 'png') {
        await exportPNG(qrText, fgColor, bgColor);
      } else if (format === 'svg') {
        await exportSVG(qrText, fgColor, bgColor);
      } else if (format === 'pdf') {
        await exportPDF(qrText, fgColor, bgColor, selectedType);
      }

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error(`Export ${format} error:`, err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm mt-5" ref={menuRef}>
      {/* Feedback Toast */}
      {downloadSuccess && (
        <div className="mb-2.5 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200 text-xs font-medium flex items-center justify-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Downloaded successfully</span>
        </div>
      )}

      {/* Main Download Button & Split / Dropdown Toggle */}
      <div className="relative flex items-center w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs transition-all hover:bg-slate-800 dark:hover:bg-slate-100">
        <button
          type="button"
          disabled={disabled || isExporting}
          onClick={() => triggerDownload('png')}
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          <span>Download PNG</span>
        </button>

        <div className="w-[1px] h-6 bg-slate-700 dark:bg-slate-200 my-auto" />

        <button
          type="button"
          disabled={disabled || isExporting}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="More download options"
          className="px-3.5 py-3 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-r-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute right-0 left-0 bottom-full mb-2 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1.5 space-y-1 animate-fadeIn">
          <button
            type="button"
            onClick={() => triggerDownload('png')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
          >
            <FileImage className="w-4 h-4 text-slate-500" />
            <div className="flex flex-col">
              <span className="font-semibold">PNG</span>
              <span className="text-[10px] text-slate-400">High Resolution Image</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => triggerDownload('svg')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
          >
            <FileCode className="w-4 h-4 text-slate-500" />
            <div className="flex flex-col">
              <span className="font-semibold">SVG</span>
              <span className="text-[10px] text-slate-400">Vector Print Format</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => triggerDownload('pdf')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <div className="flex flex-col">
              <span className="font-semibold">PDF</span>
              <span className="text-[10px] text-slate-400">Printable Document</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
