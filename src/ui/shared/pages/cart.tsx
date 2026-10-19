"use client";

import Link from "next/link";
import { gradientFor } from "@/lib/catalog";
import { currency } from "@/lib/format";
import { resolveCart, cartTotals } from "@/lib/orders";
import { useStore } from "@/lib/store-context";
import { site } from "@/config/content";
import { EmptyState } from "@/ui/shared/components/States";

export function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const lines = resolveCart(cart);
  const totals = cartTotals(lines);

  if (lines.length === 0) {
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <h1>Your cart</h1>
        <EmptyState title="Your cart is empty" detail="Mock cart — add a few products to preview checkout." actionLabel="Browse products" actionHref="/products" />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <h1>Your cart</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>Mock cart stored in your browser. No real order is created until checkout.</p>
      <div className="checkout-grid">
        <div>
          {lines.map((line) => (
            <div key={line.slug + (line.size ?? "") + (line.color ?? "")} className="cart-line">
              <div className="cart-thumb" style={{ background: gradientFor(line.product) }} aria-hidden="true">
                {line.product.glyph}
              </div>
              <div>
                <Link href={`/products/${line.product.slug}`} style={{ fontWeight: 700 }}>
                  {line.product.name}
                </Link>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                  {[line.size, line.color].filter(Boolean).join(" · ")}
                </p>
                <label style={{ fontSize: "0.85rem" }}>
                  Qty{" "}
                  <input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) => updateQuantity(line.slug, Number(e.target.value))}
                    style={{ width: "4rem" }}
                    aria-label={`Quantity for ${line.product.name}`}
                  />
                </label>
                <div>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeFromCart(line.slug)}>
                    Remove
                  </button>
                </div>
              </div>
              <strong>{currency(line.lineTotal)}</strong>
            </div>
          ))}
        </div>
        <aside className="card card-pad" aria-label="Order summary">
          <h2 style={{ fontSize: "1.1rem" }}>Summary</h2>
          <p>Subtotal: {currency(totals.subtotal)}</p>
          <p>Shipping: {totals.shipping === 0 ? "Free (mock)" : currency(totals.shipping)}</p>
          <p>Tax (mock): {currency(totals.tax)}</p>
          <p><strong>Total: {currency(totals.total)}</strong></p>
          <Link href="/checkout" className="btn btn-primary btn-block">Go to mock checkout</Link>
          <p className="form-hint">Free mock shipping over {currency(site.freeShippingThreshold)}.</p>
        </aside>
      </div>
    </div>
  );
}
