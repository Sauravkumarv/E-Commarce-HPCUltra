import { useState, useEffect, useCallback, memo } from 'react';
import { useQueryParams } from '../hooks/useQueryParams';
import { productService } from '../services/productService';
import { RATING_OPTIONS } from '../utils/constants';

/**
 * FilterSidebar component for product filtering
 * Optimized with React.memo and useCallback
 */
const FilterSidebar = memo(({ isOpen, onClose }) => {
  const { params, updateParam, removeParam } = useQueryParams();
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    brands: [],
    priceRange: { minPrice: 0, maxPrice: 1000 },
  });
  const [loading, setLoading] = useState(true);

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await productService.getFilterOptions();
        setFilterOptions(res.data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Handle filter changes
  const handleCategoryChange = useCallback(
    (category) => {
      if (params.category === category) {
        removeParam('category');
      } else {
        updateParam('category', category);
      }
    },
    [params.category, updateParam, removeParam]
  );

  const handleBrandChange = useCallback(
    (brand) => {
      if (params.brand === brand) {
        removeParam('brand');
      } else {
        updateParam('brand', brand);
      }
    },
    [params.brand, updateParam, removeParam]
  );

  const handlePriceChange = useCallback(
    (type, value) => {
      const minPrice = type === 'min' ? value : params.minPrice || filterOptions.priceRange.minPrice;
      const maxPrice = type === 'max' ? value : params.maxPrice || filterOptions.priceRange.maxPrice;

      if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
        return; // Invalid range
      }

      if (type === 'min') {
        updateParam('minPrice', value || null);
      } else {
        updateParam('maxPrice', value || null);
      }
    },
    [params.minPrice, params.maxPrice, filterOptions.priceRange, updateParam]
  );

  const handleStockChange = useCallback(
    (value) => {
      if (params.inStock === value) {
        removeParam('inStock');
      } else {
        updateParam('inStock', value);
      }
    },
    [params.inStock, updateParam, removeParam]
  );

  const handleRatingChange = useCallback(
    (rating) => {
      if (params.minRating === rating) {
        removeParam('minRating');
      } else {
        updateParam('minRating', rating);
      }
    },
    [params.minRating, updateParam, removeParam]
  );

  const handleClearFilters = useCallback(() => {
    removeParam('category');
    removeParam('brand');
    removeParam('minPrice');
    removeParam('maxPrice');
    removeParam('inStock');
    removeParam('minRating');
  }, [removeParam]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-white shadow-lg z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } overflow-y-auto`}
        aria-label="Product filters"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
              aria-label="Close filters"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={handleClearFilters}
            className="w-full mb-6 px-4 py-2 text-sm text-primary-600 hover:text-primary-700 border border-primary-600 rounded-md transition-colors"
          >
            Clear All Filters
          </button>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
            <div className="space-y-2">
              {filterOptions.categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer hover:text-primary-600 transition-colors"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={params.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          {filterOptions.brands.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Brand</h3>
              <div className="space-y-2">
                {filterOptions.brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center cursor-pointer hover:text-primary-600 transition-colors"
                  >
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={params.brand === brand}
                      onChange={() => handleBrandChange(brand)}
                      className="mr-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={params.minPrice || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  placeholder={filterOptions.priceRange.minPrice}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={params.maxPrice || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  placeholder={filterOptions.priceRange.maxPrice}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Stock Availability Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer hover:text-primary-600 transition-colors">
                <input
                  type="radio"
                  name="stock"
                  value="true"
                  checked={params.inStock === 'true'}
                  onChange={() => handleStockChange('true')}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center cursor-pointer hover:text-primary-600 transition-colors">
                <input
                  type="radio"
                  name="stock"
                  value="false"
                  checked={params.inStock === 'false'}
                  onChange={() => handleStockChange('false')}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Out of Stock</span>
              </label>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {RATING_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center cursor-pointer hover:text-primary-600 transition-colors"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={option.value}
                    checked={params.minRating === option.value}
                    onChange={() => handleRatingChange(option.value)}
                    className="mr-2 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar;

