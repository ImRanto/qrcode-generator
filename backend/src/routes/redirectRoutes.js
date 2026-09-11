const express = require('express');
const router = express.Router();
const { redirectDynamicQR } = require('../controllers/redirectController');

// Public Redirection Endpoint
router.get('/r/:publicId', redirectDynamicQR);

module.exports = router;
