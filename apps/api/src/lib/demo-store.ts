import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import type { Address, CartItem, Category, Order, Product, User } from "@hpc-ultra/types";

type DemoUser = User & { passwordHash: string; addresses: Address[] };
type DemoCart = { userId: string; items: CartItem[] };

const categories: Category[] = [
  {
    id: "cat-mixer",
    slug: "mixer-grinders",
    name: "Mixer Grinders",
    description: "Powerful kitchen mixers for daily cooking.",
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-induction",
    slug: "induction-cooktops",
    name: "Induction Cooktops",
    description: "Fast and efficient induction solutions.",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cat-pressure",
    slug: "pressure-cookers",
    name: "Pressure Cookers",
    description: "Durable cookers for modern kitchens.",
    imageUrl: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80"
  }
];

const products: Product[] = [
  {
    id: "prod-1",
    slug: "ultra-mixer-grinder-pro",
    name: "Ultra Mixer Grinder Pro",
    shortDescription: "750W copper motor with 3 stainless jars.",
    description: "Built for Indian kitchens with overload protection, anti-skid feet, and fast grinding performance.",
    categorySlug: "mixer-grinders",
    categoryName: "Mixer Grinders",
    brand: "HPC Ultra",
    price: 5499,
    compareAtPrice: 6999,
    rating: 4.6,
    reviewCount: 214,
    inStock: true,
    inventory: 86,
    imageUrl: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "HPC Ultra mixer grinder",
    tags: ["bestseller", "750w"]
  },
  {
    id: "prod-2",
    slug: "smart-induction-cooktop-x1",
    name: "Smart Induction Cooktop X1",
    shortDescription: "Touch controls with 8 cooking presets.",
    description: "Energy-efficient induction cooktop with child lock, auto-pan detection, and timer.",
    categorySlug: "induction-cooktops",
    categoryName: "Induction Cooktops",
    brand: "HPC Ultra",
    price: 3799,
    compareAtPrice: 4599,
    rating: 4.4,
    reviewCount: 173,
    inStock: true,
    inventory: 124,
    imageUrl: "https://images.unsplash.com/photo-1584990347449-a9301dcedd16?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "HPC Ultra induction cooktop",
    tags: ["induction", "touch"]
  },
  {
    id: "prod-3",
    slug: "classic-pressure-cooker-5l",
    name: "Classic Pressure Cooker 5L",
    shortDescription: "Food-grade aluminum with safety valve.",
    description: "Lightweight 5-liter cooker designed for consistent pressure and daily reliability.",
    categorySlug: "pressure-cookers",
    categoryName: "Pressure Cookers",
    brand: "HPC Ultra",
    price: 2299,
    compareAtPrice: 2899,
    rating: 4.2,
    reviewCount: 94,
    inStock: true,
    inventory: 210,
    imageUrl: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "HPC Ultra pressure cooker",
    tags: ["pressure", "5l"]
  }
];

const adminPasswordHash = bcrypt.hashSync("Admin@123", 10);
const users: DemoUser[] = [
  {
    id: "user-admin",
    firstName: "HPC",
    lastName: "Admin",
    email: "admin@hpcultra.com",
    role: "admin",
    passwordHash: adminPasswordHash,
    addresses: [],
  }
];
const carts = new Map<string, DemoCart>();
const orders = new Map<string, Order[]>();

export const demoStore = {
  categories,
  products,
  listProducts(query: { q?: string; category?: string; minPrice?: number; maxPrice?: number; rating?: number }) {
    return products.filter((product) => {
      const matchesQ = query.q
        ? `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase().includes(query.q.toLowerCase())
        : true;
      const matchesCategory = query.category ? product.categorySlug === query.category : true;
      const matchesMin = typeof query.minPrice === "number" ? product.price >= query.minPrice : true;
      const matchesMax = typeof query.maxPrice === "number" ? product.price <= query.maxPrice : true;
      const matchesRating = typeof query.rating === "number" ? product.rating >= query.rating : true;

      return matchesQ && matchesCategory && matchesMin && matchesMax && matchesRating;
    });
  },
  getProductBySlug(slug: string) {
    return products.find((product) => product.slug === slug);
  },
  getCategoryBySlug(slug: string) {
    return categories.find((category) => category.slug === slug);
  },
  async createUser(input: { firstName: string; lastName: string; email: string; password: string }) {
    if (users.some((user) => user.email === input.email.toLowerCase())) {
      throw new Error("Email already exists");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user: DemoUser = {
      id: nanoid(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email.toLowerCase(),
      role: "customer",
      passwordHash,
      addresses: []
    };

    users.push(user);
    return { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } satisfies User;
  },
  async verifyUser(email: string, password: string) {
    const user = users.find((item) => item.email === email.toLowerCase());
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return null;
    }

    return { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } satisfies User;
  },
  getUser(id: string) {
    const user = users.find((item) => item.id === id);
    if (!user) {
      return null;
    }
    return {
      profile: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } satisfies User,
      addresses: user.addresses
    };
  },
  addAddress(userId: string, address: Address) {
    const user = users.find((item) => item.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.addresses.push(address);
    return address;
  },
  getCart(userId: string) {
    return carts.get(userId) ?? { userId, items: [] };
  },
  addToCart(userId: string, productId: string, quantity: number) {
    const product = products.find((item) => item.id === productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const cart = carts.get(userId) ?? { userId, items: [] };
    const existing = cart.items.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, 10);
    } else {
      cart.items.push({
        id: nanoid(),
        productId,
        quantity,
        product
      });
    }
    carts.set(userId, cart);
    return cart;
  },
  updateCartItem(userId: string, itemId: string, quantity: number) {
    const cart = carts.get(userId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const item = cart.items.find((entry) => entry.id === itemId);
    if (!item) {
      throw new Error("Item not found");
    }
    item.quantity = quantity;
    return cart;
  },
  removeCartItem(userId: string, itemId: string) {
    const cart = carts.get(userId) ?? { userId, items: [] };
    cart.items = cart.items.filter((entry) => entry.id !== itemId);
    carts.set(userId, cart);
    return cart;
  },
  placeOrder(userId: string, addressId: string) {
    const user = users.find((item) => item.id === userId);
    const cart = carts.get(userId);
    if (!user || !cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }
    const address = user.addresses.find((item) => item.id === addressId);
    if (!address) {
      throw new Error("Address not found");
    }
    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order: Order = {
      id: nanoid(),
      orderNumber: `HPC-${Date.now()}`,
      status: "pending",
      paymentStatus: "pending",
      total,
      createdAt: new Date().toISOString(),
      items: cart.items
    };

    const existingOrders = orders.get(userId) ?? [];
    existingOrders.unshift(order);
    orders.set(userId, existingOrders);
    carts.set(userId, { userId, items: [] });
    return { order, address };
  },
  listOrders(userId: string) {
    return orders.get(userId) ?? [];
  },
  listAllOrders() {
    return Array.from(orders.values()).flat();
  }
};
