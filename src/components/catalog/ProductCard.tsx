"use client";

import Link from "next/link";
import { getCategory, gradientFor } from "@/lib/catalog";
import { currency } from "@/lib/format";
import { useStore } from "@/lib/store-context";
import type { Product } from "@/lib/types";
import { Rating } from "./Rating";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore();
  const active = wishlist.includes(product.slug);
  const category = getCategory(product.categorySlug);

  return (
    <article className="card product-card">
      <div
        className="product-media"
        style={{ background: gradientFor(product) }}
        role="img"
        aria-label={`${product.name} placeholder image`}
      >
        <span aria-hidden="true">{product.glyph}</span>
      </div>
      <div className="product-card-badges" aria-hidden="true">
        {product.compareAtPrice && <span className="badge badge-accent">Sale</span>}
        {product.tags.includes("new") && <span className="badge badge-brand">New</span>}
      </div>
      <button
        type="button"
        className="icon-btn product-card-wishlist"
        aria-pressed={active}
        aria-label={active ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        onClick={() => toggleWishlist(product.slug)}
      >
        <span aria-hidden="true">{active ? "♥" : "♡"}</span>
      </button>
      <div className="product-card-body">
        {category && <p className="product-card-eyebrow">{category.name}</p>}
        <Link href={`/products/${product.slug}`} className="product-card-title" title={product.name}>
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="price-row">
          <span className="price">
            <span className="visually-hidden">Price: </span>
            {currency(product.price)}
          </span>
          {product.compareAtPrice && (
            <del className="price-compare">
              <span className="visually-hidden">Original price: </span>
              {currency(product.compareAtPrice)}
            </del>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
