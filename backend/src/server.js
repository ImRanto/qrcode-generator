const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const qrRoutes = require('./routes/qrRoutes');
const redirectRoutes = require('./routes/redirectRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());

// API & Redirection Routes
app.use('/api', qrRoutes);
app.use('/', redirectRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Express Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`QR Generator Backend Running!`);
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Base Redirect URL: ${process.env.QR_BASE_URL || `http://localhost:${PORT}/r`}`);
    console.log(`=================================`);
  });
}

module.exports = app;
