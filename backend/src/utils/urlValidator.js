/**
 * Validates a destination URL for safety and correctness.
 * Rejects empty strings, invalid formats, and unsafe schemes (javascript:, data:, file:).
 */
export function isValidDestinationUrl(urlStr) {
  if (!urlStr || typeof urlStr !== 'string') return false;
  const trimmed = urlStr.trim();

  // Explicitly block dangerous schemes
  if (/^(javascript|data|file|vbscript):/i.test(trimmed)) {
    return false;
  }

  try {
    const formatted = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(formatted);
    return Boolean(parsed.hostname && (parsed.protocol === 'http:' || parsed.protocol === 'https:'));
  } catch {
    return false;
  }
}

/**
 * Ensures the destination URL has a valid http/https protocol prefix.
 */
export function formatDestinationUrl(urlStr) {
  const trimmed = urlStr.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
