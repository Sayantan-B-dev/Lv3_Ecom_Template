"use client";

import { useSyncExternalStore } from "react";
import { getOrdersRevision, ORDERS_CHANGED_EVENT, readOrders } from "@/lib/orders";
import type { MockOrder } from "@/lib/types";

interface OrdersSnapshot {
  orders: MockOrder[];
  loaded: boolean;
}

const EMPTY: OrdersSnapshot = { orders: [], loaded: false };
const listeners = new Set<() => void>();

let snapshot: OrdersSnapshot = EMPTY;
let loaded = false;
let cachedRevision = -1;

function load(): OrdersSnapshot {
  if (typeof window !== "undefined" && (!loaded || cachedRevision !== getOrdersRevision())) {
    snapshot = { orders: readOrders(), loaded: true };
    loaded = true;
    cachedRevision = getOrdersRevision();
  }
  return snapshot;
}

function refresh(): void {
  snapshot = { orders: readOrders(), loaded: true };
  loaded = true;
  cachedRevision = getOrdersRevision();
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  if (typeof window !== "undefined") {
    window.addEventListener(ORDERS_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener(ORDERS_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    }
  };
}

function getSnapshot(): OrdersSnapshot {
  return load();
}

function getServerSnapshot(): OrdersSnapshot {
  return EMPTY;
}

export function useMockOrders(): OrdersSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useMockOrder(id: string): { order: MockOrder | null; loaded: boolean } {
  const { orders, loaded: ready } = useMockOrders();
  return { order: orders.find((order) => order.id === id) ?? null, loaded: ready };
}
