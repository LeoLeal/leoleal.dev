## Why

The portfolio has design tokens and a shared layout foundation but no reusable primitive controls, forcing future pages to recreate visual and accessibility behaviour. Building the Pen-defined atoms now establishes one consistent, maintainable base for interface composition.

## What Changes

- Add reusable Astro atoms for buttons, skill tags, image-number badges, and compact selects under `src/components/atoms/`.
- Define a single Button atom with primary and secondary variants, an optional rounded modifier, native link or button semantics, and named SVG icon slots.
- Preserve the Pen control geometry and semantic token usage in both light and dark themes.
- Make icon-only buttons square regardless of their corner-radius modifier and require them to have an accessible name.
- Use an accessible custom dropdown menu that preserves caller-provided options and form values.

## Capabilities

### New Capabilities

- `design-system-atoms`: Reusable, accessible primitive interface components that implement the Pen design-system atom definitions.

### Modified Capabilities

- None.

## Impact

- Affected code: new Astro components and colocated atom styles in `src/components/atoms/`; existing shared token styles are consumed without duplicating values.
- APIs: introduces typed component props and named icon slots for page and component consumers.
- Dependencies: none; SVG icons are supplied by consumers and controls use platform HTML and CSS.
- Contentful and locales: no CMS model or query changes; text-bearing props and select options remain caller-provided and locale-safe.
- Accessibility: native interactive controls, keyboard and form behaviour, visible focus, and accessible names for icon-only buttons are required.
- SEO and deployment: no indexable content, metadata, or deployment changes.
