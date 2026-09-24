import { describe, it, expect } from 'vitest';
import { getContrastRatio, analyzeQRParameters } from './contrastValidator';

describe('contrastValidator utils', () => {
  it('calculates maximum contrast ratio for black and white', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF');
    expect(ratio).toBeCloseTo(21, 1);
  });

  it('calculates minimum contrast ratio (1) for identical colors', () => {
    const ratio1 = getContrastRatio('#123456', '#123456');
    expect(ratio1).toBeCloseTo(1, 1);

    const ratio2 = getContrastRatio('#FFFFFF', '#FFFFFF');
    expect(ratio2).toBeCloseTo(1, 1);
  });

  it('analyzes QR parameters correctly for optimal contrast and normal payload length', () => {
    const result = analyzeQRParameters('#000000', '#FFFFFF', 'https://example.com');
    expect(result.isContrastOptimal).toBe(true);
    expect(result.isPayloadTooLong).toBe(false);
    expect(result.contrastRatio).toBeGreaterThanOrEqual(3.0);
  });

  it('detects low contrast and long payload in analyzeQRParameters', () => {
    const longPayload = 'a'.repeat(1005);
    const result = analyzeQRParameters('#FFFFFF', '#FFFFFF', longPayload);
    expect(result.isContrastOptimal).toBe(false);
    expect(result.isPayloadTooLong).toBe(true);
    expect(result.contrastRatio).toBeCloseTo(1, 1);
  });
});
