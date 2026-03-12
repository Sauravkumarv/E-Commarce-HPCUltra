import Link from "next/link";
import { HeroCarousel } from "../components/hero-carousel";
import { ProductCard } from "../components/product-card";
import { categories, products, testimonials } from "../lib/catalog";

export default async function HomePage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.toLowerCase() : "";
  const visibleProducts = query
    ? products.filter((product) => `${product.name} ${product.shortDescription}`.toLowerCase().includes(query))
    : products;

  return (
    <main>
      <HeroCarousel />

      <section className="shell section-space">
        <div className="section-title row">
          <div>
            <span>Shop by Category</span>
            <h2>Designed around the original HPC Ultra product range</h2>
          </div>
        </div>

        <div className="cat-grid">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="cat-card">
              <div className="cat-card-image" style={{ backgroundImage: `url(${category.image})` }} />
              <div className="cat-card-body">
                <small>{category.tagline}</small>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell section-space">
        <div className="section-title row">
          <div>
            <span>{query ? "Search Results" : "Featured Products"}</span>
            <h2>{query ? `Showing results for "${query}"` : "Branded appliances ready for cart and checkout"}</h2>
          </div>
          {!query ? (
            <Link href="/category/gas-stoves" className="text-link">
              Explore catalog
            </Link>
          ) : null}
        </div>

        <div className="prod-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="shell section-space story-band">
        <div>
          <span className="story-kicker">Brand Focus</span>
          <h2>Consistent product imagery, logo usage, and storefront styling across the full funnel.</h2>
          <p>
            Homepage, category pages, product detail, cart, checkout, and orders are now aligned into one branded
            storefront language rather than separate generic screens.
          </p>
        </div>
        <div className="story-boxes">
          <div>
            <strong>Checkout Ready</strong>
            <p>Address, payment choice, order review, and local order history flow are integrated.</p>
          </div>
          <div>
            <strong>No scattered brand hardcoding</strong>
            <p>Brand copy, links, colors, and logo paths are centralized in config.</p>
          </div>
        </div>
      </section>

      <section className="shell section-space">
        <div className="section-title">
          <span>Customer Voice</span>
          <h2>What buyers say</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.id} className="testimonial-card">
              <p>{item.quote}</p>
              <strong>{item.name}</strong>
              <small>{item.city}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
