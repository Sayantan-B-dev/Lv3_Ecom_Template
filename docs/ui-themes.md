# Multiple storefront UIs

The template can hold several independent storefront designs in one Next.js app. They all share the same data, repository helpers, cart state, route handlers and business logic; only the presentation layer changes.

## How selection works

- Every UI lives in `src/ui/<theme-id>/` and default-exports a `UITheme` from `index.ts`.
- The route files in `src/app/` import the module `"ui"` and render `ui.pages.<Page>`.
- `next.config.ts` aliases `"ui"` to the selected theme folder at build time. Only that theme is compiled, so deleted themes cost nothing.
- `src/types/ui.d.ts` declares the `"ui"` module for TypeScript against the shared contract in `src/ui/contract.ts`.
- Selection order: the theme id passed to the runner, then `UI_THEME`, then the first theme folder alphabetically.

## Commands

```bash
npm run dev              # first available theme
npm run dev v1           # a specific theme
npm run dev -- v2        # the same, using npm's explicit argument separator
npm run dev v2 -- -p 3101
npm run build v2
npm run start v2
npm run ui:list
```

The runner validates the theme id, sets `UI_THEME` for Next.js, and forwards the remaining arguments to `next`. Restart the server when switching themes.

## Adding a UI

1. Copy `src/ui/v1/` to `src/ui/<new-id>/`.
2. Edit `theme.json` with the label and description shown by `npm run ui:list`.
3. Replace `styles/tokens.css` with the brand layer for the new design.
4. Build the shell in `shell.tsx` and the home page in `home.tsx`.
5. Reuse `sharedPages` from `src/ui/shared/pages` for catalog, cart, checkout and account pages, or override individual pages in `index.ts`:

```ts
pages: {
  ...sharedPages,
  Home: MyHome,
  ProductDetail: MyProductDetail,
},
```

6. Override shared classes in the theme stylesheet when a page needs a different layout. Themes are selected at build time, so their CSS never ships together.

## Removing UIs

Delete the `src/ui/<theme-id>/` folders you do not want. There is no registry to update. With one theme left, plain `npm run dev` and `npm run build` use it automatically.

If several themes remain and you want a different default, either pass the id or set `UI_THEME` in your shell or `.env.local`.

## Boundaries

- Shared: `src/app/api`, `src/app/*/page.tsx` adapters, `src/lib`, `src/data`, `src/config`, and `src/ui/shared`.
- Theme-owned: shell, home page, tokens, and any page overrides.
- A theme must not import another theme. It may import from `src/ui/shared` and `src/lib`.
- The `"ui"` alias is resolved once per Next.js process. Changing themes requires restarting the dev server.
- Two dev servers in the same checkout share `.next`; run one theme at a time unless you add per-theme build directories.
