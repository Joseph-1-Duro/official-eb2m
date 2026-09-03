---
name: scss-conventions
description: Joseph's SCSS conventions for React/Next.js projects — adaptive 7-1 pattern (lean for small sites, full tier for larger apps), BEM naming, and optional design-token theming. Use this whenever writing, reviewing, or refactoring SCSS/styles, structuring a new stylesheet, naming classes, adding dark/light theme support, or setting up styles for any component. Trigger even if the user just says "add styles for X" without mentioning "SCSS" explicitly.
---

# SCSS Conventions

Personal styling conventions, scaled to project size. **Core philosophy**: design tokens → semantic variables → component styles.

All styles are plain `.scss` files — no CSS Modules. Component styles live in `components/`, one file per component, imported through `main.scss`.

---

## 1. Folder structure — pick the tier that fits the project

### Tier 1 — Small site / rapid build (default for most projects)

```
styles/
├── abstracts/
│   ├── _variables.scss   # colors, spacing, radii, breakpoints
│   ├── _mixins.scss      # reusable patterns (flex-center, respond-to, etc.)
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/           # one file per component
│   ├── _button.scss
│   └── _card.scss
├── layout/                # header, footer, nav, grid
├── pages/                 # page-specific overrides, only if truly needed
└── main.scss              # imports everything, in the order below
```

Import order in `main.scss`: `abstracts → base → layout → components → pages`.

### Tier 2 — Larger app (use once the project has many components, multiple contributors, or needs theming)

```
styles/
├── tokens/          # raw immutable values ($color-blue-500, $space-4) — never used directly in components
├── semantic/         # tokens mapped to meaning ($bg-primary: $color-blue-500) — used in components
├── themes/           # CSS custom properties that override semantic tokens at runtime
│   ├── _light.scss   # :root { --bg-primary: #{$bg-primary}; }
│   └── _dark.scss    # [data-theme="dark"] { --bg-primary: ...; }
├── abstracts/         # mixins, functions, breakpoints — no CSS output
├── base/              # resets, global defaults
├── components/        # one file per component
├── layout/
├── vendors/            # third-party CSS overrides
└── main.scss           # imports in order: tokens → semantic → abstracts → vendors → base → layout → components → themes
```

Move to Tier 2 gradually — you can add `tokens/`, `semantic/`, and `themes/` on top of an existing Tier 1 project without rewriting anything, since Tier 1 variables can just become Tier 2 tokens.

## 2. Naming (BEM)

Every class follows `block__element--modifier`:

- **Block**: the standalone component (`.card`, `.nav`, `.button`)
- **Element**: a part of that block, joined with `__` — used once, never chained (`.card__title`, not `.card__header__title`)
- **Modifier**: a variant or state, joined with `--` (`.button--primary`)

For interactive JS-driven states, pair a BEM modifier (visual) with a plain state class (JS hook), and never write the state class into static markup:

```scss
.button--loading { }   // visual styling
.is-loading { }         // toggled by JS
```

## 3. Nesting rules

- Max 3 levels of Sass nesting — beyond that, introduce a new BEM element instead of nesting deeper.
- Use `&` only for pseudo-classes/states (`&:hover`, `&:focus-visible`) and BEM modifiers (`&--primary`). Never use `&` to chain unrelated class names.

## 4. Variables, mixins & "no magic numbers"

- All colors, spacing, radii, and breakpoints come from `abstracts/_variables.scss` (Tier 1) or `tokens/` + `semantic/` (Tier 2) — never hardcode hex values or arbitrary pixel numbers in a component file.
- Shared structural patterns (flex-center, truncation, responsive breakpoints) go in `abstracts/_mixins.scss` and are `@include`d, not copy-pasted.
- It's fine to use a magic number once while prototyping, but replace it with a variable/token before the component is done.

## 5. Responsive design (mobile-first)

Define breakpoints as a map and use a mixin for readable media queries:

```scss
$breakpoints: ('sm': 576px, 'md': 768px, 'lg': 1024px, 'xl': 1280px);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) { @content; }
  }
}
```

Write mobile-first (`min-width`), and keep the media query inside the component's own file — never in a separate `responsive/` folder — so the context isn't lost.

## 6. Theming (optional — set up when the project needs dark/light mode)

Not needed for most current projects, but wire it up this way when it is:

1. **Tokens** (raw): `$color-gray-900: #111827;`
2. **Semantic variables** (static fallback): `$bg-primary: $color-gray-900;`
3. **CSS custom properties** (runtime-swappable):
   ```scss
   // themes/_light.scss
   :root { --bg-primary: #{$color-gray-100}; }
   // themes/_dark.scss
   [data-theme="dark"] { --bg-primary: #{$color-gray-900}; }
   ```
4. Components reference the custom property, not the Sass variable: `background: var(--bg-primary);`

Toggle by swapping `data-theme` on `<html>`.

## 7. Review checklist

When reviewing existing SCSS or during a PR, flag:

- Classes that don't follow `block__element--modifier`
- Component styles living outside `components/`
- Hardcoded hex/pixel values that should reference a variable or token
- Nesting deeper than 3 levels
- `!important` used outside a genuine utility helper
- Missing responsive behavior on key components
- Missing `:hover`/`:focus-visible` feedback states
- Add media query (pointer) & (hover) where interactive is needed, might create a mixin if better