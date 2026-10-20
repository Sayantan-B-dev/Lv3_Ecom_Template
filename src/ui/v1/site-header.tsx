"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand } from "@/config/brand";
import { primaryNav } from "@/config/navigation";
import { useStore } from "@/lib/store-context";

function badgeLabel(count: number): string {
  return count > 99 ? "99+" : String(count);
}

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const { cartCount, wishlist, user } = useStore();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <div className="promo-bar">
        Demo storefront — mock checkout, no real payments. Free mock shipping over $75.
      </div>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container site-header-inner">
          <button
            className="icon-btn header-menu"
            aria-expanded={open}
            aria-controls="v1-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
          <Link href="/" className="brand-lockup" aria-label={`${brand.name} home`}>
            <span className="brand-mark" aria-hidden="true">
              {brand.logoMark}
            </span>
            <span>{brand.logoText}</span>
          </Link>
          <nav className="primary-nav" aria-label="Primary">
            <ul>
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            <Link
              href="/search"
              className="icon-btn header-action-secondary"
              aria-label="Search products"
            >
              <span aria-hidden="true">⌕</span>
            </Link>
            <Link
              href="/wishlist"
              className="icon-btn header-action-secondary"
              aria-label={`Wishlist, ${wishlist.length} items`}
            >
              <span aria-hidden="true">♥</span>
              {wishlist.length > 0 && (
                <span className="count-pill">{badgeLabel(wishlist.length)}</span>
              )}
            </Link>
            <Link href="/cart" className="icon-btn" aria-label={`Cart, ${cartCount} items`}>
              <span aria-hidden="true">🛒</span>
              {cartCount > 0 && <span className="count-pill">{badgeLabel(cartCount)}</span>}
            </Link>
            <Link
              href={user ? "/account" : "/auth/sign-in"}
              className="btn btn-secondary btn-sm header-action-secondary"
            >
              {user ? "Account" : "Sign in"}
            </Link>
          </div>
        </div>
        <nav id="v1-mobile-nav" className="container" aria-label="Mobile" hidden={!open}>
          <ul style={{ listStyle: "none", margin: 0, padding: "0 0 16px" }}>
            {primaryNav.map((link) => (
              <li key={link.href} style={{ padding: "4px 0" }}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ padding: "4px 0" }}>
              <Link href="/search" onClick={() => setOpen(false)}>
                Search
              </Link>
            </li>
            <li style={{ padding: "4px 0" }}>
              <Link href="/wishlist" onClick={() => setOpen(false)}>
                Wishlist
              </Link>
            </li>
            <li style={{ padding: "4px 0" }}>
              <Link
                href={user ? "/account" : "/auth/sign-in"}
                onClick={() => setOpen(false)}
              >
                {user ? "Account" : "Sign in"}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
