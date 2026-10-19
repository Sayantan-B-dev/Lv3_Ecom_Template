"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { CartItem, MockUser } from "@/lib/types";

interface StoreSnapshot {
  cart: CartItem[];
  wishlist: string[];
  user: MockUser | null;
}

interface StoreState extends StoreSnapshot {
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  signIn: (user: MockUser) => void;
  signOut: () => void;
  cartCount: number;
}

const EMPTY: StoreSnapshot = { cart: [], wishlist: [], user: null };
const STORAGE_KEYS = {
  cart: "meridian.cart",
  wishlist: "meridian.wishlist",
  user: "meridian.user",
} as const;

const StoreContext = createContext<StoreState | null>(null);
const listeners = new Set<() => void>();
const storageKeys = new Set<string>(Object.values(STORAGE_KEYS));
let snapshot: StoreSnapshot | null = null;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function loadSnapshot(): StoreSnapshot {
  return {
    cart: read<CartItem[]>(STORAGE_KEYS.cart, []),
    wishlist: read<string[]>(STORAGE_KEYS.wishlist, []),
    user: read<MockUser | null>(STORAGE_KEYS.user, null),
  };
}

function getSnapshot(): StoreSnapshot {
  if (!snapshot && typeof window !== "undefined") {
    snapshot = loadSnapshot();
  }
  return snapshot ?? EMPTY;
}

function getServerSnapshot(): StoreSnapshot {
  return EMPTY;
}

function notify(): void {
  for (const listener of listeners) listener();
}

function persist(next: StoreSnapshot): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(next.cart));
  window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(next.wishlist));
  window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(next.user));
}

function setSnapshot(next: StoreSnapshot): void {
  snapshot = next;
  persist(next);
  notify();
}

function update(updater: (current: StoreSnapshot) => StoreSnapshot): void {
  setSnapshot(updater(getSnapshot()));
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === null || !storageKeys.has(event.key)) return;
    snapshot = loadSnapshot();
    notify();
  });
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addToCart = useCallback((item: CartItem) => {
    update((current) => {
      const existing = current.cart.find(
        (line) => line.slug === item.slug && line.size === item.size && line.color === item.color,
      );
      if (existing) {
        return {
          ...current,
          cart: current.cart.map((line) =>
            line === existing ? { ...line, quantity: line.quantity + item.quantity } : line,
          ),
        };
      }
      return { ...current, cart: [...current.cart, item] };
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    update((current) => ({ ...current, cart: current.cart.filter((line) => line.slug !== slug) }));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    update((current) => ({
      ...current,
      cart:
        quantity <= 0
          ? current.cart.filter((line) => line.slug !== slug)
          : current.cart.map((line) => (line.slug === slug ? { ...line, quantity } : line)),
    }));
  }, []);

  const clearCart = useCallback(() => {
    update((current) => ({ ...current, cart: [] }));
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    update((current) => ({
      ...current,
      wishlist: current.wishlist.includes(slug)
        ? current.wishlist.filter((item) => item !== slug)
        : [...current.wishlist, slug],
    }));
  }, []);

  const signIn = useCallback((user: MockUser) => {
    update((current) => ({ ...current, user }));
  }, []);

  const signOut = useCallback(() => {
    update((current) => ({ ...current, user: null }));
  }, []);

  const value = useMemo<StoreState>(
    () => ({
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      signIn,
      signOut,
      cartCount: state.cart.reduce((sum, line) => sum + line.quantity, 0),
    }),
    [state, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, signIn, signOut],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
