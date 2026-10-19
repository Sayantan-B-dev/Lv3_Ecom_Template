import type { ComponentType, ReactNode } from "react";
import type { Metadata } from "next";
import type { SearchParams } from "@/ui/shared/search-params";

export interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

export interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}

export interface SearchPageProps {
  searchParams: Promise<SearchParams>;
}

export interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export interface UIPages {
  Home: ComponentType;
  Products: ComponentType<ProductsPageProps>;
  ProductDetail: ComponentType<ProductDetailPageProps>;
  Category: ComponentType<CategoryPageProps>;
  Search: ComponentType<SearchPageProps>;
  Cart: ComponentType;
  Wishlist: ComponentType;
  Checkout: ComponentType;
  Account: ComponentType;
  AccountOrders: ComponentType;
  OrderDetail: ComponentType<OrderDetailPageProps>;
  SignIn: ComponentType;
  SignUp: ComponentType;
  NotFound: ComponentType;
  Loading: ComponentType;
}

export interface UITheme {
  id: string;
  label: string;
  description: string;
  locale: string;
  metadata: Metadata;
  fontClassName: string;
  Shell: ComponentType<{ children: ReactNode }>;
  pages: UIPages;
}
