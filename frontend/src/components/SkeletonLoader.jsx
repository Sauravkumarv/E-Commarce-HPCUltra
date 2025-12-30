import { memo } from 'react';

/**
 * Skeleton Loader Component
 * Lightweight, performant loading states
 */
export const ProductCardSkeleton = memo(() => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
});

ProductCardSkeleton.displayName = 'ProductCardSkeleton';

export const HeroSkeleton = memo(() => {
  return (
    <section className="relative h-[600px] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="w-full md:w-1/2 space-y-6 animate-pulse">
          <div className="h-8 bg-white/20 rounded-full w-40"></div>
          <div className="h-12 bg-white/20 rounded w-3/4"></div>
          <div className="h-6 bg-white/20 rounded w-1/2"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-white/20 rounded w-32"></div>
            <div className="h-12 bg-white/20 rounded w-32"></div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSkeleton.displayName = 'HeroSkeleton';

