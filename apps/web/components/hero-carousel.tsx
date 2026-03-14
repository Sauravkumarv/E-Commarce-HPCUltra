"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides, getProduct } from "../lib/catalog";

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[activeIndex];
  const product = getProduct(slide.productSlug);

  return (
    <section className="shell hero">
      <div className="hero-slide">
        <div className="hero-left">
          <span className="hero-kicker">{slide.eyebrow}</span>
          <h1>{slide.title}</h1>
          <p>{slide.copy}</p>
          <div className="hero-actions">
            <Link href={slide.ctaHref} className="btn-primary">
              {slide.ctaLabel}
            </Link>
            {product ? (
              <Link href={`/product/${product.slug}`} className="btn-secondary hero-link-soft">
                View Product
              </Link>
            ) : null}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrap">
            <div className="hero-image">
              <Image src={slide.image} alt={slide.title} fill priority className="object-contain hero-main-image" />
            </div>
            {product ? (
              <div className="hero-prod-card">
                <small>{product.categoryName}</small>
                <strong>{product.name}</strong>
                <span>Rs. {product.price.toLocaleString("en-IN")}</span>
              </div>
            ) : null}
          </div>
          <div className="hero-dots">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
