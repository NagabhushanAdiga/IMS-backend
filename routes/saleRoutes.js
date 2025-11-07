import express from 'express';
import {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale
} from '../controllers/saleController.js';
import { protect } from '../middleware/auth.js';
import { saleValidation, validate } from '../middleware/validator.js';

const router = express.Router();

router.route('/')
  .get(protect, getSales)
  .post(protect, saleValidation, validate, createSale);

router.route('/:id')
  .get(protect, getSale)
  .put(protect, updateSale)
  .delete(protect, deleteSale);

export default router;

