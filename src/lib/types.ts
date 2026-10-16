export type CategorySlug =
  | "apparel"
  | "footwear"
  | "accessories"
  | "home-goods"
  | "electronics"
  | "outdoors";

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  glyph: string;
}

export interface Product {
  slug: string;
  name: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  shortDescription: string;
  description: string;
  details: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  tags: string[];
  featured: boolean;
  createdAt: string;
  glyph: string;
}

export interface CartItem {
  slug: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}

export interface MockUser {
  name: string;
  email: string;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest" | "name";

export interface CatalogQuery {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: SortKey;
  page?: number;
  perPage?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface MockOrder {
  id: string;
  email: string;
  createdAt: string;
  items: CartLine[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "confirmed" | "shipped" | "delivered";
  address: {
    name: string;
    line1: string;
    city: string;
    postal: string;
    country: string;
  };
}
