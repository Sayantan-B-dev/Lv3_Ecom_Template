"use client";

import Link from "next/link";
import { useMockOrders } from "@/lib/use-orders";
import { currency } from "@/lib/format";
import { EmptyState } from "@/ui/shared/components/States";

export function AccountOrdersPage() {
  const { orders, loaded } = useMockOrders();

  return (
    <div className="container" style={{ paddingTop: "1rem" }}>
      <h1>Order history (mock)</h1>
      {!loaded ? (
        <p style={{ color: "var(--color-text-secondary)" }}>Loading mock orders…</p>
      ) : orders.length === 0 ? (
        <EmptyState title="No orders yet" detail="Complete the mock checkout to see an order here." actionLabel="Start shopping" actionHref="/products" />
      ) : (
        <table className="table">
          <thead><tr><th>Order</th><th>Email</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td><Link href={`/orders/${o.id}`}>{o.id}</Link></td>
                <td>{o.email}</td>
                <td>{currency(o.total)}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
