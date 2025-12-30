import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

/**
 * Custom hook for managing URL query parameters
 * Provides easy access to query params and functions to update them
 */
export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get all query params as an object
  const params = useMemo(() => {
    const paramsObj = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    return paramsObj;
  }, [searchParams]);

  // Update a single query parameter
  const updateParam = useCallback(
    (key, value) => {
      const newParams = new URLSearchParams(searchParams);
      if (value === null || value === '' || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      // Reset to page 1 when filters change
      if (key !== 'page') {
        newParams.delete('page');
      }
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Update multiple query parameters at once
  const updateParams = useCallback(
    (updates) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '' || value === undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      // Reset to page 1 when filters change
      if (!updates.page) {
        newParams.delete('page');
      }
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Remove a query parameter
  const removeParam = useCallback(
    (key) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Clear all query parameters
  const clearParams = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    params,
    searchParams,
    updateParam,
    updateParams,
    removeParam,
    clearParams,
  };
};

