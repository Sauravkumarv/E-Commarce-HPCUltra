/**
 * Brand Configuration File
 * Centralized branding for the entire application
 * Update this file to change branding across the app
 */

export const brandConfig = {
  // Brand Name
  name: 'HPC Ultra',
  
  // Logo (can be image URL or text)
  logo: {
    type: 'text', // 'text' or 'image'
    text: 'HPC Ultra',
    imageUrl: '', // If type is 'image', provide URL here
    alt: 'HPC Ultra Logo',
  },
  
  // Favicon
  favicon: '/favicon.ico',
  
  // Brand Colors
  colors: {
    primary: '#2563eb', // primary-600
    primaryDark: '#1e40af', // primary-800
    primaryLight: '#3b82f6', // primary-500
  },
  
  // Footer Brand Text
  footerText: 'HPC Ultra - Premium E-Commerce Experience',
  
  // Email Branding
  email: {
    fromName: 'HPC Ultra',
    fromEmail: 'noreply@hpcultra.com',
  },
  
  // Social Links (optional)
  social: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  },
};

// Export default for easy import
export default brandConfig;

