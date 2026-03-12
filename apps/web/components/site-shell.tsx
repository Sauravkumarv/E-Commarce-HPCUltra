"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { brand } from "../lib/brand";
import { getProductById } from "../lib/catalog";
import { useStore } from "./store-provider";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { cart, cartCount, subtotal, removeFromCart, wishlist } = useStore();

  const cartPreview = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProductById(item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [cart]
  );

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set("q", search.trim());
    }
    router.push(`/${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <>
      <div className="announce">
        <div className="shell announce-inner">
          <span>{brand.announcement}</span>
          <span>{brand.contact.phone}</span>
        </div>
      </div>

      <header className="header">
        <div className="shell header-top">
          <Link href="/" className="brand-lockup" aria-label={brand.name}>
            <Image src={brand.logo.full} alt={brand.name} width={190} height={78} priority />
            <div className="brand-copy">
              <strong>{brand.name}</strong>
              <span>{brand.tagline}</span>
            </div>
          </Link>

          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search stoves, chimneys, heaters..."
              aria-label="Search products"
            />
            <button type="submit">Search</button>
          </form>

          <div className="header-actions">
            <Link href="/account" className="header-pill">
              Account
            </Link>
            <Link href="/account?tab=wishlist" className="header-pill">
              Wishlist <span>{wishlist.length}</span>
            </Link>
            <Link href="/cart" className="header-pill active">
              Cart <span>{cartCount}</span>
            </Link>
          </div>
        </div>

        <div className="main-nav-wrap">
          <nav className="shell main-nav" aria-label="Primary">
            {brand.nav.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="shell trust-strip">
          {brand.trustPoints.map((point) => (
            <span key={point}>{point}</span>
          ))}
        </div>
      </header>

      {children}

      <aside className="cd-cart">
        <div className="cd-head">
          <strong>Quick Cart</strong>
          <span>{cartCount} items</span>
        </div>
        <div className="cd-list">
          {cartPreview.length === 0 ? (
            <div className="cd-empty">Your cart is empty.</div>
          ) : (
            cartPreview.slice(0, 3).map((entry) =>
              entry ? (
                <div key={entry.product.id} className="cd-item">
                  <Image src={entry.product.imageUrl} alt={entry.product.name} width={58} height={58} />
                  <div>
                    <p>{entry.product.name}</p>
                    <small>
                      {entry.quantity} x {formatCurrency(entry.product.price)}
                    </small>
                  </div>
                  <button type="button" onClick={() => removeFromCart(entry.product.id)}>
                    Remove
                  </button>
                </div>
              ) : null
            )
          )}
        </div>
        <div className="cd-foot">
          <div>
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="cd-actions">
            <Link href="/cart">View Cart</Link>
            <Link href="/checkout" className="primary">
              Checkout
            </Link>
          </div>
        </div>
      </aside>

      <footer className="footer">
        <div className="shell footer-grid">
          <div>
            <div className="footer-logo">
              <Image src={brand.logo.square} alt={brand.name} width={74} height={74} />
            </div>
            <p className="footer-copy">
              {brand.legalName} delivers kitchen and home appliances shaped around the original catalog branding and
              image system.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            {brand.footer.quickLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h3>Support</h3>
            {brand.footer.supportLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h3>Reach Us</h3>
            <p>{brand.contact.city}</p>
            <p>{brand.contact.phone}</p>
            <p>{brand.contact.email}</p>
            <div className="pay-row">
              {brand.footer.paymentLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
