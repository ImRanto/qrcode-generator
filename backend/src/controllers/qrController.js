import {
  createDynamicQr,
  getDynamicQrByPublicId,
  updateDynamicQrDestination,
  updateDynamicQrStatus,
} from '../services/qrService.js';
import { isValidDestinationUrl, formatDestinationUrl } from '../utils/urlValidator.js';

const getQrBaseUrl = () => process.env.QR_BASE_URL || 'http://localhost:5000/r';

export async function createQrController(req, res, next) {
  try {
    const { name, destinationUrl } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Name is required and must be a non-empty string.',
      });
    }

    if (!destinationUrl || !isValidDestinationUrl(destinationUrl)) {
      return res.status(400).json({
        success: false,
        error: 'A valid destination URL (http:// or https://) is required.',
      });
    }

    const formattedUrl = formatDestinationUrl(destinationUrl);
    const result = await createDynamicQr({
      name: name.trim(),
      destinationUrl: formattedUrl,
    });

    return res.status(201).json({
      success: true,
      data: {
        id: result.id,
        publicId: result.publicId,
        name: result.name,
        destinationUrl: result.destinationUrl,
        isActive: result.isActive,
        qrUrl: `${getQrBaseUrl()}/${result.publicId}`,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getQrController(req, res, next) {
  try {
    const { publicId } = req.params;
    const result = await getDynamicQrByPublicId(publicId);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Dynamic QR Code not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: result.id,
        publicId: result.publicId,
        name: result.name,
        destinationUrl: result.destinationUrl,
        isActive: result.isActive,
        qrUrl: `${getQrBaseUrl()}/${result.publicId}`,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateDestinationController(req, res, next) {
  try {
    const { publicId } = req.params;
    const { destinationUrl } = req.body;

    if (!destinationUrl || !isValidDestinationUrl(destinationUrl)) {
      return res.status(400).json({
        success: false,
        error: 'A valid destination URL (http:// or https://) is required.',
      });
    }

    const formattedUrl = formatDestinationUrl(destinationUrl);
    const result = await updateDynamicQrDestination(publicId, formattedUrl);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Dynamic QR Code not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: result.id,
        publicId: result.publicId,
        name: result.name,
        destinationUrl: result.destinationUrl,
        isActive: result.isActive,
        qrUrl: `${getQrBaseUrl()}/${result.publicId}`,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateStatusController(req, res, next) {
  try {
    const { publicId } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'isActive boolean property is required (true or false).',
      });
    }

    const result = await updateDynamicQrStatus(publicId, isActive);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Dynamic QR Code not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: result.id,
        publicId: result.publicId,
        name: result.name,
        destinationUrl: result.destinationUrl,
        isActive: result.isActive,
        qrUrl: `${getQrBaseUrl()}/${result.publicId}`,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function redirectController(req, res, next) {
  try {
    const { publicId } = req.params;
    const result = await getDynamicQrByPublicId(publicId);

    if (!result) {
      return res.status(404).send('QR Code Not Found');
    }

    if (!result.isActive) {
      return res.status(410).send('This Dynamic QR Code is currently disabled.');
    }

    // HTTP 302 Redirect to destination
    return res.redirect(302, result.destinationUrl);
  } catch (err) {
    next(err);
  }
}
