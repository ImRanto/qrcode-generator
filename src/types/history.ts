import type { QRType, QRFormData } from '../utils/qrFormatters';
import type { QRSize, QRDesignOptions } from '../components/QRCustomization';

export interface HistoryItem {
  id: string;
  type: QRType;
  formData: QRFormData;
  title: string;
  payload: string;
  dataUrl: string; // PNG base64 for quick preview thumbnail
  foregroundColor: string;
  backgroundColor: string;
  size: QRSize;
  filename: string;
  createdAt: number;
  designOptions?: QRDesignOptions;
}
