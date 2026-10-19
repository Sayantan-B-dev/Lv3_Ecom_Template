import type { UIPages } from "@/ui/contract";
import { AccountPage } from "./account";
import { AccountOrdersPage } from "./account-orders";
import { CartPage } from "./cart";
import { CategoryPage } from "./category";
import { CheckoutPage } from "./checkout";
import { LoadingPage } from "./loading";
import { NotFoundPage } from "./not-found";
import { OrderDetailPage } from "./order-detail";
import { ProductDetailPage } from "./product-detail";
import { ProductsPage } from "./products";
import { SearchPage } from "./search";
import { SignInPage } from "./sign-in";
import { SignUpPage } from "./sign-up";
import { WishlistPage } from "./wishlist";

export {
  AccountPage,
  AccountOrdersPage,
  CartPage,
  CategoryPage,
  CheckoutPage,
  LoadingPage,
  NotFoundPage,
  OrderDetailPage,
  ProductDetailPage,
  ProductsPage,
  SearchPage,
  SignInPage,
  SignUpPage,
  WishlistPage,
};

export const sharedPages: Omit<UIPages, "Home"> = {
  Products: ProductsPage,
  ProductDetail: ProductDetailPage,
  Category: CategoryPage,
  Search: SearchPage,
  Cart: CartPage,
  Wishlist: WishlistPage,
  Checkout: CheckoutPage,
  Account: AccountPage,
  AccountOrders: AccountOrdersPage,
  OrderDetail: OrderDetailPage,
  SignIn: SignInPage,
  SignUp: SignUpPage,
  NotFound: NotFoundPage,
  Loading: LoadingPage,
};
