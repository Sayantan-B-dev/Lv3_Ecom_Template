# Changelog

## 2026-10-19

- Added a swappable UI theme layer. The existing storefront is now `v1`; additional UIs can live beside it under `src/ui/` while sharing the same routes, data and mock commerce logic.
- Added `npm run dev <theme>`, `npm run build <theme>`, `npm run start <theme>` and `npm run ui:list`.
- Moved page implementations into `src/ui/shared/pages` and presentational components into `src/ui/shared/components`.
- Split styles into shared structure plus theme-owned tokens and shell styles.
- Added the v2 Editorial storefront: warm paper tokens, Fraunces/Inter typography, a magazine-style masthead, index-led home page and sharp catalog treatment.
- Fixed local-store and mock-order hydration so cart, wishlist and order pages load saved browser data without React hydration errors.
- Fixed 320px header overflow in both themes and added search, wishlist and account links to the mobile menus.
