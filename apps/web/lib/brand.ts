export const brand = {
  name: "HPC Ultra",
  legalName: "HPC Ultra",
  parentBrand: "SSB Alliance",
  tagline: "A New Look at Life",
  siteUrl: "https://www.hpcultra.com",
  seo: {
    title: "HPC Ultra | Kitchen & Home Appliances",
    description:
      "Shop branded gas stoves, chimneys, water heaters, room heaters, and induction cooktops with an SEO-ready storefront built around the HPC Ultra catalog."
  },
  logo: {
    full: "/brand/logo-full.png",
    square: "/brand/logo-square.png"
  },
  theme: {
    navy: "#1a237e",
    navyDark: "#0d1257",
    navyLight: "#3949ab",
    red: "#d32f2f",
    redDark: "#b71c1c",
    amber: "#ff8f00",
    gold: "#ffc107",
    surface: "#f4f6ff",
    ink: "#1c1f2a"
  },
  contact: {
    phone: "+91 98765 43210",
    email: "care@hpcultra.com",
    city: "New Delhi, India"
  },
  announcement:
    "ULTRA15 - Get 15% off on your first order! Free shipping above Rs.999 | 2-Year Warranty on all products",
  nav: [
    { label: "Home", href: "/" },
    { label: "Gas Stoves", href: "/category/gas-stoves" },
    { label: "Chimneys", href: "/category/chimneys" },
    { label: "Water Heaters", href: "/category/water-heaters" },
    { label: "Room Heaters", href: "/category/room-heaters" },
    { label: "Induction", href: "/category/induction" }
  ],
  trustPoints: [
    "Made for Indian kitchens",
    "Fast delivery across India",
    "Secure checkout and COD support",
    "Installation support on selected appliances"
  ],
  footer: {
    quickLinks: [
      { label: "My Account", href: "/account" },
      { label: "Cart", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
      { label: "Orders", href: "/orders" }
    ],
    supportLinks: [
      { label: "Warranty Support", href: "/account?tab=notifications" },
      { label: "Shipping Info", href: "/checkout" },
      { label: "Track Order", href: "/orders" }
    ],
    paymentLabels: ["Visa", "Mastercard", "UPI", "NetBanking", "COD"]
  }
} as const;

export type BrandConfig = typeof brand;
