"use client";

import Link from "next/link";
import { use, useState } from "react";
import { currency, formatDate } from "@/lib/format";
import { readOrders } from "@/lib/orders";
import type { MockOrder } from "@/lib/types";

function findOrder(id: string): MockOrder | null {
  const found = readOrders().find((o) => o.id === id);
  if (found) return found;
  try {
    const last = window.localStorage.getItem("meridian.lastOrder");
    if (last) {
      const parsed = JSON.parse(last) as MockOrder;
      if (parsed.id === id) return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

export function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order] = useState<MockOrder | null>(() => findOrder(id));

  if (!order) {
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <h1>Order not found (mock)</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>Mock orders live in this browser only.</p>
        <Link href="/products" className="btn btn-primary">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <div className="notice" role="status">Mock order confirmed — no payment was processed.</div>
      <h1>Thanks! Order {order.id}</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>Placed {formatDate(order.createdAt)} · receipt sent to {order.email} (mock).</p>
      <div className="two-col">
        <div className="card card-pad">
          <h2>Items</h2>
          {order.items.map((line) => (
            <p key={line.slug}>{line.quantity} × {line.product.name} — {currency(line.lineTotal)}</p>
          ))}
          <p>Subtotal: {currency(order.subtotal)}</p>
          <p>Shipping: {currency(order.shipping)}</p>
          <p>Tax: {currency(order.tax)}</p>
          <p><strong>Total: {currency(order.total)}</strong></p>
        </div>
        <div className="card card-pad">
          <h2>Ship to</h2>
          <p>{order.address.name}<br />{order.address.line1}<br />{order.address.city} {order.address.postal}<br />{order.address.country}</p>
          <p>Status: <strong>{order.status}</strong></p>
          <Link href="/account/orders" className="btn btn-secondary">View order history</Link>
        </div>
      </div>
    </div>
  );
}
