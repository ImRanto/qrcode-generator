const db = require('../config/db');

/**
  Handles public QR scan redirects (`GET /r/:publicId`).
  1. Searches database for public_id.
  2. Verifies entry exists.
  3. Verifies QR is active (`is_active = true`).
  4. Issues HTTP 302 redirect to destination_url.
 */
const redirectDynamicQR = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    const query = `
      SELECT destination_url, is_active
      FROM dynamic_qr_codes
      WHERE public_id = $1
    `;

    const { rows } = await db.query(query, [publicId]);

    if (rows.length === 0) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>QR Code Not Found</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0F172A; color: #F8FAFC; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
            .card { background: #1E293B; padding: 2rem; border-radius: 1rem; max-width: 400px; border: 1px solid #334155; }
            h1 { font-size: 1.25rem; margin-bottom: 0.5rem; }
            p { color: #94A3B8; font-size: 0.875rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>QR Code Not Found</h1>
            <p>The requested dynamic QR code does not exist or has been removed.</p>
          </div>
        </body>
        </html>
      `);
    }

    const { destination_url, is_active } = rows[0];

    if (!is_active) {
      return res.status(410).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>QR Code Inactive</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0F172A; color: #F8FAFC; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
            .card { background: #1E293B; padding: 2rem; border-radius: 1rem; max-width: 400px; border: 1px solid #334155; }
            h1 { font-size: 1.25rem; margin-bottom: 0.5rem; color: #F87171; }
            p { color: #94A3B8; font-size: 0.875rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>QR Code Disabled</h1>
            <p>This dynamic QR code has been temporarily disabled by its owner.</p>
          </div>
        </body>
        </html>
      `);
    }

    // Perform HTTP 302 Found redirect
    return res.redirect(302, destination_url);
  } catch (err) {
    next(err);
  }
};

module.exports = { redirectDynamicQR };
