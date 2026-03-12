export type CatalogCategory = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  model: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  inventory: number;
  badges: string[];
  features: string[];
  specs: Record<string, string>;
  seoTitle: string;
  seoDescription: string;
  delivery: string;
};

export const categories: CatalogCategory[] = [
  {
    id: "cat-gas-stoves",
    slug: "gas-stoves",
    name: "Gas Stoves",
    tagline: "Toughened glass and multi-burner performance",
    description: "Premium glass-top and stainless steel stoves designed for daily family cooking with stable brass burners.",
    image: "/products/img1.jpg"
  },
  {
    id: "cat-chimneys",
    slug: "chimneys",
    name: "Chimneys",
    tagline: "Quiet suction and modern touch controls",
    description: "Wall-mounted chimneys with strong suction, sleek black finishes, and easy-clean filters for contemporary kitchens.",
    image: "/products/img3.jpg"
  },
  {
    id: "cat-water-heaters",
    slug: "water-heaters",
    name: "Water Heaters",
    tagline: "Instant and storage heating solutions",
    description: "Instant and storage water heaters built around rust-resistant bodies, safety controls, and efficient heating.",
    image: "/products/img7.jpg"
  },
  {
    id: "cat-room-heaters",
    slug: "room-heaters",
    name: "Room Heaters",
    tagline: "Reliable warmth for winter spaces",
    description: "Compact room heaters made for low-maintenance performance, directional warmth, and simple safety-first operation.",
    image: "/products/img9.jpg"
  },
  {
    id: "cat-induction",
    slug: "induction",
    name: "Induction",
    tagline: "Fast electric cooking with precision controls",
    description: "Energy-efficient induction cooktops with preset modes, compact form factors, and durable black-glass surfaces.",
    image: "/products/img10.jpg"
  }
];

export const products: CatalogProduct[] = [
  {
    id: "prod-amay-hd-4",
    slug: "amay-hd-4-burner-glass-top-gas-stove",
    categorySlug: "gas-stoves",
    categoryName: "Gas Stoves",
    name: "Amay HD 4 Burner Glass Top Gas Stove",
    model: "AMAY HD 4B",
    shortDescription: "Heavy-duty four burner stove with brass rings, black toughened glass, and stable pan supports.",
    description:
      "A premium 4-burner glass-top stove engineered for everyday family cooking. It combines multi-size brass burners, reinforced pan supports, ergonomic knobs, and a bold HPC Ultra finish.",
    imageUrl: "/products/img1.jpg",
    gallery: ["/products/img1.jpg", "/products/img2.jpg", "/products/img5.jpg"],
    price: 7499,
    compareAtPrice: 9199,
    rating: 4.7,
    reviewCount: 182,
    inventory: 31,
    badges: ["Best Seller", "Toughened Glass", "Brass Burners"],
    features: ["4 burner layout", "Toughened black glass", "Heavy pan supports", "Easy-clean drip tray"],
    specs: {
      Burners: "4 brass burners",
      Finish: "Black glass top",
      Ignition: "Manual",
      Warranty: "2 years"
    },
    seoTitle: "Amay HD 4 Burner Glass Top Gas Stove | HPC Ultra",
    seoDescription: "Shop the HPC Ultra Amay HD 4 burner glass-top gas stove with brass burners and heavy pan supports.",
    delivery: "Delivery in 3-5 business days"
  },
  {
    id: "prod-ultra-premium-4",
    slug: "ultra-premium-4-burner-black-glass-stove",
    categorySlug: "gas-stoves",
    categoryName: "Gas Stoves",
    name: "Ultra Premium 4 Burner Black Glass Stove",
    model: "UPG 4B",
    shortDescription: "Sleek black finish with circular pan supports and dependable heat distribution.",
    description:
      "Built for modular kitchens, this 4-burner gas stove offers elegant round pan supports, premium brass burners, and a refined front-control layout for smooth daily use.",
    imageUrl: "/products/img2.jpg",
    gallery: ["/products/img2.jpg", "/products/img1.jpg"],
    price: 6899,
    compareAtPrice: 8299,
    rating: 4.5,
    reviewCount: 96,
    inventory: 24,
    badges: ["New Arrival", "Premium Finish"],
    features: ["Designer supports", "Black front knobs", "Scratch-resistant glass", "Wide burner spacing"],
    specs: {
      Burners: "4 brass burners",
      Finish: "Premium black glass",
      Ignition: "Manual",
      Warranty: "2 years"
    },
    seoTitle: "Ultra Premium 4 Burner Black Glass Stove | HPC Ultra",
    seoDescription: "Explore the premium 4 burner black glass stove from HPC Ultra.",
    delivery: "Delivery in 3-5 business days"
  },
  {
    id: "prod-curved-chimney",
    slug: "curved-glass-kitchen-chimney-touch-control",
    categorySlug: "chimneys",
    categoryName: "Chimneys",
    name: "Curved Glass Kitchen Chimney Touch Control",
    model: "CGC 60 TC",
    shortDescription: "Curved glass chimney with touch controls, LED lighting, and low-noise operation.",
    description:
      "An elegant curved-glass kitchen chimney with touch controls and focused extraction performance. Designed to keep the kitchen cleaner while complementing modern interiors.",
    imageUrl: "/products/img3.jpg",
    gallery: ["/products/img3.jpg", "/products/img4.jpg"],
    price: 12999,
    compareAtPrice: 15999,
    rating: 4.6,
    reviewCount: 61,
    inventory: 16,
    badges: ["Touch Control", "LED Lights"],
    features: ["Curved tempered glass", "Touch panel", "Filter clean reminder", "Low-noise motor"],
    specs: {
      Width: "60 cm",
      Control: "Touch",
      Finish: "Black glass",
      Warranty: "1 year comprehensive"
    },
    seoTitle: "Curved Glass Kitchen Chimney Touch Control | HPC Ultra",
    seoDescription: "Buy the HPC Ultra curved glass chimney with touch controls and elegant black finish.",
    delivery: "Installation available in select cities"
  },
  {
    id: "prod-slim-chimney",
    slug: "slim-black-kitchen-chimney",
    categorySlug: "chimneys",
    categoryName: "Chimneys",
    name: "Slim Black Kitchen Chimney",
    model: "SBK 60",
    shortDescription: "Minimal black chimney profile with wide hood and clean front fascia.",
    description:
      "A compact chimney designed for kitchens that need a cleaner silhouette without sacrificing the premium HPC Ultra black-glass brand appearance.",
    imageUrl: "/products/img4.jpg",
    gallery: ["/products/img4.jpg", "/products/img3.jpg"],
    price: 10999,
    compareAtPrice: 13999,
    rating: 4.4,
    reviewCount: 39,
    inventory: 13,
    badges: ["Slim Design", "Black Finish"],
    features: ["Compact fascia", "Twin lights", "Modern body lines", "Easy maintenance"],
    specs: {
      Width: "60 cm",
      Control: "Push button",
      Finish: "Black",
      Warranty: "1 year"
    },
    seoTitle: "Slim Black Kitchen Chimney | HPC Ultra",
    seoDescription: "Discover a slim black chimney from HPC Ultra for modern Indian kitchens.",
    delivery: "Delivery in 4-6 business days"
  },
  {
    id: "prod-deluxe-3-burner",
    slug: "3-burner-glass-top-gas-stove-deluxe",
    categorySlug: "gas-stoves",
    categoryName: "Gas Stoves",
    name: "3 Burner Glass Top Gas Stove Deluxe",
    model: "GTD 3B",
    shortDescription: "Three-burner stove with central jumbo burner and signature red-accent knob line.",
    description:
      "A practical 3-burner gas stove with a center power burner, strong pan supports, and the distinctive HPC Ultra visual identity on a premium glass surface.",
    imageUrl: "/products/img5.jpg",
    gallery: ["/products/img5.jpg", "/products/img1.jpg"],
    price: 5599,
    compareAtPrice: 6999,
    rating: 4.5,
    reviewCount: 124,
    inventory: 44,
    badges: ["Family Choice", "Jumbo Burner"],
    features: ["3 burner layout", "Center jumbo burner", "Red-accent control fascia", "Toughened glass top"],
    specs: {
      Burners: "3 brass burners",
      Finish: "Black glass",
      Ignition: "Manual",
      Warranty: "2 years"
    },
    seoTitle: "3 Burner Glass Top Gas Stove Deluxe | HPC Ultra",
    seoDescription: "Shop the HPC Ultra 3 burner deluxe gas stove with toughened glass top.",
    delivery: "Delivery in 3-5 business days"
  },
  {
    id: "prod-ss-3-burner",
    slug: "stainless-steel-3-burner-gas-stove",
    categorySlug: "gas-stoves",
    categoryName: "Gas Stoves",
    name: "Stainless Steel 3 Burner Gas Stove",
    model: "SS 3B",
    shortDescription: "A clean stainless platform with durable supports and practical daily-use design.",
    description:
      "This 3-burner stainless steel stove is built for longevity, low-maintenance cleaning, and a classic kitchen finish suited for heavy household usage.",
    imageUrl: "/products/img6.jpg",
    gallery: ["/products/img6.jpg", "/products/img5.jpg"],
    price: 4699,
    compareAtPrice: 5999,
    rating: 4.3,
    reviewCount: 70,
    inventory: 52,
    badges: ["Value Pick", "Steel Body"],
    features: ["Steel body", "3 burner layout", "Stable supports", "Easy maintenance"],
    specs: {
      Burners: "3 brass burners",
      Finish: "Stainless steel",
      Ignition: "Manual",
      Warranty: "2 years"
    },
    seoTitle: "Stainless Steel 3 Burner Gas Stove | HPC Ultra",
    seoDescription: "Explore the stainless steel 3 burner gas stove from HPC Ultra.",
    delivery: "Delivery in 3-5 business days"
  },
  {
    id: "prod-calda-dire",
    slug: "calda-dire-storage-water-heater",
    categorySlug: "water-heaters",
    categoryName: "Water Heaters",
    name: "Calda Dire Storage Water Heater",
    model: "CALDA DIRE 15L",
    shortDescription: "Storage water heater with shock-proof body and corrosion-resistant tank design.",
    description:
      "The Calda Dire storage water heater brings a clean white cylindrical form, safety-first body protection, and dependable hot-water storage for daily household routines.",
    imageUrl: "/products/img7.jpg",
    gallery: ["/products/img7.jpg", "/products/img8.jpg"],
    price: 8499,
    compareAtPrice: 9999,
    rating: 4.4,
    reviewCount: 54,
    inventory: 19,
    badges: ["Shock Proof Body", "Storage Heater"],
    features: ["Rust-resistant body", "Shock-proof design", "Storage heating", "Compact wall mount"],
    specs: {
      Capacity: "15 litres",
      Body: "Shock-proof",
      Pressure: "8 bar",
      Warranty: "2 years"
    },
    seoTitle: "Calda Dire Storage Water Heater | HPC Ultra",
    seoDescription: "Buy the HPC Ultra Calda Dire storage water heater with shock-proof body.",
    delivery: "Delivery in 4-6 business days"
  },
  {
    id: "prod-caldo-nuova",
    slug: "caldo-nuova-instant-water-heater",
    categorySlug: "water-heaters",
    categoryName: "Water Heaters",
    name: "Caldo Nuova Instant Water Heater",
    model: "CALDO NUOVA",
    shortDescription: "Compact instant heater with rust-proof body and clean white front face.",
    description:
      "Designed for compact homes and quick heating needs, the Caldo Nuova instant water heater balances minimal size, brand-first styling, and everyday durability.",
    imageUrl: "/products/img8.jpg",
    gallery: ["/products/img8.jpg", "/products/img7.jpg"],
    price: 4299,
    compareAtPrice: 5299,
    rating: 4.2,
    reviewCount: 48,
    inventory: 36,
    badges: ["Instant Heating", "Compact"],
    features: ["Compact body", "Instant heating", "Rust-proof outer body", "Status indicator lights"],
    specs: {
      Capacity: "Instant",
      Body: "Shock-proof",
      Mount: "Wall mount",
      Warranty: "2 years"
    },
    seoTitle: "Caldo Nuova Instant Water Heater | HPC Ultra",
    seoDescription: "Discover the compact Caldo Nuova instant water heater from HPC Ultra.",
    delivery: "Delivery in 4-6 business days"
  },
  {
    id: "prod-low-pressure-heater",
    slug: "low-pressure-gas-water-heater",
    categorySlug: "room-heaters",
    categoryName: "Room Heaters",
    name: "Low Pressure Gas Heating Unit",
    model: "LPG 7L",
    shortDescription: "Low-pressure unit with straightforward controls and a clean service-friendly front panel.",
    description:
      "A dependable heating unit crafted for practical performance, offering easy-to-understand controls and a robust white body tuned for long-term use.",
    imageUrl: "/products/img9.jpg",
    gallery: ["/products/img9.jpg"],
    price: 6799,
    compareAtPrice: 7999,
    rating: 4.1,
    reviewCount: 28,
    inventory: 22,
    badges: ["Low Pressure", "Winter Ready"],
    features: ["Low pressure compatibility", "Easy control panel", "Compact service footprint", "Durable front body"],
    specs: {
      Capacity: "7 litres",
      Use: "Low pressure setup",
      Controls: "Dual dial control",
      Warranty: "1 year"
    },
    seoTitle: "Low Pressure Gas Heating Unit | HPC Ultra",
    seoDescription: "Shop the low pressure gas heating unit from HPC Ultra.",
    delivery: "Delivery in 5-7 business days"
  },
  {
    id: "prod-smart-induction",
    slug: "smart-induction-cooktop-black-glass",
    categorySlug: "induction",
    categoryName: "Induction",
    name: "Smart Induction Cooktop Black Glass",
    model: "IC 2000",
    shortDescription: "Black-glass induction cooktop with presets, display controls, and compact countertop design.",
    description:
      "A smart induction cooktop with easy presets for hot pot, stir fry, soup, and more. Its compact build and glossy black face align with the broader HPC Ultra aesthetic.",
    imageUrl: "/products/img10.jpg",
    gallery: ["/products/img10.jpg"],
    price: 3199,
    compareAtPrice: 3999,
    rating: 4.3,
    reviewCount: 86,
    inventory: 57,
    badges: ["2000W", "Preset Modes"],
    features: ["2000W output", "Preset modes", "Digital display", "Black glass body"],
    specs: {
      Power: "2000W",
      Surface: "Black glass",
      Controls: "Touch panel",
      Warranty: "1 year"
    },
    seoTitle: "Smart Induction Cooktop Black Glass | HPC Ultra",
    seoDescription: "Buy the HPC Ultra smart induction cooktop with preset controls and black glass surface.",
    delivery: "Delivery in 2-4 business days"
  }
];

export const heroSlides = [
  {
    id: "slide-1",
    eyebrow: "Kitchen Essential",
    title: "Toughened glass gas stoves built for daily Indian cooking.",
    copy: "Premium brass burners, clean front profiles, and the exact visual character of the HPC Ultra range.",
    ctaLabel: "Shop Gas Stoves",
    ctaHref: "/category/gas-stoves",
    image: "/products/img1.jpg",
    productSlug: "amay-hd-4-burner-glass-top-gas-stove"
  },
  {
    id: "slide-2",
    eyebrow: "Modern Ventilation",
    title: "Black-glass chimneys that complete the branded kitchen look.",
    copy: "Touch control options, LED illumination, and slim contemporary forms for premium modular spaces.",
    ctaLabel: "Browse Chimneys",
    ctaHref: "/category/chimneys",
    image: "/products/img3.jpg",
    productSlug: "curved-glass-kitchen-chimney-touch-control"
  },
  {
    id: "slide-3",
    eyebrow: "Heating Solutions",
    title: "Storage and instant water heaters with clean HPC Ultra branding.",
    copy: "Shock-proof bodies, compact footprints, and fast home-delivery for installation-ready households.",
    ctaLabel: "View Water Heaters",
    ctaHref: "/category/water-heaters",
    image: "/products/img7.jpg",
    productSlug: "calda-dire-storage-water-heater"
  }
] as const;

export const testimonials = [
  {
    id: "t-1",
    name: "Ritika Sharma",
    quote: "The stove finish looks exactly like the product photos. Delivery and packaging were also solid.",
    city: "Lucknow"
  },
  {
    id: "t-2",
    name: "Aman Verma",
    quote: "Chimney install was smooth and the kitchen looks far more premium now.",
    city: "Delhi NCR"
  },
  {
    id: "t-3",
    name: "Neha Patel",
    quote: "Water heater reached quickly and the branding feels clean and trustworthy.",
    city: "Ahmedabad"
  }
] as const;

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}
