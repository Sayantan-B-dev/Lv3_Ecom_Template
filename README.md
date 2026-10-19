# Meridian — reusable e-commerce storefront template

Next.js App Router + TypeScript + Tailwind v4 + plain CSS storefront that can be rebranded to different shops without major code changes. Catalog and checkout are mocked with JSON + Route Handlers; no database.

The project also supports several independent storefront UIs in one codebase. They share the same routes, data, cart, checkout and mock backend, but each theme owns its shell, home page, design tokens and any page overrides.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Storefront UIs

```bash
npm run ui:list
npm run dev            # first available theme
npm run dev v1         # a specific theme
npm run build v1
npm run start v1
```

Themes live in `src/ui/<theme-id>/`. `next.config.ts` resolves the `"ui"` alias to the selected theme, so only that UI is compiled. To remove a design, delete its folder; with one theme left, plain `npm run dev` uses it automatically. See [docs/ui-themes.md](docs/ui-themes.md) for adding, overriding and removing themes.

## Architecture

- `src/config/` — `brand.ts` (name, email, currency), `navigation.ts` (nav links + theme tokens), `content.ts` (hero, promos, shipping/tax constants).
- `src/data/` — `categories.json` (6 categories), `products.json` (24 products across apparel, footwear, accessories, home goods, electronics, outdoors).
- `src/lib/` — `types.ts`, `catalog.ts` (filter/sort/search/paginate + gradients), `orders.ts` (cart totals, mock orders), `store-context.tsx` (cart/wishlist/user in `localStorage`), `format.ts`.
- `src/ui/contract.ts` — the page and theme interface every UI implements.
- `src/ui/shared/` — page templates and presentational components reused by themes.
- `src/ui/v1/` — the classic storefront: shell, home page, tokens and styles.
- `src/app/` — thin route adapters, API handlers and the root layout; page files import the active theme from `"ui"`.
- `src/styles/` — shared reset, accessibility utilities and base typography.

## Configuration

To create a new shop:

1. Update `src/config/brand.ts`, `src/config/navigation.ts`, `src/config/content.ts`.
2. Replace `src/data/categories.json` and `src/data/products.json` (keep the `Product` shape in `src/lib/types.ts`).
3. Adjust tokens in the active theme's `styles/tokens.css` and the theme's shell/home.
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
npm run build v2
```
