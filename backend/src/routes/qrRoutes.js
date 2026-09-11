const express = require('express');
const router = express.Router();
const {
  healthCheck,
  createDynamicQR,
  getDynamicQR,
  updateDestination,
  toggleStatus,
} = require('../controllers/qrController');
const { validateDestinationUrl } = require('../middleware/validateUrl');

// Health Check
router.get('/health', healthCheck);

// Create Dynamic QR
router.post('/qr', validateDestinationUrl, createDynamicQR);

// Get Dynamic QR details
router.get('/qr/:publicId', getDynamicQR);

// Update Destination URL
router.patch('/qr/:publicId', validateDestinationUrl, updateDestination);

// Toggle Active/Inactive Status
router.patch('/qr/:publicId/status', toggleStatus);

module.exports = router;
