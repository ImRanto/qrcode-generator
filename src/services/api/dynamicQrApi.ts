export interface DynamicQrResponse {
  id: string;
  publicId: string;
  name: string;
  destinationUrl: string;
  isActive: boolean;
  qrUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDynamicQrPayload {
  name: string;
  destinationUrl: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Creates a new Dynamic QR Code via the backend API.
 */
export async function createDynamicQr(payload: CreateDynamicQrPayload): Promise<DynamicQrResponse> {
  const response = await fetch(`${API_BASE_URL}/qr`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Failed to create Dynamic QR Code');
  }

  return json.data;
}

/**
 * Fetches dynamic QR code details by publicId.
 */
export async function getDynamicQr(publicId: string): Promise<DynamicQrResponse> {
  const response = await fetch(`${API_BASE_URL}/qr/${publicId}`);
  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Dynamic QR Code not found');
  }

  return json.data;
}

/**
 * Updates the destination URL for an existing Dynamic QR Code.
 */
export async function updateDynamicQrDestination(
  publicId: string,
  destinationUrl: string
): Promise<DynamicQrResponse> {
  const response = await fetch(`${API_BASE_URL}/qr/${publicId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ destinationUrl }),
  });

  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Failed to update Dynamic QR destination');
  }

  return json.data;
}

/**
 * Toggles active status of a Dynamic QR Code.
 */
export async function updateDynamicQrStatus(
  publicId: string,
  isActive: boolean
): Promise<DynamicQrResponse> {
  const response = await fetch(`${API_BASE_URL}/qr/${publicId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isActive }),
  });

  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Failed to update Dynamic QR status');
  }

  return json.data;
}
