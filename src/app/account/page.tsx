"use client";

import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { readOrders } from "@/lib/orders";
import { currency } from "@/lib/format";
import { useState } from "react";
import type { MockOrder } from "@/lib/types";

export default function AccountPage() {
  const { user, signOut } = useStore();
  const [orders] = useState<MockOrder[]>(() => readOrders());

  if (!user) {
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <h1>Account</h1>
        <div className="notice">You are signed out (mock). Sign in to preview account pages.</div>
        <Link href="/auth/sign-in" className="btn btn-primary">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <h1>Hi, {user.name}</h1>
      <p style={{ color: "var(--color-subtle)" }}>{user.email} · mock account stored locally</p>
      <div className="account-grid">
        <aside className="card card-pad">
          <nav aria-label="Account">
            <p><Link href="/account">Overview</Link></p>
            <p><Link href="/account/orders">Order history</Link></p>
            <p><Link href="/wishlist">Wishlist</Link></p>
            <p><Link href="/cart">Cart</Link></p>
          </nav>
          <button type="button" className="btn btn-secondary btn-block" onClick={signOut}>Sign out (mock)</button>
        </aside>
        <div>
          <h2>Recent mock orders</h2>
          {orders.length === 0 ? (
            <p style={{ color: "var(--color-subtle)" }}>No mock orders yet. Try the checkout flow.</p>
          ) : (
            <table className="table">
              <thead><tr><th>Order</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id}>
                    <td><Link href={`/orders/${o.id}`}>{o.id}</Link></td>
                    <td>{o.createdAt.slice(0, 10)}</td>
                    <td>{currency(o.total)}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
