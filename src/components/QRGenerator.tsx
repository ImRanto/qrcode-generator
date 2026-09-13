import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { QRTemplates } from './QRTemplates';
import { QRTypeSelector } from './QRTypeSelector';
import { QRCustomization } from './QRCustomization';
import type { QRSize } from './QRCustomization';
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
import type { QRTemplate } from '../types/template';
import { getHistory, saveToHistory, deleteFromHistory, clearHistory } from '../utils/historyStorage';
import QRCode from 'qrcode';
import { useTranslation } from '../i18n/useTranslation';

const DEFAULT_FG = '#111827';
const DEFAULT_BG = '#FFFFFF';
const DEFAULT_SIZE: QRSize = 'Medium';

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

import { ArrowLeft } from 'lucide-react';

export const QRGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<QRType | null>(null);

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
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [fgColor, setFgColor] = useState<string>(DEFAULT_FG);
  const [bgColor, setBgColor] = useState<string>(DEFAULT_BG);
  const [size, setSize] = useState<QRSize>(DEFAULT_SIZE);

  // Local History State
  const [historyList, setHistoryList] = useState<HistoryItem[]>(() => getHistory());

  const handleSelectType = (type: QRType) => {
    setSelectedType(type);
    setErrorKey(null);
  };

  const handleSelectTemplate = (template: QRTemplate) => {
    setSelectedType(template.type);
    setErrorKey(null);

    if (template.defaultFormData !== undefined) {
      switch (template.type) {
        case 'website':
          setWebsiteUrl(typeof template.defaultFormData === 'string' ? template.defaultFormData : '');
          break;
        case 'text':
          setPlainText(typeof template.defaultFormData === 'string' ? template.defaultFormData : '');
          break;
        case 'wifi':
          setWifiData(template.defaultFormData as WifiData);
          break;
        case 'email':
          setEmailData(template.defaultFormData as EmailData);
          break;
        case 'phone':
          setPhoneNum(typeof template.defaultFormData === 'string' ? template.defaultFormData : '');
          break;
        case 'sms':
          setSmsData(template.defaultFormData as SmsData);
          break;
        case 'contact':
          setContactData(template.defaultFormData as ContactData);
          break;
        case 'location':
          setLocationData(template.defaultFormData as LocationData);
          break;
      }
    }
  };

  const handleBackToTypeSelection = () => {
    setSelectedType(null);
    setErrorKey(null);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorKey(null);

    let payload = '';
    let formDataObj: QRFormData = websiteUrl;

    switch (selectedType) {
      case 'website': {
        if (!websiteUrl.trim()) {
          setErrorKey('errEmptyWebsite');
          setQrText('');
          return;
        }
        if (!isValidUrl(websiteUrl)) {
          setErrorKey('errInvalidWebsite');
          setQrText('');
          return;
        }
        payload = formatWebsitePayload(websiteUrl);
        formDataObj = websiteUrl;
        break;
      }
      case 'text': {
        if (!plainText.trim()) {
          setErrorKey('errEmptyText');
          setQrText('');
          return;
        }
        payload = plainText.trim();
        formDataObj = plainText;
        break;
      }
      case 'wifi': {
        if (!wifiData.ssid.trim()) {
          setErrorKey('errEmptySsid');
          setQrText('');
          return;
        }
        if (wifiData.security !== 'nopass' && !wifiData.password) {
          setErrorKey('errEmptyWifiPass');
          setQrText('');
          return;
        }
        payload = formatWifiPayload(wifiData);
        formDataObj = wifiData;
        break;
      }
      case 'email': {
        if (!emailData.email.trim()) {
          setErrorKey('errEmptyEmail');
          setQrText('');
          return;
        }
        if (!isValidEmail(emailData.email)) {
          setErrorKey('errInvalidEmail');
          setQrText('');
          return;
        }
        payload = formatEmailPayload(emailData);
        formDataObj = emailData;
        break;
      }
      case 'phone': {
        if (!phoneNum.trim()) {
          setErrorKey('errEmptyPhone');
          setQrText('');
          return;
        }
        payload = formatPhonePayload(phoneNum);
        formDataObj = phoneNum;
        break;
      }
      case 'sms': {
        if (!smsData.phone.trim()) {
          setErrorKey('errEmptyPhone');
          setQrText('');
          return;
        }
        payload = formatSmsPayload(smsData);
        formDataObj = smsData;
        break;
      }
      case 'contact': {
        const hasName = Boolean(contactData.firstName.trim() || contactData.lastName.trim());
        const hasInfo = Boolean(contactData.phone.trim() || contactData.email.trim() || contactData.organization.trim());
        if (!hasName && !hasInfo) {
          setErrorKey('errEmptyContact');
          setQrText('');
          return;
        }
        if (contactData.email.trim() && !isValidEmail(contactData.email)) {
          setErrorKey('errInvalidContactEmail');
          setQrText('');
          return;
        }
        payload = formatContactPayload(contactData);
        formDataObj = contactData;
        break;
      }
      case 'location': {
        if (!locationData.latitude.trim() || !locationData.longitude.trim()) {
          setErrorKey('errEmptyLocation');
          setQrText('');
          return;
        }
        if (!isValidLatitude(locationData.latitude)) {
          setErrorKey('errInvalidLat');
          setQrText('');
          return;
        }
        if (!isValidLongitude(locationData.longitude)) {
          setErrorKey('errInvalidLng');
          setQrText('');
          return;
        }
        payload = formatLocationPayload(locationData);
        formDataObj = locationData;
        break;
      }
    }

    setQrText(payload);

    if (selectedType) {
      try {
        const dataUrl = await QRCode.toDataURL(payload, {
          width: 200,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });

        const filename = getSuggestedFilename(selectedType, formDataObj);
        const title = filename.replace(/-/g, ' ');

        const updatedHistory = saveToHistory({
          type: selectedType,
          formData: formDataObj,
          title,
          payload,
          dataUrl,
          foregroundColor: fgColor,
          backgroundColor: bgColor,
          size,
          filename,
        });

        setHistoryList(updatedHistory);
      } catch (err) {
        console.error('Failed to create QR thumbnail for history', err);
      }
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
  };

  const handleReuseHistory = (item: HistoryItem) => {
    setSelectedType(item.type);
    setFgColor(item.foregroundColor);
    setBgColor(item.backgroundColor);
    setSize(item.size);
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

  // Step 1 View: Type & Preset Selection
  if (!selectedType) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-4 space-y-8 animate-fade-in">
        {/* Main Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {t('createQrTitle')}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {t('chooseShareSubtitle')}
          </p>
        </div>

        {/* Centralized QR Types Categorized Cards */}
        <div className="bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-8">
          <QRTypeSelector onSelectType={handleSelectType} />
          <QRTemplates onSelectTemplate={handleSelectTemplate} />
        </div>

        {/* Recent QR Codes History */}
        <RecentQRCodes
          history={historyList}
          onReuse={handleReuseHistory}
          onDelete={handleDeleteHistory}
          onClearAll={handleClearHistory}
        />
      </section>
    );
  }

  // Steps 2-5 View: Input, Live Preview, Customization & Export
  return (
    <section className="max-w-6xl mx-auto px-4 py-4 space-y-6 animate-fade-in">
      {/* Back button header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBackToTypeSelection}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToTypes')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form & Progressive Customization */}
        <div className="lg:col-span-7 space-y-6 bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          {/* Compact type switcher bar */}
          <QRTypeSelector
            selectedType={selectedType}
            onSelectType={handleSelectType}
            compact={true}
          />

          <form onSubmit={handleGenerate} className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
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

            {errorKey && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-900/50">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{t(errorKey as any)}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold text-sm shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('generateBtn')}</span>
            </button>
          </form>

          {/* Customization Options */}
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

        {/* Right Column: Preview & History */}
        <div className="lg:col-span-5 space-y-6">
          <QRPreview
            qrText={qrText}
            fgColor={fgColor}
            bgColor={bgColor}
            size={size}
            selectedType={selectedType}
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
