export type QRType =
  | 'website'
  | 'text'
  | 'wifi'
  | 'email'
  | 'phone'
  | 'sms'
  | 'contact'
  | 'location';

export interface WifiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface EmailData {
  email: string;
  subject: string;
  message: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export interface ContactData {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  website: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
}

export type QRFormData =
  | string
  | WifiData
  | EmailData
  | SmsData
  | ContactData
  | LocationData;

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  return /^[+]?[\d\s\-().]{6,20}$/.test(phone.trim());
};

export const isValidUrl = (url: string): boolean => {
  try {
    const formatted = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const parsed = new URL(formatted);
    return Boolean(parsed.hostname);
  } catch {
    return false;
  }
};

export const isValidLatitude = (lat: string): boolean => {
  const num = parseFloat(lat);
  return !isNaN(num) && num >= -90 && num <= 90;
};

export const isValidLongitude = (lng: string): boolean => {
  const num = parseFloat(lng);
  return !isNaN(num) && num >= -180 && num <= 180;
};

export const formatWebsitePayload = (url: string): string => {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export const formatWifiPayload = (data: WifiData): string => {
  const escapeWifiStr = (str: string) =>
    str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/:/g, '\\:').replace(/,/g, '\\,');

  const ssid = escapeWifiStr(data.ssid.trim());
  const pass = data.security !== 'nopass' ? escapeWifiStr(data.password) : '';
  const hidden = data.hidden ? 'true' : 'false';

  return `WIFI:S:${ssid};T:${data.security};P:${pass};H:${hidden};;`;
};

export const formatEmailPayload = (data: EmailData): string => {
  const email = data.email.trim();
  const params: string[] = [];
  if (data.subject.trim()) {
    params.push(`subject=${encodeURIComponent(data.subject.trim())}`);
  }
  if (data.message.trim()) {
    params.push(`body=${encodeURIComponent(data.message.trim())}`);
  }
  const queryString = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${email}${queryString}`;
};

export const formatPhonePayload = (phone: string): string => {
  return `tel:${phone.trim()}`;
};

export const formatSmsPayload = (data: SmsData): string => {
  const phone = data.phone.trim();
  const message = data.message.trim();
  if (message) {
    return `smsto:${phone}:${message}`;
  }
  return `smsto:${phone}`;
};

export const formatContactPayload = (data: ContactData): string => {
  const fn = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
  const lines = ['BEGIN:VCARD', 'VERSION:3.0'];

  if (data.lastName.trim() || data.firstName.trim()) {
    lines.push(`N:${data.lastName.trim()};${data.firstName.trim()};;;`);
  }
  if (fn) {
    lines.push(`FN:${fn}`);
  }
  if (data.organization.trim()) {
    lines.push(`ORG:${data.organization.trim()}`);
  }
  if (data.phone.trim()) {
    lines.push(`TEL;TYPE=CELL:${data.phone.trim()}`);
  }
  if (data.email.trim()) {
    lines.push(`EMAIL:${data.email.trim()}`);
  }
  if (data.website.trim()) {
    lines.push(`URL:${formatWebsitePayload(data.website)}`);
  }
  lines.push('END:VCARD');

  return lines.join('\n');
};

export const formatLocationPayload = (data: LocationData): string => {
  const lat = data.latitude.trim();
  const lng = data.longitude.trim();
  return `https://www.google.com/maps?q=${lat},${lng}`;
};

export const getSuggestedFilename = (type: QRType, data: QRFormData): string => {
  switch (type) {
    case 'website': {
      const url = typeof data === 'string' ? data : '';
      const domain = url.replace(/^https?:\/\//i, '').split('/')[0].replace(/[^a-z0-9]/gi, '-');
      return domain ? `qr-url-${domain}` : 'qr-code-website';
    }
    case 'text':
      return 'qr-code-text';
    case 'wifi': {
      const wifi = data as WifiData;
      const ssid = (wifi.ssid || 'wifi').replace(/[^a-z0-9]/gi, '-');
      return `qr-wifi-${ssid}`;
    }
    case 'email': {
      const emailObj = data as EmailData;
      const address = (emailObj.email || 'email').split('@')[0].replace(/[^a-z0-9]/gi, '-');
      return `qr-email-${address}`;
    }
    case 'phone':
      return 'qr-code-phone';
    case 'sms':
      return 'qr-code-sms';
    case 'contact': {
      const c = data as ContactData;
      const name = `${c.firstName}-${c.lastName}`.replace(/[^a-z0-9]/gi, '-').replace(/^-+|-+$/g, '');
      return name ? `qr-contact-${name}` : 'qr-code-contact';
    }
    case 'location':
      return 'qr-code-location';
    default:
      return 'qr-code';
  }
};
