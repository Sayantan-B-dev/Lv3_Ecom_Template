# agent.md

Operating rules for any AI coding agent or CLI tool (Claude, OpenCode, FreeBuff, or similar) working on this repository. These rules are non-negotiable unless the owner explicitly overrides them in chat. Rules use "must" for requirements and "should" for recommendations.

---

## 1. Project vision

- Project name: **ecommerce-template**.
- This is a reusable, scalable, multi-product e-commerce template. It is not a single-product store. A single-product store is simply a catalog with one item and must work with no special code.
- The owner will clone this template to produce many different storefronts (shoe brand, multi-brand fashion, furniture, electronics, general marketplace, any product type). Turning the template into a new site must take minutes of tweaking: replace data, edit env values, swap brand tokens. It must never require editing components.
- Reference experience: a full storefront in the class of Myntra, Nike, IKEA, Apple Store: categories, subcategories, listing pages, filtering, sorting, pagination, search, product detail, cart, checkout, wishlist, account, order tracking.
- Build step by step. Do not over-engineer early. Ship a working, simple version of each feature first, then iterate.

---

## 2. Tech stack (strict)

- **Framework:** the latest stable Next.js using the App Router. No Pages Router. Check the current stable version at project start and use it.
- **Language:** TypeScript with `strict: true`. No `any` unless justified in a comment.
- **Styling:** CSS variables for design tokens, mapped into Tailwind CSS (or CSS Modules if the owner prefers). Components must consume semantic tokens only.
- **Backend:** Next.js Route Handlers and Server Actions inside the same repo. Front end and back end are both built in this phase.
- **Data:** no real database yet. All data comes from mock JSON files behind a repository layer (see section 4).
- **Validation:** Zod for request and data validation.
- **State:** server components and URL state first; a small client store (Zustand or similar) only for cart and UI state.
- **Package manager:** the owner's preference if stated, otherwise npm. Do not mix lockfiles.
- **Testing:** Vitest for unit tests, Playwright for key flows. Add tests alongside features, not at the end.
- **Linting and formatting:** ESLint and Prettier configured at boilerplate time.

Do not introduce additional frameworks, ORMs, auth providers, or payment SDKs without asking the owner.

---

## 3. Design rules

- `design.md` and the skill file `SKILL.md` are the single source of truth for all UI decisions. Read them before building or changing any UI.
- All UI must use semantic design tokens. No raw hex, raw pixel spacing, or ad hoc font sizes in components.
- The design must be dynamic: the owner can paste design guidance from another website into `design.md`, and the project must be re-themeable by editing only the brand layer (`--brand-*` tokens). Components must not be edited per brand.
- Every interactive component must implement the seven states: default, hover, focus-visible, active, disabled, loading, error.
- Accessibility target is WCAG 2.2 AA. Keyboard-first, visible focus, contrast checks, reduced-motion support.
- Output must look advanced and professional: consistent spacing, clean typography, polished empty, loading, and error states.
- Responsive from 320px up. Mobile-first.
- Do not add one-off styling exceptions. If a needed value is missing, propose a new token to the owner.

---

## 4. Data and backend rules

- **No database for now.** All data lives in mock files, primarily `data/data.json` or split files under `data/` (products, categories, brands, reviews, users, orders). Split files only when `data.json` becomes unwieldy.
- Data access must go through a **repository layer** (for example `lib/repositories/products.ts`) with a stable interface: `list`, `getBySlug`, `search`, `filter`, `paginate`. Components and route handlers must never read JSON files directly. This ensures a real database can replace the mock layer later by changing only the repository implementations.
- The repository interface must support: category and subcategory filtering, brand filtering, price range, size, color, rating, availability, discount, text search, sorting (relevance, newest, price asc/desc, top rated, discount), and pagination with page and limit.
- Mock data must be rich enough to exercise every UI state: sale items, sold-out items, many variants, missing ratings, long titles, multiple images, and enough products (minimum 120) to test pagination.
- Provide a seed or generator script (`scripts/generate-mock-data.ts`) so mock data can be regenerated for different product types and brands quickly.
- API route handlers must validate input with Zod, return consistent JSON shapes (`{ data, meta, error }`), and use proper HTTP status codes.
- Cart, wishlist, and orders may persist in memory or in a local JSON or cookie store during this phase. Mark these clearly as temporary in the docs.
- Authentication in this phase is mocked. Do not integrate a real provider without asking.
- Payments are mocked. Do not integrate a real gateway without asking.

---

## 5. Images

- Use dummy or random images only. Acceptable sources: Pixabay API, Picsum, Unsplash Source alternatives, placehold style services, or local placeholders.
- All image access must go through one helper (for example `lib/images/getImage.ts`). Swapping the source later must require changing only that helper.
- Use `next/image` with explicit dimensions or aspect ratios, `sizes`, and alt text. Configure allowed remote domains in `next.config`.
- Never hotlink images without a fallback. If the remote source fails, show a token-styled placeholder.
- API keys for image sources must come from env variables.

---

## 6. Environment variables

- Provide `.env.example` with all required variables. **`.env.example` must contain no comments, no blank explanatory lines, and no descriptions.** Only `KEY=value` lines.
- Never commit `.env`, `.env.local`, or any real secret.
- Validate env variables at startup with a typed schema (for example `env.ts` using Zod). The app must fail fast with a clear error if a required variable is missing.
- Brand and site configuration (site name, currency, locale, default country, support email, social links, feature flags) must come from env or a single `config/site.ts` file, never be hardcoded in components.

Expected variable groups (names are guidance; keep them minimal):
`NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CURRENCY`, `NEXT_PUBLIC_LOCALE`, `NEXT_PUBLIC_DEFAULT_PAGE_SIZE`, `IMAGE_PROVIDER`, `PIXABAY_API_KEY`, `DATA_SOURCE`.

---

## 7. Repository structure

Use a clear, scalable structure. Adjust only with good reason and document the change.

```
.
├── agent.md
├── design.md
├── README.md
├── docs/
│   ├── architecture.md
│   ├── data-model.md
│   ├── theming.md
│   ├── cloning-guide.md
│   ├── api.md
│   ├── decisions.md
│   └── changelog.md
├── .claude/skills/design-system-ecommerce-template/SKILL.md
├── app/
├── components/
│   ├── ui/
│   ├── product/
│   ├── cart/
│   ├── layout/
│   └── checkout/
├── lib/
│   ├── repositories/
│   ├── images/
│   ├── utils/
│   └── validators/
├── config/
├── data/
├── scripts/
├── styles/
│   └── tokens.css
├── tests/
├── public/
├── .env.example
├── .gitignore
└── package.json
```

---

## 8. Documentation rules

- Documentation must be maintained continuously as part of each feature, not added at the end.
- `README.md` must cover: what the template is, quick start, scripts, env setup, folder map, and how to clone it into a new brand.
- `docs/cloning-guide.md` must give a step-by-step checklist to turn the template into a new store in minutes: replace `data/`, edit `.env`, edit brand tokens, swap logo and favicon, update copy in `config/site.ts`.
- `docs/theming.md` must explain the brand layer and how to apply design guidance pasted from another site.
- `docs/data-model.md` must document every entity and field so a real database schema can be derived later.
- `docs/decisions.md` records architectural decisions in short entries (date, decision, reason).
- `docs/changelog.md` records user-visible changes per committed feature.
- When code changes behavior, the related docs must be updated in the same working session, before the commit.

---

## 9. Feature scope (build order)

Build in this order. Do not skip ahead. Each numbered item is one "perfect feature" for commit purposes.

1. Boilerplate: Next.js app, TypeScript, lint, format, tokens, base layout, config, env schema.
2. Design foundation: token files, theme switching, base UI primitives (button, input, chip, badge, skeleton).
3. Mock data layer: `data.json`, generator script, repository layer, typed models.
4. Layout shell: header, mega-menu, mobile drawer, footer, search entry.
5. Home page: hero, category tiles, product carousels, promo sections.
6. Listing page: product card, grid, filters, sorting, pagination, URL state, empty and error states.
7. Search: suggestions and results page.
8. Product detail page: gallery, variants, quantity, stock, reviews, related products.
9. Cart: drawer and page, undo, promo code (mock), shipping progress.
10. Wishlist.
11. Checkout: steps, forms, mock payment, success page.
12. Account: orders, addresses, profile (mock auth).
13. SEO, metadata, sitemap, robots, structured data.
14. Performance and accessibility pass, tests, final documentation.

Optional admin or dashboard features are out of scope unless the owner asks.

---

## 10. Git and commit rules

### Setup
- Initialize Git locally at the start (`git init`).
- Fill `.gitignore` thoroughly with all common junk: `node_modules`, `.next`, `out`, `build`, `dist`, `coverage`, `.env*` (except `.env.example`), logs, OS files (`.DS_Store`, `Thumbs.db`), editor folders (`.vscode`, `.idea`), caches, `*.tsbuildinfo`, Playwright reports, and temporary files.
- **Do not add a remote. Do not push. Do not suggest pushing.** The owner will add a remote later.

### Initial commit sequence
1. **Commit 1:** boilerplate only.
2. **Commit 2:** documentation (`README.md`, `docs/`, `agent.md`, `design.md`, skill file).
3. **Commit 3:** extra files (configs, scripts, mock data scaffolding, CI files, editor configs).
4. **Commit 4 onward:** one commit per completed feature from the build order.

### When to commit
- Commit **only after the owner confirms** the feature works.
- One commit equals one complete, verified feature. Do not commit half-built work.
- Do **not** commit small or tiny changes. Combine multiple small changes into a single later commit, or ask the owner whether to commit them.
- **Exception:** when the owner explicitly says to commit (including for modifications or small fixes), commit immediately as instructed.
- Before asking for confirmation, the agent must have run lint, type-check, build, and relevant tests, and must report the results.

### Commit message format
- **No AI tagging or watermarking.** No `Co-authored-by` lines for AI, no "Generated with", no tool names, no model names.
- **No emoji** in commit messages or descriptions.
- Use plain, professional, imperative messages. Prefer Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `style:`, `perf:`, `build:`.
- Subject line 72 characters or fewer, no trailing period. Add a short body only when it adds real value, listing what changed and why.
- Never rewrite history, force anything, or amend commits the owner has already seen without being asked.

---

## 11. Code quality rules

- Components must be small, composable, and typed. Prefer server components; add `"use client"` only where interactivity requires it.
- No dead code, no commented-out blocks, no leftover `console.log`.
- No magic numbers or strings; use constants or config.
- All user-facing strings must be clear and descriptive (see design.md content rules). Avoid ambiguous labels.
- Every list, grid, and table must handle loading, empty, error, and overflow cases.
- Every page must have correct metadata, one `<h1>`, and proper landmarks.
- Handle edge cases from design.md section 8 (missing images, long titles, missing price, no ratings, single variant).
- Performance budgets: LCP under 2.5s, CLS under 0.1, INP under 200ms. Use `next/image`, lazy loading, and avoid shipping unnecessary client JavaScript.
- Security basics: sanitize and validate all input, no secrets in client bundles, safe HTML rendering only.
- Keep dependencies minimal. Justify each new dependency in `docs/decisions.md`.

---

## 12. Working protocol for the agent

1. **Before starting:** read `agent.md`, `design.md`, the skill file, and `docs/`. State in one sentence what is about to be built.
2. **Plan small:** break the feature into steps, build the simplest correct version first.
3. **Ask when blocked:** if a decision materially changes scope, data shape, or dependencies, ask the owner a short, specific question rather than guessing. Do not ask about things with a conventional default; choose it and note it.
4. **Verify:** run lint, type-check, build, and tests. Fix failures before reporting.
5. **Report:** summarize what was built, how to test it, and any limitations in a few lines. No long recaps.
6. **Wait for confirmation** before committing (unless the owner has said to commit).
7. **Update docs** for the feature before the commit.
8. **Never** perform destructive actions (deleting files outside the task, resetting git, overwriting `data/` without backup) without explicit approval.
9. **Never** add a remote, push, publish, or deploy unless the owner explicitly asks.
10. **Stay in scope:** do not add unrequested features. Suggest them instead.

---

## 13. Definition of done (per feature)

A feature is done only when all of these hold:
- [ ] Works on mobile, tablet, and desktop.
- [ ] Uses tokens only; matches `design.md`.
- [ ] All seven component states implemented.
- [ ] Loading, empty, error, and overflow states handled.
- [ ] Keyboard navigable with visible focus; passes axe checks.
- [ ] Data accessed through the repository layer only.
- [ ] Types strict, lint clean, build passes, tests pass.
- [ ] Docs and changelog updated.
- [ ] Owner has confirmed.

---

## 14. Open questions the agent may ask the owner before starting

Ask these only once, at the very beginning, in a single short message:
1. Default currency and locale (for example INR and en-IN)?
2. Package manager preference (npm, pnpm, yarn)?
3. Tailwind CSS or CSS Modules?
4. Should mock auth and cart persist in cookies, local storage, or in memory?
5. Any initial brand name, logo, and accent color to use for the first demo store?

If the owner does not answer, use these defaults: INR and en-IN, npm, Tailwind CSS, cookie-based mock persistence, and the "Template Store" brand with the default accent from `design.md`.
