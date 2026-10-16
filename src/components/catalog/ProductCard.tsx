"use client";

import Link from "next/link";
import { gradientFor } from "@/lib/catalog";
import { currency } from "@/lib/format";
import { useStore } from "@/lib/store-context";
import type { Product } from "@/lib/types";
import { Rating } from "./Rating";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore();
  const active = wishlist.includes(product.slug);

  return (
    <article className="card product-card">
      <Link
        href={`/products/${product.slug}`}
        className="product-media"
        style={{ background: gradientFor(product) }}
        aria-label={`View ${product.name}`}
      >
        <span aria-hidden="true">{product.glyph}</span>
      </Link>
      <div className="product-card-body">
        <div>
          {product.compareAtPrice && <span className="badge badge-accent">Sale</span>}{" "}
          {product.tags.includes("new") && <span className="badge badge-brand">New</span>}
        </div>
        <Link href={`/products/${product.slug}`} className="product-card-title">
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="price-row">
          <span className="price">{currency(product.price)}</span>
          {product.compareAtPrice && (
            <span className="price-compare">{currency(product.compareAtPrice)}</span>
          )}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            style={{ marginLeft: "auto" }}
            aria-pressed={active}
            aria-label={active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            onClick={() => toggleWishlist(product.slug)}
          >
            {active ? "♥" : "♡"}
          </button>
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
