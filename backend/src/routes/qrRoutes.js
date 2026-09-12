import { Router } from 'express';
import {
  createQrController,
  getQrController,
  updateDestinationController,
  updateStatusController,
} from '../controllers/qrController.js';

const router = Router();

router.post('/', createQrController);
router.get('/:publicId', getQrController);
router.patch('/:publicId', updateDestinationController);
router.patch('/:publicId/status', updateStatusController);

export default router;
