---
name: frontend-design
description: Visual direction for the Sephduema Store — distinctive, intentional design choices for new UI or reshaping existing UI, avoiding templated defaults. Use when building a new page/section, redesigning a component, or deciding aesthetic direction, typography, spacing, or layout composition before styles are written.
---

# Frontend Design

Aesthetic direction for the storefront and admin dashboard. Load this skill when starting new UI or reshaping existing UI, before reaching for styles.

---

## 1. Establish the visual direction

- Define the mood first: premium/organic, minimal/clean, bold/playful — and match every choice to it.
- Never reach for templated defaults (plain Tailwind classes, generic shadcn look). This project uses plain Sass + tokens.
- Treat spacing, type scale, and color as a system, not one-off choices.

## 2. Typography

- The store ships two fonts via tokens: `--font-grotesk` (display) and `--font-ubuntu` (body) — see `$font-grotesk` / `$font-ubuntu` in `src/styles/abstracts/_variables.scss`.
- Use the display font for headings/hero, the body font for reading text.
- All font sizes come from `$size-*` tokens (rem-based); no arbitrary sizes.

## 3. Color & spacing

- Pull from the token palette in `_variables.scss`; map any new shade to a token, never hardcode hex.
- Keep a restrained palette — one primary, one accent, neutrals.
- Space on the 4px scale (`$space-1`…`$space-9`); build rhythm with consistent gaps rather than padding soup.

## 4. Composition

- Establish a clear focal point per section; guide the eye with scale and contrast, not decoration.
- Use generous whitespace — crowded layouts read as cheap.
- Balance asymmetry deliberately; avoid centering everything.

## 5. Motion

- Keep motion subtle and purposeful (fade/slide for reveals, micro-interactions on interactive elements).
- Respect `prefers-reduced-motion`.
- No gratuitous animation — motion must support the hierarchy.

## 6. Review checklist

- Does this feel intentional, not templated?
- One clear hierarchy per section?
- Tokens used for every color/size/spacing decision?
- Works at mobile → desktop without fighting the breakpoint system?
- Matches the store's premium brand position (gold `#b98a2f` primary, warm neutrals)?
