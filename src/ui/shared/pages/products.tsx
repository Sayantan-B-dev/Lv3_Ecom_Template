import Link from "next/link";
import { getCategories, queryCatalog } from "@/lib/catalog";
import { site } from "@/config/content";
import { Breadcrumbs } from "@/ui/shared/components/Breadcrumbs";
import { ProductGrid } from "@/ui/shared/components/ProductCard";
import { Pagination } from "@/ui/shared/components/Pagination";
import { EmptyState } from "@/ui/shared/components/States";
import type { SortKey } from "@/lib/types";
import { first, type SearchParams } from "@/ui/shared/search-params";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A–Z" },
];

function hrefFor(base: string, params: Record<string, string | undefined>, page: number): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v);
  }
  sp.set("page", String(page));
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}

export async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = first(sp.q);
  const sort = (first(sp.sort) as SortKey) || "featured";
  const page = Number(first(sp.page)) || 1;
  const minPrice = first(sp.minPrice);
  const maxPrice = first(sp.maxPrice);
  const minRating = first(sp.minRating);
  const result = queryCatalog({
    q,
    sort,
    page,
    perPage: site.paginationDefault,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minRating: minRating ? Number(minRating) : undefined,
  });
  const categories = getCategories();

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Products" }]} />
      <h1>All products</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>
        {result.total} mock products · mock prices in USD · no real checkout.
      </p>

      <div className="catalog-layout">
        <aside className="filters" aria-label="Filters">
          <form method="get" action="/products">
            <h2 style={{ fontSize: "1rem" }}>Filter & sort</h2>
            <div className="field">
              <label htmlFor="q">Search</label>
              <input id="q" name="q" className="input" defaultValue={q ?? ""} placeholder="Tee, lamp, pack…" />
            </div>
            <div className="field">
              <label htmlFor="sort">Sort</label>
              <select id="sort" name="sort" className="select" defaultValue={sort}>
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="two-col">
              <div className="field">
                <label htmlFor="minPrice">Min $</label>
                <input id="minPrice" name="minPrice" className="input" type="number" min={0} defaultValue={minPrice ?? ""} />
              </div>
              <div className="field">
                <label htmlFor="maxPrice">Max $</label>
                <input id="maxPrice" name="maxPrice" className="input" type="number" min={0} defaultValue={maxPrice ?? ""} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="minRating">Min rating</label>                  <select id="minRating" name="minRating" className="select" defaultValue={minRating ?? ""}>
                <option value="">Any</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Apply</button>
            <Link href="/products" className="btn btn-ghost btn-block">Reset</Link>
          </form>
          <nav aria-label="Categories" style={{ marginTop: "1rem" }}>
            <p style={{ fontWeight: 700 }}>Categories</p>
            {categories.map((c) => (
              <div key={c.slug}>
                <Link href={`/category/${c.slug}`}>{c.name}</Link>
              </div>
            ))}
          </nav>
        </aside>

        <div>
          {result.items.length === 0 ? (
            <EmptyState
              title="No products match"
              detail="Try removing a filter or searching for something else."
              actionLabel="Clear filters"
              actionHref="/products"
            />
          ) : (
            <>
              <ProductGrid items={result.items} />
              <Pagination
                page={result.page}
                totalPages={result.totalPages}
                hrefFor={(p) =>
                  hrefFor("/products", { q, sort, minPrice, maxPrice, minRating }, p)
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
