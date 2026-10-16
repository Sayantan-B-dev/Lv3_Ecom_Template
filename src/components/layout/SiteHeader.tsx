"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/config/brand";
import { primaryNav } from "@/config/navigation";
import { useStore } from "@/lib/store-context";

export function SiteHeader() {
  const { cartCount, wishlist, user } = useStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="promo-bar">
        Demo storefront — mock checkout, no real payments. Free mock shipping over $75.
      </div>
      <header className="site-header">
        <div className="container site-header-inner">
          <button
            className="btn btn-ghost"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
          <Link href="/" className="brand-lockup" aria-label={`${brand.name} home`}>
            <span className="brand-mark" aria-hidden="true">
              {brand.logoMark}
            </span>
            <span>{brand.logoText}</span>
          </Link>
          <nav className="primary-nav" aria-label="Primary">
            {primaryNav.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <form
              role="search"
              aria-label="Site search"
              action="/search"
              method="get"
              onSubmit={(e) => {
                if (!query.trim()) e.preventDefault();
              }}
              style={{ display: "none" }}
            >
              <input type="search" name="q" value={query} onChange={(e) => setQuery(e.target.value)} />
            </form>
            <Link href="/search" className="icon-btn" aria-label="Search products">
              ⌕
            </Link>
            <Link href="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlist.length} items`}>
              ♥{wishlist.length > 0 && <span className="count-pill">{wishlist.length}</span>}
            </Link>
            <Link href="/cart" className="icon-btn" aria-label={`Cart, ${cartCount} items`}>
              🛒{cartCount > 0 && <span className="count-pill">{cartCount}</span>}
            </Link>
            <Link href={user ? "/account" : "/auth/sign-in"} className="btn btn-secondary btn-sm">
              {user ? "Account" : "Sign in"}
            </Link>
          </div>
        </div>
        {open && (
          <nav className="container" aria-label="Mobile" style={{ paddingBottom: "1rem" }}>
            {primaryNav.map((link) => (
              <div key={link.href} style={{ padding: "0.4rem 0" }}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
