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

export function V2Header() {
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

  return (
    <header className="ed-header">
      <div className="ed-utility">
        <div className="container ed-utility-inner">
          <span>Complimentary shipping over $75</span>
          <span className="ed-utility-note">Demo storefront · mock checkout</span>
        </div>
      </div>

      <div className="container ed-masthead">
        <button
          type="button"
          className="ed-menu"
          aria-expanded={open}
          aria-controls="ed-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <Link href="/" className="ed-wordmark" aria-label={`${brand.name} home`}>
          {brand.logoText}
          <span>Independent goods · Est. 2026</span>
        </Link>

        <div className="ed-actions">
          <Link href="/search" className="ed-action ed-action-secondary" aria-label="Search products">
            <span className="ed-action-icon" aria-hidden="true">
              ⌕
            </span>
            <span className="ed-action-label">Search</span>
          </Link>
          <Link
            href="/wishlist"
            className="ed-action ed-action-secondary"
            aria-label={`Wishlist, ${wishlist.length} items`}
          >
            <span className="ed-action-icon" aria-hidden="true">
              ♡
            </span>
            <span className="ed-action-label">Saved</span>
            {wishlist.length > 0 && <span className="ed-count">{badgeLabel(wishlist.length)}</span>}
          </Link>
          <Link href="/cart" className="ed-action" aria-label={`Cart, ${cartCount} items`}>
            <span className="ed-action-icon" aria-hidden="true">
              Bag
            </span>
            <span className="ed-action-label">Bag</span>
            {cartCount > 0 && <span className="ed-count">{badgeLabel(cartCount)}</span>}
          </Link>
          <Link
            href={user ? "/account" : "/auth/sign-in"}
            className="ed-action ed-action-secondary"
            aria-label={user ? "Account" : "Sign in"}
          >
            <span className="ed-action-icon" aria-hidden="true">
              ◎
            </span>
            <span className="ed-action-label">{user ? "Account" : "Sign in"}</span>
          </Link>
        </div>
      </div>

      <nav className="ed-nav" aria-label="Primary">
        <div className="container">
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
        </div>
      </nav>

      <nav id="ed-mobile-nav" className="ed-mobile-nav" aria-label="Mobile" hidden={!open}>
        <div className="container">
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
            <li>
              <Link href="/search" onClick={() => setOpen(false)}>
                Search
              </Link>
            </li>
            <li>
              <Link href="/wishlist" onClick={() => setOpen(false)}>
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href={user ? "/account" : "/auth/sign-in"}
                onClick={() => setOpen(false)}
              >
                {user ? "Account" : "Sign in"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
