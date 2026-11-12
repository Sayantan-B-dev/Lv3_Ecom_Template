import Link from "next/link";
import { brand } from "@/config/brand";
import { nocturneContent } from "@/config/content";
import { footerCompanyLinks, footerShopLinks } from "@/config/navigation";
import { V3Newsletter } from "./newsletter";

export function V3Footer() {
  const copy = nocturneContent.footer;

  return (
    <footer className="v3-footer">
      <div className="container v3-footer-top">
        <div>
          <p className="v3-footer-wordmark">
            {brand.name}
            <em aria-hidden="true">.</em>
          </p>
          <p className="v3-footer-lede">{brand.tagline}.</p>
        </div>
        <V3Newsletter />
      </div>

      <div className="container v3-footer-grid">
        <nav aria-label={copy.shopHeading}>
          <h2>{copy.shopHeading}</h2>
          <ul>
            {footerShopLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={copy.accountHeading}>
          <h2>{copy.accountHeading}</h2>
          <ul>
            {footerCompanyLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>{copy.noteHeading}</h2>
          <p className="v3-footer-note">{copy.note}</p>
        </div>
      </div>

      <div className="container v3-footer-legal">
        <span>
          © {new Date().getFullYear()} {brand.name}. {copy.legal}.
        </span>
        <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
      </div>
    </footer>
  );
}
