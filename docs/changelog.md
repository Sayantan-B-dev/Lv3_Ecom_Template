# Changelog

## 2026-10-20

- Fixed dark-mode contrast in the Editorial theme: text on strong surfaces, primary buttons and the announcement bar are readable again.
- Rebuilt generated product artwork so placeholders fill their media frame and carry a shared light-and-weft treatment across cards, detail galleries and cart thumbnails.
- Fixed the Classic theme header at tablet widths: navigation collapses into the menu below 1024px, the menu button hides on desktop, active links are marked, and Escape closes the menu.
- Fixed Classic hero content losing its container padding and made the hero tiles use live category names and colours.
- Added current-page states to both theme headers, including the missing Electronics link.
- Made the search field and button share one row, corrected result pluralisation, and stopped the mock auth heading from wrapping.
- Increased the product detail gallery to a square and show four related products.

## 2026-10-19

- Added a swappable UI theme layer. The existing storefront is now `v1`; additional UIs can live beside it under `src/ui/` while sharing the same routes, data and mock commerce logic.
- Added `npm run dev <theme>`, `npm run build <theme>`, `npm run start <theme>` and `npm run ui:list`.
- Moved page implementations into `src/ui/shared/pages` and presentational components into `src/ui/shared/components`.
- Split styles into shared structure plus theme-owned tokens and shell styles.
- Added the v2 Editorial storefront: warm paper tokens, Fraunces/Inter typography, a magazine-style masthead, index-led home page and sharp catalog treatment.
- Fixed local-store and mock-order hydration so cart, wishlist and order pages load saved browser data without React hydration errors.
- Fixed 320px header overflow in both themes and added search, wishlist and account links to the mobile menus.
