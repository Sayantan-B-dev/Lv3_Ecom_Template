# Design system

This template uses plain CSS as the primary styling method. Tailwind v4 is available but only for ad-hoc utility spacing where it adds clear value.

## Tokens (`src/styles/tokens.css`)

CSS custom properties for color, type, spacing, radii, shadows and layout:

- Brand: `--color-brand`, `--color-brand-dark`, `--color-brand-contrast`, `--color-accent`
- Surface: `--color-surface`, `--color-muted`, `--color-ink`, `--color-subtle`, `--color-line`
- Status: `--color-success`, `--color-danger`, `--color-warning-bg`, `--color-info-bg`
- Type: `--font-sans`, `--font-display`, `--font-mono`
- Spacing: `--space-1` … `--space-16`
- Radii: `--radius-sm/md/lg/full`
- Container: `--container-max: 72rem`, `--header-height: 4rem`

To rebrand: change the six category gradients in `src/lib/catalog.ts` (`categoryGradients`), the token values above, and `src/config/navigation.ts` theme object. No page edits needed.

## Files

- `base.css` — reset, typography, links, `:focus-visible` (accent outline), skip link.
- `layout.css` — `.container`, sticky `.site-header`, `.site-footer`, `.footer-grid`, `.hero-layout`, `.product-layout`, `.catalog-layout`, `.two-col` with breakpoints at 768px / 960px / 1024px.
- `components.css` — `.btn` variants (`.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-sm`, `.btn-block`), `.card`, `.badge`, `.field`/`.input`/`.select`, `.notice`, `.product-grid` (2 → 3 columns), `.product-card`, `.filters`, `.toolbar`, `.pagination`, `.category-tile`, `.cart-line`, `.skeleton`, `.empty-state`, `.table`, `.icon-btn` + `.count-pill`.
- `pages.css` — hero, sections, promo grid, auth wrapper, checkout/account grids, detail gallery.
- `globals.css` — the only import chain: Tailwind, then tokens → base → layout → components → pages. Imported once in `src/app/layout.tsx`.

## Rules

- No CSS-in-JS and no inline theme styles, except `style={{ background: gradientFor(product) }}` for dynamic category gradients.
- Class names are flat and semantic (BEM-lite). Avoid nesting, `!important` and high specificity.
- Product imagery is a gradient tile + glyph (`Product.glyph`) so the template works offline. Replace `product-media` / `detail-gallery` with `next/image` when real images exist.
- Accessibility: semantic landmarks, skip link, labelled forms, `aria-pressed` on wishlist toggles, `role="status"` / `role="alert"` on notices, visible focus ring, responsive grids.

## Adapting to a new brand

1. Edit `src/config/brand.ts` (name, tagline, email, currency, locale).
2. Edit token colors/fonts in `tokens.css` and `src/config/navigation.ts`.
3. Replace `src/data/categories.json` + `products.json` and glyphs/gradients.
4. Rewrite `src/config/content.ts` hero, promos and section copy.
