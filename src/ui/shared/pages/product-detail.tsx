import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, getRelated, gradientFor } from "@/lib/catalog";
import { currency } from "@/lib/format";
import { Breadcrumbs } from "@/ui/shared/components/Breadcrumbs";
import { Rating } from "@/ui/shared/components/Rating";
import { AddToCart } from "@/ui/shared/components/AddToCart";
import { ProductGrid } from "@/ui/shared/components/ProductCard";

export async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.categorySlug);
  const related = getRelated(product, 3);

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />
      <div className="product-layout">
        <div className="detail-gallery" style={{ background: gradientFor(product) }} role="img" aria-label={`${product.name} placeholder image`}>
          <span aria-hidden="true">{product.glyph}</span>
        </div>
        <div>
          <p style={{ margin: 0 }}>
            {category && <Link href={`/category/${category.slug}`}>{category.name}</Link>}
          </p>
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} />
          <p style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0.5rem 0" }}>
            {currency(product.price)}{" "}
            {product.compareAtPrice && (
              <span className="price-compare">{currency(product.compareAtPrice)}</span>
            )}
          </p>
          <p>{product.shortDescription}</p>
          <p style={{ color: "var(--color-text-secondary)" }}>{product.description}</p>
          <ul>
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <AddToCart product={product} />
        </div>
      </div>
      <section className="section" aria-labelledby="related">
        <h2 id="related">Related products</h2>
        <ProductGrid items={related} />
      </section>
    </div>
  );
}
