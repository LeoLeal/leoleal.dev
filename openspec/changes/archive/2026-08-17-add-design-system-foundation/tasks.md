## 1. Token Foundation

- [x] 1.1 Re-read `design/leoleal.dev.pen` through Pen tooling and record the current stable colour, typography, spacing, radius, and responsive-threshold mapping before writing CSS.
- [x] 1.2 Create `src/styles/tokens.css` with semantic custom properties for the stable non-colour Pen tokens, using rem-based dimensions, unitless line heights, relative tracking, and documented Pen-to-CSS names.
- [x] 1.3 Add the validated light and dark semantic colour properties, system `prefers-color-scheme` resolution, matching `color-scheme` values, and future `data-theme="light"` and `data-theme="dark"` root overrides.
- [x] 1.4 Add the mobile-first page-gutter token and expose Pen query thresholds as em breakpoint custom properties while retaining literal query conditions required by CSS.

## 2. Global CSS Behaviour

- [x] 2.1 Create `src/styles/global.css` as the single global entry point, import the token layer first, and establish an explicit reset/base/transition cascade order.
- [x] 2.2 Add a conservative logical-property reset and base typography, colour, form-control, link, wrapping, selection, and replaced-media defaults without removing native semantic affordances.
- [x] 2.3 Add visible `:focus-visible` treatment and reduced-motion rules that preserve keyboard operability, WCAG 2.2 AA contrast, and functional fallbacks.
- [x] 2.4 Add the full-width `.site-canvas` rule with a 1920px maximum inline size, logical centring, a named inline-size query context, and container-query-driven gutter changes.
- [x] 2.5 Add progressive native cross-document View Transition CSS with restrained root behaviour and reduced-motion suppression, without adding a client router or JavaScript dependency.
- [x] 2.6 Audit the new styles for physical geometry properties and unjustified viewport queries or viewport-relative units; replace them with logical, intrinsic, or container-relative equivalents.

## 3. Astro Layout Integration

- [x] 3.1 Add Google Fonts preconnect hints and one combined `display=swap` stylesheet request for the required Newsreader, Geist, and IBM Plex Mono weights and en-GB/pt-BR glyph coverage.
- [x] 3.2 Import `src/styles/global.css` once from `Layout.astro` and wrap the layout slot in the non-semantic `.site-canvas` boundary without changing the slot's semantic content.
- [x] 3.3 Confirm the existing route inherits the global colours and typography and remains usable when Google Fonts is blocked.
- [x] 3.4 Update `README.md` to identify Google Fonts as a runtime visual dependency and keep commands, requirements, deployment notes, and badges unchanged unless verification shows they are affected.

## 4. Responsive, Theme, And Accessibility Verification

- [x] 4.1 Compare implemented CSS values with the latest Pen tokens and re-check documented foreground/background combinations in both themes for WCAG 2.2 AA contrast.
- [x] 4.2 Verify system light and dark preferences and manually exercise both future root theme attributes to confirm all consumers switch without component-specific overrides.
- [x] 4.3 Verify the canvas and gutters at 390px, 834px, 1440px, 1920px, and above 1920px, including exact 1920px centring and no unintended horizontal overflow.
- [x] 4.4 Verify container-responsive behaviour independently of viewport size and confirm the mobile intrinsic layout remains functional when container queries are unavailable.
- [x] 4.5 Check keyboard focus, 200% zoom, reduced motion, constrained media, and representative en-GB and pt-BR text including Portuguese diacritics.
- [x] 4.6 Confirm the shared layout changes do not alter route titles, descriptions, locale declarations, canonical or social metadata, or structured-data accuracy.

## 5. Project Verification

- [x] 5.1 Run `pnpm format` on the changed supported files and review the resulting diff for unintended edits.
- [x] 5.2 Run `pnpm format:check` and resolve every reported formatting issue.
- [x] 5.3 Run `pnpm build` and confirm the static production output includes the global stylesheet and valid font resource links without introducing client framework code.
