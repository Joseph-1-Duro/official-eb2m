---
name: ui-ux-pro-max
description: UI/UX design intelligence for the Sephduema Store — searchable reference of styles, palettes, typography pairings, motion presets, and a11y guidelines. Use whenever designing, building, or reviewing UI: page layouts, components, color, typography, spacing, animation, accessibility, or conversion-focused storefront decisions.
---

# UI/UX Pro Max

A design-intelligence reference, loaded from the installed skill database at `~/.agents/skills/ui-ux-pro-max`. Use it for anything visual on the storefront or admin dashboard.

---

## 1. When to load it

- Designing a new page/section or reshaping an existing one (front matter: `frontend-design` for aesthetic direction first).
- Picking colors, fonts, spacing scales, or a dark/light theme.
- Motion/animation work (GSAP presets included).
- Reviewing UI for UX + accessibility — pairs with `web-design-guidelines`.
- Chart/data-viz work in the admin dashboard.

## 2. What it provides

Searchable local database covering:

- **84 styles**, **192 color palettes**, **74 font pairings**
- **98 UX guidelines**, **104 icon entries**, **16 GSAP motion presets**
- **25 chart types** across stacks (React, Next.js included)
- Accessibility guidance woven into the guidelines

## 3. How to use it here

1. Load the skill (`~/.agents/skills/ui-ux-pro-max/SKILL.md`) before writing styles.
2. Match choices to the brand: the store uses Sass tokens in `src/styles/abstracts/_variables.scss` — translate any palette/type decision into tokens, never hardcoded values.
3. Sanity-check against the store's existing `frontend-design` direction and `scss-conventions` structure.
4. Keep motion subtle and purposeful; respect `prefers-reduced-motion`.

## 4. Review checklist

- Color contrast meets WCAG for text on all backgrounds (tokens, not magic hex).
- Type scale is consistent and set from tokens.
- Spacing follows the token scale — no arbitrary gaps.
- Interactive states (hover/focus) exist and are keyboard-reachable.
- Animations have reduced-motion fallbacks.
