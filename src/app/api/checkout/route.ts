import { NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";
import { createMockOrder } from "@/lib/orders";

interface CheckoutBody {
  email?: string;
  name?: string;
  line1?: string;
  city?: string;
  postal?: string;
  country?: string;
  items?: { slug: string; quantity: number; size?: string; color?: string }[];
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.email || !body.name || !body.line1 || !body.city || !body.postal) {
    return NextResponse.json({ error: "Missing contact or address fields." }, { status: 400 });
  }
  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const lines = body.items
    .map((item) => {
      const product = getProduct(item.slug);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * Math.max(1, item.quantity) };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  if (lines.length === 0) {
    return NextResponse.json({ error: "No valid products in cart." }, { status: 400 });
  }

  const order = createMockOrder({
    email: body.email,
    name: body.name,
    line1: body.line1,
    city: body.city,
    postal: body.postal,
    country: body.country ?? "United States",
    lines,
  });

  return NextResponse.json({
    order,
    notice: "Mock checkout — no payment was processed.",
  });
}
