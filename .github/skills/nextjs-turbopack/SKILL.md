---
name: nextjs-turbopack
description: Turbopack bundling for the Sephduema Store on Next.js 16+ — dev/build speed, incremental bundling, FS caching, and the few cases where webpack is still required. Use whenever running or debugging dev/build commands, reporting on bundle/perf, or hitting a Turbopack-specific error.
---

# Next.js Turbopack

Next.js 16 uses **Turbopack as the default bundler** for both `dev` and `build`. No config needed — it's on by default. This project does **not** use webpack unless explicitly configured.

---

## 1. Commands

- `pnpm dev` — Turbopack dev server with incremental bundling + persistent FS cache (no cache-stampede on config change; the cache survives edits).
- `pnpm build` — Turbopack production build. TypeScript checks + lint still run as part of the build pipeline.

## 2. Dev-speed tips

- The FS cache means a stopped/re-started dev server doesn't recompile from scratch — first request should be near-instant.
- Keep `next.config.ts` minimal — Turbopack picks up config changes but heavy plugins can slow the dev loop.
- Prefer `pnpm dev` over webpack-mode flags; there's no reason to disable Turbopack on this project.

## 3. When webpack is still needed

Turbopack covers the App Router, CSS (Sass included), and most plugins out of the box. You'd only fall back to webpack for an incompatible third-party plugin or a build error that Turbopack can't process — treat that as an exception, not the default.

## 4. Troubleshooting

- Turbopack errors surface at build/dev time with file+line — fix at source, don't disable the bundler.
- Sass (`.scss`) compiles natively under Turbopack; keep the `styles/` structure from `scss-conventions`.
- If the build output shows webpack in the logs, something explicitly opted into webpack — check `next.config.ts` and `package.json` scripts.

## 5. Perf hygiene

- Rely on route-level code splitting + Suspense/streaming (see `nextjs-app-router-patterns`) before micro-optimizing bundles.
- Use `next/image` with proper `remotePatterns` instead of hand-rolled `<img>`.
- Check for accidental client-side imports of server-only code — they bloat the client bundle under any bundler.
