export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: "Shop all", href: "/products" },
  { label: "Apparel", href: "/category/apparel" },
  { label: "Footwear", href: "/category/footwear" },
  { label: "Accessories", href: "/category/accessories" },
  { label: "Home goods", href: "/category/home-goods" },
  { label: "Outdoors", href: "/category/outdoors" },
];

export const footerShopLinks: NavLink[] = [
  { label: "All products", href: "/products" },
  { label: "New arrivals", href: "/products?sort=newest" },
  { label: "Best sellers", href: "/products?sort=rating" },
  { label: "Search", href: "/search" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "Your cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Sign in", href: "/auth/sign-in" },
  { label: "Checkout", href: "/checkout" },
];

export interface ThemeTokens {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  radii: Record<string, string>;
}

export const theme: ThemeTokens = {
  colors: {
    brand: "#1d4ed8",
    brandContrast: "#ffffff",
    brandDark: "#1e3a8a",
    accent: "#f59e0b",
    surface: "#ffffff",
    muted: "#f4f5f7",
    ink: "#111827",
    subtle: "#6b7280",
    line: "#e5e7eb",
    success: "#15803d",
    danger: "#b91c1c",
  },
  fonts: {
    sans: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    display: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  },
  radii: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    full: "999px",
  },
};
