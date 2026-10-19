import { notFound } from "next/navigation";
import { getCategory, queryCatalog } from "@/lib/catalog";
import { site } from "@/config/content";
import { Breadcrumbs } from "@/ui/shared/components/Breadcrumbs";
import { ProductGrid } from "@/ui/shared/components/ProductCard";
import { Pagination } from "@/ui/shared/components/Pagination";
import { EmptyState } from "@/ui/shared/components/States";
import type { CategoryPageProps } from "@/ui/contract";
import { first } from "@/ui/shared/search-params";


export async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = getCategory(slug);
  if (!category) notFound();

  const page = Number(first(sp.page)) || 1;
  const sort =
    (first(sp.sort) as "featured" | "price-asc" | "price-desc" | "rating" | "newest" | "name") ||
    "featured";
  const result = queryCatalog({ category: slug, page, perPage: site.paginationDefault, sort });

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: category.name }]} />
      <h1>{category.name}</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>{category.description}</p>
      {result.items.length === 0 ? (
        <EmptyState title="No products yet" detail="This category has no mock products." actionLabel="Browse all" actionHref="/products" />
      ) : (
        <>
          <ProductGrid items={result.items} />
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            hrefFor={(p) => `/category/${slug}?sort=${sort}&page=${p}`}
          />
        </>
      )}
    </div>
  );
}
