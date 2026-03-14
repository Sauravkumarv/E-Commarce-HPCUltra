"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "./store-provider";

export function ProductDetailActions({ productId }: { productId: string }) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="pdp-actions">
      <div className="qty-box">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((current) => Math.max(current - 1, 1))}
        >
          -
        </button>
        <span aria-live="polite" aria-atomic="true">{quantity}</span>
        <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}>
          +
        </button>
      </div>
      <button
        type="button"
        className="btn-secondary"
        onClick={() => {
          addToCart(productId, quantity);
        }}
      >
        Add to Cart
      </button>
      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          addToCart(productId, quantity);
          router.push("/checkout");
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
