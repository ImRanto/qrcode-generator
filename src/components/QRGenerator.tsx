import React, { useState, useCallback } from 'react';
import { Sparkles, AlertCircle, FileText, Palette, CheckCircle2, Download } from 'lucide-react';
import { QRTypeSelector } from './QRTypeSelector';
import { QRCustomization } from './QRCustomization';
import type { QRSize, QRDesignOptions } from './QRCustomization';
import { drawCustomQRToCanvas } from '../utils/qrCustomRenderer';
import { QRPreview } from './QRPreview';
import { RecentQRCodes } from './RecentQRCodes';

import { WebsiteForm } from './forms/WebsiteForm';
import { TextForm } from './forms/TextForm';
import { WifiForm } from './forms/WifiForm';
import { EmailForm } from './forms/EmailForm';
import { PhoneForm } from './forms/PhoneForm';
import { SmsForm } from './forms/SmsForm';
import { ContactForm } from './forms/ContactForm';
import { LocationForm } from './forms/LocationForm';

import type {
  QRType,
  WifiData,
  EmailData,
  SmsData,
  ContactData,
  LocationData,
  QRFormData,
} from '../utils/qrFormatters';

import {
  isValidEmail,
  isValidUrl,
  isValidLatitude,
  isValidLongitude,
  isValidPhone,
  formatWebsitePayload,
  formatWifiPayload,
  formatEmailPayload,
  formatPhonePayload,
  formatSmsPayload,
  formatContactPayload,
  formatLocationPayload,
  getSuggestedFilename,
} from '../utils/qrFormatters';

import type { HistoryItem } from '../types/history';
import { getHistory, saveToHistory, deleteFromHistory, clearHistory } from '../utils/historyStorage';
import { useTranslation } from '../i18n/useTranslation';
import type { TranslationKeys } from '../i18n/translations';

const DEFAULT_FG = '#111827';
const DEFAULT_BG = '#FFFFFF';
const DEFAULT_SIZE: QRSize = 'Medium';

const DEFAULT_DESIGN: QRDesignOptions = {
  fgColor: DEFAULT_FG,
  bgColor: DEFAULT_BG,
  transparentBg: false,
  eyeColor: DEFAULT_FG,
  useCustomEyeColor: false,
  moduleStyle: 'square',
  eyeStyle: 'square',
  errorCorrectionLevel: 'M',
  margin: 2,
  gradientType: 'none',
  gradientColor: '#2563EB',
};

const INITIAL_WIFI: WifiData = {
  ssid: '',
  password: '',
  security: 'WPA',
  hidden: false,
};

const INITIAL_EMAIL: EmailData = {
  email: '',
  subject: '',
  message: '',
};

const INITIAL_SMS: SmsData = {
  phone: '',
  message: '',
};

const INITIAL_CONTACT: ContactData = {
  firstName: '',
  lastName: '',
  organization: '',
  phone: '',
  email: '',
  website: '',
};

const INITIAL_LOCATION: LocationData = {
  latitude: '',
  longitude: '',
};

export const QRGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<QRType>('website');

  // Form states
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [plainText, setPlainText] = useState<string>('');
  const [wifiData, setWifiData] = useState<WifiData>(INITIAL_WIFI);
  const [emailData, setEmailData] = useState<EmailData>(INITIAL_EMAIL);
  const [phoneNum, setPhoneNum] = useState<string>('');
  const [smsData, setSmsData] = useState<SmsData>(INITIAL_SMS);
  const [contactData, setContactData] = useState<ContactData>(INITIAL_CONTACT);
  const [locationData, setLocationData] = useState<LocationData>(INITIAL_LOCATION);

  // QR Output & Options
  const [qrText, setQrText] = useState<string>('');
  const [errorKey, setErrorKey] = useState<TranslationKeys | null>(null);
  const [fgColor, setFgColor] = useState<string>(DEFAULT_FG);
  const [bgColor, setBgColor] = useState<string>(DEFAULT_BG);
  const [size, setSize] = useState<QRSize>(DEFAULT_SIZE);
  const [designOptions, setDesignOptions] = useState<QRDesignOptions>(DEFAULT_DESIGN);

  // Local History State
  const [historyList, setHistoryList] = useState<HistoryItem[]>(() => getHistory());

  const handleSelectType = (type: QRType) => {
    setSelectedType(type);
    setErrorKey(null);
  };

  // Process form input & construct payload
  const computePayloadAndFormData = useCallback((): { payload: string; formData: QRFormData; err: TranslationKeys | null } => {
    switch (selectedType) {
      case 'website': {
        if (!websiteUrl.trim()) return { payload: '', formData: websiteUrl, err: null };
        if (!isValidUrl(websiteUrl)) return { payload: '', formData: websiteUrl, err: 'errInvalidWebsite' };
        return { payload: formatWebsitePayload(websiteUrl), formData: websiteUrl, err: null };
      }
      case 'text': {
        if (!plainText.trim()) return { payload: '', formData: plainText, err: null };
        return { payload: plainText.trim(), formData: plainText, err: null };
      }
      case 'wifi': {
        if (!wifiData.ssid.trim()) return { payload: '', formData: wifiData, err: null };
        if (wifiData.security !== 'nopass' && !wifiData.password) return { payload: '', formData: wifiData, err: 'errEmptyWifiPass' };
        return { payload: formatWifiPayload(wifiData), formData: wifiData, err: null };
      }
      case 'email': {
        if (!emailData.email.trim()) return { payload: '', formData: emailData, err: null };
        if (!isValidEmail(emailData.email)) return { payload: '', formData: emailData, err: 'errInvalidEmail' };
        return { payload: formatEmailPayload(emailData), formData: emailData, err: null };
      }
      case 'phone': {
        if (!phoneNum.trim()) return { payload: '', formData: phoneNum, err: null };
        if (!isValidPhone(phoneNum)) return { payload: '', formData: phoneNum, err: 'errInvalidPhone' };
        return { payload: formatPhonePayload(phoneNum), formData: phoneNum, err: null };
      }
      case 'sms': {
        if (!smsData.phone.trim()) return { payload: '', formData: smsData, err: null };
        if (!isValidPhone(smsData.phone)) return { payload: '', formData: smsData, err: 'errInvalidPhone' };
        return { payload: formatSmsPayload(smsData), formData: smsData, err: null };
      }
      case 'contact': {
        const hasName = Boolean(contactData.firstName.trim() || contactData.lastName.trim());
        const hasInfo = Boolean(contactData.phone.trim() || contactData.email.trim() || contactData.organization.trim());
        if (!hasName && !hasInfo) return { payload: '', formData: contactData, err: null };
        if (contactData.email.trim() && !isValidEmail(contactData.email)) return { payload: '', formData: contactData, err: 'errInvalidContactEmail' };
        return { payload: formatContactPayload(contactData), formData: contactData, err: null };
      }
      case 'location': {
        if (!locationData.latitude.trim() || !locationData.longitude.trim()) return { payload: '', formData: locationData, err: null };
        if (!isValidLatitude(locationData.latitude)) return { payload: '', formData: locationData, err: 'errInvalidLat' };
        if (!isValidLongitude(locationData.longitude)) return { payload: '', formData: locationData, err: 'errInvalidLng' };
        return { payload: formatLocationPayload(locationData), formData: locationData, err: null };
      }
      default:
        return { payload: '', formData: '', err: null };
    }
  }, [selectedType, websiteUrl, plainText, wifiData, emailData, phoneNum, smsData, contactData, locationData]);

  // Compute real-time payload and error from form inputs
  const { payload: derivedPayload, err: derivedErr } = computePayloadAndFormData();
  const activeQrText = qrText || derivedPayload;
  const activeErrorKey = errorKey || derivedErr;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { payload, formData, err } = computePayloadAndFormData();

    if (!payload && !err) {
      // Input was completely empty
      switch (selectedType) {
        case 'website': setErrorKey('errEmptyWebsite'); break;
        case 'text': setErrorKey('errEmptyText'); break;
        case 'wifi': setErrorKey('errEmptySsid'); break;
        case 'email': setErrorKey('errEmptyEmail'); break;
        case 'phone': setErrorKey('errEmptyPhone'); break;
        case 'sms': setErrorKey('errEmptyPhone'); break;
        case 'contact': setErrorKey('errEmptyContact'); break;
        case 'location': setErrorKey('errEmptyLocation'); break;
      }
      setQrText('');
      return;
    }

    if (err) {
      setErrorKey(err);
      setQrText('');
      return;
    }

    setQrText(payload);

    // Save to local history when explicitly submitted
    try {
      const thumbCanvas = document.createElement('canvas');
      await drawCustomQRToCanvas(thumbCanvas, payload, {
        ...designOptions,
        fgColor,
        bgColor,
        width: 200,
      });
      const dataUrl = thumbCanvas.toDataURL('image/png');

      const filename = getSuggestedFilename(selectedType, formData);
      const title = filename.replace(/-/g, ' ');

      /**
       * Security choice: For Wi-Fi QR codes, we sanitize formData before saving to localStorage
       * so that sensitive Wi-Fi passwords are never stored in plaintext on disk.
       * The generated payload retains the full string so regenerated QR code previews work.
       */
      const historyFormData: QRFormData =
        selectedType === 'wifi' && typeof formData === 'object' && formData !== null
          ? { ...(formData as WifiData), password: '' }
          : formData;

      const updatedHistory = saveToHistory({
        type: selectedType,
        formData: historyFormData,
        title,
        payload,
        dataUrl,
        foregroundColor: fgColor,
        backgroundColor: bgColor,
        size,
        filename,
        designOptions,
      });

      setHistoryList(updatedHistory);
    } catch (historyErr) {
      console.error('Failed to save to history:', historyErr);
    }
  };

  const handleReset = () => {
    setWebsiteUrl('');
    setPlainText('');
    setWifiData(INITIAL_WIFI);
    setEmailData(INITIAL_EMAIL);
    setPhoneNum('');
    setSmsData(INITIAL_SMS);
    setContactData(INITIAL_CONTACT);
    setLocationData(INITIAL_LOCATION);

    setQrText('');
    setErrorKey(null);
    setFgColor(DEFAULT_FG);
    setBgColor(DEFAULT_BG);
    setSize(DEFAULT_SIZE);
    setDesignOptions(DEFAULT_DESIGN);
  };

  const handleReuseHistory = (item: HistoryItem) => {
    setSelectedType(item.type);
    setFgColor(item.foregroundColor);
    setBgColor(item.backgroundColor);
    setSize(item.size);
    if (item.designOptions) {
      setDesignOptions(item.designOptions);
    }
    setQrText(item.payload);
    setErrorKey(null);

    // Populate exact form data
    switch (item.type) {
      case 'website':
        setWebsiteUrl(typeof item.formData === 'string' ? item.formData : '');
        break;
      case 'text':
        setPlainText(typeof item.formData === 'string' ? item.formData : '');
        break;
      case 'wifi':
        setWifiData(item.formData as WifiData);
        break;
      case 'email':
        setEmailData(item.formData as EmailData);
        break;
      case 'phone':
        setPhoneNum(typeof item.formData === 'string' ? item.formData : '');
        break;
      case 'sms':
        setSmsData(item.formData as SmsData);
        break;
      case 'contact':
        setContactData(item.formData as ContactData);
        break;
      case 'location':
        setLocationData(item.formData as LocationData);
        break;
    }

    // Scroll smoothly to top of generator
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDeleteHistory = (id: string) => {
    const updated = deleteFromHistory(id);
    setHistoryList(updated);
  };

  const handleClearHistory = () => {
    const updated = clearHistory();
    setHistoryList(updated);
  };

  const currentStep = qrText ? 4 : (websiteUrl || plainText || wifiData.ssid || emailData.email || phoneNum || smsData.phone || contactData.firstName || locationData.latitude) ? 2 : 1;

  const steps = [
    { num: 1, key: 'stepContent' as const, icon: FileText },
    { num: 2, key: 'stepDesign' as const, icon: Palette },
    { num: 3, key: 'stepVerification' as const, icon: CheckCircle2 },
    { num: 4, key: 'stepExport' as const, icon: Download },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-4 space-y-6">
      {/* Visual Workflow Steps Bar */}
      <div className="bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.num;
            const isActive = currentStep === s.num || (s.num === 3 && currentStep === 4);

            return (
              <div
                key={s.num}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-2xs font-semibold'
                    : isCompleted
                    ? 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    : 'bg-slate-50/50 dark:bg-slate-900/30 text-slate-400 dark:text-slate-600 border-slate-200/60 dark:border-slate-800/60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : s.num}
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs truncate font-medium">{t(s.key)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Generator Form & Customization */}
        <div className="lg:col-span-7 space-y-6 bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <QRTypeSelector
            selectedType={selectedType}
            onSelectType={handleSelectType}
          />

          <form onSubmit={handleGenerate} className="space-y-4 pt-2">
            {selectedType === 'website' && (
              <WebsiteForm url={websiteUrl} setUrl={setWebsiteUrl} />
            )}
            {selectedType === 'text' && (
              <TextForm text={plainText} setText={setPlainText} />
            )}
            {selectedType === 'wifi' && (
              <WifiForm data={wifiData} onChange={setWifiData} />
            )}
            {selectedType === 'email' && (
              <EmailForm data={emailData} onChange={setEmailData} />
            )}
            {selectedType === 'phone' && (
              <PhoneForm phone={phoneNum} setPhone={setPhoneNum} />
            )}
            {selectedType === 'sms' && (
              <SmsForm data={smsData} onChange={setSmsData} />
            )}
            {selectedType === 'contact' && (
              <ContactForm data={contactData} onChange={setContactData} />
            )}
            {selectedType === 'location' && (
              <LocationForm data={locationData} onChange={setLocationData} />
            )}

            {activeErrorKey && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{t(activeErrorKey)}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] text-white dark:text-slate-900 font-medium text-sm shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('generateBtn')}</span>
            </button>
          </form>

          <QRCustomization
            fgColor={fgColor}
            setFgColor={setFgColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            size={size}
            setSize={setSize}
            designOptions={designOptions}
            setDesignOptions={setDesignOptions}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Preview & History */}
        <div className="lg:col-span-5 space-y-6">
          <QRPreview
            qrText={activeQrText}
            fgColor={fgColor}
            bgColor={bgColor}
            size={size}
            selectedType={selectedType}
            designOptions={designOptions}
          />

          <RecentQRCodes
            history={historyList}
            onReuse={handleReuseHistory}
            onDelete={handleDeleteHistory}
            onClearAll={handleClearHistory}
          />
        </div>
      </div>
    </section>
  );
};
