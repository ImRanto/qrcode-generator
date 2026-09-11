import React from 'react';
import type { WifiData } from '../../utils/qrFormatters';
import { useTranslation } from '../../i18n/LanguageContext';

interface WifiFormProps {
  data: WifiData;
  onChange: (updated: WifiData) => void;
}

export const WifiForm: React.FC<WifiFormProps> = ({ data, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="wifi-ssid"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          {t('wifiSsidLabel')}
        </label>
        <input
          id="wifi-ssid"
          type="text"
          value={data.ssid}
          onChange={(e) => onChange({ ...data, ssid: e.target.value })}
          placeholder={t('wifiSsidPlaceholder')}
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="wifi-security"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
          >
            {t('wifiSecurityLabel')}
          </label>
          <select
            id="wifi-security"
            value={data.security}
            onChange={(e) =>
              onChange({
                ...data,
                security: e.target.value as WifiData['security'],
              })
            }
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
          >
            <option value="WPA">{t('wifiSecWpa')}</option>
            <option value="WEP">{t('wifiSecWep')}</option>
            <option value="nopass">{t('wifiSecNone')}</option>
          </select>
        </div>

        {data.security !== 'nopass' && (
          <div>
            <label
              htmlFor="wifi-password"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
            >
              {t('wifiPasswordLabel')}
            </label>
            <input
              id="wifi-password"
              type="password"
              value={data.password}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              placeholder={t('wifiPasswordPlaceholder')}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          {t('wifiHiddenLabel')}
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange({ ...data, hidden: false })}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              !data.hidden
                ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900'
            }`}
          >
            {t('no')}
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, hidden: true })}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              data.hidden
                ? 'border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900'
            }`}
          >
            {t('yes')}
          </button>
        </div>
      </div>
    </div>
  );
};
