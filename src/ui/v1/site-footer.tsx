import Link from "next/link";
import { brand } from "@/config/brand";
import { footerCompanyLinks, footerShopLinks } from "@/config/navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>{brand.name}</p>
          <p style={{ color: "var(--color-text-inverse-secondary)", maxWidth: "22rem" }}>{brand.tagline}.</p>
          <p style={{ color: "var(--color-text-inverse-secondary)", fontSize: "0.9rem" }}>
            Contact: <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
          </p>
        </div>
        <nav aria-label="Shop">
          <p style={{ fontWeight: 700 }}>Shop</p>
          {footerShopLinks.map((link) => (
            <div key={link.href + link.label}>
              <Link href={link.href}>{link.label}</Link>
            </div>
          ))}
        </nav>
        <nav aria-label="Account">
          <p style={{ fontWeight: 700 }}>Account</p>
          {footerCompanyLinks.map((link) => (
            <div key={link.href + link.label}>
              <Link href={link.href}>{link.label}</Link>
            </div>
          ))}
        </nav>
        <div>
          <p style={{ fontWeight: 700 }}>Demo notice</p>
          <p style={{ color: "var(--color-text-inverse-secondary)", fontSize: "0.9rem" }}>
            Authentication, checkout and orders are mocked with local data. No real payment is
            processed.
          </p>
        </div>
      </div>
      <div className="container" style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--color-text-inverse-secondary)" }}>
        © {new Date().getFullYear()} {brand.name}. Reusable storefront template.
      </div>
    </footer>
  );
}
