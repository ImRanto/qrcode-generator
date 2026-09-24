import React, { useState } from 'react';
import type { HistoryItem } from '../types/history';
import {
  History,
  RotateCcw,
  Trash2,
  ShieldCheck,
  Calendar,
  Eye,
  X,
  Check
} from 'lucide-react';
import { exportPNG, exportSVG, exportPDF } from '../utils/qrExporter';
import { useTranslation } from '../i18n/useTranslation';

interface RecentQRCodesProps {
  history: HistoryItem[];
  onReuse: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const RecentQRCodes: React.FC<RecentQRCodesProps> = ({
  history,
  onReuse,
  onDelete,
  onClearAll,
}) => {
  const { t } = useTranslation();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [previewItem, setPreviewItem] = useState<HistoryItem | null>(null);

  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-xs transition-colors">
        <div className="inline-flex p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-3">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {t('noHistoryTitle')}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
          {t('noHistorySub')}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>{t('storedLocallyBadge')}</span>
        </div>
      </div>
    );
  }

  const handleDownloadQuick = async (item: HistoryItem, format: 'png' | 'svg' | 'pdf') => {
    try {
      if (format === 'png') {
        await exportPNG(item.payload, item.foregroundColor, item.backgroundColor, item.filename);
      } else if (format === 'svg') {
        await exportSVG(item.payload, item.foregroundColor, item.backgroundColor, item.filename);
      } else if (format === 'pdf') {
        const hideRawPayload = item.type === 'wifi' || item.type === 'contact';
        await exportPDF(item.payload, item.foregroundColor, item.backgroundColor, item.type, item.filename, item.designOptions, hideRawPayload);
      }
    } catch (err) {
      console.error('Quick download failed', err);
    }
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-colors space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {t('historyTitle')}
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            {history.length} / 20
          </span>
        </div>

        {/* Clear All action */}
        {showClearConfirm ? (
          <div className="flex items-center gap-1.5 animate-in fade-in duration-200">
            <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">{t('confirmClearAll')}</span>
            <button
              type="button"
              onClick={() => {
                onClearAll();
                setShowClearConfirm(false);
              }}
              aria-label={t('confirmYes')}
              className="p-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-2 flex items-center gap-1 transition-colors cursor-pointer"
              title="Confirm clear history"
            >
              <Check className="w-3.5 h-3.5" />
              {t('confirmYes')}
            </button>
            <button
              type="button"
              onClick={() => setShowClearConfirm(false)}
              aria-label="Cancel"
              className="p-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium px-2 transition-colors cursor-pointer"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            aria-label={t('clearHistoryBtn')}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {t('clearHistoryBtn')}
          </button>
        )}
      </div>

      {/* List of items */}
      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
        {history.map((item) => (
          <div
            key={item.id}
            className="group relative p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => setPreviewItem(item)}
                aria-label={`Preview ${item.title || item.filename}`}
                className="shrink-0 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs hover:scale-105 transition-transform cursor-pointer relative group/thumb"
                title="Click to view large preview"
              >
                <img
                  src={item.dataUrl}
                  alt={item.title}
                  className="w-12 h-12 object-contain rounded-xs"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Content Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="uppercase text-[10px] tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300">
                    {item.type}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {item.title || item.filename}
                </h4>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-mono">
                  {item.payload}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between gap-1">
              {/* Reuse button */}
              <button
                type="button"
                onClick={() => onReuse(item)}
                aria-label={`${t('reuseBtn')} ${item.title || item.filename}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                title="Reload this QR code into the editor"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('reuseBtn')}</span>
              </button>

              {/* Download dropdown / buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleDownloadQuick(item, 'png')}
                  aria-label={`Download PNG ${item.title || item.filename}`}
                  className="px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Download PNG"
                >
                  PNG
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadQuick(item, 'svg')}
                  aria-label={`Download SVG ${item.title || item.filename}`}
                  className="px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Download SVG"
                >
                  SVG
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadQuick(item, 'pdf')}
                  aria-label={`Download PDF ${item.title || item.filename}`}
                  className="px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Download PDF"
                >
                  PDF
                </button>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  aria-label={`${t('deleteBtn')} ${item.title || item.filename}`}
                  className="p-1 rounded-md text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors ml-1 cursor-pointer"
                  title="Delete from history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Privacy Banner */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
          <span className="text-[11px]">{t('storedLocallyBadge')}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">{t('clientSideOnly')}</span>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="uppercase text-[10px] tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {previewItem.type}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate max-w-[180px]">
                  {previewItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                aria-label="Close modal"
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Image Box */}
            <div
              className="p-6 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-inner"
              style={{ backgroundColor: previewItem.backgroundColor }}
            >
              <img
                src={previewItem.dataUrl}
                alt={previewItem.title}
                className="w-48 h-48 object-contain"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{t('payloadLabel')}</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800 break-all max-h-24 overflow-y-auto">
                {previewItem.payload}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onReuse(previewItem);
                  setPreviewItem(null);
                }}
                aria-label={t('reuseInEditorBtn')}
                className="flex-1 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t('reuseInEditorBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
