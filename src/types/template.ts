import type { QRType, QRFormData } from '../utils/qrFormatters';
import type { TranslationKeys } from '../i18n/translations';

export interface QRTemplate {
  id: string;
  type: QRType;
  iconName: string;
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
  defaultFormData?: QRFormData;
}

export const TEMPLATES_LIST: QRTemplate[] = [
  {
    id: 'tpl_website',
    type: 'website',
    iconName: 'Globe',
    titleKey: 'tplWebsiteTitle',
    descKey: 'tplWebsiteDesc',
    defaultFormData: 'https://',
  },
  {
    id: 'tpl_wifi',
    type: 'wifi',
    iconName: 'Wifi',
    titleKey: 'tplWifiTitle',
    descKey: 'tplWifiDesc',
    defaultFormData: {
      ssid: '',
      password: '',
      security: 'WPA',
      hidden: false,
    },
  },
  {
    id: 'tpl_vcard',
    type: 'contact',
    iconName: 'UserCheck',
    titleKey: 'tplCardTitle',
    descKey: 'tplCardDesc',
    defaultFormData: {
      firstName: '',
      lastName: '',
      organization: '',
      phone: '',
      email: '',
      website: '',
    },
  },
  {
    id: 'tpl_email',
    type: 'email',
    iconName: 'Mail',
    titleKey: 'tplEmailTitle',
    descKey: 'tplEmailDesc',
    defaultFormData: {
      email: '',
      subject: '',
      message: '',
    },
  },
  {
    id: 'tpl_phone',
    type: 'phone',
    iconName: 'PhoneCall',
    titleKey: 'tplPhoneTitle',
    descKey: 'tplPhoneDesc',
    defaultFormData: '',
  },
  {
    id: 'tpl_sms',
    type: 'sms',
    iconName: 'MessageCircle',
    titleKey: 'tplSmsTitle',
    descKey: 'tplSmsDesc',
    defaultFormData: {
      phone: '',
      message: '',
    },
  },
  {
    id: 'tpl_location',
    type: 'location',
    iconName: 'MapPin',
    titleKey: 'tplLocationTitle',
    descKey: 'tplLocationDesc',
    defaultFormData: {
      latitude: '',
      longitude: '',
    },
  },
  {
    id: 'tpl_event',
    type: 'text',
    iconName: 'CalendarEvent',
    titleKey: 'tplEventTitle',
    descKey: 'tplEventDesc',
    defaultFormData: 'Event: Annual Gala 2026\nDate: Oct 15, 2026\nLocation: Main Hall\nRSVP: https://example.com/rsvp',
  },
  {
    id: 'tpl_social',
    type: 'website',
    iconName: 'Share2',
    titleKey: 'tplSocialTitle',
    descKey: 'tplSocialDesc',
    defaultFormData: 'https://instagram.com/yourbrand',
  },
  {
    id: 'tpl_restaurant',
    type: 'website',
    iconName: 'Utensils',
    titleKey: 'tplRestaurantTitle',
    descKey: 'tplRestaurantDesc',
    defaultFormData: 'https://example.com/menu.pdf',
  },
];
