## 1. Atom Foundation

- [x] 1.1 Create the `src/components/atoms/` structure and colocated token-led styles for the Pen-defined control dimensions, typography, borders, radii, and themes.
- [x] 1.2 Implement non-interactive Tag and ImageNumberBadge atoms with typed text props and semantic, locale-safe markup.

## 2. Button Atom

- [x] 2.1 Implement the typed Button API for primary and secondary variants, rounded state, action or link semantics, labels, accessible names, and named SVG icon slots.
- [x] 2.2 Implement Button content with a flex layout that orders leading icon, label, and trailing icon using design tokens.
- [x] 2.3 Implement and validate the square 1:1 icon-only state for rounded and non-rounded buttons, including its accessible-name requirement.

## 3. Compact Select Atom

- [x] 3.1 Implement CompactSelect as a typed custom dropdown with caller-provided options, initial selection, and a hidden form value.
- [x] 3.2 Implement pointer, keyboard, focus, selection, outside-click, and custom-event behaviour for the custom dropdown.
- [x] 3.3 Style the trigger, anchor-positioned menu, options, selected option, and dark-mode states against the Pen definitions.

## 4. Home Page Showcase

- [x] 4.1 Showcase Tag, ImageNumberBadge, CompactSelect, and every Button variant and rounded or icon-only modifier combination on the home page.

## 5. Verification

- [x] 5.1 Review each atom in light and dark themes at supported responsive sizes, including English and Brazilian Portuguese label content.
- [x] 5.2 Manually verify custom dropdown semantics, keyboard focus and navigation, initial and changed selected-value updates, icon-only Button accessible names, contrast, and reduced-motion compatibility because no browser-test harness exists.
- [x] 5.3 Run `pnpm format:check`.
- [x] 5.4 Run `pnpm build`.
