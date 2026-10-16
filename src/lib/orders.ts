import { site } from "@/config/content";
import { getProduct } from "@/lib/catalog";
import type { CartItem, CartLine, MockOrder } from "@/lib/types";

export function resolveCart(lines: CartItem[]): CartLine[] {
  return lines
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null;
      return { ...line, product, lineTotal: product.price * line.quantity };
    })
    .filter((line): line is CartLine => line !== null);
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = lines.length === 0 || subtotal >= site.freeShippingThreshold ? 0 : site.flatShippingFee;
  const tax = subtotal * site.taxRate;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

export function createMockOrder(input: {
  email: string;
  name: string;
  line1: string;
  city: string;
  postal: string;
  country: string;
  lines: CartLine[];
}): MockOrder {
  const totals = cartTotals(input.lines);
  const id = `MCK-${Date.now().toString(36).toUpperCase()}`;
  return {
    id,
    email: input.email,
    createdAt: new Date().toISOString(),
    items: input.lines,
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    tax: totals.tax,
    total: totals.total,
    status: "confirmed",
    address: {
      name: input.name,
      line1: input.line1,
      city: input.city,
      postal: input.postal,
      country: input.country,
    },
  };
}

const ORDER_KEY = "meridian.orders";

export function readOrders(): MockOrder[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(ORDER_KEY) ?? "[]") as MockOrder[];
  } catch {
    return [];
  }
}

export function saveOrder(order: MockOrder): void {
  if (typeof window === "undefined") return;
  const existing = readOrders();
  window.localStorage.setItem(ORDER_KEY, JSON.stringify([order, ...existing]));
}
