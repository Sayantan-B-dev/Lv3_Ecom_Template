import { queryCatalog } from "@/lib/catalog";
import { site } from "@/config/content";
import { Breadcrumbs } from "@/ui/shared/components/Breadcrumbs";
import { ProductGrid } from "@/ui/shared/components/ProductCard";
import { EmptyState } from "@/ui/shared/components/States";
import type { SearchPageProps } from "@/ui/contract";
import { first } from "@/ui/shared/search-params";


export async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const q = (first(sp.q) ?? "").trim();
  const result = q ? queryCatalog({ q, perPage: site.paginationDefault * 2 }) : null;

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <h1>Search</h1>
      <form method="get" action="/search" role="search" aria-label="Product search" className="search-bar">
        <div className="field">
          <label htmlFor="q">Search products</label>
          <input id="q" name="q" className="input" defaultValue={q} placeholder="Try “pack”, “lamp” or “sneaker”" />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <div style={{ marginTop: "1.5rem" }}>
        {!q && <p style={{ color: "var(--color-text-secondary)" }}>Enter a term to search the mock catalog.</p>}
        {result && result.items.length === 0 && (
          <EmptyState title={`No results for “${q}”`} detail="Try a different keyword or browse all products." actionLabel="Browse all" actionHref="/products" />
        )}
        {result && result.items.length > 0 && (
          <>
            <p>
              {result.total} {result.total === 1 ? "result" : "results"} for “{q}”.
            </p>
            <ProductGrid items={result.items} />
          </>
        )}
      </div>
    </div>
  );
}
