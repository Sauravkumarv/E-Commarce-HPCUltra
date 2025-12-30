import { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currency';

/**
 * Individual Slide Component for Hero Carousel
 * Optimized with React.memo
 */
const Slide = memo(({ product, isActive }) => {
  const primaryImage = product.images?.[0] || product.image || '';

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
      aria-hidden={!isActive}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover"
          loading={isActive ? 'eager' : 'lazy'}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 bg-primary-900/20"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center z-20">
        <div className="w-full md:w-1/2 lg:w-2/5 space-y-6 text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Featured Product
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
            {product.name}
          </h1>

          {/* Sub-headline / Description */}
          <p className="text-lg md:text-xl text-gray-200 line-clamp-2 animate-fade-in">
            {product.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 animate-fade-in">
            {product.brand && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Premium {product.brand}</span>
              </div>
            )}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span>{product.rating.toFixed(1)} Rating</span>
              </div>
            )}
            {product.stock > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>In Stock</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 animate-fade-in">
            <span className="text-4xl md:text-5xl font-bold">{formatCurrency(product.price)}</span>
          </div>

          {/* CTA Button */}
          <div className="pt-2 animate-fade-in">
            <Link
              to={`/product/${product._id}`}
              className="inline-block px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

Slide.displayName = 'Slide';

export default Slide;

