# AGENTS.md

Practical instructions for working in this storefront template.

## Stack

- Next.js App Router + TypeScript (`strict`), Tailwind CSS v4, plain CSS modules in `src/styles/`.
- No database. Catalog lives in `src/data/*.json`. Commerce state lives in `localStorage` via `src/lib/store-context.tsx`.
- Route handlers in `src/app/api/` expose the same mock catalog logic used by pages.

## Conventions

- Brand changes go in `src/config/`: `brand.ts`, `navigation.ts`, `content.ts`. Do not hardcode brand names, colors or categories in pages.
- Styling is plain CSS first. Tokens in `src/styles/tokens.css`, base in `base.css`, layout in `layout.css`, components in `components.css`, page-specific rules in `pages.css`. Import order is managed only in `src/app/globals.css`.
- No inline `style` for theme values except dynamic gradients from `categoryGradients`. No CSS-in-JS.
- Shared catalog logic lives in `src/lib/catalog.ts`. Do not duplicate filtering/sorting in pages and API routes.
- Money uses `currency()` from `src/lib/format.ts`. Dates use `formatDate()`.
- Client components are marked `"use client"` only when they need browser state (`cart`, `wishlist`, `checkout`, `account`, `orders/[id]`).
- Search/filter pages read `searchParams` and set `export const dynamic = "force-dynamic"`.

## Architecture

- `src/config/` — brand, navigation, theme tokens, homepage content, shipping/tax constants.
- `src/data/` — `categories.json`, `products.json`. Product shape is defined in `src/lib/types.ts`.
- `src/lib/` — `catalog.ts` (queries), `orders.ts` (cart totals + mock orders + localStorage), `store-context.tsx` (cart/wishlist/user), `format.ts`.
- `src/components/` — `layout/` (header, footer, breadcrumbs), `catalog/` (cards, grid, filters helpers, pagination, add-to-cart), `ui/` (empty/error/loading states).
- `src/app/` — customer pages plus `api/products`, `api/categories`, `api/checkout`.

## Mock boundaries

- Auth (`/auth/*`, account pages) stores a `MockUser` in `localStorage`. Any email signs in.
- Checkout posts to `/api/checkout`, which validates input and returns a `MockOrder`. The client saves it with `saveOrder()` and clears the cart.
- Never imply payments or emails are real. Keep the existing demo notices intact.

## Validation

Run before finishing work:

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

Fix errors introduced by your change. Do not claim a command passed unless it ran successfully. Report remaining limitations honestly.
