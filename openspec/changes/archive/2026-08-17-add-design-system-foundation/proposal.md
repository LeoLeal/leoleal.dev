## Why

The Astro scaffold has no shared visual foundation, so it cannot consistently consume the authoritative tokens and responsive rules in `design/leoleal.dev.pen`. Establishing the foundation now prevents page and component work from introducing duplicated values, incompatible theme behaviour, or inaccessible defaults.

## What Changes

- Add a global CSS foundation that maps stable Pen colour, typography, spacing, radius, and breakpoint values to semantic custom properties.
- Load Newsreader, Geist, and IBM Plex Mono from Google Fonts and expose resilient fallback stacks.
- Apply system-preference light and dark themes while defining a CSS contract that can support an explicit theme switch later without changing token consumers.
- Add a minimal reset and accessible document defaults for typography, controls, links, focus, media, selection, zoom, and reduced motion.
- Establish mobile-first layout tokens, including responsive page gutters and a canvas that remains full-width through 1920px before becoming a centred 1920px maximum-inline-size container.
- Require logical CSS properties, intrinsic sizing, and container queries or container-query units for container-responsive behaviour; viewport-relative units remain exceptional and limited to genuine viewport constraints.
- Establish native View Transition API behaviour as progressive enhancement with reduced-motion handling and functional fallbacks.
- Import the foundation through the shared Astro layout so existing and future routes consume it once.
- Keep component styling, a persisted theme toggle, complete page composition, Contentful integration, and rich-text styling out of this change.

## Capabilities

### New Capabilities

- `design-system-foundation`: Defines the global design tokens, theme contract, responsive canvas, CSS conventions, typography delivery, accessibility defaults, and progressive transition behaviour used by the site.

### Modified Capabilities

None.

## Impact

- Affects the shared Astro layout and introduces global style resources; no public API or content model changes are required.
- Adds runtime requests to Google Fonts but no package dependency and no browser exposure of Contentful credentials.
- Establishes locale-compatible font stacks and presentation shared by both en-GB and pt-BR routes without adding or duplicating editorial copy.
- Improves accessibility defaults and formalizes the WCAG 2.2 AA palette contract, focus visibility, reduced-motion behaviour, and zoom-resilient sizing.
- Does not change metadata, structured data, canonical URLs, deployment topology, or Contentful build-time boundaries.
