import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductDetailActions } from "../../../components/pdp-actions";
import { ProductCard } from "../../../components/product-card";
import { brand } from "../../../lib/brand";
import { getProduct, products } from "../../../lib/catalog";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return {};
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [product.imageUrl]
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: brand.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.inventory > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${brand.siteUrl}/product/${product.slug}`
    }
  };

  return (
    <main className="shell section-space">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="pdp-layout">
        <div className="pdp-images">
          <div className="pdp-main-image">
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain" priority />
          </div>
          <div className="pdp-gallery">
            {product.gallery.map((image) => (
              <div key={image} className="pdp-thumb">
                <Image src={image} alt={product.name} width={110} height={110} className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <span className="pdp-cat">{product.categoryName}</span>
          <h1>{product.name}</h1>
          <p className="pdp-copy">{product.description}</p>

          <div className="pdp-price">
            <strong>Rs. {product.price.toLocaleString("en-IN")}</strong>
            {product.compareAtPrice ? <span>Rs. {product.compareAtPrice.toLocaleString("en-IN")}</span> : null}
          </div>

          <div className="pdp-badges">
            {product.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>

          <ProductDetailActions productId={product.id} />

          <div className="pdp-meta-grid">
            <div>
              <small>Model</small>
              <strong>{product.model}</strong>
            </div>
            <div>
              <small>Rating</small>
              <strong>
                {product.rating} / 5 ({product.reviewCount})
              </strong>
            </div>
            <div>
              <small>Availability</small>
              <strong>{product.inventory > 0 ? `${product.inventory} in stock` : "Sold out"}</strong>
            </div>
            <div>
              <small>Delivery</small>
              <strong>{product.delivery}</strong>
            </div>
          </div>

          <div className="pdp-specs">
            <h2>Specifications</h2>
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-title">
          <span>Related Products</span>
          <h2>More from this category</h2>
        </div>
        <div className="prod-grid">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
