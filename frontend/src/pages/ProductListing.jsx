import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQueryParams } from '../hooks/useQueryParams';
import { productService } from '../services/productService';
import { PRODUCTS_PER_PAGE, SORT_OPTIONS } from '../utils/constants';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';

/**
 * Product Listing Page (with search and filters)
 * Separated from homepage for better performance
 */
const ProductListing = () => {
  const { params, updateParam } = useQueryParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);

  // Build query params from URL
  const queryParams = useMemo(() => {
    const query = {
      page: params.page || 1,
      limit: PRODUCTS_PER_PAGE,
      sort: params.sort || '-createdAt',
    };

    if (params.search) query.search = params.search;
    if (params.category) query.category = params.category;
    if (params.brand) query.brand = params.brand;
    if (params.minPrice) query.minPrice = params.minPrice;
    if (params.maxPrice) query.maxPrice = params.maxPrice;
    if (params.inStock) query.inStock = params.inStock;
    if (params.minRating) query.minRating = params.minRating;

    return query;
  }, [params]);

  // Fetch products when query params change
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await productService.getProducts(queryParams);
      
      if (res.data.products) {
        setProducts(res.data.products);
        setPagination(res.data.pagination);
      } else {
        setProducts(Array.isArray(res.data) ? res.data : []);
        setPagination({
          page: 1,
          pages: 1,
          total: Array.isArray(res.data) ? res.data.length : 0,
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSortChange = useCallback(
    (e) => {
      updateParam('sort', e.target.value);
    },
    [updateParam]
  );

  const handlePageChange = useCallback(
    (newPage) => {
      updateParam('page', newPage.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [updateParam]
  );

  const toggleFilterSidebar = useCallback(() => {
    setFilterSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        {/* <div className="mb-6">
          <SearchBar />
        </div> */}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar isOpen={filterSidebarOpen} onClose={toggleFilterSidebar} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <button
                onClick={toggleFilterSidebar}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Toggle filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-700 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={params.sort || '-createdAt'}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!loading && (
              <div className="mb-4 text-sm text-gray-600">
                Showing {products.length} of {pagination.total} products
                {pagination.pages > 1 && ` (Page ${pagination.page} of ${pagination.pages})`}
              </div>
            )}

            <ProductGrid products={products} loading={loading} />

            {!loading && pagination.pages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  aria-label="Previous page"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {[...Array(pagination.pages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.pages ||
                      (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            pagination.page === pageNum
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={pagination.page === pageNum ? 'page' : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === pagination.page - 2 ||
                      pageNum === pagination.page + 2
                    ) {
                      return <span key={pageNum} className="px-2">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;

