"use client";

import { useState } from "react";
import { useStore } from "@/lib/store-context";
import type { Product } from "@/lib/types";

export function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addToCart({ slug: product.slug, quantity, size, color });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 2000);
      }}
    >
      <div className="two-col">
        <div className="field">
          <label htmlFor="size">Size</label>
          <select id="size" className="select" value={size} onChange={(e) => setSize(e.target.value)}>
            {product.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="color">Color</label>
          <select id="color" className="select" value={color} onChange={(e) => setColor(e.target.value)}>
            {product.colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="qty">Quantity</label>
        <input
          id="qty"
          className="input"
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
        />
        <span className="form-hint">
          {product.stock > 0 ? `${product.stock} in mock stock` : "Out of stock (mock)"}
        </span>
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={product.stock === 0}>
        {added ? "Added to cart ✓" : "Add to cart"}
      </button>
      <p className="form-hint" style={{ marginTop: "0.5rem" }}>
        Mock action — saved to your browser only.
      </p>
    </form>
  );
}
