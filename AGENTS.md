# Agent Guidelines

## Purpose

- `leoleal.dev` tells Leonardo Leal's professional story and demonstrates frontend expertise.
- The Astro site will replace the Jekyll implementation. Treat root `index.md` and `_config.yml` as migration references unless explicitly working on the legacy site.

## Stack

- Use Astro, strict TypeScript, pnpm, semantic HTML, modern CSS, and native browser APIs.
- Use versions and scripts pinned in `package.json`; do not introduce React, Vue, Svelte, or another UI framework.
- Prefer static output and minimal client JavaScript. Contentful content is fetched at build time and publishing triggers a rebuild.

## Design And UI

- `design/leoleal.dev.pen` is authoritative for visual design and design tokens.
- Access or edit `.pen` files only through Pen tooling; never treat them as plain text.
- Map Pen tokens to semantic CSS custom properties. Reuse tokens instead of hardcoding equivalent values.
- Keep the page canvas full-width through a 1920px viewport. Above 1920px, constrain it to a centred 1920px maximum inline size.
- Build mobile-first layouts for all Pen breakpoints and support both light and dark themes.
- Use modern CSS logical properties such as `inline-size`, `block-size`, and `padding-inline-start` instead of physical properties such as `width`, `height`, and `padding-left`.
- Avoid viewport-relative units unless they are necessary for a genuine viewport constraint. Prefer intrinsic sizing, container queries, and container query units for container-responsive rules; reserve viewport media queries and units for behaviour that truly depends on the viewport.
- Use the native View Transition API when it provides meaningful continuity, as progressive enhancement, while preserving reduced-motion support and functional fallbacks.
- Meet WCAG 2.2 AA. Prefer native elements over ARIA and preserve keyboard, focus, contrast, reduced-motion, and zoom support.

## Content And Discovery

- Contentful is the source of truth for published editorial content. Do not duplicate CMS copy across components.
- Support en-GB at `/` and pt-BR at `/pt-br/`; keep routes, links, metadata, and CMS queries locale-aware.
- Every indexable page needs a unique title and description, canonical URL, hreflang links, social metadata, and suitable JSON-LD.
- Structured data must describe visible, accurate content. Never expose Contentful credentials to browser code.

## Code Quality

- Keep components focused and APIs typed. Apply DRY and SOLID pragmatically without premature abstractions.
- Prefer HTML and CSS over JavaScript, and prefer platform APIs over dependencies.
- Keep styles token-led, maintainable, and colocated at the narrowest useful scope.
- Format supported files with Prettier through `pnpm format`; respect `.prettierignore`.

## Workflow

- Use pnpm only. Required completion checks are `pnpm format:check` and `pnpm build`.
- Keep `README.md`, its Build/Deploy badges, commands, requirements, and deployment notes current as the project evolves.
- Use OpenSpec only when the user explicitly requests its workflow.
- Use Commitizen-style Conventional Commits, for example `feat(i18n): add Portuguese profile route`.
