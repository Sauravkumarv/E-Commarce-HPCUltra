"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../lib/catalog";
import { useStore } from "./store-provider";

const tabs = [
  { id: "orders", label: "My Orders" },
  { id: "wishlist", label: "Wishlist" },
  { id: "addresses", label: "Addresses" },
  { id: "profile", label: "Profile" },
  { id: "payments", label: "Payments" },
  { id: "notifications", label: "Notifications" }
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function AccountPageClient({
  mode = "account",
  initialTab = "orders",
  placedOrderNumber
}: {
  mode?: "account" | "orders";
  initialTab?: string;
  placedOrderNumber?: string;
}) {
  const activeTab = mode === "orders" ? "orders" : initialTab;
  const { orders, wishlist, addToCart } = useStore();

  const wishlistProducts = wishlist.map((id) => getProductById(id)).filter(Boolean);

  return (
    <main className="shell section-space">
      <div className="section-title">
        <span>{mode === "orders" ? "Orders" : "Account"}</span>
        <h1>{mode === "orders" ? "Track and review your orders" : "Manage your HPC Ultra account"}</h1>
      </div>

      <div className="account-layout">
        <aside className="account-nav">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.id === "orders" ? "/orders" : `/account?tab=${tab.id}`}
              className={`acc-nav-item ${activeTab === tab.id ? "is-active" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </aside>

        <section className="account-content">
          {placedOrderNumber ? (
            <div className="info-panel">
              Order placed successfully. Your order number is <strong>{placedOrderNumber}</strong>.
            </div>
          ) : null}

          {activeTab === "orders" ? (
            orders.length === 0 ? (
              <div className="empty-state">
                <h2>No orders yet</h2>
                <p>Complete a checkout flow to start seeing order history here.</p>
              </div>
            ) : (
              <div className="order-list">
                {orders.map((order) => (
                  <article key={order.id} className="order-card">
                    <div className="order-head">
                      <div>
                        <small>{new Date(order.createdAt).toLocaleDateString("en-IN")}</small>
                        <h2>{order.orderNumber}</h2>
                      </div>
                      <span>{order.status}</span>
                    </div>
                    <p>
                      {order.customer.name} | {order.customer.city} | {order.customer.paymentMethod}
                    </p>
                    <strong>{formatCurrency(order.total)}</strong>
                  </article>
                ))}
              </div>
            )
          ) : null}

          {activeTab === "wishlist" ? (
            wishlistProducts.length === 0 ? (
              <div className="empty-state">
                <h2>Your wishlist is empty</h2>
                <p>Save products while browsing and they will appear here.</p>
              </div>
            ) : (
              <div className="wishlist-grid">
                {wishlistProducts.map((product) =>
                  product ? (
                    <article key={product.id} className="wish-card">
                      <Image src={product.imageUrl} alt={product.name} width={180} height={180} />
                      <h3>{product.name}</h3>
                      <p>{formatCurrency(product.price)}</p>
                      <button type="button" className="btn-primary wide" onClick={() => addToCart(product.id, 1)}>
                        Move to Cart
                      </button>
                    </article>
                  ) : null
                )}
              </div>
            )
          ) : null}

          {activeTab !== "orders" && activeTab !== "wishlist" ? (
            <div className="info-panel">
              <h2>{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
              <p>This section is ready for backend integration. Current storefront already supports branded browsing, cart, checkout, and order history flow.</p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
