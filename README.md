# Meridian — reusable e-commerce storefront template

Next.js App Router + TypeScript + Tailwind v4 + plain CSS storefront that can be rebranded to different shops without major code changes. Catalog and checkout are mocked with JSON + Route Handlers; no database.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Architecture

- `src/config/` — `brand.ts` (name, email, currency), `navigation.ts` (nav links + theme tokens), `content.ts` (hero, promos, shipping/tax constants).
- `src/data/` — `categories.json` (6 categories), `products.json` (24 products across apparel, footwear, accessories, home goods, electronics, outdoors).
- `src/lib/` — `types.ts`, `catalog.ts` (filter/sort/search/paginate + gradients), `orders.ts` (cart totals, mock orders), `store-context.tsx` (cart/wishlist/user in `localStorage`), `format.ts`.
- `src/components/` — layout header/footer/breadcrumbs; catalog cards, grid, filters UI, pagination, add-to-cart; UI empty/error/loading states.
- `src/app/` — home, `/products`, `/products/[slug]`, `/category/[slug]`, `/search`, `/cart`, `/wishlist`, `/auth/sign-in`, `/auth/sign-up`, `/account`, `/account/orders`, `/checkout`, `/orders/[id]`, plus `api/products`, `api/categories`, `api/checkout`.
- `src/styles/` — `tokens.css`, `base.css`, `layout.css`, `components.css`, `pages.css`, imported in order through `src/app/globals.css`.

## Configuration

To create a new shop:

1. Update `src/config/brand.ts`, `src/config/navigation.ts`, `src/config/content.ts`.
2. Replace `src/data/categories.json` and `src/data/products.json` (keep the `Product` shape in `src/lib/types.ts`).
3. Adjust tokens in `src/styles/tokens.css` and gradients in `src/lib/catalog.ts`.
4. See `design.md` for the design system and `AGENTS.md` for contributor conventions.

## Mock functionality

- Cart and wishlist persist in `localStorage` (`meridian.cart`, `meridian.wishlist`).
- Auth accepts any email; the user is stored as `meridian.user`. No passwords are checked or sent anywhere.
- Checkout posts to `/api/checkout`, which validates address + items and returns a `MockOrder`. The client saves it (`meridian.orders`, `meridian.lastOrder`), clears the cart and routes to `/orders/[id]`.
- Banners and checkout pages state clearly that payments, emails and shipping are simulated.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```
