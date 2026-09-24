import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidLatitude,
  isValidLongitude,
  formatWebsitePayload,
  formatWifiPayload,
  getSuggestedFilename,
} from './qrFormatters';

describe('qrFormatters utils', () => {
  it('validates email addresses correctly', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  it('validates phone numbers correctly', () => {
    expect(isValidPhone('+33612345678')).toBe(true);
    expect(isValidPhone('abc123!!')).toBe(false);
  });

  it('validates URLs correctly', () => {
    expect(isValidUrl('example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path')).toBe(true);
  });

  it('validates latitude and longitude correctly', () => {
    expect(isValidLatitude('48.8584')).toBe(true);
    expect(isValidLatitude('100')).toBe(false);

    expect(isValidLongitude('2.2945')).toBe(true);
    expect(isValidLongitude('-200')).toBe(false);
  });

  it('formats website payload with https prepended if missing', () => {
    expect(formatWebsitePayload('example.com')).toBe('https://example.com');
    expect(formatWebsitePayload('https://site.org')).toBe('https://site.org');
  });

  it('formats wifi payload and escapes special characters', () => {
    const payload = formatWifiPayload({
      ssid: 'My;Network:Wifi,Test\\',
      password: 'Pass;123:Key,Special\\',
      security: 'WPA',
      hidden: false,
    });
    expect(payload).toBe('WIFI:S:My\\;Network\\:Wifi\\,Test\\\\;T:WPA;P:Pass\\;123\\:Key\\,Special\\\\;H:false;;');
  });

  it('generates suggested filenames correctly', () => {
    expect(getSuggestedFilename('website', 'https://my-domain.com/path')).toBe('qr-url-my-domain-com');
    expect(getSuggestedFilename('wifi', { ssid: 'Home network', password: '123', security: 'WPA', hidden: false })).toBe('qr-wifi-Home-network');
  });
});
