import Link from "next/link";
import { getCategoryImage } from "@/lib/images/getImage";
import type { Category } from "@/lib/types";
import { ImageFrame } from "./ImageFrame";

export function CategoryTile({ category, count }: { category: Category; count: number }) {
  return (
    <Link href={`/category/${category.slug}`} className="category-tile">
      <ImageFrame image={getCategoryImage(category)} decorative />
      <div className="category-tile-content">
        <div style={{ fontSize: "2rem" }} aria-hidden="true">
          {category.glyph}
        </div>
        <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>{category.name}</div>
        <div style={{ opacity: 0.9, fontSize: "0.9rem" }}>
          {category.tagline} · {count} items
        </div>
      </div>
    </Link>
  );
}
