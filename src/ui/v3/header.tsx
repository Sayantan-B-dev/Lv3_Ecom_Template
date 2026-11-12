"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand } from "@/config/brand";
import { nocturneContent, site } from "@/config/content";
import { primaryNav } from "@/config/navigation";
import { currency } from "@/lib/format";
import { useStore } from "@/lib/store-context";

function badgeLabel(count: number): string {
  return count > 99 ? "99+" : String(count);
}

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.6-4 4.5-6 8-6s6.4 2 8 6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function V3Header() {
  const { cartCount, wishlist, user } = useStore();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const accountHref = user ? "/account" : "/auth/sign-in";

  return (
    <header className="v3-header">
      <div className="v3-utility">
        <div className="container v3-utility-inner">
          <span>
            {nocturneContent.utilityShipping}{" "}
            <strong>{currency(site.freeShippingThreshold)}</strong>
          </span>
          <span className="v3-utility-note">{nocturneContent.utilityDemo}</span>
        </div>
      </div>

      <div className="container v3-masthead">
        <button
          type="button"
          className="v3-menu"
          aria-expanded={open}
          aria-controls="v3-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="v3-menu-bars" aria-hidden="true">
            <span />
            <span />
          </span>
          {open ? "Close" : "Menu"}
        </button>

        <Link href="/" className="v3-brand" aria-label={`${brand.name} home`}>
          <span className="v3-brand-mark" aria-hidden="true">
            {brand.logoMark}
          </span>
          {brand.logoText}
        </Link>

        <nav className="v3-nav" aria-label="Primary">
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

        <div className="v3-actions">
          <Link href="/search" className="v3-icon" aria-label="Search products">
            <SearchIcon />
          </Link>
          <Link
            href="/wishlist"
            className="v3-icon"
            aria-label={`Wishlist, ${wishlist.length} items`}
          >
            <HeartIcon />
            {wishlist.length > 0 && (
              <span className="v3-count" aria-hidden="true">
                {badgeLabel(wishlist.length)}
              </span>
            )}
          </Link>
          <Link
            href={accountHref}
            className="v3-icon v3-icon--account"
            aria-label={user ? "Account" : "Sign in"}
          >
            <UserIcon />
          </Link>
          <Link href="/cart" className="v3-icon" aria-label={`Cart, ${cartCount} items`}>
            <BagIcon />
            {cartCount > 0 && (
              <span className="v3-count" aria-hidden="true">
                {badgeLabel(cartCount)}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav id="v3-mobile-nav" className="v3-drawer" aria-label="Mobile" hidden={!open}>
        <div className="container v3-drawer-inner">
          <ul>
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="v3-drawer-meta">
            <Link href="/search" onClick={() => setOpen(false)}>
              Search
            </Link>
            <Link href="/wishlist" onClick={() => setOpen(false)}>
              Wishlist
            </Link>
            <Link href={accountHref} onClick={() => setOpen(false)}>
              {user ? "Account" : "Sign in"}
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}>
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
