import { categories, products } from "../../lib/catalog";

export default function AdminPage() {
  return (
    <main className="shell section-space">
      <div className="section-title">
        <span>Admin Overview</span>
        <h1>Catalog and branding control snapshot</h1>
      </div>

      <div className="admin-grid">
        <article className="admin-card">
          <small>Products</small>
          <strong>{products.length}</strong>
          <p>Loaded from central catalog config.</p>
        </article>
        <article className="admin-card">
          <small>Categories</small>
          <strong>{categories.length}</strong>
          <p>Used by navigation, homepage, and filters.</p>
        </article>
        <article className="admin-card">
          <small>Branding</small>
          <strong>Config Driven</strong>
          <p>Logo, colors, nav, footer, announcement, and SEO are centralized.</p>
        </article>
      </div>
    </main>
  );
}
