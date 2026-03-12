export type Role = "customer" | "admin";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  inventory: number;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

export type Address = {
  id: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  phone?: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type Order = {
  id: string;
  orderNumber: string;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered";
  paymentStatus: "pending" | "authorized" | "paid" | "failed";
  total: number;
  createdAt: string;
  items: CartItem[];
};

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
  error?: string;
  requestId?: string;
};
