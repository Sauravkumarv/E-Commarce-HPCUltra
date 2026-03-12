"use client";

import Image from "next/image";
import Link from "next/link";
import { CatalogProduct } from "../lib/catalog";
import { useStore } from "./store-provider";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <article className="prod-card">
      <button type="button" className={`prod-wish ${wished ? "is-active" : ""}`} onClick={() => toggleWishlist(product.id)}>
        {wished ? "♥" : "♡"}
      </button>

      <Link href={`/product/${product.slug}`} className="prod-img-box">
        <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
      </Link>

      <div className="prod-body">
        <small>{product.categoryName}</small>
        <Link href={`/product/${product.slug}`} className="prod-title">
          {product.name}
        </Link>
        <p>{product.shortDescription}</p>

        <div className="prod-badges">
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>

        <div className="prod-price">
          <div>
            <strong>{formatCurrency(product.price)}</strong>
            {product.compareAtPrice ? <span>{formatCurrency(product.compareAtPrice)}</span> : null}
          </div>
          <button type="button" className="add-to-cart-btn" onClick={() => addToCart(product.id, 1)}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
