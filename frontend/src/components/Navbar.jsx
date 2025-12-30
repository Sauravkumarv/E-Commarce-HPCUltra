import { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import NavbarSearch from './NavbarSearch';
import ProfileMenu from './ProfileMenu';
import brandConfig from '../config/brandConfig';

/**
 * Premium Navbar with Scroll Behavior
 * Fixed, sticky navbar with smooth hide/show on scroll
 * Accessible and performant
 */
const Navbar = memo(() => {
  const { getCartItemsCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile search when clicking outside
  useEffect(() => {
    if (isMobileSearchExpanded) {
      const handleClickOutside = (e) => {
        if (!e.target.closest('.navbar-search-container')) {
          setIsMobileSearchExpanded(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileSearchExpanded]);

  const cartCount = getCartItemsCount();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm shadow-sm'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left */}
          <Link
            to="/"
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-primary-500 rounded z-10"
            aria-label="HPC Ultra Home"
          >
            <div className="relative">
              {brandConfig.logo.type === 'image' && brandConfig.logo.imageUrl ? (
                <img
                  src={brandConfig.logo.imageUrl}
                  alt={brandConfig.logo.alt}
                  className="h-8 md:h-10 w-auto"
                />
              ) : (
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-primary-900 transition-all">
                  {brandConfig.name}
                </span>
              )}
            </div>
          </Link>

          {/* Search Bar - Center (Desktop) */}
          <NavbarSearch
            isMobileExpanded={isMobileSearchExpanded}
            onMobileToggle={() => setIsMobileSearchExpanded(!isMobileSearchExpanded)}
          />

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-3 z-10">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-all hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Profile Menu */}
            <ProfileMenu
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              onToggle={() => setIsProfileOpen(!isProfileOpen)}
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;


