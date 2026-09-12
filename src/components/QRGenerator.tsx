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
import { DynamicForm } from './forms/DynamicForm';
import { createDynamicQr } from '../services/api/dynamicQrApi';
import { Link2, Zap } from 'lucide-react';
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

export const QRGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [qrMode, setQrMode] = useState<'static' | 'dynamic'>('static');
  const [selectedType, setSelectedType] = useState<QRType>('website');

  // Dynamic Form state
  const [dynamicName, setDynamicName] = useState<string>('');
  const [dynamicDestUrl, setDynamicDestUrl] = useState<string>('');
  const [isSubmittingDynamic, setIsSubmittingDynamic] = useState<boolean>(false);

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

  const handleGenerateDynamic = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorKey(null);

    if (!dynamicName.trim()) {
      setErrorKey('errEmptyName');
      return;
    }

    if (!dynamicDestUrl.trim() || !isValidUrl(dynamicDestUrl)) {
      setErrorKey('errInvalidWebsite');
      return;
    }

    setIsSubmittingDynamic(true);
    try {
      const res = await createDynamicQr({
        name: dynamicName.trim(),
        destinationUrl: dynamicDestUrl.trim(),
      });

      const dynamicQrUrl = res.qrUrl;
      setQrText(dynamicQrUrl);

      // Thumbnail generation & local history save
      const dataUrl = await QRCode.toDataURL(dynamicQrUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });

      const updatedHistory = saveToHistory({
        type: 'website',
        formData: dynamicDestUrl,
        title: `Dynamic: ${res.name}`,
        payload: dynamicQrUrl,
        dataUrl,
        foregroundColor: fgColor,
        backgroundColor: bgColor,
        size,
        filename: `qr-dynamic-${res.publicId}`,
      });

      setHistoryList(updatedHistory);
    } catch (err) {
      console.error('Failed to create dynamic QR code:', err);
      setErrorKey('errInvalidWebsite');
    } finally {
      setIsSubmittingDynamic(false);
    }
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

    // Generate base64 thumbnail and save to local history
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

  return (
    <section className="max-w-6xl mx-auto px-4 py-4 space-y-6">
      {/* Templates Quick Start Grid */}
      <QRTemplates onSelectTemplate={handleSelectTemplate} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Generator Form & Customization */}
        <div className="lg:col-span-7 space-y-6 bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          {/* Static vs Dynamic Mode Selector */}
          <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-slate-800/80 p-1.5 border border-slate-200/80 dark:border-slate-700/80">
            <button
              type="button"
              onClick={() => {
                setQrMode('static');
                setErrorKey(null);
              }}
              aria-label={t('modeStatic')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                qrMode === 'static'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>{t('modeStatic')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setQrMode('dynamic');
                setErrorKey(null);
              }}
              aria-label={t('modeDynamic')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                qrMode === 'dynamic'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Link2 className="w-4 h-4 text-blue-500" />
              <span>{t('modeDynamic')}</span>
            </button>
          </div>

          {qrMode === 'static' ? (
            <>
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

                {errorKey && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{t(errorKey as any)}</span>
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
            </>
          ) : (
            /* Dynamic Mode Form */
            <form onSubmit={handleGenerateDynamic} className="space-y-4 pt-2">
              <DynamicForm
                name={dynamicName}
                setName={setDynamicName}
                destinationUrl={dynamicDestUrl}
                setDestinationUrl={setDynamicDestUrl}
              />

              {errorKey && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{t(errorKey as any)}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingDynamic}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-medium text-sm shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('createDynamicBtn')}</span>
              </button>
            </form>
          )}

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
