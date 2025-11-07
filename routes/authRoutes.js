import express from 'express';
import { login, getProfile, updatePin } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/pin', protect, updatePin);

export default router;

