import Link from "next/link";

export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  const middleStart = 1;
  const middleEnd = trail.length - 1;
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs" style={{ margin: "16px 0" }}>
      <ol>
        {trail.map((crumb, i) => {
          const isMiddle = i >= middleStart && i < middleEnd && trail.length > 3;
          return (
            <li
              key={crumb.label}
              className={isMiddle ? "is-collapsed" : undefined}
              style={{ display: "flex", gap: "8px", alignItems: "center" }}
            >
              {i > 0 && (
                <span aria-hidden="true" style={{ color: "var(--color-text-secondary)" }}>
                  /
                </span>
              )}
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
