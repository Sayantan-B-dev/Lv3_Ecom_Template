# E-Commerce Template Design System

## 1. Context and Goals

### Design intent
One sentence: a calm, content-first, token-driven storefront system where product imagery leads, UI chrome stays quiet, and every brand (shoes, fashion, furniture, electronics, single-product-style catalogs) is produced by swapping a single brand token layer, never by editing components.

### Scope
- Product surface: multi-product e-commerce storefront (home, category/PLP, search, PDP, cart, checkout, account, order tracking, static content).
- Stack assumption: Next.js (App Router), CSS variables for tokens, Tailwind or CSS Modules mapped to those variables.
- Data: mock `data.json` and placeholder image APIs at first. The design system must not depend on real data shape beyond the content rules in section 8.

### Source synthesis (what was taken from where)
| Source | Borrowed principle | Where it lives in this system |
|---|---|---|
| Shops.gallery | Content-first rhythm, soft diffused shadows, large radii, translucent ink surfaces | Shadows, surface tiers, card rhythm |
| IKEA India | Functional clarity, strong single accent, dense card grids, 300ms motion | Accent role, grid density, price blocks |
| Nike IN | Minimal utility, heavy type contrast (small UI / huge hero), pill buttons, 200ms interactions | Type scale extremes, button shape, hero |
| Allbirds | Warm neutrals, hairline inset borders, calm 150-300ms motion, full-round chips | Borders, chips, focus ring style |
| Apple Store | Tight small text, light gray raised surfaces, 980px pills, generous vertical whitespace | Surface-raised, section spacing |

### Non-goals
- No brand-specific fonts that require licensing as defaults.
- No one-off component styling. If a value is not a token, it must not ship.

---

## 2. Design Tokens and Foundations

### 2.1 Theming architecture (dynamic by design)
Tokens are split into three layers. Only layer 1 changes per brand.

1. **Brand layer** (`brand.*`): the only file edited when cloning the template for a new site.
2. **Semantic layer** (`color.*`, `font.*`, `space.*`, `radius.*`, `shadow.*`, `motion.*`): derived from brand layer. Components must consume only this layer.
3. **Component layer** (`button.*`, `card.*`, `input.*`): optional aliases to semantic tokens.

To adopt another website's look, the team must only replace values in the brand layer (section 2.2) and re-run the contrast check (section 4.1). Components must not change.

### 2.2 Brand layer (default values, replaceable)
```css
:root {
  /* identity */
  --brand-name: "Template Store";
  --brand-accent: #ffdb00;          /* primary action accent (IKEA-derived default) */
  --brand-accent-ink: #111111;      /* text placed on accent */
  --brand-ink: #111111;             /* strongest text and primary solid button */
  --brand-paper: #ffffff;           /* page base */
  --brand-font-primary: "Manrope";
  --brand-font-display: "Manrope";
  --brand-radius-style: pill;       /* pill | soft | sharp */
}
```
Brand presets (copy-paste targets, each must pass contrast before use):
| Preset | accent | accent-ink | ink | font | radius-style |
|---|---|---|---|---|---|
| Utility (Nike-like) | `#111111` | `#ffffff` | `#111111` | Helvetica stack | pill |
| Warm (Allbirds-like) | `#212121` | `#ffffff` | `#212121` | Geograph-like or Manrope | soft |
| Tech (Apple-like) | `#0071e3` | `#ffffff` | `#1d1d1f` | SF Pro stack | pill |
| Home (IKEA-like) | `#ffdb00` | `#111111` | `#111111` | Manrope | pill |

### 2.3 Typography
- `font.family.primary = var(--brand-font-primary)`
- `font.family.stack = Manrope, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`
- `font.family.display = var(--brand-font-display), var(--font-family-stack)`
- `font.family.mono = ui-monospace, SFMono-Regular, Menlo, monospace` (SKU, order IDs only)
- `font.size.base = 16px`, `font.weight.base = 400`, `font.lineHeight.base = 24px`
- Fonts must be loaded with `next/font`, `display: swap`, and a metric-matched fallback to prevent layout shift.

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `font.size.2xs` | 11.5px | 16px | 500 | Legal, badge text only |
| `font.size.xs` | 12px | 16px | 500 | Captions, meta, helper text |
| `font.size.sm` | 14px | 20px | 400/500 | Secondary text, nav links, filters |
| `font.size.md` | 16px | 24px | 400 | Body, inputs (never below 16px on inputs to prevent iOS zoom) |
| `font.size.lg` | 18px | 28px | 500 | Lead text, price in cards |
| `font.size.xl` | 24px | 32px | 600 | Section titles, PDP price |
| `font.size.2xl` | 30px | 38px | 700 | Page titles |
| `font.size.3xl` | 36px | 44px | 700 | Category hero titles |
| `font.size.4xl` | 48px | 52px | 800 | Home hero (tablet) |
| `font.size.5xl` | 72px | 72px | 800 | Home hero (desktop), uppercase optional |

Rules:
- Display sizes (`3xl` and up) must use `clamp()` between mobile and desktop values. Example: `clamp(2.25rem, 1.2rem + 4vw, 4.5rem)`.
- Letter spacing: body `0`, display `-0.02em`, uppercase micro labels `+0.06em`.
- Prices must use `font-variant-numeric: tabular-nums`.
- Line length for prose must not exceed 72ch.

### 2.4 Color (semantic)
Source translucent values were normalized to solid hex for predictable contrast.

```css
:root {
  /* text */
  --color-text-primary:   #121212;   /* body, headings */
  --color-text-secondary: #5b5b5f;   /* meta, captions (4.5:1+ on paper) */
  --color-text-tertiary:  #767679;   /* placeholders, disabled labels only; never for essential info */
  --color-text-inverse:   #ffffff;
  --color-text-accent:    var(--brand-accent-ink);
  --color-text-link:      #121212;   /* links underlined by default */
  --color-text-danger:    #b3261e;
  --color-text-success:   #1e6b3a;
  --color-text-sale:      #b64400;   /* sale price, urgency (Apple-derived) */

  /* surfaces */
  --color-surface-base:    var(--brand-paper);
  --color-surface-muted:   #f5f5f5;   /* section bands, image backplates */
  --color-surface-raised:  #f5f5f7;   /* cards on muted, drawers */
  --color-surface-sunken:  #ececee;   /* inset wells, skeleton base */
  --color-surface-strong:  #121212;   /* inverse sections, footer */
  --color-surface-accent:  var(--brand-accent);
  --color-surface-overlay: rgba(18, 18, 18, 0.48);

  /* borders */
  --color-border-muted:    rgba(18, 18, 18, 0.10);
  --color-border-default:  #d2d2d7;
  --color-border-strong:   #212121;
  --color-border-focus:    #0b57d0;

  /* feedback */
  --color-feedback-info:    #0b57d0;
  --color-feedback-success: #1e6b3a;
  --color-feedback-warning: #8a5a00;
  --color-feedback-danger:  #b3261e;
}
```
Dark mode (`prefers-color-scheme: dark` and `[data-theme="dark"]`): swap `surface-base` to `#0e0e0f`, `surface-muted` to `#17171a`, `surface-raised` to `#1f1f23`, text-primary to `#f5f5f7`, text-secondary to `#a8a8ad`, borders to `rgba(255,255,255,0.14)`. Dark mode must be token swaps only.

### 2.5 Spacing
4px base unit. Source values (6, 14, 15, 17, 62, 106) are normalized to this scale so that no one-off spacing exists.

| Token | Value | Typical use |
|---|---|---|
| `space.0` | 0 | Reset |
| `space.1` | 4px | Icon-to-text gap |
| `space.2` | 8px | Chip padding, tight stacks |
| `space.3` | 12px | Input padding, card inner gap |
| `space.4` | 16px | Default gutter (mobile), card padding |
| `space.5` | 20px | Form field gap |
| `space.6` | 24px | Card grid gap, gutter (tablet) |
| `space.7` | 32px | Gutter (desktop), group separation |
| `space.8` | 40px | Section inner padding |
| `space.9` | 56px | Section gap (mobile) |
| `space.10` | 80px | Section gap (tablet) |
| `space.11` | 112px | Section gap (desktop), hero padding |

### 2.6 Radius
Resolved per `--brand-radius-style`. Components must reference semantic names only.

| Token | pill (default) | soft | sharp |
|---|---|---|---|
| `radius.xs` | 8px | 6px | 0 |
| `radius.sm` | 16px | 10px | 2px |
| `radius.md` | 24px | 14px | 2px |
| `radius.lg` | 32px | 20px | 4px |
| `radius.pill` | 9999px | 9999px | 4px |
| `radius.control` | 9999px (buttons, chips, inputs) | 12px | 2px |
| `radius.media` | 16px (product images, cards) | 12px | 0 |

### 2.7 Elevation
```css
--shadow-0: none;
--shadow-1: 0 8px 24px 0 rgba(18, 18, 18, 0.035);              /* resting card on hover prep */
--shadow-2: 0 4px 16px 0 rgba(0, 0, 0, 0.10);                  /* dropdown, sticky bar */
--shadow-3: 0 18px 70px 0 rgba(18, 18, 18, 0.06);              /* modal, mega-menu, drawer */
--shadow-inset-border: inset 0 0 0 1px var(--color-border-default); /* hairline border without layout shift */
```
Cards must be flat at rest (border or surface contrast only) and may gain `shadow-1` on hover. Elevation must never be the only affordance.

### 2.8 Motion
| Token | Value | Use |
|---|---|---|
| `motion.duration.instant` | 150ms | Color, border, focus |
| `motion.duration.fast` | 200ms | Button press, chip toggle, hover |
| `motion.duration.normal` | 300ms | Drawer, dropdown, accordion |
| `motion.duration.slow` | 500ms | Page-level reveal, hero media |
| `motion.easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default |
| `motion.easing.enter` | `cubic-bezier(0, 0, 0, 1)` | Elements entering |
| `motion.easing.exit` | `cubic-bezier(0.3, 0, 1, 1)` | Elements leaving |

- Only `opacity`, `transform`, `color`, `background-color`, `border-color`, `box-shadow` may be animated.
- `prefers-reduced-motion: reduce` must disable transforms and parallax and reduce all durations to 0-1ms. Opacity fades may remain at `instant`.

### 2.9 Layout and grid
- Breakpoints: `sm 480`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536` (px, min-width).
- Container: max width 1440px, gutters `space.4` (mobile), `space.6` (md), `space.7` (lg+). Full-bleed sections must still align inner content to the container.
- Product grid columns: 2 (mobile), 3 (md), 4 (lg), 5 (2xl, optional via density setting). Gap `space.4` mobile, `space.6` desktop.
- Aspect ratios (tokens): `ratio.product = 4/5`, `ratio.square = 1/1`, `ratio.hero = 16/9` desktop and `4/5` mobile, `ratio.banner = 3/1`.
- Z-index scale: `base 0`, `sticky 100`, `dropdown 200`, `drawer 300`, `modal 400`, `toast 500`, `skip-link 1000`.
- Touch targets must be at least 44x44px (WCAG 2.2 target size, with 24px as the absolute floor for dense inline controls).

### 2.10 Iconography and imagery
- Icons: 24px grid, 1.5px stroke, `currentColor`, single family (Lucide or Phosphor). Decorative icons must have `aria-hidden="true"`. Icon-only controls must have an accessible name.
- Product images must use `next/image` with explicit width/height or aspect-ratio, `sizes` attribute, blur or surface-sunken placeholder, and descriptive `alt`.
- Placeholder image sources during mock phase (Pixabay or similar) must be wrapped in one `getImage()` helper so real sources replace them in one place.

---

## 3. Component Rules

### 3.0 Universal state contract
Every interactive component must implement all states below. Missing any state is a defect.

| State | Required treatment |
|---|---|
| default | Token-based resting style |
| hover | Pointer only (`@media (hover: hover)`); subtle surface or border change, never size change |
| focus-visible | 2px outline `color.border.focus`, 2px offset, plus 1px `surface-base` inner ring on dark or image backgrounds; must be at least 3:1 against adjacent colors |
| active | Pressed: `transform: scale(0.98)` and one tier darker surface |
| disabled | `aria-disabled="true"` (preferred over `disabled` for buttons that must stay focusable with explanation); 40% opacity is not allowed as the only signal, text label or tooltip must explain why |
| loading | Spinner or skeleton, `aria-busy="true"`, width preserved, pointer events blocked, announced via polite live region |
| error | Border `feedback-danger`, icon plus text message linked by `aria-describedby`, never color alone |

Input modality rules (apply to all interactive components):
- Keyboard: Tab order follows visual order; Enter/Space activate buttons; Enter activates links; Escape closes any overlay and returns focus to the trigger.
- Pointer: hover must never be the only way to reveal essential actions.
- Touch: no hover dependence; tap targets 44px+; swipe gestures must have a button alternative.

### 3.1 Button
Anatomy: container, optional leading icon, label, optional trailing icon, optional spinner.

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| primary | `brand-ink` | `text-inverse` | none | Add to bag, Checkout, Place order (one per view region) |
| accent | `surface-accent` | `text-accent` | none | Promotional CTAs, hero, Buy now |
| secondary | transparent | `text-primary` | 1px `border-strong` | Alternative actions |
| tertiary | transparent | `text-primary` | none, underline on hover | Inline, Clear all |
| danger | `feedback-danger` | `text-inverse` | none | Remove, Delete account |
| icon | transparent or `surface-muted` | `text-primary` | none | Wishlist, close, quantity |

- Sizes: `sm` 36px (`font.size.sm`), `md` 44px (`font.size.md`, default), `lg` 52px (`font.size.md`, weight 600). Horizontal padding `space.5`/`space.6`/`space.7`.
- Radius `radius.control`. Label weight 600. No uppercase unless the brand preset requires it.
- Loading: label stays in DOM (visually hidden or dimmed), spinner centered, width locked.
- Long labels must wrap to two lines max then truncate with title; buttons must not overflow their container. Full-width on mobile for primary form actions.
- Edge: two primary buttons must never sit side by side; demote one to secondary.

### 3.2 Header and navigation
Anatomy: announcement bar (optional), main bar (logo, primary nav, search, account, wishlist, cart), mega-menu panel, mobile drawer.
- Height: 64px mobile, 72px desktop; sticky with `shadow-2` only after scroll > 8px.
- Announcement bar: `surface-strong`, `text-inverse`, `font.size.sm`, dismissible, auto-rotation must pause on hover/focus and must have pause control if rotating.
- Primary nav is a `<nav aria-label="Primary">` with a `<ul>`. Mega-menu triggers are `<button aria-expanded aria-controls>`, not links. Opens on click and on Enter/Space; hover-open is optional with 150ms intent delay and must never be the only path.
- Mega-menu: `shadow-3`, `radius.md` bottom corners, columns of category links, one featured card. Escape closes, focus returns to trigger. Arrow keys move between top-level items.
- Mobile: hamburger opens a full-height drawer from the left (`motion.normal`), focus trapped, background inert, nested categories use push-navigation with a visible Back button.
- Cart icon shows count badge (max display `99+`) and has accessible name "Cart, 3 items".
- Skip link ("Skip to main content") must be the first focusable element.
- Overflow: nav items beyond available width collapse into a "More" menu; labels must not wrap.

### 3.3 Search
Anatomy: input, submit button, clear button, suggestion panel (recent, trending, products, categories).
- Input height 44px, radius `radius.control`, 16px font minimum. Role `combobox`, `aria-expanded`, `aria-activedescendant`, results in `role="listbox"`.
- Keyboard: Down/Up move through suggestions, Enter selects, Escape clears then closes.
- Debounce 200ms. Loading shows skeleton rows, not spinner-only.
- Empty results: show query echo, spelling suggestion if available, top categories, and a Clear search action.
- Long queries truncate with ellipsis in the input and wrap in the results heading.

### 3.4 Product card (core component)
Anatomy: media (image, optional second image on hover), badges (top-left), wishlist button (top-right), color swatches (optional), brand/category eyebrow, title, rating (optional), price block, quick-add (optional).
- Container: `surface-base`, `radius.media` on image only, no border at rest, `shadow-1` on hover (pointer devices). Whole card is one link to PDP via the title (stretched link pattern) so there is a single tab stop; wishlist and quick-add are separate focusable controls above the stretched link.
- Image: `ratio.product`, `object-fit: cover`, `surface-muted` backplate, lazy loaded except first row (priority).
- Eyebrow: `font.size.xs`, `text-secondary`, uppercase optional.
- Title: `font.size.sm` or `md`, weight 500, max 2 lines then ellipsis (`line-clamp: 2`); full title available via `title` attribute and PDP.
- Price block: current price `font.size.lg` weight 600 tabular; compare-at price `font.size.sm`, `text-secondary`, strikethrough with `<del>` and visually hidden "Original price"; sale price in `text-sale`. Discount badge text "-30%" must also be conveyed in text, not color only.
- Rating: stars plus numeric value plus count; accessible text "4.5 out of 5, 128 reviews".
- Swatches: 20px circles inside 44px hit areas, selected ring `border-strong`, show max 5 then "+3".
- Badges: `New`, `Sale`, `Bestseller`, `Low stock`, `Sold out`; max 2 per card; `font.size.2xs`, weight 600, `radius.pill`, padding `space.1` `space.2`.
- Sold out: image at reduced saturation (not opacity alone), "Sold out" badge, quick-add replaced with "Notify me".
- Hover on touch: none. Quick-add on mobile is an always-visible icon button.
- Skeleton: same aspect ratio and block heights as loaded card to prevent layout shift.

### 3.5 Product listing page (PLP): grid, filters, sorting, pagination
Anatomy: breadcrumb, page title with result count, toolbar (filter trigger, active filter chips, sort), filter sidebar (desktop), grid, pagination or load-more, SEO text block.

**Toolbar**
- Desktop: result count left, sort right, filter sidebar fixed at 280px. Mobile: sticky bar with "Filter" and "Sort" buttons (50/50), opening bottom sheets.
- Result count text: "128 products" announced via `aria-live="polite"` when filters change.

**Filters**
- Groups as accordions (`<button aria-expanded>`), default open for first 2 groups. Types: checkbox list (with counts), color swatches, size chips, price range (dual slider plus two number inputs), rating, availability toggle.
- Each option is a real checkbox/radio with a visible label; counts in `text-secondary`; zero-count options disabled with count shown.
- Long lists (>8): show 6 plus "Show more", with in-group search above 15 options.
- Active filters: removable chips above the grid, each with accessible name "Remove filter: Size M", plus "Clear all".
- Price slider must be keyboard operable (arrows 1 step, PageUp/PageDown 10 steps) and have text inputs as an alternative.
- Applying filters on desktop is instant (debounced 300ms) and updates the URL query string; on mobile sheet, filters apply on "Show N results" button. Filter state must be in the URL (shareable, back-button safe).

**Sorting**
- Options: Relevance (default), Newest, Price low to high, Price high to low, Top rated, Discount. Implemented as native `<select>` styled with tokens or a listbox with full ARIA. URL param `sort`.

**Pagination**
- Default: numbered pagination (SEO and scalable); optional "Load more" variant for mobile via config. Infinite scroll must not be used unless a visible "Load more" fallback and footer reachability exist.
- Anatomy: Previous, page numbers with ellipsis (`1 … 4 5 6 … 20`), Next, "Page 5 of 20" label. `<nav aria-label="Pagination">`, current page `aria-current="page"`.
- Page size options 24 / 48 / 96, default 24. URL param `page`, `limit`.
- Changing page must scroll to grid top and move focus to the results heading.

**States and edge cases**
- Loading: grid skeletons (same count as page size, minimum 8).
- Empty: illustration-free, headline "No products match your filters", body with active filters list, primary action "Clear all filters", secondary "Browse all {category}".
- Error: inline message with Retry button; previously loaded results stay visible if available.
- Overflow: filter chips scroll horizontally on mobile with fade edge; never wrap beyond two rows on desktop (then "+N more").

### 3.6 Product detail page (PDP)
Anatomy: breadcrumb, gallery, title block (brand, name, rating, SKU), price block, variant selectors, quantity, primary actions, delivery and returns info, accordion details, reviews, related products, recently viewed, sticky mobile add-to-bag bar.
- Layout: desktop two columns (gallery 60%, info 40%, info sticky within section); mobile single column.
- **Gallery**: main image plus thumbnails (vertical on desktop, dots on mobile). Swipe on touch, arrow keys on focus, thumbnails are buttons with `aria-current`. Click opens zoom lightbox (modal, focus trapped, Escape closes). Video items identified with label. Must preload only the first image.
- **Variants**: color swatches (name shown beside selected, "Color: Black"), size chips in a `radiogroup`. Unavailable sizes are focusable, struck through, and announce "Size M, out of stock". Size guide opens a modal.
- **Quantity**: stepper with minus/plus buttons and numeric input, min 1, max by stock, announces changes; at max, plus is `aria-disabled` with helper text.
- **Actions**: primary "Add to bag" (full width), secondary "Save to wishlist". If no variant is chosen, clicking Add to bag must not silently fail: it focuses the first unselected group and shows an error message "Select a size".
- **Sticky bar (mobile)**: appears after primary CTA leaves viewport, shows name, price, and Add to bag; must not cover focused elements (use `scroll-padding`).
- **Stock**: "In stock", "Only 3 left" (warning color plus text), "Out of stock" with "Notify me" form.
- **Reviews**: summary histogram, filter and sort, paginated list, helpful votes; long review text clamps to 5 lines with "Read more".

### 3.7 Cart (drawer and page)
Anatomy: line items (image, title, variant text, unit price, quantity stepper, line total, remove), promo code input, summary (subtotal, shipping estimate, discount, tax note, total), checkout button, continue shopping, recommendations.
- Drawer opens from right (`motion.normal`) on add-to-bag; focus moves to the drawer heading; Escape closes and returns focus to the cart button. Full page cart at `/cart` shares the same components.
- Quantity or remove actions show inline loading and announce results via live region ("Item removed. Undo"). Remove must offer Undo for 6 seconds.
- Free shipping progress bar: `role="progressbar"` with text "You are Rs 500 away from free shipping".
- Empty: headline "Your bag is empty", primary "Continue shopping", optional category links.
- Error (stock changed, price changed): per-line inline alert with required action; Checkout is blocked until resolved.
- Currency formatting must use `Intl.NumberFormat` with locale and currency from config (default `en-IN`, `INR`); never hardcode symbols.

### 3.8 Checkout
Anatomy: stepper (Contact, Delivery, Payment, Review), form sections, order summary (sticky on desktop, collapsible on mobile), trust row.
- Single-page accordion flow or multi-step with persistent summary; URL reflects the step.
- Forms: see 3.9. Autocomplete attributes must be set (`email`, `given-name`, `postal-code`, `tel`, `cc-number`, etc.).
- Address: pincode lookup auto-fills city and state (mock later), editable.
- Payment methods as radio cards (Card, UPI, Netbanking, COD, Wallet); selected card uses `border-strong` plus check icon.
- Place order button: loading state locks form, prevents double submit, shows progress text "Placing your order".
- Error: summary at top with links to each invalid field plus inline messages; focus moves to the summary.
- Success page: order number (mono), summary, estimated delivery, tracking link, continue shopping.

### 3.9 Form controls (input, select, textarea, checkbox, radio, switch)
- Label always visible above the control (no placeholder-as-label). Helper text below in `font.size.xs`. Required fields marked with text "Required" or asterisk plus legend explanation.
- Input: 48px height, padding `space.3` `space.4`, 1px `border-default`, `radius.control`; hover `border-strong`; focus-visible outline plus border `border-strong`; error `feedback-danger` border plus icon plus message; disabled `surface-muted` with `text-tertiary` and readable label.
- Validation: on blur and on submit, never on first keystroke; success states are optional and must not rely on color only.
- Checkbox and radio: 20px visual, 44px hit area, custom style built on native inputs. Switch: `role="switch"`, label states current state.
- Select: native on mobile. Custom listbox only when needed, with full keyboard support (type-ahead, Home/End).
- Long values truncate with ellipsis; textareas auto-grow to max 8 rows.

### 3.10 Chips, badges, tags
- Filter chip: 36px height, `radius.pill`, `surface-muted` at rest, `brand-ink` background with `text-inverse` when selected, selected state also shows check icon.
- Badge: non-interactive, never the only carrier of meaning (e.g., sale also in price text).
- Chip groups scroll horizontally on overflow with `scroll-snap`, keyboard focus scrolls into view.

### 3.11 Hero, banners, and promotional sections
- Home hero: `ratio.hero`, display type `font.size.5xl` (clamp), max 2 lines headline, one primary and one secondary CTA. Text over images must sit on a scrim guaranteeing 4.5:1 contrast. Autoplay carousels are discouraged; if used, must have pause, previous, next, and slide indicators, and must stop when reduced motion is set.
- Category tiles: image with title overlay or beneath, whole tile is one link, hover scales image 1.03 over `motion.slow` (disabled for reduced motion).
- Section header pattern: title (`font.size.2xl`), optional description, right-aligned "View all" tertiary link with descriptive accessible name ("View all new arrivals").

### 3.12 Carousel
- Native scroll-snap container with prev/next buttons (hidden on touch), `role="region"` with `aria-roledescription="carousel"` and label. Partial next item visible (peek 8-12%) to signal scrollability. Buttons disabled at ends via `aria-disabled`. No auto-advance for product carousels.

### 3.13 Modal, drawer, bottom sheet, popover, tooltip
- Modal/drawer/sheet: `role="dialog"`, `aria-modal="true"`, labelled by title, focus trap, scroll lock on body, overlay `surface-overlay`, close button always present and first or last in order, Escape closes, click on overlay closes unless form has unsaved changes (then confirm).
- Bottom sheet (mobile): drag handle is decorative; must also have a close button; max height 90vh with internal scroll.
- Tooltip: only for supplementary text, never essential content; appears on focus and hover, dismissible via Escape, 300ms delay, not used on touch.

### 3.14 Toast and inline alerts
- Toast: bottom-center mobile, bottom-right desktop, `role="status"` (or `alert` for errors), auto-dismiss after 5s (8s with action), pauses on hover/focus, max 3 stacked. Must not be the only place critical information appears.
- Inline alert: icon, title, description, optional action; four variants (info, success, warning, danger) with text plus icon plus tint, never color alone.

### 3.15 Breadcrumb, tabs, accordion
- Breadcrumb: `<nav aria-label="Breadcrumb">` with ordered list, current item `aria-current="page"`, collapses middle items into "…" on mobile. Separator is decorative.
- Tabs: roving tabindex, arrow keys move, Home/End jump, panels labelled by tab; used for PDP details on desktop only (accordion on mobile).
- Accordion: header is a button inside a heading element, `aria-expanded`, animation `motion.normal` height with reduced motion fallback.

### 3.16 Skeleton, empty, and error patterns
- Skeleton: `surface-sunken` with a 1.5s shimmer; shimmer disabled under reduced motion. Must match final layout dimensions.
- Empty state: headline (what is empty), one-sentence reason, one primary action, optional secondary. No decorative-only illustrations required.
- Error page (404/500): plain headline, plain-language cause, actions "Back to home" and "Search", support link.

### 3.17 Footer
- `surface-strong`, `text-inverse` (secondary links at 4.5:1 minimum on dark), 4 link columns collapsing to accordions on mobile, newsletter form (label, email input, subscribe button, consent text), payment icons (decorative with text alternative), social links with accessible names, legal row.
- Link density: footer links must be real text links, minimum 44px tall tap rows on mobile.

### 3.18 Account area
- Sidebar nav (desktop) or segmented list (mobile): Orders, Addresses, Wishlist, Profile, Logout. Order list as cards with status badge, date, total, and "View details". Status steps (Placed, Packed, Shipped, Delivered) as an ordered list with `aria-current="step"`.

### 3.19 Density reference (for performance and testing)
Expected component density per page type, used to size performance budgets and test fixtures:
- Home: cards 60-120, links 150-250, buttons 40-80, lists 10-30, navigation 3-4.
- PLP: cards 24-96, links 150-350, buttons 60-120, inputs 5-25 (filters), navigation 3-4.
- PDP: cards 8-24, links 100-200, buttons 20-50, inputs 3-10.
- Lists and tables must virtualize or paginate beyond 100 rows.

---

## 4. Accessibility Requirements and Testable Acceptance Criteria

Target: WCAG 2.2 AA. Keyboard-first interaction is required. Focus-visible indicators are required. Contrast constraints are required.

### 4.1 Contrast (pass/fail)
- Body text and meta text must achieve at least 4.5:1 against its background. Large text (24px, or 18.66px bold) at least 3:1.
- UI boundaries, icons conveying meaning, focus rings must achieve at least 3:1.
- `text-tertiary` must only be used for placeholder and disabled text; it must never carry essential information.
- Brand preset changes must be verified with an automated contrast script covering every token pair in section 2.4. Any failing pair blocks release.

### 4.2 Keyboard
- All functionality must be operable with keyboard only. Pass: complete browse, filter, sort, paginate, open PDP, select variant, add to bag, edit cart, checkout using Tab, Shift+Tab, Enter, Space, Arrows, Escape.
- Tab order must match visual order. Pass: no positive `tabindex`; no keyboard trap except intentional modal traps with Escape exit.
- Focus must be visible on every interactive element. Pass: 2px outline, 3:1 contrast, not clipped by `overflow: hidden` (use `outline-offset` and container padding).
- On route change or pagination, focus must move to the page `<h1>` or results heading.
- WCAG 2.2: focused elements must not be fully hidden by sticky headers/bars (Focus Not Obscured); use `scroll-margin-top` equal to sticky header height.

### 4.3 Pointer, touch, and gestures
- Targets at least 24x24 CSS px (AA minimum) and 44x44 as the system standard. Pass: automated target-size check on all buttons, chips, checkboxes, and icon buttons.
- Every drag or swipe interaction (price slider, gallery, carousel, bottom sheet) must have a single-pointer non-drag alternative (Dragging Movements, WCAG 2.5.7).
- No functionality may depend on hover alone.

### 4.4 Semantics and ARIA
- One `<h1>` per page; heading levels must not skip.
- Landmarks: `header`, `nav`, `main`, `footer`, plus `aside` for filters. Multiple `nav` elements must have unique labels.
- Product cards: one link per card, accessible name equals product name; price read as "Price: Rs 2,499", sale as "Sale price Rs 1,999, was Rs 2,499".
- Images: informative `alt` (product name plus distinguishing attribute); decorative `alt=""`.
- Live regions: result count changes, cart updates, form errors, toasts. Pass: screen reader announces within 1 second of change.
- Forms: every control has a programmatic label; errors linked via `aria-describedby`; `aria-invalid` set on error; error summary receives focus on failed submit.
- Authentication and checkout must not require cognitive function tests; paste into fields must be allowed (Accessible Authentication, WCAG 3.3.8). Redundant entry must be avoided: shipping data reused for billing by default (3.3.7).
- Consistent help: help/contact link located in the same place on every page (3.2.6).

### 4.5 Motion and preferences
- `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast: more` (increase border to `border-strong`, remove translucent surfaces), and `forced-colors` (use system colors, keep outlines) must be honored.
- Text must reflow at 320px width and 400% zoom without horizontal scroll (except data tables and carousels). Text spacing overrides must not break layouts.

### 4.6 Automated and manual test plan
- Automated: axe-core in CI on all templates, Lighthouse accessibility score 95+, Playwright keyboard-flow tests for add-to-cart and checkout.
- Manual: VoiceOver (iOS/macOS) and NVDA (Windows) pass for PLP filter flow and checkout; 200% and 400% zoom pass; Windows High Contrast pass.

---

## 5. Performance Rules (design-enforced)
- Largest Contentful Paint element (hero or first product image) must be `priority` loaded with correct `sizes`; LCP target under 2.5s on mid-tier mobile.
- Cumulative Layout Shift under 0.1: all media must reserve space via aspect-ratio; skeletons match final size; fonts use `size-adjust` fallbacks.
- Interaction to Next Paint under 200ms: filter and sort updates must be optimistic or show immediate loading state.
- Image formats: AVIF/WebP via `next/image`; maximum 3 responsive sizes per image role.
- Animations must run on compositor properties only. No animation may run offscreen.

---

## 6. Content and Tone Standards

### Voice
Concise, confident, implementation-focused in documentation; in storefront copy: clear, warm, direct, never pushy. Sentences are short and active. Brand presets may adjust warmth but never clarity.

### Rules
- Buttons must use verb plus object: "Add to bag", "Apply filters", "Track order". Buttons must not say "Click here", "Submit", or "OK" when a specific label is possible.
- Links must make sense out of context ("View all running shoes", not "View all").
- Error messages must say what happened and how to fix it, without blame.
- Numbers: use locale-aware formatting; show currency symbol once per price; ranges use "to" in prose and en dash in compact UI.
- Capitalization: sentence case for UI; uppercase only for micro labels and optional hero headings via CSS (not in source text).
- Date format follows locale; delivery estimates use relative plus absolute ("Arrives Tue, 21 Oct").

### Examples
| Context | Do | Do not |
|---|---|---|
| Add action | "Add to bag" | "Submit" |
| Out of stock | "Sold out. Notify me when it's back." | "Unavailable" |
| Form error | "Enter a 6-digit pincode." | "Invalid input" |
| Empty cart | "Your bag is empty. Start with our new arrivals." | "No items." |
| Filter result | "128 products" | "Results found: 128" |
| Free shipping | "You're Rs 500 away from free delivery." | "Spend more!" |
| Destructive | "Remove from bag" with Undo | "Delete" with no recovery |

---

## 7. Anti-Patterns and Prohibited Implementations

The following must not ship:
- Raw hex values, raw pixel spacing, or raw font sizes in components. Tokens only.
- Low-contrast text, light-gray-on-white meta text below 4.5:1, or hidden/removed focus outlines (`outline: none` without replacement).
- One-off spacing, radius, shadow, or typography values; "just this once" exceptions.
- Placeholder text used as the only label.
- Color as the only indicator of state (sale, error, selected, out of stock).
- Hover-only controls or hover-only information.
- Autoplaying carousels without pause, and auto-advancing product carousels.
- Infinite scroll without a footer-reachable fallback.
- Non-descriptive actions: "Click here", "Read more" without context, unlabeled icon buttons.
- Layout shift from late-loading images, fonts, or banners.
- Modals without focus trap and Escape handling; focus lost after closing.
- Disabled buttons with no explanation.
- Hardcoded currency symbols, locale, brand name, or copy inside components. All must come from config.
- Dark patterns: fake urgency timers, pre-checked upsells, hidden costs, confirm-shaming copy.
- Component guidance or implementations that omit any state from the universal state contract (3.0).

### Migration notes (when adopting another site's look)
1. Replace only the brand layer values (2.2). Do not edit components.
2. If the new brand font is licensed, add it through `next/font/local` and keep Manrope in the fallback stack.
3. Re-run the contrast script; adjust `accent-ink` or `text-secondary` before shipping.
4. Normalize any imported spacing or radius to the nearest scale token; do not add new tokens without design review.
5. Update `radius-style` rather than overriding individual radii.
6. Document the change in `docs/design-changelog.md`.

---

## 8. Data-Shape Contract (design-relevant fields)
Components must handle these fields being absent, empty, or very long:
- Product: `id`, `slug`, `title`, `brand`, `category`, `images[]`, `price`, `compareAtPrice`, `currency`, `rating`, `reviewCount`, `badges[]`, `variants[]` (color, size, stock), `description`, `specs[]`, `shipping`, `returns`.
- Edge cases: no images (show `surface-muted` placeholder with icon), one image (hide thumbnails), 20+ images (cap thumbnails with "+N"), title over 120 characters (clamp), no rating (hide row, never show 0 stars), price missing (show "Price on request" and disable add to bag), 1 variant (hide selector).

---

## 9. QA Checklist

Foundations
- [ ] No raw hex, px, or font values outside token files.
- [ ] Brand layer is the only file changed when switching brands; components untouched.
- [ ] Light, dark, high-contrast, and forced-colors modes render correctly.
- [ ] All token pairs pass contrast (4.5:1 text, 3:1 UI).

Components
- [ ] Every component implements default, hover, focus-visible, active, disabled, loading, error.
- [ ] Each component documents keyboard, pointer, and touch behavior.
- [ ] Long titles, long labels, 0 results, 1 result, 1000+ results, and missing images handled.
- [ ] Skeletons match final layout; no layout shift (CLS under 0.1).
- [ ] Product card has a single link tab stop; wishlist and quick-add reachable.

Commerce flows
- [ ] Filters, sort, page, and limit persist in URL and survive refresh and back button.
- [ ] Filter changes announce new result count; focus management correct after pagination.
- [ ] PDP blocks add to bag until required variants chosen, with focusable error.
- [ ] Cart quantity, remove, undo, promo, and free-shipping progress work with keyboard and screen reader.
- [ ] Checkout supports autofill, no redundant entry, error summary, no double submit.
- [ ] Currency and locale come from config.

Accessibility
- [ ] axe-core clean on all templates; Lighthouse accessibility 95+.
- [ ] Full keyboard walkthrough of browse-to-order passes.
- [ ] Focus never obscured by sticky header or bottom bar.
- [ ] Touch targets 44px (24px absolute minimum) verified.
- [ ] Drag interactions have non-drag alternatives.
- [ ] Reduced motion, 400% zoom, and 320px reflow pass.
- [ ] VoiceOver and NVDA spot checks pass on PLP, PDP, cart, checkout.

Content
- [ ] All actions use verb plus object labels; no "Click here".
- [ ] Error messages state cause and fix.
- [ ] No dark patterns.

Release
- [ ] Design changelog updated.
- [ ] Performance budgets met (LCP under 2.5s, INP under 200ms).

---

## 10. Quality Gates
- Every non-negotiable rule in this document uses "must".
- Every recommendation uses "should".
- Every accessibility rule is testable in implementation (see section 4 pass criteria).
- Teams should prefer system consistency over local visual exceptions.
