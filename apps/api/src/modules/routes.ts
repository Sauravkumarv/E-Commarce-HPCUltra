import express from "express";
import { nanoid } from "nanoid";
import { addressSchema, cartItemSchema, checkoutSchema, loginSchema, productQuerySchema, signupSchema } from "@hpc-ultra/validation";
import { demoStore } from "../lib/demo-store.js";
import { signAccessToken, signRefreshToken, setAuthCookies } from "../lib/auth.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

export const router = express.Router();

router.get("/health", (_req, res) => {
  res.json({ data: { status: "ok", service: "api" } });
});

router.post("/auth/signup", async (req, res, next) => {
  try {
    const input = signupSchema.parse(req.body);
    const user = await demoStore.createUser(input);
    const payload = { sub: user.id, email: user.email, role: user.role };
    setAuthCookies(res, signAccessToken(payload), signRefreshToken(payload));
    res.status(201).json({ data: user, requestId: req.requestId });
  } catch (error) {
    next(error);
  }
});

router.post("/auth/login", async (req, res, next) => {
  try {
    const input = loginSchema.parse(req.body);
    const user = await demoStore.verifyUser(input.email, input.password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    setAuthCookies(res, signAccessToken(payload), signRefreshToken(payload));
    res.json({ data: user, requestId: req.requestId });
  } catch (error) {
    next(error);
  }
});

router.post("/auth/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ data: { success: true }, requestId: req.requestId });
});

router.get("/auth/me", requireAuth, (req, res) => {
  const user = demoStore.getUser(req.auth!.sub);
  res.json({ data: user?.profile ?? null, requestId: req.requestId });
});

router.get("/users/me", requireAuth, (req, res) => {
  const user = demoStore.getUser(req.auth!.sub);
  res.json({ data: user ?? null, requestId: req.requestId });
});

router.get("/addresses", requireAuth, (req, res) => {
  const user = demoStore.getUser(req.auth!.sub);
  res.json({ data: user?.addresses ?? [], requestId: req.requestId });
});

router.post("/addresses", requireAuth, (req, res, next) => {
  try {
    const input = addressSchema.parse(req.body);
    const address = demoStore.addAddress(req.auth!.sub, { id: nanoid(), ...input });
    res.status(201).json({ data: address, requestId: req.requestId });
  } catch (error) {
    next(error);
  }
});

router.get("/categories", (_req, res) => {
  res.json({ data: demoStore.categories, requestId: res.req.requestId });
});

router.get("/categories/:slug", (req, res) => {
  const category = demoStore.getCategoryBySlug(req.params.slug);
  const products = demoStore.listProducts({ category: req.params.slug });
  res.json({ data: { category, products }, requestId: req.requestId });
});

router.get("/products", (req, res, next) => {
  try {
    const query = productQuerySchema.parse(req.query);
    let items = demoStore.listProducts(query);
    switch (query.sort) {
      case "price-asc":
        items = items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items = items.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        items = items.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      case "featured":
      default:
        break;
    }
    res.json({
      data: items.slice((query.page - 1) * query.limit, query.page * query.limit),
      meta: { total: items.length, page: query.page, limit: query.limit },
      requestId: req.requestId
    });
  } catch (error) {
    next(error);
  }
});

router.get("/products/:slug", (req, res) => {
  const product = demoStore.getProductBySlug(req.params.slug);
  if (!product) {
    res.status(404).json({ error: "Product not found", requestId: req.requestId });
    return;
  }
  res.json({ data: product, requestId: req.requestId });
});

router.get("/search/suggestions", (req, res) => {
  const queryValue = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
  const q = String(queryValue ?? "").trim().toLowerCase();
  const suggestions = demoStore.products
    .filter((item) => item.name.toLowerCase().includes(q))
    .slice(0, 5)
    .map((item) => ({ slug: item.slug, name: item.name }));
  res.json({ data: suggestions, requestId: req.requestId });
});

router.get("/cart", requireAuth, (req, res) => {
  res.json({ data: demoStore.getCart(req.auth!.sub), requestId: req.requestId });
});

router.post("/cart/items", requireAuth, (req, res, next) => {
  try {
    const input = cartItemSchema.parse(req.body);
    const cart = demoStore.addToCart(req.auth!.sub, input.productId, input.quantity);
    res.status(201).json({ data: cart, requestId: req.requestId });
  } catch (error) {
    next(error);
  }
});

router.patch("/cart/items/:itemId", requireAuth, (req, res, next) => {
  try {
    const input = cartItemSchema.pick({ quantity: true }).parse(req.body);
    const itemId = Array.isArray(req.params.itemId) ? req.params.itemId[0] : req.params.itemId;
    const cart = demoStore.updateCartItem(req.auth!.sub, itemId, input.quantity);
    res.json({ data: cart, requestId: req.requestId });
  } catch (error) {
    next(error);
  }
});

router.delete("/cart/items/:itemId", requireAuth, (req, res, next) => {
  try {
    const itemId = Array.isArray(req.params.itemId) ? req.params.itemId[0] : req.params.itemId;
    const cart = demoStore.removeCartItem(req.auth!.sub, itemId);
    res.json({ data: cart, requestId: req.requestId });
  } catch (error) {
    next(error);
  }
});

router.post("/checkout/validate", requireAuth, (req, res) => {
  const cart = demoStore.getCart(req.auth!.sub);
  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 3000 ? 0 : 199;
  const tax = Number((subtotal * 0.18).toFixed(2));
  res.json({ data: { subtotal, shipping, tax, total: subtotal + shipping + tax }, requestId: req.requestId });
});

router.post("/checkout/place-order", requireAuth, (req, res, next) => {
  try {
    const input = checkoutSchema.parse(req.body);
    const placed = demoStore.placeOrder(req.auth!.sub, input.addressId);
    res.status(201).json({ data: placed, requestId: req.requestId });
  } catch (error) {
    next(error);
  }
});

router.get("/orders", requireAuth, (req, res) => {
  res.json({ data: demoStore.listOrders(req.auth!.sub), requestId: req.requestId });
});

router.get("/admin/orders", requireAuth, requireAdmin, (_req, res) => {
  res.json({ data: demoStore.listAllOrders(), requestId: res.req.requestId });
});

router.post("/admin/products", requireAuth, requireAdmin, (req, res) => {
  res.status(501).json({
    error: "Admin product write APIs are scaffolded but still need the PostgreSQL repository implementation.",
    requestId: req.requestId
  });
});
