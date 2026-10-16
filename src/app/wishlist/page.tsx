"use client";

import { getProduct } from "@/lib/catalog";
import { useStore } from "@/lib/store-context";
import { ProductGrid } from "@/components/catalog/ProductCard";
import { EmptyState } from "@/components/ui/States";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <h1>Wishlist</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>Mock wishlist stored in your browser.</p>
      {items.length === 0 ? (
        <EmptyState title="No saved items" detail="Tap the heart on any product to save it here." actionLabel="Browse products" actionHref="/products" />
      ) : (
        <ProductGrid items={items} />
      )}
    </div>
  );
}
