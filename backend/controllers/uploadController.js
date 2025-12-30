import { uploadImages } from '../utils/cloudinary.js';

/**
 * @desc    Upload multiple product images
 * @route   POST /api/upload/images
 * @access  Private/Admin
 */
export const uploadProductImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images provided' });
    }

    const imageUrls = await uploadImages(req.files);

    res.json({
      success: true,
      images: imageUrls,
      count: imageUrls.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
};

