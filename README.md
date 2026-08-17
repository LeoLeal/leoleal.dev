# leoleal.dev

[![Build](https://img.shields.io/badge/build-not%20configured-6c757d)](#development)
[![Deployment](https://img.shields.io/website?url=https%3A%2F%2Fleoleal.dev&label=deployment)](https://leoleal.dev)

Personal website for Leonardo Leal's professional story, selected work, and frontend expertise.

## Direction

- Astro with strict TypeScript and no client UI framework
- Semantic HTML, modern CSS, and native browser APIs
- Pen design system with responsive light and dark themes
- Contentful as the editorial source, fetched during static builds
- en-GB at `/` and pt-BR at `/pt-br/`
- WCAG 2.2 AA, locale-aware metadata, and JSON-LD
- GitHub Pages deployment at [leoleal.dev](https://leoleal.dev)

The repository contains a minimal Astro scaffold with one layout, one home route, and a shared global design-system foundation. The legacy Jekyll files remain as migration references.

## Development

Requirements: Node.js 24.16.0 and pnpm 11.22.0.

```sh
corepack enable
pnpm install
pnpm dev
```

| Command             | Purpose                                 |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start the development server            |
| `pnpm build`        | Build the static site                   |
| `pnpm format`       | Format supported files with Prettier    |
| `pnpm format:check` | Check formatting without changing files |
| `pnpm preview`      | Preview the production build            |

## Sources Of Truth

- `design/leoleal.dev.pen`: visual design and design tokens; access it through Pen tooling.
- Contentful: future source for published career history, projects, and localized editorial content.
- Google Fonts: runtime source for Newsreader, Geist, and IBM Plex Mono; resilient local font stacks keep content readable when it is unavailable.
- `openspec/config.yaml`: context and constraints for explicitly requested OpenSpec work.

## Deployment

The target is a static GitHub Pages deployment. When CI and Contentful integration are introduced, publishing content should trigger a rebuild without exposing credentials to browser code.

Keep this README and both status badges aligned with changes to package scripts, runtime requirements, CI, Contentful configuration, or deployment status.
