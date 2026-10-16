"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, MockUser } from "@/lib/types";

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  user: MockUser | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  signIn: (user: MockUser) => void;
  signOut: () => void;
  cartCount: number;
}

const StoreContext = createContext<StoreState | null>(null);

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => read<CartItem[]>("meridian.cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => read<string[]>("meridian.wishlist", []));
  const [user, setUser] = useState<MockUser | null>(() => read<MockUser | null>("meridian.user", null));

  useEffect(() => {
    window.localStorage.setItem("meridian.cart", JSON.stringify(cart));
    window.localStorage.setItem("meridian.wishlist", JSON.stringify(wishlist));
    window.localStorage.setItem("meridian.user", JSON.stringify(user));
  }, [cart, wishlist, user]);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (line) => line.slug === item.slug && line.size === item.size && line.color === item.color,
      );
      if (existing) {
        return prev.map((line) =>
          line === existing ? { ...line, quantity: line.quantity + item.quantity } : line,
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((line) => line.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.slug !== slug)
        : prev.map((line) => (line.slug === slug ? { ...line, quantity } : line)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const signIn = useCallback((next: MockUser) => setUser(next), []);
  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo<StoreState>(
    () => ({
      cart,
      wishlist,
      user,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      signIn,
      signOut,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    }),
    [cart, wishlist, user, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, signIn, signOut],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
