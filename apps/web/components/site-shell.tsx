"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { brand } from "../lib/brand";
import { categories, getProductById, products } from "../lib/catalog";
import { useStore } from "./store-provider";

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.8-3 4.2-4.5 7-4.5S17.2 16 19 19" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M3 5h2l1.3 7.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L19 7H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const searchRef = useRef<HTMLFormElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
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

  const suggestedCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return categories.filter((category) => !query || category.name.toLowerCase().includes(query)).slice(0, 5);
  }, [search]);

  const suggestedProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const source = query
      ? products.filter((product) => `${product.name} ${product.shortDescription}`.toLowerCase().includes(query))
      : products;
    return source.slice(0, 4);
  }, [search]);

  const activeCategory = useMemo(
    () => categories.find((category) => category.slug === activeCategorySlug) ?? null,
    [activeCategorySlug]
  );

  const activeProducts = useMemo(
    () => (activeCategory ? products.filter((product) => product.categorySlug === activeCategory.slug).slice(0, 3) : []),
    [activeCategory]
  );

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (searchRef.current && !searchRef.current.contains(target) && mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        setSearchOpen(false);
      }

      if (cartRef.current && !cartRef.current.contains(target)) {
        setCartOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
        setMobileMenuOpen(false);
        setActiveCategorySlug(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set("q", search.trim());
    }
    setSearchOpen(false);
    setMobileMenuOpen(false);
    router.push(`/${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <>
      <div className="bg-[#0d1257] text-white">
        <div className="mx-auto flex min-h-7 w-[min(1220px,calc(100vw-24px))] items-center justify-between gap-2 text-[10px] font-semibold tracking-[0.12em] text-white/90">
          <span className="truncate py-1.5 uppercase">{brand.announcement}</span>
          <span className="hidden shrink-0 py-1.5 text-white/70 sm:block">{brand.contact.phone}</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-[0_8px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto w-[min(1220px,calc(100vw-24px))]">
          <div className="flex min-h-[56px] items-center gap-2 py-1.5 lg:gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={brand.name}>
              <Image src={brand.logo.full} alt={brand.name} width={138} height={54} priority className="h-auto w-[112px] sm:w-[122px] lg:w-[138px]" />
              <div className="hidden min-w-0 flex-col xl:flex">
                <strong className="truncate text-sm font-semibold tracking-tight text-slate-950">{brand.name}</strong>
                <span className="truncate text-[11px] text-slate-500">Premium kitchen and home appliances</span>
              </div>
            </Link>

            <form ref={searchRef} className="relative hidden flex-1 lg:block" onSubmit={handleSearch} onFocus={() => setSearchOpen(true)}>
              <div className="flex h-10 items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition focus-within:border-slate-300 focus-within:bg-white">
                <div className="pl-3.5 text-slate-400">
                  <SearchIcon className="h-3.5 w-3.5" />
                </div>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search stoves, chimneys, heaters..."
                  aria-label="Search products"
                  aria-expanded={searchOpen}
                  className="h-full flex-1 bg-transparent px-2.5 text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="mr-1.5 inline-flex h-8 items-center rounded-full bg-[#f97316] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#ea580c]"
                >
                  Search
                </button>
              </div>

              {searchOpen ? (
                <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
                  <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Categories</p>
                      <div className="grid gap-2">
                        {suggestedCategories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Suggested Products</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {suggestedProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="flex items-center gap-3 rounded-3xl border border-slate-200 p-3 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)]"
                          >
                            <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-50">
                              <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-2" />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-slate-900">{product.name}</p>
                              <p className="mt-1 text-sm text-slate-500">{formatCurrency(product.price)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </form>

            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <Link href="/account" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 px-3 text-[13px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950">
                <UserIcon className="h-3.5 w-3.5" />
                Account
              </Link>
              <Link href="/account?tab=wishlist" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 px-3 text-[13px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950">
                <HeartIcon className="h-3.5 w-3.5" />
                Wishlist
                <span className="inline-grid h-5 min-w-5 place-items-center rounded-full bg-slate-100 px-1 text-[11px] font-semibold text-slate-700">{wishlist.length}</span>
              </Link>

              <div ref={cartRef} className="relative" onMouseEnter={() => setCartOpen(true)} onMouseLeave={() => setCartOpen(false)}>
                <Link
                  href="/cart"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1f2a7c] px-3 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,42,124,0.24)] transition hover:bg-[#192165]"
                  onClick={() => setCartOpen((current) => !current)}
                >
                  <CartIcon className="h-3.5 w-3.5" />
                  Cart
                  <span className="inline-grid h-5 min-w-5 place-items-center rounded-full bg-white/16 px-1 text-[11px] font-semibold text-white">{cartCount}</span>
                </Link>

                {cartOpen ? (
                  <div className="absolute right-0 top-[calc(100%+12px)] w-[360px] rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_26px_80px_rgba(15,23,42,0.18)]">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-base font-semibold text-slate-950">Cart Preview</p>
                        <p className="text-sm text-slate-500">{cartCount} items in your bag</p>
                      </div>
                      <Link href="/cart" className="text-sm font-semibold text-[#1f2a7c]">
                        View Cart
                      </Link>
                    </div>

                    <div className="grid gap-3">
                      {cartPreview.length === 0 ? (
                        <div className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">Your cart is empty.</div>
                      ) : (
                        cartPreview.slice(0, 3).map((entry) =>
                          entry ? (
                            <div key={entry.product.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3">
                              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-50">
                                <Image src={entry.product.imageUrl} alt={entry.product.name} fill className="object-contain p-2" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-900">{entry.product.name}</p>
                                <p className="mt-1 text-xs text-slate-500">Qty {entry.quantity}</p>
                                <p className="mt-1 text-sm font-medium text-slate-700">{formatCurrency(entry.product.price)}</p>
                              </div>
                              <button type="button" className="text-xs font-semibold text-red-500" onClick={() => removeFromCart(entry.product.id)}>
                                Remove
                              </button>
                            </div>
                          ) : null
                        )
                      )}
                    </div>

                    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>Subtotal</span>
                        <strong className="text-base text-slate-950">{formatCurrency(subtotal)}</strong>
                      </div>
                      <Link href="/checkout" className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#f97316] text-sm font-semibold text-white transition hover:bg-[#ea580c]">
                        Checkout
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen((current) => !current)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700"
                aria-label="Toggle search"
              >
                <SearchIcon className="h-3.5 w-3.5" />
              </button>
              <Link href="/cart" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1f2a7c] px-3 text-[13px] font-semibold text-white">
                <CartIcon className="h-3.5 w-3.5" />
                {cartCount}
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((current) => !current)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon className="h-3.5 w-3.5" /> : <MenuIcon className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {searchOpen ? (
            <div ref={mobileSearchRef} className="border-t border-slate-200 py-3 lg:hidden">
              <form className="space-y-3" onSubmit={handleSearch}>
                <div className="flex items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                  <div className="pl-4 text-slate-400">
                    <SearchIcon className="h-4 w-4" />
                  </div>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products"
                    aria-label="Search products"
                    className="h-12 flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none"
                  />
                  <button type="submit" className="mr-1.5 inline-flex h-9 items-center rounded-full bg-[#f97316] px-4 text-sm font-semibold text-white">
                    Search
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedCategories.slice(0, 4).map((category) => (
                    <Link key={category.id} href={`/category/${category.slug}`} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
                      {category.name}
                    </Link>
                  ))}
                </div>
              </form>
            </div>
          ) : null}

          <div className="relative hidden border-t border-slate-200 lg:block">
            <nav className="flex min-h-[40px] items-center gap-5" aria-label="Primary" onMouseLeave={() => setActiveCategorySlug(null)}>
              {brand.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setActiveCategorySlug(item.href.startsWith("/category/") ? item.href.replace("/category/", "") : null)}
                  className={`group relative inline-flex min-h-[40px] items-center text-[13px] font-medium transition ${pathname === item.href ? "text-slate-950" : "text-slate-600 hover:text-slate-950"}`}
                >
                  {item.label}
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-[#f97316] transition-transform duration-200 ${pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              ))}
            </nav>

            {activeCategory ? (
              <div className="absolute left-0 right-0 top-full z-30 rounded-b-[30px] border border-slate-200 border-t-0 bg-white px-6 py-5 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
                <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Featured Category</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{activeCategory.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{activeCategory.description}</p>
                    <Link href={`/category/${activeCategory.slug}`} className="mt-4 inline-flex rounded-full bg-[#1f2a7c] px-4 py-2.5 text-sm font-semibold text-white">
                      Explore {activeCategory.name}
                    </Link>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {activeProducts.map((product) => (
                      <Link key={product.id} href={`/product/${product.slug}`} className="rounded-[26px] border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_16px_34px_rgba(15,23,42,0.08)]">
                        <div className="relative h-32 overflow-hidden rounded-2xl bg-slate-50">
                          <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-3" />
                        </div>
                        <p className="mt-4 text-sm font-semibold text-slate-900">{product.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{formatCurrency(product.price)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {mobileMenuOpen ? (
            <div ref={mobileMenuRef} className="border-t border-slate-200 py-4 lg:hidden">
              <div className="grid gap-2">
                {brand.nav.map((item) => (
                  <Link key={item.href} href={item.href} className={`rounded-2xl px-4 py-3 text-sm font-semibold ${pathname === item.href ? "bg-[#1f2a7c] text-white" : "bg-slate-50 text-slate-700"}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                <Link href="/account" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                  Account
                </Link>
                <Link href="/account?tab=wishlist" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
                  Wishlist ({wishlist.length})
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {children}

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
