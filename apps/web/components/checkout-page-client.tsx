"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getProductById } from "../lib/catalog";
import { useStore } from "./store-provider";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function CheckoutPageClient() {
  const router = useRouter();
  const { cart, subtotal, discount, total, placeOrder } = useStore();
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const items = cart
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const isCartEmpty = items.length === 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isCartEmpty) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const orderNumber = placeOrder({
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      address: String(formData.get("address") ?? ""),
      city: String(formData.get("city") ?? ""),
      pincode: String(formData.get("pincode") ?? ""),
      paymentMethod
    });
    router.push(`/orders?placed=${orderNumber}`);
  }

  return (
    <main className="shell section-space">
      <div className="section-title">
        <span>Checkout</span>
        <h1>Secure your order</h1>
      </div>

      <div className="checkout-steps-nav">
        <span className="is-active">1. Address</span>
        <span className="is-active">2. Payment</span>
        <span className="is-active">3. Review</span>
      </div>

      {isCartEmpty ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add products to your cart before moving to checkout.</p>
          <Link href="/cart" className="btn-primary">
            Go to Cart
          </Link>
        </div>
      ) : (
        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-main">
            <section className="checkout-card">
              <h2>Delivery Address</h2>
              <p className="mb-5 text-sm leading-6 text-slate-500">Use a complete address so delivery and installation support can reach you without delay.</p>
              <div className="form-grid">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  <span>Full Name</span>
                  <input id="checkout-name" name="name" autoComplete="name" placeholder="Enter your full name" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  <span>Phone Number</span>
                  <input id="checkout-phone" name="phone" autoComplete="tel" inputMode="tel" placeholder="Enter your mobile number" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  <span>Email Address</span>
                  <input id="checkout-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  <span>City</span>
                  <input id="checkout-city" name="city" autoComplete="address-level2" placeholder="Enter your city" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                  <span>Address</span>
                  <textarea
                    id="checkout-address"
                    name="address"
                    autoComplete="street-address"
                    placeholder="House no, street, area, landmark"
                    required
                    rows={4}
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  <span>PIN Code</span>
                  <input id="checkout-pincode" name="pincode" autoComplete="postal-code" inputMode="numeric" placeholder="Enter PIN code" required />
                </label>
              </div>
            </section>

            <section className="checkout-card">
              <h2>Payment Method</h2>
              <div className="pay-options">
                {["UPI", "Card", "Net Banking", "Cash on Delivery"].map((option) => (
                  <label key={option} className={`pay-opt ${paymentMethod === option ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === option}
                      onChange={() => setPaymentMethod(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="checkout-side">
            <section className="checkout-card">
              <h2>Review Items</h2>
              <div className="checkout-items">
                {items.map((entry) =>
                  entry ? (
                    <div key={entry.product.id} className="checkout-item">
                      <span>{entry.product.name}</span>
                      <strong>
                        {entry.quantity} x {formatCurrency(entry.product.price)}
                      </strong>
                    </div>
                  ) : null
                )}
              </div>
            </section>

            <section className="checkout-card">
              <h2>Price Details</h2>
              <div className="money-line">
                <span>Subtotal</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <div className="money-line">
                <span>Discount</span>
                <strong>- {formatCurrency(discount)}</strong>
              </div>
              <div className="money-line">
                <span>Shipping</span>
                <strong>Free</strong>
              </div>
              <div className="money-line total">
                <span>Grand Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">Secure checkout with verified order confirmation and support follow-up after purchase.</p>
              <button type="submit" className="btn-primary wide mt-4" disabled={isCartEmpty}>
                Place Order
              </button>
            </section>
          </aside>
        </form>
      )}
    </main>
  );
}
