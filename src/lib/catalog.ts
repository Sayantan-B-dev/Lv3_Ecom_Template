import categoriesJson from "@/data/categories.json";
import productsJson from "@/data/products.json";
import type { CatalogQuery, Category, Paginated, Product, SortKey } from "@/lib/types";

export const categories: Category[] = categoriesJson as Category[];
export const products: Product[] = productsJson as Product[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeatured(count = 6): Product[] {
  return products.filter((p) => p.featured).slice(0, count);
}

export function getRelated(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug)
    .concat(products.filter((p) => p.slug !== product.slug && p.categorySlug !== product.categorySlug))
    .slice(0, count);
}

function applySort(items: Product[], sort: SortKey): Product[] {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export function queryCatalog(query: CatalogQuery): Paginated<Product> {
  const perPage = query.perPage ?? 9;
  const page = Math.max(1, query.page ?? 1);
  const sort: SortKey = query.sort ?? "featured";

  let items = [...products];

  if (query.category) {
    items = items.filter((p) => p.categorySlug === query.category);
  }
  if (query.q) {
    const needle = query.q.toLowerCase();
    items = items.filter((p) =>
      [p.name, p.shortDescription, p.description, p.categorySlug, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }
  if (query.minPrice !== undefined) items = items.filter((p) => p.price >= query.minPrice!);
  if (query.maxPrice !== undefined) items = items.filter((p) => p.price <= query.maxPrice!);
  if (query.minRating !== undefined) items = items.filter((p) => p.rating >= query.minRating!);

  items = applySort(items, sort);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    total,
    page: safePage,
    perPage,
    totalPages,
  };
}

export const categoryGradients: Record<string, string> = {
  apparel: "linear-gradient(135deg,#1d4ed8,#7c3aed)",
  footwear: "linear-gradient(135deg,#be123c,#f43f5e)",
  accessories: "linear-gradient(135deg,#0f766e,#14b8a6)",
  "home-goods": "linear-gradient(135deg,#b45309,#f59e0b)",
  electronics: "linear-gradient(135deg,#334155,#0ea5e9)",
  outdoors: "linear-gradient(135deg,#15803d,#84cc16)",
};

export function gradientFor(product: Pick<Product, "categorySlug">): string {
  return categoryGradients[product.categorySlug] ?? "linear-gradient(135deg,#334155,#64748b)";
}
