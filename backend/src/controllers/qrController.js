const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
  Generates a short, clean, URL-safe public_id (8 characters).
 */
const generatePublicId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Health Check Endpoint
const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
};

// Create a Dynamic QR Code
const createDynamicQR = async (req, res, next) => {
  try {
    const { name, destinationUrl } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Name is required.',
      });
    }

    const publicId = generatePublicId();
    const baseUrl = process.env.QR_BASE_URL || 'http://localhost:5000/r';
    const qrUrl = `${baseUrl}/${publicId}`;

    const query = `
      INSERT INTO dynamic_qr_codes (name, destination_url, public_id)
      VALUES ($1, $2, $3)
      RETURNING id, public_id, name, destination_url, is_active, created_at, updated_at
    `;

    const { rows } = await db.query(query, [name.trim(), destinationUrl, publicId]);
    const record = rows[0];

    return res.status(201).json({
      success: true,
      data: {
        id: record.id,
        publicId: record.public_id,
        name: record.name,
        destinationUrl: record.destination_url,
        isActive: record.is_active,
        qrUrl,
        createdAt: record.created_at,
        updatedAt: record.updated_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Retrieve Dynamic QR Details by publicId
const getDynamicQR = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    const query = `
      SELECT id, public_id, name, destination_url, is_active, created_at, updated_at
      FROM dynamic_qr_codes
      WHERE public_id = $1
    `;

    const { rows } = await db.query(query, [publicId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Dynamic QR code not found.',
      });
    }

    const record = rows[0];
    const baseUrl = process.env.QR_BASE_URL || 'http://localhost:5000/r';

    return res.status(200).json({
      success: true,
      data: {
        id: record.id,
        publicId: record.public_id,
        name: record.name,
        destinationUrl: record.destination_url,
        isActive: record.is_active,
        qrUrl: `${baseUrl}/${record.public_id}`,
        createdAt: record.created_at,
        updatedAt: record.updated_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update Dynamic QR Destination URL
const updateDestination = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    const { destinationUrl } = req.body;

    const query = `
      UPDATE dynamic_qr_codes
      SET destination_url = $1, updated_at = CURRENT_TIMESTAMP
      WHERE public_id = $2
      RETURNING id, public_id, name, destination_url, is_active, created_at, updated_at
    `;

    const { rows } = await db.query(query, [destinationUrl, publicId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Dynamic QR code not found.',
      });
    }

    const record = rows[0];
    const baseUrl = process.env.QR_BASE_URL || 'http://localhost:5000/r';

    return res.status(200).json({
      success: true,
      data: {
        id: record.id,
        publicId: record.public_id,
        name: record.name,
        destinationUrl: record.destination_url,
        isActive: record.is_active,
        qrUrl: `${baseUrl}/${record.public_id}`,
        createdAt: record.created_at,
        updatedAt: record.updated_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Toggle Dynamic QR Active Status
const toggleStatus = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'isActive boolean field is required.',
      });
    }

    const query = `
      UPDATE dynamic_qr_codes
      SET is_active = $1, updated_at = CURRENT_TIMESTAMP
      WHERE public_id = $2
      RETURNING id, public_id, name, destination_url, is_active, created_at, updated_at
    `;

    const { rows } = await db.query(query, [isActive, publicId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Dynamic QR code not found.',
      });
    }

    const record = rows[0];

    return res.status(200).json({
      success: true,
      data: {
        id: record.id,
        publicId: record.public_id,
        name: record.name,
        destinationUrl: record.destination_url,
        isActive: record.is_active,
        updatedAt: record.updated_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  healthCheck,
  createDynamicQR,
  getDynamicQR,
  updateDestination,
  toggleStatus,
};
