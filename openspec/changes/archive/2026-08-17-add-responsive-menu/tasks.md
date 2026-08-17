## 1. Locale And Token Foundations

- [x] 1.1 Add typed, separate en-GB and pt-BR interface-label modules containing the Menu's full, compact, short, and accessible labels, plus a locale resolver with exhaustive key checking.
- [x] 1.2 Add any missing semantic navigation dimension, elevation, backdrop, stacking, and mobile-clearance tokens from the Pen design without duplicating existing token values.

## 2. Atom Extensions

- [x] 2.1 Extend Button with a merged consumer styling hook and tertiary variant while preserving native link/button behavior, icon validation, existing variants, disabled behavior, and focus treatment.
- [x] 2.2 Add CompactSelect block-start placement with logical absolute fallback and CSS anchor enhancement, preserving existing selection events and keyboard interactions.
- [x] 2.3 Update the atom showcase to exercise the tertiary Button and block-start CompactSelect without embedding locale-owned Menu labels in the showcase components.

## 3. Menu Composition

- [x] 3.1 Implement the single Menu navigation landmark with localized accessible naming, default Leonardo Leal brand, replaceable leading slot, caller-provided atom navigation slot, `showSearch` presentation configuration, ThemeSwitcher, and contact Button atom; do not create other child control components.
- [x] 3.2 Add documented wide, compact, and mobile presentation hooks for slotted page navigation, including compact tablet labels, icon-only mobile back/contact controls, and mobile CompactSelect navigation.
- [x] 3.3 Implement mobile-first styling with a separate centring and safe-area positioning wrapper around a fixed bottom pill using `inline-size: auto`, then add tablet and desktop full-width sticky states that transition to the same intrinsic endpoint with `interpolate-size: allow-keywords`, no prescribed floating width, and a direct-to-auto fallback.
- [x] 3.4 Reserve sufficient mobile page-end clearance so final content and the footer can scroll beyond the fixed toolbar without changing the page-shell landmark order.

## 4. Menu Presentation And Theme

- [x] 4.1 Add the passive threshold-based scroll-state controller and CSS transitions between desktop/tablet top and floating states, including startup synchronization and reduced-motion behavior.
- [x] 4.2 Compose localized search, back, contact, and navigation selection from existing atoms without Menu-owned action handlers, keyboard shortcuts, custom events, routing, overlay behavior, or additional child control components.
- [x] 4.3 Develop ThemeSwitcher as the sole new Menu child component, including guarded pre-render initialization, system preference fallback, explicit persistence, icon and localized name updates, and immediate operation when storage or View Transitions are unavailable.
- [x] 4.4 Implement the ThemeSwitcher root view transition using the control centre and furthest-corner radius to animate the incoming light or dark snapshot from a zero-radius circle to a viewport-covering opening iris; remove default root fades and disable the iris for reduced motion.
- [x] 4.5 Pass the active locale and Menu configuration through Layout while preserving Menu as a direct page-canvas child and retaining the existing hero, main, and Footer sibling order.

## 5. Content Ownership Guidance

- [x] 5.1 Update AGENTS.md to state that Contentful owns only localized About Me and Journey editorial content and that reusable interface labels belong in separate en-GB and pt-BR source files.
- [x] 5.2 Update `openspec/config.yaml` context and artifact rules with the same Contentful and interface-label boundaries for future proposals, designs, specifications, and tasks.
- [x] 5.3 Update README Contentful and localization descriptions where they conflict with the narrowed content boundary; leave commands, requirements, deployment notes, and badges unchanged unless implementation affects them.

## 6. Verification

- [x] 6.1 Verify home defaults at 390px, 834px, 1440px, 1920px, and above 1920px, including top, scrolled, restored-scroll, and mobile fixed states. Defer representative slotted non-home verification to the change that introduces a non-home route.
- [x] 6.2 Verify en-GB and pt-BR full and compact labels in light and dark themes at 200% zoom, including no overflow, safe-area/page-end clearance, Pen token fidelity, and WCAG 2.2 AA contrast.
- [x] 6.3 Verify keyboard order, visible focus, native atom semantics, icon-only accessible names, CompactSelect opening above the toolbar, theme persistence, system/storage/API fallbacks, and reduced-motion handling without Menu-owned control functionality.
- [x] 6.4 Verify the opening iris originates at ThemeSwitcher, fully covers the largest supported viewport, reveals both incoming themes in the same direction, suppresses default root fades, and falls back to an immediate theme change when required.
- [x] 6.5 Confirm the change does not add search events or shortcuts, routing handlers, a search overlay, browser-side Contentful credentials or requests, dependencies, extra child control components, duplicate navigation landmarks, metadata regressions, or structured-data claims unsupported by visible content.
- [x] 6.6 Run `pnpm format:check` and resolve all formatting failures.
- [x] 6.7 Run `pnpm build` and resolve all strict TypeScript and Astro build failures.
