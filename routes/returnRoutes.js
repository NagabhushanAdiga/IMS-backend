import express from 'express';
import {
  getReturns,
  createReturn,
  getReturnStats,
  getReturnedProducts
} from '../controllers/returnController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, getReturnStats);
router.get('/products', protect, getReturnedProducts);
router.route('/')
  .get(protect, getReturns)
  .post(protect, createReturn);

export default router;

