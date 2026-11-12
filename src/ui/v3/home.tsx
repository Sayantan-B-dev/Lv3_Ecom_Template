import Link from "next/link";
import { brand } from "@/config/brand";
import {
  editorialContent,
  nocturneContent,
  promoBanners,
  site,
} from "@/config/content";
import { footerShopLinks } from "@/config/navigation";
import { getCategories, getFeatured, getProducts } from "@/lib/catalog";
import { currency } from "@/lib/format";
import { ProductCard } from "@/ui/shared/components/ProductCard";

function splitLastWord(value: string): { lead: string; last: string } {
  const words = value.trim().split(/\s+/);
  const last = words.pop() ?? "";
  return { lead: words.join(" "), last };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function V3Home() {
  const categories = getCategories();
  const products = getProducts();
  const featured = getFeatured(5);

  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.categorySlug, (counts.get(product.categorySlug) ?? 0) + 1);
  }

  const heroTitle = splitLastWord(editorialContent.title);
  const manifestoTitle = splitLastWord(editorialContent.manifestoTitle);
  const tickerItems = [
    nocturneContent.tickerNote,
    ...categories.map((category) => category.name),
    ...promoBanners.map((banner) => banner.title),
  ];

  const stats = [
    { value: String(products.length), label: nocturneContent.stats.products },
    { value: pad(categories.length), label: nocturneContent.stats.departments },
    { value: currency(site.freeShippingThreshold), label: nocturneContent.stats.shipping },
    { value: promoBanners[1].title, label: nocturneContent.stats.returns },
  ];

  return (
    <div className="v3-home">
      <section className="v3-hero" aria-labelledby="v3-hero-title">
        <div className="v3-hero-watermark" aria-hidden="true">
          {brand.name}
        </div>
        <div className="container v3-hero-grid">
          <div>
            <p className="v3-kicker">
              <span className="v3-dot" aria-hidden="true" />
              {editorialContent.kicker}
            </p>
            <h1 id="v3-hero-title" className="v3-hero-title">
              {heroTitle.lead} <em>{heroTitle.last}</em>
            </h1>
            <p className="v3-lede">{editorialContent.subtitle}</p>
            <div className="v3-hero-actions">
              <Link href={editorialContent.primaryCta.href} className="btn btn-accent">
                {editorialContent.primaryCta.label}
              </Link>
              <Link href={editorialContent.secondaryCta.href} className="v3-textlink">
                {editorialContent.secondaryCta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside className="v3-index" aria-labelledby="v3-index-title">
            <div className="v3-index-head">
              <p id="v3-index-title">{editorialContent.indexTitle}</p>
              <span>{nocturneContent.indexMeta}</span>
            </div>
            <ol className="v3-index-list">
              {categories.map((category, index) => (
                <li key={category.slug}>
                  <Link href={`/category/${category.slug}`} className="v3-index-link">
                    <span className="v3-index-num" aria-hidden="true">
                      {pad(index + 1)}
                    </span>
                    <span className="v3-index-name">{category.name}</span>
                    <span className="v3-index-count">
                      {counts.get(category.slug) ?? 0} items
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <div className="container">
          <div className="v3-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="v3-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="v3-ticker" aria-hidden="true">
        <div className="v3-ticker-track">
          {[0, 1].flatMap((copy) =>
            tickerItems.map((item, index) => (
              <span key={`${copy}-${index}-${item}`} className="v3-ticker-item">
                {item}
              </span>
            )),
          )}
        </div>
      </div>

      <section className="container v3-section" aria-labelledby="v3-edit-title">
        <div className="v3-section-head">
          <p className="v3-eyebrow">{editorialContent.featuredTitle}</p>
          <h2 id="v3-edit-title">{editorialContent.featuredSubtitle}</h2>
          <Link href={editorialContent.featuredCta.href} className="v3-section-link">
            {editorialContent.featuredCta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="v3-edit-grid">
          {featured.map((product, index) => (
            <div
              key={product.slug}
              className={index === 0 ? "v3-edit-cell is-lead" : "v3-edit-cell"}
            >
              {index === 0 && (
                <p className="v3-lead-label">
                  <span>{nocturneContent.leadLabel}</span>
                  <em>{nocturneContent.leadNote}</em>
                </p>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section
        id="departments"
        className="container v3-section"
        aria-labelledby="v3-dept-title"
      >
        <div className="v3-section-head">
          <p className="v3-eyebrow">{editorialContent.departmentsTitle}</p>
          <h2 id="v3-dept-title">{editorialContent.departmentsSubtitle}</h2>
          <Link href={footerShopLinks[0].href} className="v3-section-link">
            {footerShopLinks[0].label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ol className="v3-dept-list">
          {categories.map((category, index) => (
            <li key={category.slug}>
              <Link href={`/category/${category.slug}`} className="v3-dept-link">
                <span className="v3-dept-num" aria-hidden="true">
                  {pad(index + 1)}
                </span>
                <span className="v3-dept-name">{category.name}</span>
                <span className="v3-dept-tagline">{category.tagline}</span>
                <span className="v3-dept-count">
                  {counts.get(category.slug) ?? 0} items
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="v3-manifesto" aria-labelledby="v3-manifesto-title">
        <div className="container v3-manifesto-grid">
          <div>
            <p className="v3-eyebrow">{editorialContent.valueTitle}</p>
            <h2 id="v3-manifesto-title">
              {manifestoTitle.lead} <em>{manifestoTitle.last}</em>
            </h2>
          </div>
          <div className="v3-promises">
            {promoBanners.map((banner, index) => (
              <div key={banner.title} className="v3-promise">
                <span className="v3-promise-num" aria-hidden="true">
                  {pad(index + 1)}
                </span>
                <div>
                  <strong>{banner.title}</strong>
                  <p>{banner.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
