import api from './api';

/**
 * Product service for API calls
 * Centralized product-related API functions
 */

export const productService = {
  /**
   * Get products with search, filters, and pagination
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getProducts: (params = {}) => {
    return api.get('/products', { params });
  },

  /**
   * Get single product by ID
   * @param {string} id - Product ID
   * @returns {Promise} API response
   */
  getProduct: (id) => {
    return api.get(`/products/${id}`);
  },

  /**
   * Get filter options (categories, brands, price range)
   * @returns {Promise} API response
   */
  getFilterOptions: () => {
    return api.get('/products/filters');
  },

  /**
   * Create new product (Admin only)
   * @param {Object} data - Product data
   * @returns {Promise} API response
   */
  createProduct: (data) => {
    return api.post('/products', data);
  },

  /**
   * Update product (Admin only)
   * @param {string} id - Product ID
   * @param {Object} data - Updated product data
   * @returns {Promise} API response
   */
  updateProduct: (id, data) => {
    return api.put(`/products/${id}`, data);
  },

  /**
   * Delete product (Admin only)
   * @param {string} id - Product ID
   * @returns {Promise} API response
   */
  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  },
};

