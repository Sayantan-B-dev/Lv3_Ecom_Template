import Link from "next/link";
import { categoryGradients } from "@/lib/catalog";
import type { Category } from "@/lib/types";

export function CategoryTile({ category, count }: { category: Category; count: number }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="category-tile"
      style={{ background: categoryGradients[category.slug] ?? "#334155" }}
    >
      <div style={{ fontSize: "2rem" }} aria-hidden="true">
        {category.glyph}
      </div>
      <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>{category.name}</div>
      <div style={{ opacity: 0.9, fontSize: "0.9rem" }}>
        {category.tagline} · {count} items
      </div>
    </Link>
  );
}
