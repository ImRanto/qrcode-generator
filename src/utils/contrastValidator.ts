/**
  * Parses a hex color string (#RGB, #RRGGBB) to RGB components [0..255].
  */
function hexToRgb(hex: string): [number, number, number] {
  let cleaned = hex.trim().replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (cleaned.length !== 6) {
    return [0, 0, 0];
  }
  const r = parseInt(cleaned.substring(0, 2), 16) || 0;
  const g = parseInt(cleaned.substring(2, 4), 16) || 0;
  const b = parseInt(cleaned.substring(4, 6), 16) || 0;
  return [r, g, b];
}

/**
 * Calculates the WCAG relative luminance of a color.
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;

  const R = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const G = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const B = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates WCAG contrast ratio between foreground and background hex colors.
 * Returns ratio in range [1..21].
 */
export function getContrastRatio(fgHex: string, bgHex: string): number {
  const [r1, g1, b1] = hexToRgb(fgHex);
  const [r2, g2, b2] = hexToRgb(bgHex);

  const l1 = getRelativeLuminance(r1, g1, b1);
  const l2 = getRelativeLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

export interface ValidationDiagnostics {
  contrastRatio: number;
  isContrastOptimal: boolean; // Ratio >= 3:1 (optimal for QR readers)
  isPayloadTooLong: boolean;  // Length > 1000 chars
}

export function analyzeQRParameters(
  fgHex: string,
  bgHex: string,
  qrText: string
): ValidationDiagnostics {
  const ratio = getContrastRatio(fgHex, bgHex);
  return {
    contrastRatio: ratio,
    isContrastOptimal: ratio >= 3.0,
    isPayloadTooLong: qrText.length > 1000,
  };
}
