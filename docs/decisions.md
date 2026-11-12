# Decisions

## 2026-11-12 — Imagery behind a single provider seam

Decision: every storefront image comes from `src/lib/images/getImage.ts`. During this phase it returns one shared dummy photo, and the shared `ImageFrame` renders it with `object-fit: contain` over a blurred, zoomed copy of the same source.

Reason: cloning the template or moving to Cloudinary, ImageKit or a local CDN should require editing one helper rather than every component. The contain-plus-blur treatment keeps arbitrary aspect ratios intact instead of cropping product photography.

Trade-off: each frame renders a sharp image plus a blurred CSS background from the same URL, so providers must keep one stable, cacheable URL per asset; the browser then serves the repeated frames from cache instead of refetching.

## 2026-11-12 — Third theme built as a gallery-grade storefront

Decision: add `v3` "Nocturne" beside the existing themes rather than replacing them, and drive its look from a dark-first brand layer with an automatic `prefers-color-scheme: light` variant.

Reason: the template must prove that radically different art direction ships from the same shared pages and data. Keeping the earlier themes preserves a non-destructive choice, while the light variant keeps the theme usable for owners who prefer a paper catalog.

Trade-off: Nocturne overrides more shared classes than v1 or v2, so future shared markup changes must be rechecked against its overrides.

## 2026-10-19 — Multiple UIs in one Next.js app

Decision: keep one Next.js app and one shared backend, place each storefront design in `src/ui/<theme-id>/`, and select it at build time through the `ui` alias driven by `UI_THEME`.

Reason: every UI shares the same route handlers, repository helpers, data, cart and checkout logic, while only one theme's components and CSS are compiled. Deleting a theme folder needs no registry update, and a clone with one remaining theme works with plain `npm run dev`.

Trade-off: switching themes requires a server restart, two dev servers cannot share the same `.next` directory, and themes that diverge structurally own their page overrides.

## 2026-10-19 — Browser state through external stores

Decision: read `localStorage` for cart, wishlist, user and mock orders through `useSyncExternalStore` snapshots instead of state initializers or mount effects.

Reason: the server snapshot stays stable during hydration, saved browser data is applied after hydration, and storage changes across tabs can refresh the UI without React hydration mismatches.
