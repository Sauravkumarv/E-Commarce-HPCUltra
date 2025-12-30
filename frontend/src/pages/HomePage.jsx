import { useQueryParams } from '../hooks/useQueryParams';
import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import { HeroSkeleton } from '../components/SkeletonLoader';
import {
  FeaturedProducts,
  CategoriesGrid,
  WhyChooseUs,
  BestSellers,
  NewsletterSignup,
} from '../components/HomeSections';

// Lazy load the search/filter page
const ProductListing = lazy(() => import('./ProductListing'));

/**
 * Main Homepage Component
 * Combines Hero section with product listing
 * Uses URL params to determine if showing full listing or homepage
 */
const HomePage = () => {
  const { params } = useQueryParams();
  
  // Check if we're on the homepage (no search/filter params) or product listing page
  const hasFilters = params.search || 
                     params.category || 
                     params.brand || 
                     (params.page && params.page !== '1');

  // If filters are active, show product listing
  if (hasFilters) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ProductListing />
      </Suspense>
    );
  }

  // Otherwise show full homepage with hero and sections
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* Homepage Sections */}
      <FeaturedProducts />
      <CategoriesGrid />
      <WhyChooseUs />
      <BestSellers />
      <NewsletterSignup />
    </div>
  );
};

export default HomePage;

