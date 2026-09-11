export interface DynamicQRResponse {
  id: string;
  publicId: string;
  name: string;
  destinationUrl: string;
  isActive: boolean;
  qrUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
  Creates a new dynamic QR code record via backend API.
 */
export async function createDynamicQR(name: string, destinationUrl: string): Promise<ApiResponse<DynamicQRResponse>> {
  try {
    const res = await fetch(`${API_BASE_URL}/qr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, destinationUrl }),
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: 'Failed to connect to backend server.',
    };
  }
}

/**
  Retrieves dynamic QR code details by publicId.
 */
export async function getDynamicQR(publicId: string): Promise<ApiResponse<DynamicQRResponse>> {
  try {
    const res = await fetch(`${API_BASE_URL}/qr/${publicId}`);
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: 'Failed to connect to backend server.',
    };
  }
}

/**
  Updates the destination URL of an existing dynamic QR code.
 */
export async function updateDynamicQRDestination(publicId: string, destinationUrl: string): Promise<ApiResponse<DynamicQRResponse>> {
  try {
    const res = await fetch(`${API_BASE_URL}/qr/${publicId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destinationUrl }),
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: 'Failed to connect to backend server.',
    };
  }
}

/**
  Toggles the active/inactive status of a dynamic QR code.
 */
export async function toggleDynamicQRStatus(publicId: string, isActive: boolean): Promise<ApiResponse<DynamicQRResponse>> {
  try {
    const res = await fetch(`${API_BASE_URL}/qr/${publicId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isActive }),
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: 'Failed to connect to backend server.',
    };
  }
}
