/**
  Validates destination URLs for dynamic QR codes.
  Ensures URL is well-formed, uses http/https, and blocks unsafe schemes like javascript:, data:, or file:.
 */
const validateDestinationUrl = (req, res, next) => {
  const { destinationUrl } = req.body;

  if (!destinationUrl || typeof destinationUrl !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'destinationUrl is required and must be a string.',
    });
  }

  const trimmed = destinationUrl.trim();

  // Block dangerous schemes explicitly
  if (/^(javascript|data|file|vbscript):/i.test(trimmed)) {
    return res.status(400).json({
      success: false,
      error: 'Unsafe URL scheme detected. Only HTTP and HTTPS destinations are permitted.',
    });
  }

  // Ensure valid URL
  try {
    const formatted = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(formatted);
    if (!parsed.hostname || !['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    req.body.destinationUrl = formatted;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid destination URL (e.g. https://example.com).',
    });
  }
};

module.exports = { validateDestinationUrl };
