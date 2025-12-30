import express from 'express';
import { uploadProductImages } from '../controllers/uploadController.js';
import { upload } from '../utils/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Upload multiple images (max 10 images)
router.post(
  '/images',
  protect,
  admin,
  upload.array('images', 10),
  uploadProductImages
);

export default router;

