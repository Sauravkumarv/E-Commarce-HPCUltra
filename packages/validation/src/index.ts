import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(72)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72)
});

export const addressSchema = z.object({
  fullName: z.string().min(2),
  line1: z.string().min(4),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(4),
  countryCode: z.string().length(2),
  phone: z.string().optional()
});

export const productQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "rating", "newest"]).optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12)
});

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(10)
});

export const checkoutSchema = z.object({
  addressId: z.string().min(1),
  paymentProvider: z.enum(["stripe", "razorpay"]),
  notes: z.string().max(500).optional()
});
