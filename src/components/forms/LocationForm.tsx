import React from 'react';
import type { LocationData } from '../../utils/qrFormatters';

interface LocationFormProps {
  data: LocationData;
  onChange: (updated: LocationData) => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="location-latitude"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          Latitude
        </label>
        <input
          id="location-latitude"
          type="text"
          value={data.latitude}
          onChange={(e) => onChange({ ...data, latitude: e.target.value })}
          placeholder="e.g. 48.8566"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
        />
      </div>

      <div>
        <label
          htmlFor="location-longitude"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
        >
          Longitude
        </label>
        <input
          id="location-longitude"
          type="text"
          value={data.longitude}
          onChange={(e) => onChange({ ...data, longitude: e.target.value })}
          placeholder="e.g. 2.3522"
          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all outline-none focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10"
        />
      </div>
    </div>
  );
};
