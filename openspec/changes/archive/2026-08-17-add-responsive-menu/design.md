## Context

See proposal.md for motivation. The current `Menu.astro` contains only an empty `nav`, while `Layout.astro` already places it as a direct child of the 1920px-capped page canvas. Button and CompactSelect provide most control semantics, but Button has no tertiary variant or styling hook, CompactSelect defaults below its trigger, and no locale-label or theme-persistence infrastructure exists.

The Pen file defines separate full-width and floating states at 1440px and 834px plus an always-floating 390px bottom toolbar in light and dark themes. It also shows that the same chrome must support a home context with the Leonardo Leal brand and a non-home context with a back control and page-specific navigation.

## Goals / Non-Goals

**Goals:**

- Preserve one Menu component and one navigation landmark while allowing page context to replace leading content and navigation through named slots.
- Match the Pen state hierarchy, spacing, and control dimensions while allowing the floating Menu container to be sized entirely by its visible children.
- Keep Menu composition atom-only and framework-free, with native scripts limited to scroll-state presentation and the ThemeSwitcher child.
- Establish reusable locale-label and content-ownership conventions for subsequent features.

**Non-Goals:**

- Implement the Vector Search overlay, search results, or Contentful-backed search.
- Implement search activation, keyboard shortcuts, custom events, navigation-selection routing, or other Menu-owned element functionality.
- Build the About Me, Journey, employer, or project page content.
- Introduce client routing, a UI framework, a CMS model, or a new package.
- Generalize the menu into a site-wide schema for page data that does not yet exist.

## Decisions

### Use a slot-driven Menu with stable internal chrome

`Menu.astro` will own the `nav`, responsive wrappers, localized presentation, optional search presentation, and scroll-state styling. It will compose existing Button and CompactSelect atoms directly rather than introduce child wrappers. A named leading slot will fall back to the Leonardo Leal brand and accent dot; non-home callers can replace it with a tertiary back Button. A navigation slot will accept page-specific wide and compact atom content, with home links as fallback content. The Menu will expose `showSearch` and locale inputs rather than infer behavior from URLs. ThemeSwitcher will be its only newly developed child component.

Slot content will use documented wide, compact, and mobile presentation hooks where a destination needs different visible labels or a CompactSelect at smaller sizes. This preserves caller ownership of route-specific destinations while letting Menu own breakpoint visibility and ordering.

Passing an array of navigation records was considered. It would make automatic select generation easier, but it would couple the shared chrome to page navigation data before project routes and their data model exist. Multiple menu variants were also rejected because the user-facing structure and responsive state machine are shared.

### Forward a styling hook through Button and add tertiary styling

Button will accept and merge a caller class with its internal classes. Menu can then collapse the back and contact labels at its own container breakpoints while Button retains native link/button selection, spacing, icon validation, and accessible-name rules. Tertiary will retain the atom's control dimensions and icon slots but remove border and fill, use text color, and underline its label on hover.

Duplicating separate desktop and mobile controls was rejected because it duplicates destinations and accessible controls in the DOM and complicates focus and state continuity.

### Drive responsive composition from the page-canvas container

The Menu will use mobile-first styles and container queries against the existing site canvas for content composition. The mobile fixed position genuinely depends on the viewport, so viewport positioning and safe-area environment values are appropriate there. Tablet begins at 48em and desktop composition changes at 80em, matching the existing token thresholds and Pen frames.

The full-width desktop and tablet state will fill the page canvas. The floating Menu will use `inline-size: auto`, with no fixed, preferred, minimum, or maximum floating endpoint. Its visible children, gaps, and inline padding will establish its intrinsic size, while a separate full-inline-size positioning wrapper centres it without stretching it. Responsive child substitutions and compact localized labels, rather than a container width, are responsible for fitting smaller layouts. Mobile page-end padding will reserve the toolbar height, bottom gap, and safe-area inset.

### Use a discrete scroll state with CSS transitions

A small passive scroll handler will update a data attribute only when the root scroll position crosses a short threshold. CSS will transition the bar's inline size, block size, radius, border, backdrop, shadow, offset, and relevant content visibility between top and floating states. `interpolate-size: allow-keywords` will enable interpolation from the full-width value to the floating `inline-size: auto` endpoint in supporting browsers. Browsers without intrinsic-size interpolation will switch directly to `auto`; they will not receive a fixed fallback width. The DOM and tab order remain stable. The initial state will be synchronized on script startup so restored scroll positions render correctly.

CSS scroll-driven animation was considered, but a discrete state better matches the two Pen states and provides more consistent support. An observer sentinel was rejected because a sentinel inside a sticky element does not reliably represent document scroll position. Reduced-motion rules will remove transition animation without removing the sticky state change.

### Keep mobile permanently floating at the viewport bottom

Below 48em, the Menu will bypass scroll-state styling and use a fixed floating pill with `inline-size: auto` near the viewport block-end. A separate positioning wrapper will centre it and account for `safe-area-inset-bottom` without prescribing the pill's inline size. The Menu will raise its stacking context above page content and select menus. The home fallback brand and wide links will be hidden; custom back content will collapse to its icon; page-specific links will expose their CompactSelect form; contact will collapse to its mail icon; and search will use its shortest localized label without shortcut text.

CompactSelect will gain an explicit block-start placement option implemented with logical absolute positioning first and CSS anchor positioning as enhancement. Menu will not interpret its values or subscribe to `compact-select:change`; destination handling remains caller-owned future work.

### Centralize labels in typed locale modules

Separate en-GB and pt-BR modules will export the same typed Menu label shape, including full, compact, short, and accessible action strings. A narrow locale resolver will map the Layout language to one of those modules and fail at build time if either locale omits a required key. Route-specific editorial or project labels remain caller-owned but follow the same per-locale-file rule.

Embedding default English in component fallbacks was rejected because it would create a second source of truth and make missing Portuguese labels invisible during development.

### Implement ThemeSwitcher with a root iris transition

A dedicated `ThemeSwitcher.astro` child will be the only new functional component inside Menu. A small inline head initializer in the shared Layout will read the stored explicit theme before rendering and apply it to the root element; absent a stored value, CSS continues to follow `prefers-color-scheme`. ThemeSwitcher will toggle and persist the explicit value, switch the sun/moon presentation, and update its localized action label. Storage access will be guarded so blocked storage does not break the control.

On activation, ThemeSwitcher will calculate the control centre and the radius required to reach the viewport's furthest corner, expose those values as temporary CSS custom properties, and call `document.startViewTransition()` around the root theme mutation. The old root snapshot will remain stable while `::view-transition-new(root)` animates `clip-path` from a zero-radius circle at the control to the calculated covering circle. Revealing the incoming snapshot uses the same opening-iris direction for light-to-dark and dark-to-light changes.

View-transition pseudo-elements will use normal blending and suppress default root fades so the circular reveal is the only theme animation. If the API is unavailable, storage fails, or reduced motion is requested, ThemeSwitcher will apply the theme immediately and remain fully operable. Theme persistence and first-paint initialization remain independent of animation support.

Keeping theme initialization only in the Menu body was rejected because it can visibly repaint after first render. A cross-fade was rejected because it does not match the requested opening-iris interaction. Storing system-derived values was rejected because it would prevent future system preference changes from taking effect when the visitor has not made an explicit selection.

### Do not implement Menu element functionality

Search, back, contact, and navigation selection will be composed from atoms and slots without Menu-owned click handlers, keyboard shortcuts, custom events, routing, dialog relationships, or overlays. Native `href` behavior supplied to Button and existing atom-owned CompactSelect behavior remain intact. The search shortcut shown by the desktop design is a visual hint only in this change and will not register a document shortcut.

Creating SearchControl, BackControl, ContactControl, or navigation wrapper components was rejected because existing atoms already provide the required semantics and styling primitives. Functionality can be added by the feature that owns each destination or overlay without expanding Menu's responsibilities.

### Record content ownership in guidance and specification

AGENTS.md and `openspec/config.yaml` will state that Contentful owns only About Me and Journey editorial content, fetched at build time. Shared interface labels live in separate locale modules, while other content remains code-owned unless a future approved change expands the CMS boundary. README will be updated if its existing broad Contentful description conflicts with this boundary.

## Risks / Trade-offs

- [Slotted content could omit a required compact representation] -> Document the slot hooks and verify the home fallback plus a representative non-home composition at all breakpoints.
- [Portuguese strings or browser zoom could make the intrinsic toolbar wider than the available viewport] -> Use localized compact labels and responsive child substitutions, then test pt-BR at 200% zoom without constraining the floating container's inline size.
- [A fixed mobile toolbar can obscure content or browser UI] -> Reserve page-end clearance and include safe-area inset handling.
- [Scroll events can create unnecessary work] -> Use a passive listener, compare only against the threshold, and mutate the DOM only when the boolean state changes.
- [Theme storage or View Transitions can be unavailable] -> Guard storage and API access, retain system-preference behavior, and apply theme changes immediately when iris animation is unavailable.
- [A large iris radius can cause expensive painting] -> Animate only the root snapshot clip-path for a short duration and verify performance at the largest supported viewport.
- [Menu controls intentionally have no feature behavior yet] -> Preserve atom semantics without misleading ARIA contracts and leave actions to their owning future changes.

## Migration Plan

1. Add locale-label modules and token additions without changing rendered pages.
2. Extend Button and CompactSelect while preserving their current defaults and callers.
3. Implement atom-only Menu composition, ThemeSwitcher and theme initialization, then pass locale and menu configuration through Layout.
4. Add mobile page-end clearance and update repository/OpenSpec content guidance, plus README where needed.
5. Verify both locales, themes, breakpoints, scroll states, and accessibility before deployment.

Rollback removes the populated Menu and theme initializer and restores the empty navigation placeholder. The atom additions are backward-compatible and can remain unused; no persisted data requires migration beyond ignoring the optional theme preference.
