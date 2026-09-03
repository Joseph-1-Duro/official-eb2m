---
name: nextjs-app-router-patterns
description: Next.js 16 App Router patterns for the Sephduema Store — when to use Server vs Client Components, streaming with Suspense, parallel routes, and data fetching (fetch caching, ISR, server actions). Use whenever building new routes/pages, deciding rendering strategy (SSR/SSG/ISR/CSR), structuring data fetching, or laying out nested/parallel routes.
---

# Next.js App Router Patterns

The store runs **Next.js 16 App Router** with React 19 and TypeScript strict. `@/*` maps to `src/*`, so routes live in `src/app/**` and components in `src/ui/**`.

---

## 1. Rendering strategy — decide per route

| Strategy | Use for |
| --- | --- |
| Static (default) | Public pages that change rarely — home, static marketing pages |
| ISR (`revalidate`) | Product catalog, category pages — revalidate periodically |
| Dynamic/SSR | Anything personalized or with fresh data — cart, checkout, account |
| Client | Interactive islands only — state, animations, event handling |

Default to Server Components. Only add `"use client"` when the component needs hooks, event handlers, or browser APIs.

## 2. Server vs Client Components

- Server Components (default): fetch data, render markup, no client JS shipped.
- Client Components (`"use client"`): interactive. Keep them small and at the leaf of the tree.
- Pass serializable props from server → client only. Never pass functions, Dates, or class instances.
- A Client Component can't be imported into a Server Component's children unless the children are passed as props or are also client components.

## 3. Streaming & loading states

- Wrap slow, non-critical sections in `<Suspense>` with a `fallback` to stream them in.
- Define `loading.tsx` per route segment for an instant, route-level fallback.
- Prefer granular `<Suspense>` over one big `loading.tsx` so the shell paints immediately.

## 4. Data fetching

- Fetch in Server Components directly (`async function`), not in `useEffect`.
- Use `fetch` with the appropriate `next: { revalidate }` / `cache` options — per-route via `revalidate` or `export const revalidate = n`.
- Use `unstable_cache` for memoizing expensive non-fetch reads.
- Never fetch the same data twice on one render — rely on React's request memoization or dedupe in a shared `*.store.ts`/data layer.
- Server Actions are the mutation primitive (see `nextjs-developer`).

## 5. Parallel & nested routes

- Parallel routes: multiple pages rendered in the same layout using `@slot` folders — use for dashboards with independent panels.
- Intercepting routes: `(.)about` style folders — use for modals that keep the URL.
- Keep layouts colocated in `route/layout.tsx`; add `not-found.tsx` for missing segments.
- Route groups `(group)` keep related pages under one path without adding URL segments.

## 6. Metadata

- Export `generateMetadata` or a static `metadata` object from `page.tsx` / `layout.tsx` — see `nextjs-developer`.

## 7. Review checklist

- Page renders data statically when it could (check `revalidate`/`cache` usage).
- Client Components are leaf components, not big page wrappers.
- Suspense/loading boundaries cover slow segments.
- No `useEffect` data fetching where a Server Component would do.
- Metadata exported for every public page.
