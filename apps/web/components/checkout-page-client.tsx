"use client";

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-main">
          <section className="checkout-card">
            <h2>Delivery Address</h2>
            <div className="form-grid">
              <input name="name" placeholder="Full Name" required />
              <input name="phone" placeholder="Phone Number" required />
              <input name="email" type="email" placeholder="Email Address" required />
              <input name="city" placeholder="City" required />
              <textarea name="address" placeholder="House No, Street, Landmark" required rows={4} />
              <input name="pincode" placeholder="PIN Code" required />
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
            <button type="submit" className="btn-primary wide">
              Place Order
            </button>
          </section>
        </aside>
      </form>
    </main>
  );
}
