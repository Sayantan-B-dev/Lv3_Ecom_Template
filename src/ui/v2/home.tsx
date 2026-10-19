import Link from "next/link";
import { editorialContent, promoBanners } from "@/config/content";
import { getCategories, getFeatured, getProducts } from "@/lib/catalog";
import { ProductCard } from "@/ui/shared/components/ProductCard";

export function V2Home() {
  const categories = getCategories();
  const featured = getFeatured(6);
  const counts = new Map<string, number>();
  for (const product of getProducts()) {
    counts.set(product.categorySlug, (counts.get(product.categorySlug) ?? 0) + 1);
  }

  return (
    <div className="ed-home">
      <section className="ed-hero" aria-labelledby="ed-hero-title">
        <div className="container ed-hero-grid">
          <div>
            <p className="ed-kicker">{editorialContent.kicker}</p>
            <h1 id="ed-hero-title" className="ed-hero-title">
              {editorialContent.title}
            </h1>
            <p className="ed-lede">{editorialContent.subtitle}</p>
            <div className="ed-cta-row">
              <Link href={editorialContent.primaryCta.href} className="btn btn-primary">
                {editorialContent.primaryCta.label}
              </Link>
              <Link href={editorialContent.secondaryCta.href} className="btn btn-secondary">
                {editorialContent.secondaryCta.label}
              </Link>
            </div>
            <p className="ed-note">{editorialContent.note}</p>
          </div>

          <div className="ed-index" aria-labelledby="ed-index-title">
            <p id="ed-index-title" className="ed-index-title">
              {editorialContent.indexTitle}
            </p>
            <ol>
              {categories.map((category, index) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`}>
                    <span className="ed-index-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="ed-index-name">{category.name}</span>
                    <span className="ed-index-count">{counts.get(category.slug) ?? 0} items</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container ed-edit" aria-labelledby="ed-edit-title">
        <div className="ed-edit-head">
          <div>
            <h2 id="ed-edit-title">{editorialContent.featuredTitle}</h2>
            <p className="ed-edit-sub">{editorialContent.featuredSubtitle}</p>
          </div>
          <Link href={editorialContent.featuredCta.href} className="btn btn-secondary btn-sm">
            {editorialContent.featuredCta.label}
          </Link>
        </div>
        <div className="ed-edit-grid">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="ed-manifesto" aria-labelledby="ed-manifesto-title">
        <div className="container">
          <h2 id="ed-manifesto-title">{editorialContent.manifestoTitle}</h2>
          <div className="ed-manifesto-grid">
            {promoBanners.map((banner, index) => (
              <div key={banner.title} className="ed-promise">
                <span className="ed-promise-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{banner.title}</strong>
                <p>{banner.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="departments"
        className="container ed-departments"
        aria-labelledby="ed-departments-title"
      >
        <div className="ed-departments-head">
          <div>
            <h2 id="ed-departments-title">{editorialContent.departmentsTitle}</h2>
            <p>{editorialContent.departmentsSubtitle}</p>
          </div>
          <Link href="/products" className="btn btn-secondary btn-sm">
            Browse all products
          </Link>
        </div>
        <div className="ed-department-list">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="ed-department"
            >
              <span className="ed-department-name">{category.name}</span>
              <span className="ed-department-count">{counts.get(category.slug) ?? 0} items</span>
              <span className="ed-department-tagline">{category.tagline}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
