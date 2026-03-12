"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductById } from "../lib/catalog";

type CartItem = {
  productId: string;
  quantity: number;
};

type OrderRecord = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    paymentMethod: string;
  };
};

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  orders: OrderRecord[];
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (customer: OrderRecord["customer"]) => string;
};

const cartKey = "hpc-ultra-cart";
const wishlistKey = "hpc-ultra-wishlist";
const ordersKey = "hpc-ultra-orders";

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    const storedCart = window.localStorage.getItem(cartKey);
    const storedWishlist = window.localStorage.getItem(wishlistKey);
    const storedOrders = window.localStorage.getItem(ordersKey);

    if (storedCart) {
      setCart(JSON.parse(storedCart) as CartItem[]);
    }
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist) as string[]);
    }
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders) as OrderRecord[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.localStorage.setItem(ordersKey, JSON.stringify(orders));
  }, [orders]);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [cart]
  );
  const discount = Math.round(subtotal * 0.15);
  const total = Math.max(subtotal - discount, 0);

  const value: StoreContextValue = {
    cart,
    wishlist,
    orders,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    discount,
    total,
    addToCart(productId, quantity = 1) {
      setCart((current) => {
        const existing = current.find((item) => item.productId === productId);
        if (existing) {
          return current.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...current, { productId, quantity }];
      });
    },
    updateCart(productId, quantity) {
      if (quantity <= 0) {
        setCart((current) => current.filter((item) => item.productId !== productId));
        return;
      }
      setCart((current) => current.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
    },
    removeFromCart(productId) {
      setCart((current) => current.filter((item) => item.productId !== productId));
    },
    toggleWishlist(productId) {
      setWishlist((current) =>
        current.includes(productId) ? current.filter((item) => item !== productId) : [...current, productId]
      );
    },
    placeOrder(customer) {
      const orderNumber = `HPC${Date.now().toString().slice(-8)}`;
      const order: OrderRecord = {
        id: crypto.randomUUID(),
        orderNumber,
        createdAt: new Date().toISOString(),
        status: "Confirmed",
        items: cart,
        total,
        customer
      };
      setOrders((current) => [order, ...current]);
      setCart([]);
      return orderNumber;
    }
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
