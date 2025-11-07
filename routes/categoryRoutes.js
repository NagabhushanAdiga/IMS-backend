import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';
import { categoryValidation, validate } from '../middleware/validator.js';

const router = express.Router();

router.route('/')
  .get(protect, getCategories)
  .post(protect, categoryValidation, validate, createCategory);

router.route('/:id')
  .get(protect, getCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

export default router;

