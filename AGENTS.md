<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

## Setup

1. Read `TODO.md` always
2. Check for SKILLS.md files in `.github/skills`
3. Be less chatty

## Skills

- `scss-conventions` — all SCSS/styling work (plain `.scss`, `styles/` folder, one file per component)
- `frontend-design` — visual direction for new or reshaped UI
- `web-design-guidelines` — UI/UX audits ("review my UI")
- `nextjs-app-router-patterns` — App Router patterns, SSR/SSG, streaming, parallel routes, data fetching
- `nextjs-developer` — route handlers, middleware, server actions, `generateMetadata`, loading/error boundaries, deployment
- `nextjs-turbopack` — Next.js 16+/Turbopack bundling, dev speed, Turbopack vs webpack
- `ui-ux-pro-max` — UI/UX design intelligence: styles, palettes, typography, motion, a11y

## Instructions

1. Don't install any packages without permission, state why you need it
2. Don't run git commands
3. Stick to my command don't do anything not asked of
4. Drop suggestion
5. Make sure we are working on a single implementation at a go, add others proposed to the TODO.md

## Code Style

1. Make use of DRY where its logical to
2. Make sure logic are not mixed with UI, and if they are suggest refactor
3. camelCase naming convention for functions
4. Types derived from zod schemas via `z.infer` (in `src/schemas`), never duplicated
5. Suffix files by purpose: `*.store.ts`, `*.schema.ts`, `*.type.ts`
6. Styles follow `.github/skills/scss-conventions` — no CSS Modules

<!-- END:nextjs-agent-rules -->
