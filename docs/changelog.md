# Changelog

## 2026-10-19

- Added a swappable UI theme layer. The existing storefront is now `v1`; additional UIs can live beside it under `src/ui/` while sharing the same routes, data and mock commerce logic.
- Added `npm run dev <theme>`, `npm run build <theme>`, `npm run start <theme>` and `npm run ui:list`.
- Moved page implementations into `src/ui/shared/pages` and presentational components into `src/ui/shared/components`.
- Split styles into shared structure plus theme-owned tokens and shell styles.
