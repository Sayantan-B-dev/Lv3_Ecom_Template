import Link from "next/link";
import { getCategories, getFeatured, getProducts } from "@/lib/catalog";
import { heroContent, homeSections, promoBanners } from "@/config/content";
import { ProductGrid } from "@/ui/shared/components/ProductCard";
import { CategoryTile } from "@/ui/shared/components/CategoryTile";

export function V1Home() {
  const categories = getCategories();
  const featured = getFeatured(6);
  const counts = new Map<string, number>();
  for (const p of getProducts()) counts.set(p.categorySlug, (counts.get(p.categorySlug) ?? 0) + 1);

  return (
    <>
      <div className="hero">
        <div className="container hero-layout">
          <div>
            <span className="hero-eyebrow">{heroContent.eyebrow}</span>
            <h1 className="hero-title">{heroContent.title}</h1>
            <p className="hero-subtitle">{heroContent.subtitle}</p>
            <div className="hero-ctas">
              <Link href={heroContent.primaryCta.href} className="btn btn-primary">
                {heroContent.primaryCta.label}
              </Link>
              <Link href={heroContent.secondaryCta.href} className="btn btn-secondary">
                {heroContent.secondaryCta.label}
              </Link>
            </div>
            <p className="hero-note">{heroContent.note}</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-tile" style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}>Apparel</div>
            <div className="hero-tile" style={{ background: "linear-gradient(135deg,#0f766e,#16a34a)" }}>Outdoors</div>
            <div className="hero-tile" style={{ background: "linear-gradient(135deg,#b45309,#f59e0b)" }}>Home</div>
            <div className="hero-tile" style={{ background: "linear-gradient(135deg,#be123c,#f43f5e)" }}>Footwear</div>
          </div>
        </div>
      </div>

      <div className="container">
        <section id="categories" className="section" aria-labelledby="categories-title">
          <div className="section-head">
            <div>
              <h2 id="categories-title">{homeSections.categoriesTitle}</h2>
              <p style={{ color: "var(--color-text-secondary)" }}>{homeSections.categoriesSubtitle}</p>
            </div>
            <Link href="/products" className="btn btn-secondary btn-sm">View all</Link>
          </div>
          <div className="product-grid">
            {categories.map((c) => (
              <CategoryTile key={c.slug} category={c} count={counts.get(c.slug) ?? 0} />
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="featured-title">
          <div className="section-head">
            <div>
              <h2 id="featured-title">{homeSections.featuredTitle}</h2>
              <p style={{ color: "var(--color-text-secondary)" }}>{homeSections.featuredSubtitle}</p>
            </div>
            <Link href="/products?sort=rating" className="btn btn-secondary btn-sm">Top rated</Link>
          </div>
          <ProductGrid items={featured} />
        </section>

        <section className="section" aria-labelledby="value-title">
          <h2 id="value-title">{homeSections.valueTitle}</h2>
          <div className="promo-grid">
            {promoBanners.map((b) => (
              <div key={b.title} className="card card-pad promo-card">
                <p style={{ fontWeight: 800, marginBottom: "0.25rem" }}>{b.title}</p>
                <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>{b.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
