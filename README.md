# Eko Boys 2 Men website

A modern, fast web application built for the Eko Boys 2 Men alumni network. This platform connects old school members, manages directory listings, shares updates, and coordinates events.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Support](#support)

## Tech Stack
- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript
- **Styling:** SCSS (Sass) — plain `.scss`, one file per component
- **Content:** MDX (`next-mdx-remote` + `gray-matter`) for blog posts and member profiles
- **Animation:** GSAP (`@gsap/react`)
- **Validation:** Zod + React Hook Form
- **UI:** Lucide icons, Yet Another React Lightbox
- **Package manager:** pnpm

## Key Features
- **Home:** Landing page for the association
- **Activities:** Dynamic blog section for school updates, powered by MDX content files
- **Members:** Alumni directory with member profiles managed via MDX content files
- **Contact:** Contact page with validated form (Zod + React Hook Form)
- **SEO:** Auto-generated `sitemap.ts` and `robots.ts`

## Getting Started

Follow these steps to run the project locally

### Prerequisites
Ensure you have the following installed:
- Node.js (v20.x or higher)
- pnpm (the project's package manager — install with `corepack enable` or `npm install -g pnpm`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ekoboy2men/ekoboy2men.git
   ```

2. Change into the project directory:
   ```bash
   cd ekoboy2men
   ```

3. Install the dependencies:
   ```bash
   pnpm install
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Other scripts
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint

## Project Structure
```
src/
├── app/        # App Router pages, layout, sitemap & robots
├── content/    # MDX content (activities/, members/)
├── lib/        # Shared utilities/helpers
├── schemas/    # Zod schemas (types derived via z.infer)
├── styles/     # Global & component SCSS
└── ui/         # Reusable UI components
```

### Adding content
- **Activity post:** add an `.mdx` file to `src/content/activities/` (with frontmatter)
- **Member profile:** add an `.mdx` file to `src/content/members/` (with frontmatter)

## Support

For handovers, maintenance inquiries, or bug reports, please contact:
* **Developer/Agency:** Enigmatic Dev [joseph123duro@gmail.com]
* **Association Contact:** [Eko Boys 2 Men] ([Client Admin Email])