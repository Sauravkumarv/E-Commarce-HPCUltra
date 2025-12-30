import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useQueryParams } from '../hooks/useQueryParams';
import { useDebounce } from '../hooks/useDebounce';

/**
 * Navbar Search Component
 * Integrated search bar for navbar
 * Mobile: Icon expands to full-width input
 * Desktop: Always visible in center
 */
const NavbarSearch = memo(({ isMobileExpanded, onMobileToggle }) => {
  const { params, updateParam } = useQueryParams();
  const [searchInput, setSearchInput] = useState(params.search || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  
  // Debounce search input (300ms delay)
  const debouncedSearch = useDebounce(searchInput, 300);

  // Update URL param when debounced value changes
  useEffect(() => {
    updateParam('search', debouncedSearch);
  }, [debouncedSearch, updateParam]);

  // Focus input when mobile expands
  useEffect(() => {
    if (isMobileExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileExpanded]);

  const handleChange = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchInput('');
    updateParam('search', '');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [updateParam]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <>
      {/* Mobile: Icon button (when not expanded) */}
      {!isMobileExpanded && (
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          aria-label="Open search"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}

      {/* Mobile: Expanded search input */}
      {isMobileExpanded && (
        <div className="lg:hidden absolute inset-0 bg-white px-4 flex items-center z-50">
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              value={searchInput}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 pr-10 border-2 border-primary-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Search products"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchInput && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={onMobileToggle}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Desktop: Always visible search bar */}
      <div className="hidden lg:block flex-1 max-w-2xl mx-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchInput}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search products by name or category..."
            className={`w-full px-4 py-2 pl-10 pr-10 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              isFocused || searchInput
                ? 'border-primary-500 bg-white'
                : 'border-gray-300 bg-gray-50'
            }`}
            aria-label="Search products"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchInput && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
});

NavbarSearch.displayName = 'NavbarSearch';

export default NavbarSearch;

