import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { productValidation, validate } from '../middleware/validator.js';

const router = express.Router();

router.get('/stats', protect, getProductStats);
router.route('/')
  .get(protect, getProducts)
  .post(protect, productValidation, validate, createProduct);

router.route('/:id')
  .get(protect, getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;

