import QRCode from 'qrcode';
import type { QRDesignOptions } from '../components/QRCustomization';

export interface RenderQROptions extends QRDesignOptions {
  width?: number;
}

export function isEyeModule(row: number, col: number, matrixSize: number): boolean {
  if (row < 7 && col < 7) return true;
  if (row < 7 && col >= matrixSize - 7) return true;
  if (row >= matrixSize - 7 && col < 7) return true;
  return false;
}

/**
 * Draws custom styled QR code to an HTML5 Canvas element.
 */
export async function drawCustomQRToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  options: RenderQROptions
): Promise<void> {
  if (!text || !text.trim()) return;

  const qr = QRCode.create(text, {
    errorCorrectionLevel: options.errorCorrectionLevel || 'M',
  });

  const matrixSize = qr.modules.size;
  const margin = options.margin ?? 2;
  const totalModules = matrixSize + margin * 2;
  const canvasWidth = options.width || 280;
  const cellSize = canvasWidth / totalModules;

  canvas.width = canvasWidth;
  canvas.height = canvasWidth;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasWidth, canvasWidth);

  // 1. Fill Background
  if (!options.transparentBg) {
    ctx.fillStyle = options.bgColor || '#FFFFFF';
    ctx.fillRect(0, 0, canvasWidth, canvasWidth);
  }

  // 2. Prepare Foreground Fill Style (Solid or Gradient)
  let fgFillStyle: string | CanvasGradient = options.fgColor || '#111827';
  if (options.gradientType === 'linear') {
    const grad = ctx.createLinearGradient(0, 0, canvasWidth, canvasWidth);
    grad.addColorStop(0, options.fgColor || '#111827');
    grad.addColorStop(1, options.gradientColor || '#2563EB');
    fgFillStyle = grad;
  } else if (options.gradientType === 'radial') {
    const center = canvasWidth / 2;
    const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
    grad.addColorStop(0, options.fgColor || '#111827');
    grad.addColorStop(1, options.gradientColor || '#2563EB');
    fgFillStyle = grad;
  }

  const eyeFillStyle = (options.useCustomEyeColor && options.eyeColor)
    ? options.eyeColor
    : fgFillStyle;

  // Helper to draw eye (finder pattern) at specified top-left matrix position (r, c)
  const drawEyeAt = (startRow: number, startCol: number) => {
    const x = (startCol + margin) * cellSize;
    const y = (startRow + margin) * cellSize;
    const eyeSize = 7 * cellSize;

    ctx.fillStyle = eyeFillStyle;

    if (options.eyeStyle === 'circle') {
      // Outer ring
      ctx.beginPath();
      ctx.arc(x + eyeSize / 2, y + eyeSize / 2, eyeSize / 2, 0, Math.PI * 2);
      ctx.arc(x + eyeSize / 2, y + eyeSize / 2, eyeSize / 2 - cellSize, 0, Math.PI * 2, true);
      ctx.fill();

      // Inner solid circle
      ctx.beginPath();
      ctx.arc(x + eyeSize / 2, y + eyeSize / 2, 1.5 * cellSize, 0, Math.PI * 2);
      ctx.fill();
    } else if (options.eyeStyle === 'rounded') {
      // Outer 7x7 rounded frame
      const rOuter = cellSize * 2;
      ctx.beginPath();
      ctx.roundRect(x, y, eyeSize, eyeSize, rOuter);
      ctx.roundRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize, rOuter * 0.7);
      ctx.fill('evenodd');

      // Inner 3x3 rounded center
      const rInner = cellSize * 1;
      ctx.beginPath();
      ctx.roundRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize, rInner);
      ctx.fill();
    } else {
      // Standard Square Eye
      ctx.beginPath();
      ctx.rect(x, y, eyeSize, eyeSize);
      ctx.rect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
      ctx.fill('evenodd');

      ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
    }
  };

  // 3. Draw Eyes at 3 corners
  drawEyeAt(0, 0);
  drawEyeAt(0, matrixSize - 7);
  drawEyeAt(matrixSize - 7, 0);

  // 4. Draw Data Modules (non-eye cells)
  ctx.fillStyle = fgFillStyle;

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (isEyeModule(r, c, matrixSize)) {
        continue; // Skip eyes, already drawn
      }

      const isDark = qr.modules.get(r, c);
      if (!isDark) continue;

      const x = (c + margin) * cellSize;
      const y = (r + margin) * cellSize;

      if (options.moduleStyle === 'dots') {
        ctx.beginPath();
        ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.42, 0, Math.PI * 2);
        ctx.fill();
      } else if (options.moduleStyle === 'rounded') {
        ctx.beginPath();
        ctx.roundRect(x, y, cellSize, cellSize, cellSize * 0.35);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }
  }
}

/**
 * Generates custom SVG string for the QR Code with design options.
 */
export async function generateCustomQRSVG(
  text: string,
  options: RenderQROptions
): Promise<string> {
  if (!text || !text.trim()) return '';

  const qr = QRCode.create(text, {
    errorCorrectionLevel: options.errorCorrectionLevel || 'M',
  });

  const matrixSize = qr.modules.size;
  const margin = options.margin ?? 2;
  const totalModules = matrixSize + margin * 2;
  const sizePx = options.width || 800;
  const cellSize = sizePx / totalModules;

  let defs = '';
  let fgFillAttr = options.fgColor || '#111827';

  if (options.gradientType === 'linear') {
    defs = `
    <defs>
      <linearGradient id="qrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${options.fgColor || '#111827'}" />
        <stop offset="100%" stop-color="${options.gradientColor || '#2563EB'}" />
      </linearGradient>
    </defs>`;
    fgFillAttr = 'url(#qrGrad)';
  } else if (options.gradientType === 'radial') {
    defs = `
    <defs>
      <radialGradient id="qrGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${options.fgColor || '#111827'}" />
        <stop offset="100%" stop-color="${options.gradientColor || '#2563EB'}" />
      </radialGradient>
    </defs>`;
    fgFillAttr = 'url(#qrGrad)';
  }

  const eyeFillAttr = (options.useCustomEyeColor && options.eyeColor)
    ? options.eyeColor
    : fgFillAttr;

  let bgRect = '';
  if (!options.transparentBg) {
    bgRect = `<rect width="100%" height="100%" fill="${options.bgColor || '#FFFFFF'}" />`;
  }

  let paths = '';

  // Eye generator helper
  const makeEyeSVG = (startRow: number, startCol: number) => {
    const x = (startCol + margin) * cellSize;
    const y = (startRow + margin) * cellSize;
    const eyeSize = 7 * cellSize;

    if (options.eyeStyle === 'circle') {
      const cx = x + eyeSize / 2;
      const cy = y + eyeSize / 2;
      return `
        <circle cx="${cx}" cy="${cy}" r="${eyeSize / 2}" fill="${eyeFillAttr}" />
        <circle cx="${cx}" cy="${cy}" r="${eyeSize / 2 - cellSize}" fill="${options.transparentBg ? 'transparent' : (options.bgColor || '#FFFFFF')}" />
        <circle cx="${cx}" cy="${cy}" r="${1.5 * cellSize}" fill="${eyeFillAttr}" />
      `;
    } else if (options.eyeStyle === 'rounded') {
      const rOuter = cellSize * 2;
      const rInner = cellSize * 1;
      return `
        <rect x="${x}" y="${y}" width="${eyeSize}" height="${eyeSize}" rx="${rOuter}" fill="${eyeFillAttr}" />
        <rect x="${x + cellSize}" y="${y + cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" rx="${rOuter * 0.7}" fill="${options.transparentBg ? 'transparent' : (options.bgColor || '#FFFFFF')}" />
        <rect x="${x + 2 * cellSize}" y="${y + 2 * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" rx="${rInner}" fill="${eyeFillAttr}" />
      `;
    } else {
      return `
        <rect x="${x}" y="${y}" width="${eyeSize}" height="${eyeSize}" fill="${eyeFillAttr}" />
        <rect x="${x + cellSize}" y="${y + cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="${options.transparentBg ? 'transparent' : (options.bgColor || '#FFFFFF')}" />
        <rect x="${x + 2 * cellSize}" y="${y + 2 * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="${eyeFillAttr}" />
      `;
    }
  };

  paths += makeEyeSVG(0, 0);
  paths += makeEyeSVG(0, matrixSize - 7);
  paths += makeEyeSVG(matrixSize - 7, 0);

  // Modules SVG
  let moduleElements = '';
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (isEyeModule(r, c, matrixSize)) continue;
      if (!qr.modules.get(r, c)) continue;

      const x = (c + margin) * cellSize;
      const y = (r + margin) * cellSize;

      if (options.moduleStyle === 'dots') {
        const cx = x + cellSize / 2;
        const cy = y + cellSize / 2;
        const rad = cellSize * 0.42;
        moduleElements += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fgFillAttr}" />`;
      } else if (options.moduleStyle === 'rounded') {
        const rad = cellSize * 0.35;
        moduleElements += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="${rad}" fill="${fgFillAttr}" />`;
      } else {
        moduleElements += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fgFillAttr}" />`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sizePx} ${sizePx}" width="${sizePx}" height="${sizePx}">
    ${defs}
    ${bgRect}
    ${paths}
    ${moduleElements}
  </svg>`;
}
