# Repository Guidelines

## Project Structure & Module Organization
Astro drives everything under `src`: route-level `.astro` files reside in `src/pages`, shared shells in `src/layouts`, and UI widgets or SEO helpers in `src/components`. Content goes to `src/content`, structured data exports to `src/data`, and helpers/utilities to `src/utils`. Tailwind utilities live in `src/styles` with global tokens defined in `tailwind.config.mjs`. Keep static assets in `public`; root-level configs (`astro.config.mjs`, `biome.json`, `tsconfig.json`) should change only when the whole project benefits.

## Build, Test, and Development Commands
- `bun install`: install dependencies pinned in `bun.lockb`.
- `bun run dev` (or `bun run start`): launch Astro’s dev server with hot reload.
- `bun run build`: run `astro check` then create the production build in `dist`.
- `bun run preview`: serve the `dist` output locally for smoke-testing before deploy.
- `bun run check` / `bun run lint`: run Biome static analysis across `src`.
- `bun run format`: apply Biome formatting (write mode) to the whole tree.

## Coding Style & Naming Conventions
TypeScript modules and `.astro` files export `camelCase` helpers and PascalCase components; file names stay kebab-case (`src/components/cards/writing-item.astro`). Preserve whatever indentation a file already uses (tabs for wrappers, two spaces inside). Path aliases (`@components`, `@data`, `@utils`) exist in `tsconfig.json`—use them. Biome is the source of truth for formatting, unused import cleanup, and linting, so run it before you push.

## Testing Guidelines
There is no standalone test runner yet, so treat `bun run build` and `bun run preview` as the acceptance gate. When adding content, confirm generated RSS/MDX renders by loading the relevant route locally. New cards or layouts should include visual regression notes or screenshots in the PR, and data files should keep deterministic ordering (sort arrays before export) to avoid churn.

## Commit & Pull Request Guidelines
Recent history shows short, type-led messages (`feat: ...`), so stick to `<type>: <concise summary>` with types such as `feat`, `fix`, `chore`, or `docs`. Commits should remain focused on one change-set (code, content, or config). Pull requests need: a high-level description, testing notes (`bun run build`, `bun run lint`), and screenshots/GIFs whenever UI changes. Link issues when applicable and call out any config changes for reviewers.

## Security & Configuration Tips
Never commit `.env`; analytics keys (`UMAMI_WEBSITE_ID`, `UMAMI_TRACKING_URL`, `CLARITY_TRACKING_ID`) go there and are read in `src/components/seo/base-head.astro`. If you touch deployment settings, ensure Cloudflare-specific flags in `astro.config.mjs` stay aligned with production. Remove debug logging before requesting review.
