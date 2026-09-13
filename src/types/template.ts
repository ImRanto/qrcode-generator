import type { QRType, QRFormData } from '../utils/qrFormatters';
import type { TranslationKeys } from '../i18n/translations';

export type QRCategory = 'content' | 'communication' | 'practical';

export interface QRTypeDefinition {
  id: QRType;
  category: QRCategory;
  labelKey: TranslationKeys;
  descKey: TranslationKeys;
  iconName: string;
}

export interface QRTemplate {
  id: string;
  type: QRType;
  iconName: string;
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
  defaultFormData?: QRFormData;
}

export const QR_TYPE_DEFINITIONS: QRTypeDefinition[] = [
  // Category: Content (Links & content / Liens & contenu)
  {
    id: 'website',
    category: 'content',
    labelKey: 'typeWebsite',
    descKey: 'descWebsite',
    iconName: 'Globe',
  },
  {
    id: 'text',
    category: 'content',
    labelKey: 'typeText',
    descKey: 'descText',
    iconName: 'FileText',
  },

  // Category: Communication
  {
    id: 'contact',
    category: 'communication',
    labelKey: 'typeContact',
    descKey: 'descContact',
    iconName: 'User',
  },
  {
    id: 'email',
    category: 'communication',
    labelKey: 'typeEmail',
    descKey: 'descEmail',
    iconName: 'Mail',
  },
  {
    id: 'phone',
    category: 'communication',
    labelKey: 'typePhone',
    descKey: 'descPhone',
    iconName: 'Phone',
  },
  {
    id: 'sms',
    category: 'communication',
    labelKey: 'typeSms',
    descKey: 'descSms',
    iconName: 'MessageSquare',
  },

  // Category: Practical (Pratique)
  {
    id: 'wifi',
    category: 'practical',
    labelKey: 'typeWifi',
    descKey: 'descWifi',
    iconName: 'Wifi',
  },
  {
    id: 'location',
    category: 'practical',
    labelKey: 'typeLocation',
    descKey: 'descLocation',
    iconName: 'MapPin',
  },
];

export const TEMPLATES_LIST: QRTemplate[] = [
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
  {
    id: 'tpl_event',
    type: 'text',
    iconName: 'CalendarEvent',
    titleKey: 'tplEventTitle',
    descKey: 'tplEventDesc',
    defaultFormData: 'Event: Annual Gala 2026\nDate: Oct 15, 2026\nLocation: Main Hall\nRSVP: https://example.com/rsvp',
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
];
