## Context

See `proposal.md` for motivation and `specs/design-system-foundation/spec.md` for the behavioural contract. The current site has a shared `Layout.astro` and one unstyled route, but no global CSS, font delivery, theme mechanism, or page-canvas wrapper. The Pen file already defines the visual tokens and responsive compositions, including recently validated WCAG 2.2 AA core palettes.

The foundation must remain static-first and dependency-light. It also needs to give later components stable token and theme contracts without prematurely implementing the Pen component library.

## Goals / Non-Goals

**Goals:**

- Create one global style entry point with clear token and base-style ownership.
- Preserve traceability from Pen variables to semantic CSS properties.
- Make system light/dark preference work immediately while reserving an explicit theme override contract.
- Establish a logical, container-led responsive model and the 1920px page-canvas constraint.
- Provide conservative accessible defaults and progressive cross-document transitions.
- Keep font and stylesheet loading compatible with Astro's static output.

**Non-Goals:**

- Build CSS classes or Astro implementations for Pen atoms, molecules, or organisms.
- Add a theme control, persistence, or a pre-paint theme initialization script.
- Style Contentful rich text, complete the portfolio composition, or add pt-BR routing.
- Introduce a CSS framework, preprocessors, PostCSS plugins, a client router, or a JavaScript animation library.
- Automate Pen-to-CSS token generation in this change.

## Decisions

### Use a two-file CSS foundation with one layout import

Create `src/styles/tokens.css` for custom properties and theme overrides, and `src/styles/global.css` as the only stylesheet imported by `Layout.astro`. The global entry point imports tokens first, then defines reset, base, accessibility, canvas, and transition rules in an explicit cascade order.

This keeps token review separate from global element behaviour while preventing routes from choosing inconsistent import order. Component styles remain colocated in future Astro components.

**Alternative considered:** Put all rules in one stylesheet. This is initially smaller but makes authoritative token review harder as global and component concerns grow.

**Alternative considered:** Create reset, typography, layout, theme, utility, and transition files now. This adds structure before the project has enough CSS to justify it.

### Map Pen roles to semantic CSS properties rather than raw-value names

Use semantic global names such as `--color-surface`, `--color-surface-alt`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--font-display`, `--font-body`, `--font-utility`, and the Pen spacing and radius scale. `ink` maps to the clearer code role `text`; already-semantic Pen names remain recognizable.

Only stable foundation tokens are global. Hardcoded flag colours, image treatments, shadows, and component-only overrides in Pen do not become global tokens merely because they appear repeatedly. Future components may add private aliases such as `--button-background` that resolve to global semantic roles.

Numeric conversion follows these rules:

- Font sizes, spacing, and ordinary radii use `rem` values derived from the Pen pixel values at a 16px baseline.
- Line heights remain unitless.
- Tracking uses relative values appropriate to the typography role.
- The 1920px canvas ceiling remains an explicit pixel constraint because it is defined in CSS pixels rather than relative to the visitor's font preference.
- Pen breakpoint thresholds are exposed as `em` custom properties for shared documentation and tooling, then mirrored as literal values where used because custom properties cannot drive standard media or container-query conditions.

**Alternative considered:** Copy every Pen variable name and numeric value directly. This offers mechanical parity but exposes screen-specific title tokens and values that are not stable public CSS roles.

### Resolve system themes in CSS and reserve a root attribute override

Light values form the baseline. A `prefers-color-scheme: dark` query applies dark values only when the root has no explicit theme attribute. Explicit `data-theme="light"` and `data-theme="dark"` selectors define the future override contract now, but no control or persistence code writes that attribute in this change.

Token consumers always reference the same semantic properties:

```text
system preference ──┐
                    ├── root theme tokens ── component/page consumers
future data-theme ──┘
```

Set `color-scheme` consistently with the resolved theme so native controls and browser-provided surfaces match. Theme declarations change foreground and background roles together. The primary action contract remains accent background with surface-coloured content, preserving the corrected Pen contrast in both modes.

**Alternative considered:** Use only `prefers-color-scheme`. This is simpler but would force later token-selector restructuring when a theme control is added.

**Alternative considered:** Add persistence and a blocking initialization script now. That expands a CSS-foundation change into interactive state management and is not needed for the selected system-preference behaviour.

### Load the three type families through document-level Google Fonts links

`Layout.astro` owns `preconnect` hints for the Google Fonts stylesheet and font origin, followed by one combined stylesheet request using `display=swap`. Request only the families and weights represented by stable Pen tokens: Newsreader for display, Geist for body/interface copy, and IBM Plex Mono for utility labels, including the glyph coverage required by en-GB and pt-BR.

CSS stacks include compatible serif, sans-serif, and monospace fallbacks so content paints immediately and remains readable if the external request fails. A CSS `@import` from Google Fonts is avoided because it delays discovery behind the site's stylesheet.

**Alternative considered:** Self-host WOFF2 assets. This provides better privacy and request control, but the user selected Google Fonts for this initial change.

**Alternative considered:** Add font packages. That introduces build dependencies without improving the chosen runtime delivery model.

### Introduce a centred site-canvas wrapper and named query context

Wrap the layout slot in a non-semantic `.site-canvas` container. It uses logical sizing and centring:

```text
available inline size ≤ 1920px       available inline size > 1920px
┌────────────────────────────┐       ┌──────┬────────────────┬──────┐
│ canvas fills available     │       │outer │ 1920px canvas  │outer │
└────────────────────────────┘       └──────┴────────────────┴──────┘
```

The canvas has `inline-size: 100%`, `max-inline-size: 1920px`, and logical auto margins. It becomes the stable page boundary while sections inside it may still use full-bleed backgrounds and their own content containers.

The layout establishes a named inline-size query context. The page-gutter token starts at the mobile Pen value and changes at the relevant container thresholds to the tablet and desktop values. Future sections consume `--page-gutter`; future components establish their own containers when their behaviour depends on local available space.

Viewport media queries and viewport-relative units are not used for component composition. A viewport query remains acceptable only for behaviour whose semantics truly depend on the browser viewport, while container queries and `cqi`/`cqb` units handle container-dependent rules. Intrinsic sizing and percentages remain preferred where no query is needed.

**Alternative considered:** Put a fixed maximum width and padding directly on `body` or `main`. `body` cannot represent the centred canvas separately from the outer viewport, and global `main` padding would prevent future full-bleed sections.

**Alternative considered:** Make every page define its own canvas. This invites route drift and duplicated 1920px logic.

### Keep the reset conservative and accessibility-led

The global reset normalizes box sizing and default body spacing without erasing native semantics. Base rules set surface and text colours, body typography, display typography for headings, inherited typography for controls, readable wrapping, constrained replaced media, and visible `:focus-visible` treatment.

Use logical properties throughout. Avoid global rules that remove list markers, link affordances, control appearance, or outlines. Do not set a fixed root font size. Motion rules respond to `prefers-reduced-motion`, and layout verification includes 200% zoom rather than relying only on screenshot parity.

**Alternative considered:** Use a third-party reset. The small required surface does not justify a dependency, and aggressive resets often remove useful native accessibility behaviour.

### Opt into native cross-document view transitions progressively

Use the CSS View Transition navigation opt-in for eligible same-origin navigations. Keep the initial transition restrained and root-level; named element transitions belong with future components. Reduced-motion rules suppress non-essential transition animation, and unsupported browsers continue normal document navigation.

No Astro client router or transition JavaScript is added. This preserves static navigation and makes the API an enhancement rather than a dependency.

**Alternative considered:** Defer all transition setup until multiple routes exist. Establishing the progressive global contract now prevents later pages from selecting incompatible transition defaults.

## Risks / Trade-offs

- **Google Fonts exposes visitors to third-party font requests and can fail under privacy tools or restrictive networks** → Use one minimal request, preconnect responsibly, apply `display=swap`, and maintain complete local fallback stacks.
- **Font swapping can change line breaks or cause layout shift** → Request only required weights, choose metric-compatible fallbacks where practical, and verify representative en-GB and pt-BR copy at Pen widths.
- **The explicit theme contract exists before theme-switching code** → Keep `data-theme` undocumented as a user feature and add persistence plus flash prevention only in the future theme-toggle change.
- **Container-query support varies in older browsers** → Start from a usable intrinsic mobile layout; container queries enhance composition without blocking content or navigation.
- **The light muted and accent combinations on `surface-alt` have limited contrast headroom** → Preserve opaque token values, avoid applying opacity to normal-size text, and re-check contrast whenever palette values change.
- **A global reset can unintentionally affect later editorial content** → Keep defaults minimal and put specialized rich-text rhythm in a future scoped component.
- **View-transition support is not universal** → Depend only on ordinary navigation and disable non-essential animation for reduced motion.
- **Manual token mapping can drift from Pen** → Record the mapping beside the tokens and include a Pen-to-CSS comparison in implementation verification.

## Migration Plan

1. Add the token and global style files without changing component-specific presentation.
2. Add Google Fonts resource hints and the combined stylesheet request to the shared layout.
3. Add the site-canvas wrapper and import the global entry point once from the layout.
4. Confirm that the existing route inherits typography, colours, theme preference, canvas sizing, and accessibility defaults.
5. Validate light and dark rendering at 390px, 834px, 1440px, 1920px, and a width above 1920px, plus keyboard focus, reduced motion, font failure, and 200% zoom.
6. Run formatting and production-build checks before considering the foundation available to component changes.

Rollback consists of removing the layout import, font links, and canvas wrapper, then deleting the two style files. No content migration, persistent state, or data rollback is required.
