import { site } from "@/config/content";

export function Rating({ value, reviews }: { value: number; reviews?: number }) {
  const full = Math.round(value);
  return (
    <span className="rating" role="img" aria-label={`${value.toFixed(1)} out of ${site.ratingMax}, ${reviews ?? 0} reviews`}>
      <span aria-hidden="true">
        {"★".repeat(full)}
        {"☆".repeat(Math.max(0, site.ratingMax - full))}
      </span>{" "}
      {value.toFixed(1)}
      {reviews !== undefined && <span> ({reviews})</span>}
    </span>
  );
}
