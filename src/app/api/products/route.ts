import { NextResponse } from "next/server";
import { queryCatalog } from "@/lib/catalog";
import type { SortKey } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const num = (key: string) => {
    const raw = searchParams.get(key);
    if (!raw) return undefined;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const result = queryCatalog({
    q: searchParams.get("q") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    minPrice: num("minPrice"),
    maxPrice: num("maxPrice"),
    minRating: num("minRating"),
    sort: (searchParams.get("sort") as SortKey | null) ?? "featured",
    page: num("page") ?? 1,
    perPage: num("perPage") ?? 9,
  });

  return NextResponse.json(result);
}
