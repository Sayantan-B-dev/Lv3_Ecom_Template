# Decisions

## 2026-10-19 — Multiple UIs in one Next.js app

Decision: keep one Next.js app and one shared backend, place each storefront design in `src/ui/<theme-id>/`, and select it at build time through the `ui` alias driven by `UI_THEME`.

Reason: every UI shares the same route handlers, repository helpers, data, cart and checkout logic, while only one theme's components and CSS are compiled. Deleting a theme folder needs no registry update, and a clone with one remaining theme works with plain `npm run dev`.

Trade-off: switching themes requires a server restart, two dev servers cannot share the same `.next` directory, and themes that diverge structurally own their page overrides.

## 2026-10-19 — Browser state through external stores

Decision: read `localStorage` for cart, wishlist, user and mock orders through `useSyncExternalStore` snapshots instead of state initializers or mount effects.

Reason: the server snapshot stays stable during hydration, saved browser data is applied after hydration, and storage changes across tabs can refresh the UI without React hydration mismatches.
