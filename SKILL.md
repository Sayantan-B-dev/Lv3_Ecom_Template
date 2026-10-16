---
name: design-system-ecommerce-template
description: Implementation-ready, token-driven design system for multi-brand, multi-product e-commerce storefronts (listing, filters, sorting, pagination, product detail, cart, checkout, account). Use when creating or updating storefront UI, component specs, theming a new brand, or design-system documentation. Synthesizes Abbey Glass, IKEA India, Nike IN, Allbirds and Apple Store patterns.
---

# E-Commerce Template Design System

## Mission
Deliver one consistent, accessible, themeable UI system for any storefront (shoes, fashion, furniture, electronics, general marketplace). A new brand must be created by changing the brand layer only. Components must never be edited per brand.

## How to use this skill
1. Restate the design intent for the task in one sentence.
2. Read the brand layer (section 1) and confirm which preset or custom values apply.
3. Build or review components using semantic tokens only (section 2) and the component rules (section 3).
4. Verify against accessibility acceptance criteria (section 4).
5. Check anti-patterns (section 6) and finish with the QA checklist (section 7).

## Source synthesis
| Source | Principle adopted | Used for |
|---|---|---|
| Abbey Glass (shops.gallery) | Manrope, warm neutral surfaces, soft large shadows, 60px display type | Typography, elevation, surface tiers |
| IKEA India | Single strong accent, dense functional grids, 300ms motion | Accent role, grid density, price blocks |
| Nike IN | Utility-first minimal UI, extreme type contrast, pill controls, 200ms interactions | Buttons, hero scale, motion |
| Allbirds | Hairline inset borders, calm 150-300ms motion, full-round chips | Borders, chips, focus style |
| Apple Store | Tight small text, light raised surfaces, large pills, generous whitespace | Raised surfaces, section spacing |

---

## 1. Brand layer (the only layer edited per site)
```css
:root {
  --brand-name: "Template Store";
  --brand-accent: #ffdb00;
  --brand-accent-ink: #111111;
  --brand-ink: #121212;
  --brand-paper: #ffffff;
  --brand-font-primary: "Manrope";
  --brand-font-display: "Manrope";
  --brand-radius-style: pill; /* pill | soft | sharp */
}
```
| Preset | accent | accent-ink | ink | radius-style |
|---|---|---|---|---|
| Home (IKEA-like) | #ffdb00 | #111111 | #121212 | pill |
| Utility (Nike-like) | #111111 | #ffffff | #111111 | pill |
| Warm (Allbirds/Abbey-like) | #212121 | #ffffff | #212121 | soft |
| Tech (Apple-like) | #0071e3 | #ffffff | #1d1d1f | pill |

Rules:
- Components must consume only semantic tokens (section 2), never `--brand-*` directly.
- After any brand change, the contrast check in section 4.1 must pass before release.
- Brand name, currency, locale, and copy must come from config, never from components.

---

## 2. Semantic tokens

### 2.1 Typography
- `font.family.stack = Manrope, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`
- `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Fonts must load through `next/font` with `display: swap` and a metric-matched fallback.

| Token | Size / Line | Weight | Use |
|---|---|---|---|
| 2xs | 11.5 / 16 | 500 | Legal, badge text |
| xs | 12 / 16 | 500 | Captions, helper text |
| sm | 14 / 20 | 400-500 | Nav, filters, secondary |
| md | 16 / 24 | 400 | Body, inputs (inputs must be 16px minimum) |
| lg | 18 / 28 | 500 | Lead text, card price |
| xl | 24 / 32 | 600 | Section titles, PDP price |
| 2xl | 30 / 38 | 700 | Page titles |
| 3xl | 36 / 44 | 700 | Category hero |
| 4xl | 48 / 52 | 800 | Hero (tablet) |
| 5xl | 60-72 / 1 | 800 | Hero (desktop) |

- Display sizes (3xl+) must use `clamp()`.
- Prices must use `font-variant-numeric: tabular-nums`.
- Prose line length must not exceed 72ch. Display letter spacing -0.02em.

### 2.2 Color
```css
:root {
  --color-text-primary: #121212;
  --color-text-secondary: #5b5b5f;
  --color-text-tertiary: #767679;   /* placeholder and disabled only */
  --color-text-inverse: #ffffff;
  --color-text-accent: var(--brand-accent-ink);
  --color-text-danger: #b3261e;
  --color-text-success: #1e6b3a;
  --color-text-sale: #b64400;

  --color-surface-base: var(--brand-paper);
  --color-surface-muted: #f5f5f5;
  --color-surface-raised: #f4f4f2;
  --color-surface-sunken: #ececee;
  --color-surface-strong: #121212;
  --color-surface-accent: var(--brand-accent);
  --color-surface-overlay: rgba(18, 18, 18, 0.48);

  --color-border-muted: rgba(18, 18, 18, 0.10);
  --color-border-default: #d2d2d7;
  --color-border-strong: #212121;
  --color-border-focus: #0b57d0;

  --color-feedback-info: #0b57d0;
  --color-feedback-success: #1e6b3a;
  --color-feedback-warning: #8a5a00;
  --color-feedback-danger: #b3261e;
}
```
Dark mode must be token swaps only: base `#0e0e0f`, muted `#17171a`, raised `#1f1f23`, text-primary `#f5f5f7`, text-secondary `#a8a8ad`, borders `rgba(255,255,255,0.14)`.

### 2.3 Spacing (4px base; source oddities like 5.62, 15, 17, 62, 106 are normalized)
`space.1=4` `space.2=8` `space.3=12` `space.4=16` `space.5=20` `space.6=24` `space.7=32` `space.8=40` `space.9=56` `space.10=80` `space.11=112` (px).
- Gutters: 16 mobile, 24 tablet, 32 desktop. Section gaps: 56 / 80 / 112.
- Container max width 1440px. Breakpoints: 480, 768, 1024, 1280, 1536.

### 2.4 Radius (resolved by `--brand-radius-style`)
| Token | pill | soft | sharp |
|---|---|---|---|
| xs | 8 | 6 | 0 |
| sm | 16 | 10 | 2 |
| md | 24 | 14 | 2 |
| lg | 32 | 20 | 4 |
| control (buttons, chips, inputs) | 9999 | 12 | 2 |
| media (images, cards) | 16 | 12 | 0 |

### 2.5 Elevation
```css
--shadow-1: 0 12px 35px rgba(18,18,18,0.04);   /* card hover prep */
--shadow-2: 0 4px 16px rgba(0,0,0,0.10);       /* sticky bar, dropdown */
--shadow-3: 0 18px 70px rgba(18,18,18,0.06);   /* modal, mega-menu */
--shadow-4: 0 16px 40px rgba(18,18,18,0.16);   /* drawer, floating panels */
--shadow-inset-border: inset 0 0 0 1px var(--color-border-default);
```
Cards must be flat at rest. Elevation must never be the only affordance.

### 2.6 Motion
`instant=150ms` (color, border, focus), `fast=200ms` (hover, press, chip), `normal=300ms` (drawer, dropdown, accordion), `slow=500ms` (hero, page reveal).
Easing: standard `cubic-bezier(0.2,0,0,1)`, enter `cubic-bezier(0,0,0,1)`, exit `cubic-bezier(0.3,0,1,1)`.
- Only opacity, transform, color, background-color, border-color, box-shadow may animate.
- `prefers-reduced-motion` must remove transforms, parallax, shimmer, and autoplay.

### 2.7 Layout
- Product grid: 2 cols mobile, 3 tablet, 4 desktop, 5 optional on 1536+. Gap 16 mobile, 24 desktop.
- Aspect ratios: product 4/5, square 1/1, hero 16/9 desktop and 4/5 mobile, banner 3/1.
- Z-index: sticky 100, dropdown 200, drawer 300, modal 400, toast 500, skip-link 1000.
- Touch targets must be 44x44px (24px is the absolute floor for dense inline controls).

---

## 3. Component rules

### 3.0 Universal state contract
Every interactive component must define all seven states.
| State | Required treatment |
|---|---|
| default | Token-based resting style |
| hover | Pointer devices only (`@media (hover: hover)`); no size change |
| focus-visible | 2px outline `border-focus`, 2px offset, 3:1 contrast vs neighbors; never clipped |
| active | `scale(0.98)` plus one tier darker surface |
| disabled | `aria-disabled`, reason visible as text or tooltip; opacity alone is not allowed |
| loading | `aria-busy`, spinner or skeleton, width locked, pointer events blocked, polite live announcement |
| error | `feedback-danger` border, icon plus text, linked via `aria-describedby`; never color alone |

Input rules for all components: keyboard (Tab order follows visual order, Enter/Space activate, Escape closes overlays and returns focus), pointer (hover never the only path), touch (44px targets, swipe always has a button alternative).

### 3.1 Button
- Variants: primary (`brand-ink` bg), accent (`surface-accent`), secondary (1px `border-strong`), tertiary (text with underline on hover), danger, icon.
- Sizes: sm 36px, md 44px (default), lg 52px. Radius `control`. Weight 600.
- One primary per view region. Two primaries must never sit side by side.
- Labels wrap to two lines then truncate with `title`. Primary form actions are full width on mobile.
- Loading keeps the label in the DOM and locks width.

### 3.2 Header and navigation
- Parts: announcement bar, main bar (logo, nav, search, account, wishlist, cart), mega-menu, mobile drawer.
- Height 64 mobile, 72 desktop. Sticky; `shadow-2` appears after 8px scroll.
- Mega-menu triggers must be `<button aria-expanded aria-controls>`. Click and Enter/Space open; hover-open is optional with 150ms delay. Escape closes and returns focus.
- Mobile drawer: focus trapped, background inert, nested push navigation with a visible Back button.
- Cart button accessible name: "Cart, 3 items"; badge caps at `99+`.
- The skip link must be the first focusable element.
- Overflowing nav items collapse into "More"; labels must not wrap.

### 3.3 Search
- Input 44px minimum height, 16px font, `role="combobox"` with `aria-expanded` and `aria-activedescendant`, results in `role="listbox"`.
- Keys: Up/Down navigate, Enter selects, Escape clears then closes. Debounce 200ms.
- Panels: recent, trending, product matches, categories. Loading uses skeleton rows.
- Empty: echo the query, offer spelling suggestion and top categories.

### 3.4 Product card
- Parts: media (second image on hover optional), badges (top-left, max 2), wishlist (top-right), swatches (max 5 then "+N"), eyebrow, title, rating, price block, quick-add.
- One link per card (stretched link on title). Wishlist and quick-add are separate focusable controls above it.
- Image: ratio 4/5, `radius.media`, `surface-muted` backplate, lazy except first row.
- Title: max 2 lines, ellipsis, full text via `title`.
- Price: current `lg` 600 tabular; compare-at in `<del>` with hidden "Original price" text; sale in `text-sale`; discount shown as text.
- Rating: hidden entirely when absent (never 0 stars). Accessible text "4.5 out of 5, 128 reviews".
- Sold out: desaturated image, "Sold out" badge, quick-add becomes "Notify me".
- Touch: no hover reliance; quick-add is an always-visible icon button.
- Skeleton must match the loaded card dimensions.

### 3.5 Listing page: grid, filters, sorting, pagination
- Parts: breadcrumb, title with result count, toolbar, filter sidebar (280px desktop) or bottom sheet (mobile), active chips, grid, pagination, SEO text.
- **Filters**: accordion groups; checkbox lists with counts, color swatches, size chips, dual price slider plus number inputs, rating, availability. Zero-count options are disabled with the count visible. Lists over 8 show 6 plus "Show more"; over 15 add in-group search. Price slider is keyboard operable (arrows 1 step, PageUp/PageDown 10).
- **Active filters**: removable chips ("Remove filter: Size M") plus "Clear all".
- **Apply behavior**: instant (300ms debounce) on desktop, "Show N results" button on mobile sheet. All filter, sort, page and limit state must live in the URL.
- **Sorting**: Relevance (default), Newest, Price low to high, Price high to low, Top rated, Discount. Native select or full ARIA listbox.
- **Pagination**: numbered by default (`1 … 4 5 6 … 20`, Previous, Next, "Page 5 of 20"), `<nav aria-label="Pagination">`, `aria-current="page"`. Optional "Load more". Infinite scroll must not be used without a visible "Load more" fallback and reachable footer. Page sizes 24/48/96. After a page change, scroll to grid top and focus the results heading.
- **Result count** changes must announce via `aria-live="polite"`.
- **States**: loading = skeleton grid (page-size count, min 8); empty = "No products match your filters" with active filters, "Clear all filters", "Browse all {category}"; error = inline message with Retry while keeping prior results.
- Chips scroll horizontally on mobile with edge fade; desktop wraps to two rows then "+N more".

### 3.6 Product detail page
- Layout: desktop gallery 60% / info 40% (info sticky); mobile single column.
- Gallery: thumbnails (vertical desktop, dots mobile), swipe plus arrow keys, thumbnails are buttons with `aria-current`, zoom lightbox as modal. Only the first image is preloaded.
- Variants: color swatches (selected name shown), size chips in a `radiogroup`. Unavailable sizes stay focusable and announce "out of stock". Size guide opens a modal.
- Quantity stepper: min 1, max by stock, announces changes, plus becomes `aria-disabled` at max with helper text.
- Add to bag with missing variant must not fail silently: focus the first unselected group and show "Select a size".
- Mobile sticky add-to-bag bar must not obscure focused elements (`scroll-padding`).
- Stock text: "In stock", "Only 3 left", "Out of stock" plus Notify form.
- Details as accordion (mobile) or tabs (desktop). Reviews: histogram, sort, filter, paginate, clamp long text to 5 lines with "Read more".

### 3.7 Cart (drawer and page)
- Drawer slides from right (300ms); focus moves to heading; Escape closes and returns focus to the cart button.
- Line items: image, title, variant, unit price, stepper, line total, remove. Remove must offer Undo for 6 seconds.
- Free shipping progress: `role="progressbar"` with text such as "You're Rs 500 away from free delivery".
- Empty: "Your bag is empty" with "Continue shopping". Stock or price changes show a per-line alert and block checkout until resolved.
- Currency must use `Intl.NumberFormat` with locale and currency from config.

### 3.8 Checkout
- Steps: Contact, Delivery, Payment, Review; URL reflects the step; summary sticky on desktop and collapsible on mobile.
- Autocomplete attributes must be set. Billing defaults to shipping (no redundant entry). Pasting must be allowed.
- Payment options as radio cards with a check icon on the selected one.
- Place order locks the form and prevents double submit. Errors show a focused summary with links to each field plus inline messages.
- Success page: order number (mono font), summary, delivery estimate, tracking link.

### 3.9 Form controls
- Labels always visible above controls; placeholder is never the label. Helper text `xs` below.
- Input 48px, padding 12/16, 1px `border-default`, hover `border-strong`, error border plus icon plus message.
- Validate on blur and submit, not on first keystroke.
- Checkbox/radio: 20px visual in a 44px hit area. Switch uses `role="switch"`.
- Native select on mobile; custom listbox needs type-ahead and Home/End.
- Textareas auto-grow to 8 rows.

### 3.10 Chips and badges
- Filter chip 36px, `surface-muted` at rest, `brand-ink` when selected plus a check icon.
- Badges are non-interactive and must not be the sole carrier of meaning.

### 3.11 Hero, banners, carousels
- Hero: headline max 2 lines, one primary and one secondary CTA, text on a scrim guaranteeing 4.5:1.
- Auto-advancing carousels are discouraged; if used they need pause, previous, next, indicators, and must stop under reduced motion. Product carousels must not auto-advance.
- Carousels use scroll-snap, show an 8-12% peek, `aria-roledescription="carousel"`, and hide prev/next on touch.
- "View all" links need descriptive accessible names ("View all new arrivals").

### 3.12 Overlays
- Modal, drawer, bottom sheet: `role="dialog"`, `aria-modal`, labelled title, focus trap, body scroll lock, visible close button, Escape closes. Unsaved forms must confirm before closing.
- Bottom sheet max height 90vh with internal scroll; drag handle is decorative.
- Tooltip: supplementary only, on focus and hover, Escape dismisses, none on touch.
- Toast: `role="status"` (`alert` for errors), 5s (8s with action), pauses on hover/focus, max 3. Critical info must not live only in a toast.
- Inline alerts: icon plus title plus text; never color alone.

### 3.13 Navigation aids
- Breadcrumb: `<nav aria-label="Breadcrumb">`, ordered list, `aria-current="page"`, middle items collapse to "…" on mobile.
- Tabs: roving tabindex, arrows, Home/End. Accordion: button inside heading, `aria-expanded`.

### 3.14 Skeleton, empty, error
- Skeleton: `surface-sunken`, 1.5s shimmer (off under reduced motion), exact layout dimensions.
- Empty: headline, one-sentence reason, one primary action.
- 404/500: plain headline, cause, "Back to home" and "Search", support link.

### 3.15 Footer and account
- Footer: `surface-strong`, links at 4.5:1 on dark, four columns collapsing to accordions on mobile, newsletter form with label and consent, 44px link rows on mobile.
- Account: Orders, Addresses, Wishlist, Profile, Logout. Order status as an ordered list with `aria-current="step"`.

### 3.16 Data edge cases
Components must handle: no images (placeholder with icon), one image (hide thumbnails), 20+ images (cap with "+N"), title over 120 characters (clamp), no rating (hide), missing price ("Price on request", disable add to bag), single variant (hide selector), 0 / 1 / 1000+ results. Lists beyond 100 rows must paginate or virtualize.

---

## 4. Accessibility acceptance criteria (WCAG 2.2 AA)

### 4.1 Contrast
- Text must reach 4.5:1 (3:1 for 24px or 18.66px bold). UI boundaries, meaningful icons, focus rings must reach 3:1.
- `text-tertiary` must never carry essential information.
- Pass: automated check over every token pair; a failure blocks release.

### 4.2 Keyboard and focus
- Pass: browse, filter, sort, paginate, open product, select variant, add to bag, edit cart, and check out using only keyboard.
- No positive `tabindex`; no traps except modal traps with Escape exit.
- Focus must be visible everywhere and not hidden by sticky bars (use `scroll-margin-top`).
- On route change or pagination, focus moves to the `<h1>` or results heading.

### 4.3 Pointer and touch
- Targets at least 24px (AA) and 44px (system standard). Drag interactions have non-drag alternatives (WCAG 2.5.7). No hover-only functionality.

### 4.4 Semantics
- One `<h1>` per page, no skipped levels. Landmarks: header, nav, main, footer, aside (filters); multiple navs need unique labels.
- Images have informative `alt`; decorative images use `alt=""`.
- Live regions for result counts, cart updates, errors, toasts (announced within 1 second).
- Form controls have labels; errors use `aria-describedby` and `aria-invalid`; failed submit focuses the error summary.
- No cognitive tests in auth or checkout; paste allowed (3.3.8); no redundant entry (3.3.7); help link in a consistent place (3.2.6).

### 4.5 Preferences and reflow
- Must honor `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast: more`, and `forced-colors`.
- Content must reflow at 320px and 400% zoom without horizontal scroll (carousels and data tables excepted).

### 4.6 Test plan
- Automated: axe-core in CI, Lighthouse accessibility 95+, Playwright keyboard flows for add-to-cart and checkout.
- Manual: VoiceOver and NVDA on listing, product, cart, checkout; 200% and 400% zoom; Windows High Contrast.

---

## 5. Performance rules
- LCP element must be priority-loaded with correct `sizes`; LCP under 2.5s on mid-tier mobile.
- CLS under 0.1: reserve media space, match skeletons, use fallback font `size-adjust`.
- INP under 200ms: filter and sort show immediate loading or optimistic state.
- Use AVIF/WebP via `next/image`. Animate compositor properties only.
- During mock phase, all placeholder images must pass through one `getImage()` helper so real sources replace them in one place.

---

## 6. Content, tone, and anti-patterns

### Tone
Concise, confident, implementation-focused in documentation; warm, direct, never pushy in storefront copy.

### Content standards
| Context | Do | Do not |
|---|---|---|
| Add action | "Add to bag" | "Submit" |
| Out of stock | "Sold out. Notify me when it's back." | "Unavailable" |
| Form error | "Enter a 6-digit pincode." | "Invalid input" |
| Empty cart | "Your bag is empty. Start with our new arrivals." | "No items." |
| Result count | "128 products" | "Results found: 128" |
| Destructive | "Remove from bag" with Undo | "Delete" without recovery |
- Buttons must use verb plus object. Links must make sense out of context. Errors state the cause and the fix. Use sentence case; uppercase only via CSS on micro labels or hero. Format numbers and dates by locale.

### Prohibited
- Raw hex, px, or font values in components; one-off spacing, radius, shadow, or type exceptions.
- Low-contrast text; `outline: none` without a replacement focus style.
- Placeholder as label; color as the only state signal; hover-only controls.
- Auto-advancing product carousels; infinite scroll without fallback.
- "Click here", unlabeled icon buttons, disabled buttons with no explanation.
- Layout shift from late images, fonts, or banners.
- Modals without focus trap or focus return.
- Hardcoded currency, locale, brand name, or copy.
- Dark patterns: fake timers, pre-checked upsells, hidden costs, confirm-shaming.
- Any component missing a state from the universal contract.

### Migration notes (adopting another site's look)
1. Replace brand-layer values only; do not edit components.
2. Licensed fonts load via `next/font/local` with Manrope kept in the fallback stack.
3. Re-run the contrast check and adjust `accent-ink` or `text-secondary`.
4. Snap imported spacing and radius to the nearest scale token; new tokens need design review.
5. Switch `--brand-radius-style` rather than overriding individual radii.
6. Record the change in `docs/design-changelog.md`.

---

## 7. QA checklist
- [ ] No raw hex, px, or font values outside token files.
- [ ] Switching brands changes only the brand layer.
- [ ] Light, dark, high-contrast, forced-colors all render correctly.
- [ ] All token pairs pass contrast.
- [ ] Every component implements all seven states and documents keyboard, pointer, and touch behavior.
- [ ] Long text, empty, single-item, 1000+ item, and missing-image cases handled.
- [ ] Skeletons match final layout; CLS under 0.1.
- [ ] Filters, sort, page, limit persist in the URL and survive refresh and back.
- [ ] Result count announced; focus managed after pagination.
- [ ] Product page blocks add to bag until variants chosen, with a focusable error.
- [ ] Cart edit, remove, undo, promo, and shipping progress work by keyboard and screen reader.
- [ ] Checkout supports autofill, no redundant entry, error summary, no double submit.
- [ ] Currency and locale come from config.
- [ ] axe-core clean; Lighthouse accessibility 95+; keyboard walkthrough passes.
- [ ] Focus never obscured by sticky elements; targets at least 44px.
- [ ] Reduced motion, 320px reflow, 400% zoom pass.
- [ ] Copy uses verb plus object labels; no dark patterns.
- [ ] Design changelog updated; LCP under 2.5s, INP under 200ms.

## Quality gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

---

## 8. Installed agent skills

Project-level skills live in `.agents/skills/` and apply to this template. Review a skill's
`SKILL.md` before first use; installed skills run with full agent permissions. Keep the set
lean — each skill adds context weight.

### Installed (starter set)

| Skill | Source | Use for |
|---|---|---|
| frontend-design | anthropics/claude-code | Distinctive, non-generic storefront UI |
| vercel-react-best-practices | vercel-labs/agent-skills | React/Next.js performance and patterns |
| code-review-and-quality | addyosmani/agent-skills | Five-axis review before verified commits |
| test-driven-development | addyosmani/agent-skills | Red-green-refactor discipline |
| webapp-testing | anthropics/skills | Playwright UI and API testing |

### Install more when needed

All commands target OpenCode (`-a opencode`). Omit `-a` for auto-detected agents.
Run `npx skills add <owner/repo> -l` to list exact skill names if a command fails.

```
npx skills add addyosmani/agent-skills -s frontend-ui-engineering -a opencode
npx skills add jezweb/claude-skills -s tailwind-v4-shadcn -a opencode
npx skills add currents-dev/playwright-best-practices-skill -a opencode
npx ai-agent-skills install backend-development
npx skills add supabase/agent-skills -s supabase-postgres-best-practices -a opencode
```

- frontend-ui-engineering: component architecture, design systems, responsive design and
  accessibility (matches this design system).
- tailwind-v4-shadcn: Tailwind v4 plus shadcn/ui integration.
- playwright-best-practices: E2E, component, API, visual regression and a11y testing.
- backend-development: APIs and server architecture (separate CLI).
- supabase-postgres-best-practices: Postgres optimization; install when mock data is
  replaced with a real database.
- Built-in security scan: `/security-review` ships in Claude Code by default.
- Skill discovery: the find-skills skill searches the skills.sh leaderboard.
