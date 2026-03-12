import type { MetadataRoute } from "next";
import { brand } from "../lib/brand";
import { categories, products } from "../lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: brand.siteUrl,
      lastModified: new Date()
    },
    ...products.map((product) => ({
      url: `${brand.siteUrl}/product/${product.slug}`,
      lastModified: new Date()
    })),
    ...categories.map((category) => ({
      url: `${brand.siteUrl}/category/${category.slug}`,
      lastModified: new Date()
    }))
  ];
}
