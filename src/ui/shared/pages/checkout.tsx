"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { currency } from "@/lib/format";
import { cartTotals, resolveCart, saveOrder } from "@/lib/orders";
import { useStore } from "@/lib/store-context";
import type { MockOrder } from "@/lib/types";

export function CheckoutPage() {
  const { cart, user, clearCart } = useStore();
  const router = useRouter();
  const lines = resolveCart(cart);
  const totals = cartTotals(lines);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  if (lines.length === 0) {
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <h1>Checkout (mock)</h1>
        <div className="notice notice-warning">Your cart is empty. Add products before checking out.</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <h1>Checkout (mock)</h1>
      <div className="notice notice-warning">
        Demo checkout — no payment is processed and no goods are shipped. Do not enter real card details.
      </div>
      <div className="checkout-grid">
        <form
          className="card card-pad"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setPending(true);
            const form = new FormData(e.currentTarget);
            const payload = {
              email: String(form.get("email") ?? user?.email ?? ""),
              name: String(form.get("name") ?? ""),
              line1: String(form.get("line1") ?? ""),
              city: String(form.get("city") ?? ""),
              postal: String(form.get("postal") ?? ""),
              country: String(form.get("country") ?? "United States"),
              items: lines.map((l) => ({ slug: l.slug, quantity: l.quantity, size: l.size, color: l.color })),
            };
            try {
              const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              const data = (await res.json()) as { order?: MockOrder; error?: string };
              if (!res.ok || !data.order) throw new Error(data.error ?? "Checkout failed.");
              saveOrder(data.order);
              window.localStorage.setItem("meridian.lastOrder", JSON.stringify(data.order));
              clearCart();
              router.push(`/orders/${data.order.id}`);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Checkout failed.");
            } finally {
              setPending(false);
            }
          }}
        >
          <h2>Contact & shipping</h2>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" className="input" type="email" defaultValue={user?.email ?? ""} required />
          </div>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" className="input" defaultValue={user?.name ?? ""} required />
          </div>
          <div className="field">
            <label htmlFor="line1">Address</label>
            <input id="line1" name="line1" className="input" defaultValue="123 Demo Street" required />
          </div>
          <div className="two-col">
            <div className="field">
              <label htmlFor="city">City</label>
              <input id="city" name="city" className="input" defaultValue="Portland" required />
            </div>
            <div className="field">
              <label htmlFor="postal">Postal code</label>
              <input id="postal" name="postal" className="input" defaultValue="97201" required />
            </div>
          </div>
          <h2>Payment (mock)</h2>
          <div className="field">
            <label htmlFor="card">Card number</label>
            <input id="card" className="input" inputMode="numeric" defaultValue="4242 4242 4242 4242" />
            <span className="form-hint">Mock field — use the prefilled test value.</span>
          </div>
          {error && <p role="alert" style={{ color: "var(--color-feedback-danger)" }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
            {pending ? "Placing mock order…" : `Pay ${currency(totals.total)} (mock)`}
          </button>
        </form>
        <aside className="card card-pad">
          <h2>Summary</h2>
          {lines.map((l) => (
            <p key={l.slug}>{l.quantity} × {l.product.name} — {currency(l.lineTotal)}</p>
          ))}
          <p>Shipping: {totals.shipping === 0 ? "Free (mock)" : currency(totals.shipping)}</p>
          <p>Tax (mock): {currency(totals.tax)}</p>
          <p><strong>Total: {currency(totals.total)}</strong></p>
        </aside>
      </div>
    </div>
  );
}
