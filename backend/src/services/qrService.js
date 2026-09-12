import pool from '../config/db.js';

// In-memory fallback store when PostgreSQL is not connected during development
const memoryStore = new Map();

function generateShortId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createDynamicQr({ name, destinationUrl }) {
  const publicId = generateShortId();

  try {
    const query = `
      INSERT INTO dynamic_qr_codes (public_id, name, destination_url)
      VALUES ($1, $2, $3)
      RETURNING id, public_id, name, destination_url, is_active, created_at, updated_at
    `;
    const res = await pool.query(query, [publicId, name, destinationUrl]);
    const row = res.rows[0];
    return {
      id: row.id,
      publicId: row.public_id,
      name: row.name,
      destinationUrl: row.destination_url,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  } catch (err) {
    console.warn('DB query failed, falling back to memory store:', err.message);
    const mockItem = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      publicId,
      name,
      destinationUrl,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryStore.set(publicId, mockItem);
    return mockItem;
  }
}

export async function getDynamicQrByPublicId(publicId) {
  try {
    const query = `
      SELECT id, public_id, name, destination_url, is_active, created_at, updated_at
      FROM dynamic_qr_codes
      WHERE public_id = $1
    `;
    const res = await pool.query(query, [publicId]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      publicId: row.public_id,
      name: row.name,
      destinationUrl: row.destination_url,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  } catch {
    const item = memoryStore.get(publicId);
    return item || null;
  }
}

export async function updateDynamicQrDestination(publicId, destinationUrl) {
  try {
    const query = `
      UPDATE dynamic_qr_codes
      SET destination_url = $1, updated_at = CURRENT_TIMESTAMP
      WHERE public_id = $2
      RETURNING id, public_id, name, destination_url, is_active, created_at, updated_at
    `;
    const res = await pool.query(query, [destinationUrl, publicId]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      publicId: row.public_id,
      name: row.name,
      destinationUrl: row.destination_url,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  } catch {
    const item = memoryStore.get(publicId);
    if (!item) return null;
    item.destinationUrl = destinationUrl;
    item.updatedAt = new Date();
    memoryStore.set(publicId, item);
    return item;
  }
}

export async function updateDynamicQrStatus(publicId, isActive) {
  try {
    const query = `
      UPDATE dynamic_qr_codes
      SET is_active = $1, updated_at = CURRENT_TIMESTAMP
      WHERE public_id = $2
      RETURNING id, public_id, name, destination_url, is_active, created_at, updated_at
    `;
    const res = await pool.query(query, [isActive, publicId]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      publicId: row.public_id,
      name: row.name,
      destinationUrl: row.destination_url,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  } catch {
    const item = memoryStore.get(publicId);
    if (!item) return null;
    item.isActive = Boolean(isActive);
    item.updatedAt = new Date();
    memoryStore.set(publicId, item);
    return item;
  }
}
