import { jsPDF } from 'jspdf';
import type { QRType } from './qrFormatters';
import type { QRDesignOptions } from '../components/QRCustomization';
import { drawCustomQRToCanvas, generateCustomQRSVG } from './qrCustomRenderer';

export const sanitizeFilename = (
  rawInput: string,
  format: 'png' | 'svg' | 'pdf'
): string => {
  let cleaned = rawInput.trim();

  // Strip any trailing common extensions if entered manually
  cleaned = cleaned.replace(/\.(png|svg|pdf|jpeg|jpg|webp)$/i, '');

  // Remove filesystem illegal characters: \ / : * ? " < > |
  cleaned = cleaned.replace(/[\\/:*?"<>|]/g, '');

  // Replace whitespace sequences with a single hyphen
  cleaned = cleaned.replace(/[\s]+/g, '-');

  // Replace duplicate hyphens/underscores
  cleaned = cleaned.replace(/-+/g, '-').replace(/_+/g, '_');

  // Trim leading/trailing hyphens/underscores/dots
  cleaned = cleaned.replace(/^[._-]+|[._-]+$/g, '');

  // Fallback if empty after sanitization
  if (!cleaned) {
    cleaned = 'mon-qr-code';
  }

  return `${cleaned}.${format}`;
};

export const getQRPngFile = async (
  qrText: string,
  fgColor: string,
  bgColor: string,
  rawFilename = 'mon-qr-code',
  designOptions?: Partial<QRDesignOptions>
): Promise<File> => {
  const filename = sanitizeFilename(rawFilename, 'png');
  const canvas = document.createElement('canvas');
  await drawCustomQRToCanvas(canvas, qrText, {
    fgColor,
    bgColor,
    transparentBg: designOptions?.transparentBg || false,
    eyeColor: designOptions?.eyeColor || fgColor,
    useCustomEyeColor: designOptions?.useCustomEyeColor || false,
    moduleStyle: designOptions?.moduleStyle || 'square',
    eyeStyle: designOptions?.eyeStyle || 'square',
    errorCorrectionLevel: designOptions?.errorCorrectionLevel || 'M',
    margin: designOptions?.margin ?? 2,
    gradientType: designOptions?.gradientType || 'none',
    gradientColor: designOptions?.gradientColor || '#2563EB',
    logoUrl: designOptions?.logoUrl,
    logoSize: designOptions?.logoSize,
    logoPadding: designOptions?.logoPadding,
    logoHasBg: designOptions?.logoHasBg,
    logoBgColor: designOptions?.logoBgColor,
    width: 1024,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], filename, { type: 'image/png' });
        resolve(file);
      } else {
        reject(new Error('Failed to generate PNG blob for sharing'));
      }
    }, 'image/png');
  });
};

export const exportPNG = async (
  qrText: string,
  fgColor: string,
  bgColor: string,
  rawFilename = 'mon-qr-code',
  designOptions?: Partial<QRDesignOptions>
): Promise<void> => {
  try {
    const filename = sanitizeFilename(rawFilename, 'png');
    const canvas = document.createElement('canvas');
    await drawCustomQRToCanvas(canvas, qrText, {
      fgColor,
      bgColor,
      transparentBg: designOptions?.transparentBg || false,
      eyeColor: designOptions?.eyeColor || fgColor,
      useCustomEyeColor: designOptions?.useCustomEyeColor || false,
      moduleStyle: designOptions?.moduleStyle || 'square',
      eyeStyle: designOptions?.eyeStyle || 'square',
      errorCorrectionLevel: designOptions?.errorCorrectionLevel || 'M',
      margin: designOptions?.margin ?? 2,
      gradientType: designOptions?.gradientType || 'none',
      gradientColor: designOptions?.gradientColor || '#2563EB',
      logoUrl: designOptions?.logoUrl,
      logoSize: designOptions?.logoSize,
      logoPadding: designOptions?.logoPadding,
      logoHasBg: designOptions?.logoHasBg,
      logoBgColor: designOptions?.logoBgColor,
      width: 1024,
    });

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error('Failed to export PNG:', err);
    throw err;
  }
};

export const exportSVG = async (
  qrText: string,
  fgColor: string,
  bgColor: string,
  rawFilename = 'mon-qr-code',
  designOptions?: Partial<QRDesignOptions>
): Promise<void> => {
  try {
    const filename = sanitizeFilename(rawFilename, 'svg');
    const svgString = await generateCustomQRSVG(qrText, {
      fgColor,
      bgColor,
      transparentBg: designOptions?.transparentBg || false,
      eyeColor: designOptions?.eyeColor || fgColor,
      useCustomEyeColor: designOptions?.useCustomEyeColor || false,
      moduleStyle: designOptions?.moduleStyle || 'square',
      eyeStyle: designOptions?.eyeStyle || 'square',
      errorCorrectionLevel: designOptions?.errorCorrectionLevel || 'M',
      margin: designOptions?.margin ?? 2,
      gradientType: designOptions?.gradientType || 'none',
      gradientColor: designOptions?.gradientColor || '#2563EB',
      logoUrl: designOptions?.logoUrl,
      logoSize: designOptions?.logoSize,
      logoPadding: designOptions?.logoPadding,
      logoHasBg: designOptions?.logoHasBg,
      logoBgColor: designOptions?.logoBgColor,
      width: 800,
    });

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (err) {
    console.error('Failed to export SVG:', err);
    throw err;
  }
};

export const exportPDF = async (
  qrText: string,
  fgColor: string,
  bgColor: string,
  selectedType?: QRType,
  rawFilename = 'mon-qr-code',
  designOptions?: Partial<QRDesignOptions>
): Promise<void> => {
  try {
    const filename = sanitizeFilename(rawFilename, 'pdf');
    const canvas = document.createElement('canvas');
    await drawCustomQRToCanvas(canvas, qrText, {
      fgColor,
      bgColor,
      transparentBg: designOptions?.transparentBg || false,
      eyeColor: designOptions?.eyeColor || fgColor,
      useCustomEyeColor: designOptions?.useCustomEyeColor || false,
      moduleStyle: designOptions?.moduleStyle || 'square',
      eyeStyle: designOptions?.eyeStyle || 'square',
      errorCorrectionLevel: designOptions?.errorCorrectionLevel || 'M',
      margin: designOptions?.margin ?? 2,
      gradientType: designOptions?.gradientType || 'none',
      gradientColor: designOptions?.gradientColor || '#2563EB',
      logoUrl: designOptions?.logoUrl,
      logoSize: designOptions?.logoSize,
      logoPadding: designOptions?.logoPadding,
      logoHasBg: designOptions?.logoHasBg,
      logoBgColor: designOptions?.logoBgColor,
      width: 800,
    });

    const imgData = canvas.toDataURL('image/png');

    // Create A4 PDF (210mm x 297mm)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210

    // Title Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('QR Code', pageWidth / 2, 28, { align: 'center' });

    // Type Subtitle
    if (selectedType) {
      const formattedType = selectedType.toUpperCase();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(`Type: ${formattedType}`, pageWidth / 2, 36, { align: 'center' });
    }

    // QR Image Centered
    const qrSize = 100; // 100mm x 100mm
    const xPos = (pageWidth - qrSize) / 2;
    const yPos = 48;

    // Background box with border for QR Code
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(xPos - 5, yPos - 5, qrSize + 10, qrSize + 10, 3, 3, 'FD');

    // Insert QR Image
    doc.addImage(imgData, 'PNG', xPos, yPos, qrSize, qrSize);

    // Content Preview text
    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85); // slate-700

    // Truncate/wrap long content
    const maxChars = 200;
    const displayText =
      qrText.length > maxChars ? `${qrText.substring(0, maxChars)}...` : qrText;

    const splitText = doc.splitTextToSize(displayText, 160);
    doc.text(splitText, pageWidth / 2, yPos + qrSize + 18, { align: 'center' });

    // Footer
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('Generated with QR Generator', pageWidth / 2, 275, {
      align: 'center',
    });

    doc.save(filename);
  } catch (err) {
    console.error('Failed to export PDF:', err);
    throw err;
  }
};
