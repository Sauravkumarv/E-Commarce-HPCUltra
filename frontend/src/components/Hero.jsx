import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { productService } from '../services/productService';
import Slide from './Slide';

/**
 * Premium Hero Section with Auto-Sliding Carousel
 * CSS-only animations, no heavy libraries
 * Optimized for performance with React.memo
 */
const Hero = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  // Fetch featured products (latest 4)
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await productService.getProducts({ limit: 4, sort: '-createdAt' });
        const products = res.data.products || res.data || [];
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Auto-slide functionality with requestAnimationFrame for smooth transitions
  useEffect(() => {
    if (isPaused || featuredProducts.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000); // 5 seconds per slide

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, featuredProducts.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  }, [featuredProducts.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  }, [featuredProducts.length]);

  if (loading || featuredProducts.length === 0) {
    return (
      <section className="relative h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="w-full md:w-1/2 space-y-6 animate-pulse">
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
  }

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured product carousel"
    >
      {/* Slides */}
      {featuredProducts.map((product, index) => (
        <Slide
          key={product._id}
          product={product}
          isActive={index === currentSlide}
        />
      ))}

      {/* Navigation Dots - Subtle, invisible navigation like premium websites */}
      {featuredProducts.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                currentSlide === index
                  ? 'w-6 bg-white/80'
                  : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;

