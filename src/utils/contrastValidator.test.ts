import { describe, it, expect } from 'vitest';
import { getContrastRatio, analyzeQRParameters } from './contrastValidator';

describe('contrastValidator', () => {
  it('should calculate correct contrast ratio for black and white', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF');
    expect(ratio).toBeCloseTo(21, 1);
  });

  it('should calculate contrast ratio 1 for identical colors', () => {
    const ratio = getContrastRatio('#2563EB', '#2563EB');
    expect(ratio).toBeCloseTo(1, 2);
  });

  it('should analyze QR parameters correctly for optimal contrast and normal payload', () => {
    const diagnostics = analyzeQRParameters('#000000', '#FFFFFF', 'https://example.com');
    expect(diagnostics.contrastRatio).toBeGreaterThanOrEqual(3.0);
    expect(diagnostics.isContrastOptimal).toBe(true);
    expect(diagnostics.isPayloadTooLong).toBe(false);
  });

  it('should detect low contrast and long payload', () => {
    const lowContrastDiagnostics = analyzeQRParameters('#CCCCCC', '#FFFFFF', 'short text');
    expect(lowContrastDiagnostics.isContrastOptimal).toBe(false);

    const longPayload = 'a'.repeat(1001);
    const longPayloadDiagnostics = analyzeQRParameters('#000000', '#FFFFFF', longPayload);
    expect(longPayloadDiagnostics.isPayloadTooLong).toBe(true);
  });
});
