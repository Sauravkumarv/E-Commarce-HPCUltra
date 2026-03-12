import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "../../../components/product-card";
import { brand } from "../../../lib/brand";
import { categories, getCategory, getProductsByCategory } from "../../../lib/catalog";

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.name} | ${brand.name}`,
      description: category.description
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(slug);

  return (
    <main className="shell section-space">
      <section className="plp-hero">
        <div>
          <span>{category.tagline}</span>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </section>

      <section className="plp-layout">
        <aside className="filter-panel">
          <h2>Browse Filters</h2>
          <div className="filter-chip">Premium Finish</div>
          <div className="filter-chip">Warranty Included</div>
          <div className="filter-chip">Top Rated</div>
          <div className="filter-chip">Ready to Ship</div>
        </aside>

        <div>
          <div className="plp-toolbar">
            <strong>{categoryProducts.length} products</strong>
            <span>Sorted for visual match and category relevance</span>
          </div>

          <div className="prod-grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
