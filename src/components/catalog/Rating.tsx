import { site } from "@/config/content";

export function Rating({ value, reviews }: { value: number; reviews?: number }) {
  const full = Math.round(value);
  return (
    <span className="rating" aria-label={`Rated ${value} out of ${site.ratingMax}`}>
      {"★".repeat(full)}
      {"☆".repeat(Math.max(0, site.ratingMax - full))} {value.toFixed(1)}
      {reviews !== undefined && <span> ({reviews})</span>}
    </span>
  );
}
