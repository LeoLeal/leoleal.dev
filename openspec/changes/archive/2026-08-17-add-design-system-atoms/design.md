## Context

See `proposal.md` for motivation. The repository already exposes the Pen-derived colour, typography, spacing, radius, and responsive tokens globally, but it has only empty shared chrome components and no primitive UI components. The Pen ATOMS group defines a 40px universal button, 32px skill tag, 28px image-number badge, and 40px compact select; it depicts button variants as one component family.

## Goals / Non-Goals

**Goals:**

- Add a focused, framework-free atom layer that pages can compose without recreating control styles.
- Preserve native semantics, keyboard interaction, focus treatment, themes, and responsive behaviour.
- Translate the Pen button variants into one maintainable component API and shared flex layout.

**Non-Goals:**

- Adding a client-side component framework, icon dependency, general-purpose popover system, theme switcher, or CMS model.
- Building molecules, automated test infrastructure, automated visual-regression infrastructure, or new product content.

## Decisions

### Colocated Astro atoms and CSS

Create `src/components/atoms/` with one focused Astro component per Pen atom and styles colocated at that layer. Components consume existing semantic custom properties instead of adding equivalent hard-coded values.

Alternative considered: a global component stylesheet. Rejected because atom styles are only relevant to their owning components and colocation keeps future changes focused.

### One polymorphic Button component

`Button.astro` accepts a primary or secondary variant, a `rounded` boolean modifier, an optional `href`, label content, and an accessible-name prop. It emits an anchor when `href` exists and otherwise emits a button, preserving native semantics without a separate visual duplicate.

The component exposes named `leading`, `trailing`, and `icon` slots for caller-supplied inline SVG. Decorative SVGs remain hidden from the accessibility tree unless callers deliberately provide semantic icon content. A label-less Button using the sole `icon` slot receives its accessible name from the required prop.

Alternative considered: separate primary, secondary, pill, and icon components. Rejected because the Pen depicts them as state combinations of one universal atom and separate implementations would drift.

### Flex content layout and icon-only sizing

Button content uses a flex container with centred cross-axis alignment and the spacing token between occupied leading, label, and trailing regions. Labelled buttons use the Pen's horizontal padding; a label-less Button with exactly one icon uses fixed control dimensions plus `aspect-ratio: 1`, centres the icon, and does not retain label padding. Radius selection remains independent of this sizing rule.

Alternative considered: separate icon-only markup with absolute positioning. Rejected because it duplicates structure and is less maintainable than a single flex layout.

### Custom CompactSelect dropdown

`CompactSelect.astro` renders a native button trigger, a `listbox` menu, and option buttons from typed caller-provided data. The menu uses a unique CSS anchor on its trigger for placement, with absolute positioning retained as a fallback. A small native browser script manages opening, selection, keyboard navigation, focus return, and outside-click dismissal. The component accepts an initial value or selected option, emits `compact-select:change` after a selection, and accepts `compact-select:select` events for programmatic selection. A hidden input preserves form submission semantics without depending on browser-specific select picker styling.

Alternative considered: a native select with `appearance: base-select`. Rejected because the design requires reliable control over the trigger, picker, option, and active states across supported browsers.

### Manual verification boundary

The repository has no automated browser-test harness. This change therefore verifies interactive dropdown behaviour through implementation review and manual browser checks, while retaining `pnpm format:check` and `pnpm build` as automated completion checks.

### Static icon supply

Atoms do not install an icon library. Consumers provide inline SVG through named slots, enabling the static Astro site to use only the icons each page needs.

Alternative considered: a dependency-backed icon component. Rejected because it adds a dependency for a small, caller-owned content concern.

## Risks / Trade-offs

- [Custom dropdown interaction is more complex] -> Use native button and listbox semantics with explicit keyboard, focus, and outside-click handling.
- [Interactive behaviour has no automated coverage] -> Keep manual verification explicit until the project adopts a browser-test harness.
- [Slot combinations can create unlabeled icon buttons] -> Validate the icon-only state through typed props and render-time checks, requiring an accessible name before rendering it.
- [Consumer-provided SVG may be announced redundantly] -> Document decorative SVG expectations and retain a component-level accessible-name path.
- [Pen dimensions may not cover long localized labels] -> Use intrinsic inline sizing, logical padding, and normal text flow rather than fixed label widths.

## Migration Plan

1. Add the atom components without replacing existing page content, so the static site continues to build unchanged.
2. Adopt the atoms incrementally in future or subsequent component changes.
3. Roll back by removing the new atom imports; no persisted data, routes, CMS content, or build configuration changes are involved.
