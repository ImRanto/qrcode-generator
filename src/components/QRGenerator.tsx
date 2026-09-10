import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { QRTypeSelector } from './QRTypeSelector';
import { QRCustomization } from './QRCustomization';
import type { QRSize } from './QRCustomization';
import { QRPreview } from './QRPreview';

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
} from '../utils/qrFormatters';

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
  const [error, setError] = useState<string | null>(null);
  const [fgColor, setFgColor] = useState<string>(DEFAULT_FG);
  const [bgColor, setBgColor] = useState<string>(DEFAULT_BG);
  const [size, setSize] = useState<QRSize>(DEFAULT_SIZE);

  const handleSelectType = (type: QRType) => {
    setSelectedType(type);
    setError(null);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let payload = '';

    switch (selectedType) {
      case 'website': {
        if (!websiteUrl.trim()) {
          setError('Please enter a website URL.');
          setQrText('');
          return;
        }
        if (!isValidUrl(websiteUrl)) {
          setError('Please enter a valid website URL.');
          setQrText('');
          return;
        }
        payload = formatWebsitePayload(websiteUrl);
        break;
      }
      case 'text': {
        if (!plainText.trim()) {
          setError('Please enter some text.');
          setQrText('');
          return;
        }
        payload = plainText.trim();
        break;
      }
      case 'wifi': {
        if (!wifiData.ssid.trim()) {
          setError('Please enter a network SSID.');
          setQrText('');
          return;
        }
        if (wifiData.security !== 'nopass' && !wifiData.password) {
          setError('Please enter a Wi-Fi password or select Open security.');
          setQrText('');
          return;
        }
        payload = formatWifiPayload(wifiData);
        break;
      }
      case 'email': {
        if (!emailData.email.trim()) {
          setError('Please enter an email address.');
          setQrText('');
          return;
        }
        if (!isValidEmail(emailData.email)) {
          setError('Please enter a valid email address.');
          setQrText('');
          return;
        }
        payload = formatEmailPayload(emailData);
        break;
      }
      case 'phone': {
        if (!phoneNum.trim()) {
          setError('Please enter a phone number.');
          setQrText('');
          return;
        }
        payload = formatPhonePayload(phoneNum);
        break;
      }
      case 'sms': {
        if (!smsData.phone.trim()) {
          setError('Please enter a phone number.');
          setQrText('');
          return;
        }
        payload = formatSmsPayload(smsData);
        break;
      }
      case 'contact': {
        const hasName = Boolean(contactData.firstName.trim() || contactData.lastName.trim());
        const hasInfo = Boolean(contactData.phone.trim() || contactData.email.trim() || contactData.organization.trim());
        if (!hasName && !hasInfo) {
          setError('Please enter at least a name, phone, or email for the contact.');
          setQrText('');
          return;
        }
        if (contactData.email.trim() && !isValidEmail(contactData.email)) {
          setError('Please enter a valid email address for the contact.');
          setQrText('');
          return;
        }
        payload = formatContactPayload(contactData);
        break;
      }
      case 'location': {
        if (!locationData.latitude.trim() || !locationData.longitude.trim()) {
          setError('Please enter both latitude and longitude.');
          setQrText('');
          return;
        }
        if (!isValidLatitude(locationData.latitude)) {
          setError('Latitude must be a valid number between -90 and 90.');
          setQrText('');
          return;
        }
        if (!isValidLongitude(locationData.longitude)) {
          setError('Longitude must be a valid number between -180 and 180.');
          setQrText('');
          return;
        }
        payload = formatLocationPayload(locationData);
        break;
      }
    }

    setQrText(payload);
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
    setError(null);
    setFgColor(DEFAULT_FG);
    setBgColor(DEFAULT_BG);
    setSize(DEFAULT_SIZE);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Generator Form & Customization */}
        <div className="lg:col-span-6 space-y-6 bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
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

            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-[0.99] text-white dark:text-slate-900 font-medium text-sm shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate QR Code</span>
            </button>
          </form>

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

        {/* Right Column: Preview */}
        <div className="lg:col-span-6 h-full min-h-[380px]">
          <QRPreview
            qrText={qrText}
            fgColor={fgColor}
            bgColor={bgColor}
            size={size}
            selectedType={selectedType}
          />
        </div>
      </div>
    </section>
  );
};
