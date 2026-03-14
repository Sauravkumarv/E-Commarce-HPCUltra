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

function getDiscountPercent(price: number, compareAtPrice?: number) {
  if (!compareAtPrice || compareAtPrice <= price) {
    return null;
  }

  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discountPercent = getDiscountPercent(product.price, product.compareAtPrice);

  return (
    <article className="prod-card">
      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className={`prod-wish ${wished ? "is-active" : ""}`}
        onClick={() => toggleWishlist(product.id)}
      >
        {wished ? "♥" : "♡"}
      </button>

      {discountPercent ? <span className="prod-discount-badge">Save {discountPercent}%</span> : null}

      <Link href={`/product/${product.slug}`} className="prod-img-box">
        <Image src={product.imageUrl} alt={product.name} fill className="object-contain prod-img" />
      </Link>

      <div className="prod-body">
        <div className="prod-topline">
          <small>{product.categoryName}</small>
          <div className="prod-rating" aria-label={`${product.rating} out of 5 stars`}>
            <span className="prod-rating-star">★</span>
            <strong>{product.rating.toFixed(1)}</strong>
            <span>{product.reviewCount} ratings</span>
          </div>
        </div>

        <Link href={`/product/${product.slug}`} className="prod-title">
          {product.name}
        </Link>
        <p>{product.shortDescription}</p>

        <div className="prod-badges">
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>

        <div className="prod-offer-line">
          {discountPercent ? <span className="prod-offer-text">Limited deal</span> : <span className="prod-offer-text neutral">Top pick</span>}
          <span className="prod-delivery-text">{product.delivery}</span>
        </div>

        <div className="prod-price-block">
          <div className="prod-price">
            <div>
              <strong>{formatCurrency(product.price)}</strong>
              {product.compareAtPrice ? <span>{formatCurrency(product.compareAtPrice)}</span> : null}
            </div>
          </div>
          <button type="button" className="add-to-cart-btn" onClick={() => addToCart(product.id, 1)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
