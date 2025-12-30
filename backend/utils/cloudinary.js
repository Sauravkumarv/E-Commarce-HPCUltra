import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage (we'll upload directly to Cloudinary)
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

/**
 * Upload buffer to Cloudinary
 * @param {Buffer} buffer - Image buffer
 * @param {string} mimetype - MIME type of the image
 * @returns {Promise<string>} Secure URL of uploaded image
 */
const uploadBuffer = (buffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'hpcultra/products',
        format: 'webp',
        transformation: [
          {
            quality: 'auto:good',
            fetch_format: 'auto',
          },
        ],
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

/**
 * Upload multiple images to Cloudinary
 * @param {Array} files - Array of file objects from multer
 * @returns {Promise<Array>} Array of image URLs
 */
export const uploadImages = async (files) => {
  try {
    const uploadPromises = files.map((file) => {
      return uploadBuffer(file.buffer, file.mimetype);
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} imageUrl - URL of the image to delete
 */
export const deleteImage = async (imageUrl) => {
  try {
    // Extract public_id from URL
    const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error - image deletion is not critical
  }
};

export default cloudinary;

