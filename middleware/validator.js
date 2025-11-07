import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('sku').trim().notEmpty().withMessage('SKU is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('totalStock').isInt({ min: 0 }).withMessage('Total stock must be a positive number'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
];

export const categoryValidation = [
  body('name').trim().notEmpty().withMessage('Category name is required'),
];

export const saleValidation = [
  body('customer').trim().notEmpty().withMessage('Customer name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('items').isInt({ min: 1 }).withMessage('Items must be at least 1'),
  body('total').isFloat({ min: 0 }).withMessage('Total must be a positive number'),
];

