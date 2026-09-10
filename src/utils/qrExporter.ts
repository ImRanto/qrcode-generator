import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import type { QRType } from './qrFormatters';

export const exportPNG = async (
  qrText: string,
  fgColor: string,
  bgColor: string,
  filename = 'qr-code.png'
): Promise<void> => {
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, qrText, {
    width: 1024,
    margin: 2,
    color: {
      dark: fgColor,
      light: bgColor,
    },
    errorCorrectionLevel: 'M',
  });

  const dataUrl = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const exportSVG = async (
  qrText: string,
  fgColor: string,
  bgColor: string,
  filename = 'qr-code.svg'
): Promise<void> => {
  const svgString = await QRCode.toString(qrText, {
    type: 'svg',
    margin: 2,
    color: {
      dark: fgColor,
      light: bgColor,
    },
    errorCorrectionLevel: 'M',
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
};

export const exportPDF = async (
  qrText: string,
  fgColor: string,
  bgColor: string,
  selectedType?: QRType,
  filename = 'qr-code.pdf'
): Promise<void> => {
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, qrText, {
    width: 800,
    margin: 2,
    color: {
      dark: fgColor,
      light: bgColor,
    },
    errorCorrectionLevel: 'M',
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
};
