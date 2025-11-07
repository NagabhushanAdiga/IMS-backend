import express from 'express';
import {
  getReturns,
  createReturn,
  getReturnStats
} from '../controllers/returnController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, getReturnStats);
router.route('/')
  .get(protect, getReturns)
  .post(protect, createReturn);

export default router;

