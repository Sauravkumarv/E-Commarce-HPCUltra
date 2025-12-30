import api from './api';

/**
 * Upload service for handling image uploads
 */
export const uploadService = {
  /**
   * Upload multiple product images
   * @param {FormData} formData - FormData containing image files
   * @returns {Promise} API response with image URLs
   */
  uploadImages: async (formData) => {
    return api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

