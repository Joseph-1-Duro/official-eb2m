---
name: web-design-guidelines
description: Web Interface Guidelines compliance audit for the Sephduema Store — accessibility, UX best practices, and interface standards. Use when asked to review the UI, check accessibility, audit design, review UX, or verify the site against web best practices.
---

# Web Interface Guidelines

Audit the storefront and admin against the Web Interface Guidelines. Trigger on: "review my UI", "check accessibility", "audit design", "review UX", "check the site against best practices".

---

## 1. Scope of an audit

Check these areas and report findings as **violation / minor / pass**:

- **Accessibility**: semantic HTML, headings order, focus states, keyboard navigation, `aria` labels, color contrast.
- **Responsive**: no horizontal scroll, usable touch targets (≥ 44px), readable type at all breakpoints.
- **Performance**: images via `next/image` with proper sizing, no render-blocking surprises, no layout shift.
- **Forms & inputs**: labels, error states, focus ring (project has a `focus-ring` mixin — use it).
- **Feedback**: hover/active states, loading states (Suspense/`loading.tsx`), empty states, error boundaries (`error.tsx`).

## 2. Project-specific baseline

- Interactive elements get the `@include focus-ring` mixin; verify it's on all buttons/links/inputs.
- Hover styles gated behind `@include hover-support` (pointer: fine) where relevant.
- Announcement bar uses `role="status"` + `aria-live="polite"` — mirror that pattern for toasts/alerts.
- Header uses `position: sticky`; avoid `overflow-x: hidden` (use `clip`) or it breaks — see `_globals.scss`.
- Icons (lucide-react) must have accessible labels (`aria-label`) when standalone.

## 3. Contrast & color

- Check text on all backgrounds against WCAG AA (4.5:1 body, 3:1 large text).
- Gold `#b98a2f` on white fails AA for body text — flag contrast issues on brand colors.
- Never rely on color alone to convey state.

## 4. Review output format

List findings grouped by severity, each with `file_path:line`, what's wrong, and the concrete fix. Keep it concise — no fluff.

## 5. Checklist

- [ ] Semantic landmarks (`header`, `main`, `nav`, `footer`)
- [ ] One `h1` per page, ordered heading levels
- [ ] Every interactive element keyboard-reachable + visible focus
- [ ] Buttons/links have discernible hover/active/disabled states
- [ ] Images have `alt` (or `alt=""` if decorative)
- [ ] No horizontal overflow at any breakpoint
- [ ] Touch targets ≥ 44px
- [ ] AA contrast on all text
- [ ] Loading/error/empty states on data-driven views
