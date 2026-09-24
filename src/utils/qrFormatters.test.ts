import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidUrl,
  isValidLatitude,
  isValidLongitude,
  isValidPhone,
  formatWifiPayload,
  formatWebsitePayload,
  getSuggestedFilename,
} from './qrFormatters';

describe('qrFormatters', () => {
  it('should validate email addresses correctly', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  it('should validate URLs correctly', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('example.com')).toBe(true);
    expect(isValidUrl('http://test.org/page')).toBe(true);
  });

  it('should validate latitude correctly', () => {
    expect(isValidLatitude('48.8584')).toBe(true);
    expect(isValidLatitude('-90')).toBe(true);
    expect(isValidLatitude('95')).toBe(false);
    expect(isValidLatitude('abc')).toBe(false);
  });

  it('should validate longitude correctly', () => {
    expect(isValidLongitude('2.2945')).toBe(true);
    expect(isValidLongitude('-180')).toBe(true);
    expect(isValidLongitude('185')).toBe(false);
  });

  it('should validate phone numbers correctly', () => {
    expect(isValidPhone('+33 6 12 34 56 78')).toBe(true);
    expect(isValidPhone('0612345678')).toBe(true);
    expect(isValidPhone('abc123!!')).toBe(false);
  });

  it('should format Wi-Fi payload escaping special characters', () => {
    const wifiData = {
      ssid: 'My;Special:Network,SSID\\Test',
      password: 'Pass;Word:123,Key\\Test',
      security: 'WPA' as const,
      hidden: false,
    };
    const payload = formatWifiPayload(wifiData);
    expect(payload).toBe('WIFI:S:My\\;Special\\:Network\\,SSID\\\\Test;T:WPA;P:Pass\\;Word\\:123\\,Key\\\\Test;H:false;;');
  });

  it('should format website payload by prepending protocol if missing', () => {
    expect(formatWebsitePayload('example.com')).toBe('https://example.com');
    expect(formatWebsitePayload('http://myurl.com')).toBe('http://myurl.com');
  });

  it('should generate suggested filenames', () => {
    expect(getSuggestedFilename('website', 'https://example.com')).toBe('qr-url-example-com');
    expect(getSuggestedFilename('wifi', { ssid: 'Home Network', password: '', security: 'WPA', hidden: false })).toBe('qr-wifi-Home-Network');
    expect(getSuggestedFilename('text', 'some text')).toBe('qr-code-text');
  });
});
