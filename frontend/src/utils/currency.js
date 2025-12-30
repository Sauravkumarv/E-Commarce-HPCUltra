/**
 * Currency Utility Functions
 * Formats prices in Indian Rupees (₹)
 */

/**
 * Format number to Indian currency format
 * @param {number} amount - The amount to format
 * @param {boolean} showDecimals - Whether to show decimal places (default: true)
 * @returns {string} Formatted currency string (e.g., "₹4,999.00")
 */
export const formatCurrency = (amount, showDecimals = true) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0';
  }

  const numAmount = parseFloat(amount);
  
  // Format with Indian number system (lakhs, crores)
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(numAmount);

  return formatted;
};

/**
 * Format currency without symbol (just number with commas)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted number string (e.g., "4,999.00")
 */
export const formatAmount = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0';
  }

  const numAmount = parseFloat(amount);
  
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
};

export default formatCurrency;

