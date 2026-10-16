export const site = {
  title: "Meridian — Everyday essentials, thoughtfully curated",
  description:
    "A reusable multi-category storefront template. Browse apparel, footwear, accessories, home goods and outdoors. Demo checkout and accounts are mocked.",
  paginationDefault: 9,
  freeShippingThreshold: 75,
  flatShippingFee: 6.95,
  taxRate: 0.08,
  ratingMax: 5,
} as const;

export const heroContent = {
  eyebrow: "New season essentials",
  title: "Quality staples for every category",
  subtitle:
    "A clean, reusable storefront starter. Swap the brand, colors, categories and products — the layout, cart, wishlist and checkout flows stay the same.",
  primaryCta: { label: "Shop all products", href: "/products" },
  secondaryCta: { label: "Browse categories", href: "/#categories" },
  note: "Demo storefront — payments, sign-in and orders are simulated.",
} as const;

export const promoBanners = [
  { title: "Free shipping", detail: "On mock orders over $75" },
  { title: "30-day returns", detail: "No questions asked (demo)" },
  { title: "Secure checkout", detail: "Simulated — no real payment" },
] as const;

export const homeSections = {
  categoriesTitle: "Shop by category",
  categoriesSubtitle: "Six reusable categories. Rename or replace them in one config file.",
  featuredTitle: "Featured products",
  featuredSubtitle: "Top-rated items across the catalog.",
  valueTitle: "Why shop the template",
} as const;
