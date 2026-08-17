## Why

The site layout currently exposes only one undifferentiated content slot, so pages cannot declare hero and primary-content regions independently. A stable composition contract is needed before page-level components are introduced.

## What Changes

- Replace the layout's single default content region with empty named `hero` and `main` regions.
- Render a fixed Menu component before both page-supplied regions and a fixed Footer component after them.
- Add placeholder Menu and Footer components with their own semantic navigation and footer roots.
- Keep all four regions as direct siblings in the page canvas; the layout will not add `header`, `main`, or other wrappers around either slot.
- Require main-slot content to supply the page's sole `main` landmark when one is needed.

## Capabilities

### New Capabilities

- `page-layout`: Defines the shared Astro page-composition contract, named slots, fixed chrome, and semantic-boundary responsibilities.

### Modified Capabilities

- None.

## Impact

- Affects `src/layouts/Layout.astro`, the homepage's layout invocation, and new components under `src/components/`.
- The layout contract applies consistently to both supported locale routes; no Contentful query or published copy changes are required.
- The change establishes semantic landmark ownership for accessibility but does not add visual tokens, SEO metadata, structured data, dependencies, or deployment changes.
