/**
 * Application constants
 */

// Pagination
export const PRODUCTS_PER_PAGE = 12;

// Sort options
export const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt', label: 'Oldest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A to Z' },
];

// Rating options for filter
export const RATING_OPTIONS = [
  { value: '4', label: '4+ Stars' },
  { value: '3', label: '3+ Stars' },
  { value: '2', label: '2+ Stars' },
  { value: '1', label: '1+ Stars' },
];

// Price range steps
export const PRICE_STEPS = [0, 25, 50, 100, 200, 500, 1000];

