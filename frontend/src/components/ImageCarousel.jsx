import { useState, useCallback, memo } from 'react';

/**
 * ImageCarousel component for displaying multiple product images
 * Lightweight carousel with CSS transitions only
 * Optimized with React.memo and useCallback
 */
const ImageCarousel = memo(({ images, alt = 'Product image' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle previous image
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Handle next image
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="relative">
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                currentIndex === index
                  ? 'border-primary-600 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

ImageCarousel.displayName = 'ImageCarousel';

export default ImageCarousel;

