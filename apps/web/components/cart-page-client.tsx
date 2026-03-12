"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../lib/catalog";
import { useStore } from "./store-provider";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function CartPageClient() {
  const { cart, subtotal, discount, total, updateCart, removeFromCart } = useStore();
  const items = cart
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  return (
    <main className="shell section-space">
      <div className="section-title">
        <span>Shopping Cart</span>
        <h1>Your selected products</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-state">
              <h2>Your cart is empty</h2>
              <p>Add HPC Ultra products from the catalog to continue toward checkout.</p>
              <Link href="/" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((entry) =>
              entry ? (
                <article key={entry.product.id} className="cart-row">
                  <div className="cart-row-media">
                    <Image src={entry.product.imageUrl} alt={entry.product.name} width={128} height={128} />
                  </div>
                  <div className="cart-row-body">
                    <small>{entry.product.categoryName}</small>
                    <h2>{entry.product.name}</h2>
                    <p>{entry.product.shortDescription}</p>
                    <div className="cart-qty">
                      <button type="button" onClick={() => updateCart(entry.product.id, entry.quantity - 1)}>
                        -
                      </button>
                      <span>{entry.quantity}</span>
                      <button type="button" onClick={() => updateCart(entry.product.id, entry.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-row-side">
                    <strong>{formatCurrency(entry.product.price * entry.quantity)}</strong>
                    <button type="button" onClick={() => removeFromCart(entry.product.id)}>
                      Remove
                    </button>
                  </div>
                </article>
              ) : null
            )
          )}
        </div>

        <aside className="order-summary">
          <h3>Order Summary</h3>
          <div>
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div>
            <span>Discount</span>
            <strong>- {formatCurrency(discount)}</strong>
          </div>
          <div>
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <div className="order-total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <Link href="/checkout" className="btn-primary wide">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
