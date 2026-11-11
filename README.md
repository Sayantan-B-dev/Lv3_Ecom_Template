# Meridian

Meridian is a reusable, multi-product e-commerce storefront template built with
Next.js App Router, React, TypeScript, and Tailwind CSS v4. It is designed to
be cloned and rebranded for different stores without changing the shared
commerce code.

The repository currently includes two independent storefront presentations:

- **Classic (`v1`)** - soft radii, a bright yellow accent, and a
  content-first catalog.
- **Editorial (`v2`)** - warm paper surfaces, serif headlines, and a
  sharp, magazine-inspired grid.

Both presentations use the same routes, mock catalog, cart, wishlist,
authentication, checkout flow, and API handlers. The selected theme is resolved
at build time, so only that theme's UI and styles are compiled.

> This is a demo template. Products, authentication, orders, payments,
> shipping, email, and persistence are mock implementations. Do not use the
> checkout flow for real transactions.

## Features

- Next.js 16 App Router with strict TypeScript
- Responsive storefront shell and navigation
- Home page with featured products and categories
- Product listing, category listing, search, sorting, filters, and pagination
- Product detail pages with variants, stock, ratings, and related products
- Cart and wishlist state
- Mock sign-in and sign-up flows
- Mock checkout, order creation, and order detail pages
- Browser persistence for cart, wishlist, user, and locally created orders
- Two independently selectable storefront themes
- Shared business logic and page implementations across themes
- Loading, empty, not-found, error, and responsive states
- Token-based theme styles with separate theme overrides

## Requirements

- Node.js compatible with the installed Next.js version
- npm

The repository includes `package-lock.json`; use npm and do not add another
package-manager lockfile.

## Quick start

Install dependencies:

```bash
npm install
```

Start the development server using the default available theme:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

To select a theme explicitly:

```bash
npm run dev v1
npm run dev v2
```

The theme runner prints the selected theme when the server starts. Restart the
development server after changing themes because the `ui` module alias is
resolved when Next.js starts.

## Commands

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies from `package-lock.json`. |
| `npm run dev` | Start Next.js in development mode with the first available theme. |
| `npm run dev v1` | Start development mode with the Classic theme. |
| `npm run dev v2` | Start development mode with the Editorial theme. |
| `npm run build` | Create a production build using the default theme. |
| `npm run build v1` | Create a production build using Classic. |
| `npm run build v2` | Create a production build using Editorial. |
| `npm run start` | Start the production server using the default theme. |
| `npm run start v2` | Start the production server using Editorial. |
| `npm run ui:list` | List available themes and their descriptions. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run TypeScript without emitting files. |

Additional Next.js arguments can be passed after the theme:

```bash
npm run dev v2 -- -p 3101
```

## Environment configuration

Copy the example file before making local changes:

```powershell
Copy-Item .env.example .env.local
```

The current example configuration is:

```dotenv
NEXT_PUBLIC_STORE_NAME=Meridian
NEXT_PUBLIC_STORE_CURRENCY=USD
NEXT_PUBLIC_API_BASE_URL=
DEMO_MODE=true
UI_THEME=v1
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_STORE_NAME` | Public store name for integrations that use environment configuration. |
| `NEXT_PUBLIC_STORE_CURRENCY` | Currency identifier used by the store configuration. |
| `NEXT_PUBLIC_API_BASE_URL` | Optional base URL for a future external API. |
| `DEMO_MODE` | Indicates that the application uses demo commerce behavior. |
| `UI_THEME` | Default theme when a theme is not passed on the command line. |

Theme selection precedence is:

1. A theme passed to the npm command, such as `npm run dev v2`
2. The `UI_THEME` process environment variable
3. `UI_THEME` in `.env.local`
4. `UI_THEME` in `.env`
5. The first theme folder alphabetically

The checked-in brand configuration currently lives in
[`src/config/brand.ts`](src/config/brand.ts). It contains Meridian's name,
tagline, logo text, support email, currency, and locale. Keep secrets out of
`.env.local`; it is ignored by Git.

## Storefront routes

The route adapters in `src/app/` stay deliberately thin. They select the
active theme's implementation through the `ui` alias.

| Route | Purpose |
| --- | --- |
| `/` | Storefront home page |
| `/products` | Full product catalog |
| `/products/[slug]` | Product detail |
| `/category/[slug]` | Category-specific catalog |
| `/search` | Search results |
| `/cart` | Cart |
| `/wishlist` | Wishlist |
| `/checkout` | Checkout form and mock payment step |
| `/orders/[id]` | Mock order detail and status |
| `/account` | Account overview |
| `/account/orders` | Orders saved in the current browser |
| `/auth/sign-in` | Mock sign-in |
| `/auth/sign-up` | Mock sign-up |

The application also provides loading, not-found, and error boundaries through
the corresponding files in `src/app/`.

## API routes

### `GET /api/categories`

Returns the catalog categories from `src/data/categories.json`.

### `GET /api/products`

Returns a paginated catalog result. Supported query parameters are:

- `q` - case-insensitive text search across product name, descriptions,
  category, and tags
- `category` - category slug
- `minPrice` and `maxPrice` - numeric price bounds
- `minRating` - minimum rating
- `sort` - `featured`, `price-asc`, `price-desc`, `rating`, `newest`, or
  `name`
- `page` - one-based page number
- `perPage` - number of products per page

Example:

```text
/api/products?q=canvas&category=footwear&sort=price-asc&page=1&perPage=9
```

The response contains the same pagination shape used by the catalog library:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "perPage": 9,
  "totalPages": 1
}
```

### `POST /api/checkout`

Creates a mock order from an email, customer name, address, and cart items.
The request body accepts:

```json
{
  "email": "shopper@example.com",
  "name": "Demo Shopper",
  "line1": "1 Market Street",
  "city": "Austin",
  "postal": "78701",
  "country": "United States",
  "items": [
    {
      "slug": "example-product",
      "quantity": 1,
      "size": "M",
      "color": "Black"
    }
  ]
}
```

The route validates required contact, address, and cart fields, calculates
mock totals, and returns an order with the notice:
`Mock checkout — no payment was processed.`

## Architecture

```text
src/
├── app/                 Next.js route adapters, layouts, pages, and API routes
├── config/              Brand, navigation, and merchandising configuration
├── data/                Mock categories and products
├── lib/                 Catalog queries, formatting, orders, types, and state
├── styles/              Shared reset and structural styles
├── types/               TypeScript declarations, including the ui alias
└── ui/
    ├── contract.ts      Contract implemented by every storefront theme
    ├── shared/          Shared pages, components, and styles
    ├── v1/              Classic theme
    └── v2/              Editorial theme
```

### Theme boundary

Shared code owns data and behavior:

- `src/app/api/`
- route adapters under `src/app/`
- `src/config/`
- `src/data/`
- `src/lib/`
- `src/ui/shared/`

Each theme owns its presentation:

- shell and site chrome
- home page
- design tokens
- theme styles
- optional page overrides

The active theme must not import another theme. It may import shared UI code
and library code. The contract in [`src/ui/contract.ts`](src/ui/contract.ts)
defines the required shell, metadata, locale, font class, and page surface.

## Mock data and state

Catalog data is stored in:

- [`src/data/categories.json`](src/data/categories.json)
- [`src/data/products.json`](src/data/products.json)

The catalog library in [`src/lib/catalog.ts`](src/lib/catalog.ts) provides
category lookup, product lookup, featured products, related products, search,
filtering, sorting, and pagination.

Cart, wishlist, and mock user state are stored in browser `localStorage` by
[`src/lib/store-context.tsx`](src/lib/store-context.tsx). The current storage
keys are:

- `meridian.cart`
- `meridian.wishlist`
- `meridian.user`

Mock orders are saved by the client after checkout. This state is local to the
browser and is not shared between users, browsers, or devices. No real
authentication, database, payment gateway, inventory reservation, shipping
provider, or email provider is connected.

## Creating a new storefront

To turn this template into a new shop:

1. Replace or extend the mock categories and products while preserving the
   TypeScript shapes in [`src/lib/types.ts`](src/lib/types.ts).
2. Update the brand identity in [`src/config/brand.ts`](src/config/brand.ts).
3. Update navigation and merchandising copy in
   [`src/config/navigation.ts`](src/config/navigation.ts) and
   [`src/config/content.ts`](src/config/content.ts).
4. Replace the active theme's tokens in
   `src/ui/<theme-id>/styles/tokens.css`.
5. Update the theme shell, home content, logo treatment, and imagery where
   the new brand requires it.
6. Copy the relevant values from `.env.example` into `.env.local`.
7. Run the validation commands before sharing the new storefront.

For design decisions, read [`design.md`](design.md). It defines the semantic
tokens, typography, spacing, surface hierarchy, interaction states, responsive
behavior, accessibility expectations, and brand-layer approach.

## Adding a theme

1. Copy `src/ui/v1/` to `src/ui/<theme-id>/`.
2. Update `theme.json` with the theme label and description.
3. Implement the theme's `index.ts` using the `UITheme` contract.
4. Replace `styles/tokens.css` with the new brand and semantic tokens.
5. Implement the theme shell and home page.
6. Reuse shared pages from `src/ui/shared/pages` unless a page genuinely needs
   a presentation-specific override.
7. Run `npm run ui:list` and build the new theme explicitly.

For the complete theme workflow and boundaries, see
[`docs/ui-themes.md`](docs/ui-themes.md).

## Styling and accessibility expectations

Use the design system rather than one-off component values:

- Consume semantic CSS variables from the active theme.
- Keep layouts mobile-first and responsive from 320px upward.
- Preserve visible keyboard focus and accessible labels.
- Keep hover, focus-visible, active, disabled, loading, and error states
  intentional for interactive controls.
- Use the shared loading, empty, error, and not-found patterns.
- Keep product titles, prices, ratings, and stock states readable at narrow
  widths.
- Respect reduced-motion preferences when adding transitions.

The shared base styles are in `src/styles/base.css`; structural and component
styles are in `src/ui/shared/styles/`. Theme-specific styles live within each
theme directory.

## Validation

Run the focused checks before opening a pull request or handing a theme to
another developer:

```bash
npm run lint
npm run typecheck
npm run build v1
npm run build v2
```

To smoke-test a theme locally:

```bash
npm run dev v1
```

Then exercise the home page, catalog filters and pagination, search, product
detail, cart, wishlist, mock sign-in, checkout, and order detail routes.

## Documentation

- [`design.md`](design.md) - design system and theming rules
- [`agent.md`](agent.md) - repository engineering rules
- [`docs/ui-themes.md`](docs/ui-themes.md) - theme creation and selection
- [`docs/decisions.md`](docs/decisions.md) - architectural decisions
- [`docs/changelog.md`](docs/changelog.md) - user-visible changes

## License and production use

This repository is a development template containing mock data and demo
commerce behavior. Before production use, add a real persistence layer,
server-side validation, authentication, inventory and order handling, payment
processing, shipping integration, email delivery, observability, and a
production security review.
