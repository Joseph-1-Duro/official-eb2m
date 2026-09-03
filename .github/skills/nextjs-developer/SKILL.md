---
name: nextjs-developer
description: Next.js 16 App Router developer patterns for the Sephduema Store — route handlers (API routes), middleware, Server Actions for mutations, generateMetadata for SEO, loading/error/not-found boundaries, and deployment. Use whenever writing a route handler, server action, middleware, SEO metadata, or an error/loading boundary, or working on build/deploy issues.
---

# Next.js Developer

App Router + React 19 + TypeScript strict. Routes in `src/app/**`, route handlers under `src/app/api/**`, components in `src/ui/**`, stores in `src/store/**`.

---

## 1. Route handlers (`src/app/api/**/route.ts`)

- Export `GET`, `POST`, `PATCH`, `DELETE` (and `OPTIONS` where needed).
- Return typed `NextResponse` / `Response` with explicit status codes.
- Validate request bodies with zod schemas from `src/schemas` (`z.infer` types) — never trust raw input.
- Route handlers run on the server — keep secrets server-side only; never read `.env` client-side.
- Set `export const runtime = "nodejs"` unless a route must be edge.

## 2. Server Actions

- Define in files marked `"use server"` (top-level or module) or inline with `"use server"` at the top of the function.
- Use for all mutations — form submits, cart updates, profile edits. No separate fetch needed.
- Return serializable data; surfaces errors with `useActionState` or by throwing and letting `error.tsx`/`sonner` handle them.
- Optimistic updates: keep UI logic in the component, server mutation in the action, per the "logic not mixed with UI" rule.

## 3. Middleware

- `src/middleware.ts` runs before the request — use for auth guards, redirects, and locale/domain handling.
- Keep it thin and fast; do heavy work in route handlers or Server Actions instead.

## 4. SEO — `generateMetadata`

- Every public page exports `generateMetadata` (async) or a static `metadata`.
- `title`, `description`, and `openGraph` at minimum; build titles from page data.
- Use `notFound()` from `generateMetadata` for missing records.

## 5. Loading / error / not-found boundaries

- `loading.tsx` — instant fallback per segment.
- `error.tsx` — client boundary; must be `"use client"`, shows a recoverable error UI.
- `not-found.tsx` — 404 UI per segment, and `notFound()` to trigger it from server code.
- `global-error.tsx` at the root as a last-resort handler.

## 6. Build & deployment

- `pnpm build` must pass with zero type errors (TypeScript strict).
- Verify `images.remotePatterns` in `next.config.ts` for any external image hosts (Firebase URLs currently missing — see AGENTS.md Gotchas).
- Turbopack handles bundling in dev and build — see `nextjs-turbopack`.

## 7. Review checklist

- Server-only logic never leaks to client bundles (no `"use client"` leaks, no `.env` reads in client files).
- Inputs validated by zod schemas, types from `z.infer`.
- Every public route has metadata + loading/error handling.
- Mutations go through Server Actions, not raw fetch to self-hosted APIs.
