import Link from "next/link";
import { brand } from "@/config/brand";
import { footerCompanyLinks, footerShopLinks } from "@/config/navigation";

export function V2Footer() {
  return (
    <footer className="ed-footer">
      <div className="container ed-footer-grid">
        <div>
          <p className="ed-footer-brand">{brand.name}</p>
          <p>{brand.tagline}.</p>
          <p>
            <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
          </p>
        </div>

        <nav aria-label="Shop">
          <h2>Shop</h2>
          <ul>
            {footerShopLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Account">
          <h2>Account</h2>
          <ul>
            {footerCompanyLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Demo notice</h2>
          <p>
            Authentication, checkout and orders are mocked with local data. No real payment is
            processed and no goods are shipped.
          </p>
        </div>
      </div>

      <div className="container ed-footer-legal">
        © {new Date().getFullYear()} {brand.name}. Reusable storefront template.
      </div>
    </footer>
  );
}
