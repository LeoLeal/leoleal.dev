## Why

The shared page shell currently renders an empty navigation landmark, so it does not provide the responsive, localized, theme-aware navigation defined in the authoritative Pen design. Implementing the menu now also establishes the content ownership boundary needed before page and Contentful work expands.

## What Changes

- Add one slot-driven Menu component that defaults to the Leonardo Leal brand on the home page and accepts replacement leading content, such as a back control, on other pages.
- Compose caller-provided page navigation, optional search affordance, back and contact actions from design-system atoms without adding Menu-owned functionality to those elements.
- Render a full-width sticky menu at the top of desktop and tablet layouts, animate it into a centred floating pill after scrolling, and render it as an always-floating fixed bottom toolbar on mobile.
- Size every floating menu intrinsically from its visible children at `inline-size: auto`, using modern CSS intrinsic-size interpolation to animate from the full-width state without prescribing a floating width.
- Adapt labels and controls at Pen breakpoints: compact tablet labels, mobile project selection, icon-only back and contact controls, and progressively shorter search copy without the desktop shortcut.
- Add per-locale interface-label modules for en-GB and pt-BR and keep component markup free of embedded translated labels.
- Extend Button with a tertiary link-like variant and ensure CompactSelect can open accessibly above a fixed bottom toolbar.
- Add ThemeSwitcher as the Menu's only new child component, persisting light/dark choice and using the View Transition API to reveal either theme through an opening circular iris mask with accessible fallbacks.
- Keep search, navigation selection, back, and contact behavior outside Menu; do not add search events, keyboard shortcuts, routing handlers, overlays, or other element functionality in this change.
- Clarify in AGENTS.md and OpenSpec configuration that Contentful owns only the About Me and Journey editorial sections; interface labels and other site content remain code-local unless a later change explicitly revises the boundary.

## Capabilities

### New Capabilities

- `responsive-menu`: Defines the Menu composition API, responsive positioning and states, localization, atom-only controls, iris theme transition, and accessible presentation behavior.
- `content-sourcing`: Defines which content is sourced from Contentful and which content must remain in locale-specific code-owned modules.

### Modified Capabilities

- `design-system-atoms`: Adds a tertiary Button variant and fixed-bottom-compatible CompactSelect placement behavior.

## Impact

- Affects the shared Menu and Layout components, Button and CompactSelect atoms, design tokens, global mobile content clearance, and locale modules.
- Updates AGENTS.md and openspec/config.yaml to document localization and Contentful ownership for future work.
- Adds small native browser scripts only for Menu scroll state and ThemeSwitcher persistence/view transitions; no framework or package dependency is introduced.
- Preserves static output, GitHub Pages deployment, the 1920px page-canvas contract, existing metadata and structured data, and build-time-only Contentful access.
- Requires responsive, keyboard, focus, contrast, reduced-motion, both-theme, and both-locale verification in addition to formatting and build checks.
