import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        className="btn btn-secondary btn-sm"
        aria-disabled={page <= 1}
      >
        ← Prev
      </Link>
      <span aria-current="page">
        Page {page} of {totalPages}
      </span>
      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        className="btn btn-secondary btn-sm"
        aria-disabled={page >= totalPages}
      >
        Next →
      </Link>
    </nav>
  );
}
