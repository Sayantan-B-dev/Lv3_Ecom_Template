import Link from "next/link";

export function EmptyState({
  title,
  detail,
  actionLabel,
  actionHref,
}: {
  title: string;
  detail: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="empty-state" role="status">
      <h2>{title}</h2>
      <p style={{ color: "var(--color-subtle)" }}>{detail}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function ErrorState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="error-state" role="alert">
      <h2>{title}</h2>
      <p>{detail}</p>
      <Link href="/products" className="btn btn-secondary">
        Back to products
      </Link>
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="product-grid" aria-label="Loading products" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <div className="skeleton" style={{ aspectRatio: "4/3" }} />
          <div className="card-pad" style={{ display: "grid", gap: "0.5rem" }}>
            <div className="skeleton" style={{ width: "70%" }} />
            <div className="skeleton" style={{ width: "40%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
