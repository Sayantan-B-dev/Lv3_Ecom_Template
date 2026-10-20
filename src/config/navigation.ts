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
  { label: "Electronics", href: "/category/electronics" },
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
    brand: "#121212",
    brandContrast: "#ffffff",
    brandDark: "#000000",
    accent: "#ffdb00",
    surface: "#ffffff",
    muted: "#f5f5f5",
    ink: "#121212",
    subtle: "#5b5b5f",
    line: "#d2d2d7",
    success: "#1e6b3a",
    danger: "#b3261e",
  },
  fonts: {
    sans: "Manrope, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    display: "Manrope, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  radii: {
    sm: "16px",
    md: "24px",
    lg: "32px",
    full: "9999px",
  },
};
