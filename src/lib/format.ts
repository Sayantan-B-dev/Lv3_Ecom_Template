import { brand } from "@/config/brand";

export function currency(value: number): string {
  return new Intl.NumberFormat(brand.locale, {
    style: "currency",
    currency: brand.currency,
  }).format(value);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(brand.locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
