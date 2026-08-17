## Context

The current layout imports global styles and places a single default content slot inside the page canvas. It has no reusable site-chrome components. See `proposal.md` for the motivation and `specs/page-layout/spec.md` for the resulting behavior contract.

## Goals / Non-Goals

**Goals:**

- Establish an Astro layout API with independently addressable hero and main content regions.
- Keep the layout's rendered page-canvas children in the agreed fixed order without adding wrapper elements around supplied content.
- Give persistent chrome ownership of its own semantic roots.
- Preserve the existing static rendering model, page-canvas sizing, theme behavior, and locale-aware layout props.

**Non-Goals:**

- Designing or populating the Menu, hero, main content, or Footer.
- Adding a page-level header landmark, fallback slot markup, client-side behavior, Contentful queries, or metadata features.
- Changing visual tokens, responsive rules, or View Transition behavior.

## Decisions

### Use two named Astro slots with no fallback markup

The layout will expose `hero` and `main` as named slots and leave both empty when the caller does not populate them. This makes a page's structural intent explicit and prevents placeholder layout content from appearing in production.

The existing unnamed slot is not retained: allowing it alongside the new contract would permit ambiguous content placement.

### Keep page-supplied content unwrapped

The layout will emit supplied hero and main content directly as siblings of the fixed chrome. In particular, it will not surround the hero with a header or section, nor surround main-slot content with `main`.

This places semantic ownership with the page-level content component, which is necessary because the hero and primary content vary by route. A page providing primary document content will provide its own sole `main` element.

### Add minimal semantic chrome components

The layout will import Menu and Footer components from the shared component area. The Menu component owns the `nav` landmark and the Footer component owns the `footer` landmark. They will be intentionally empty placeholders, allowing later work to expand their content without changing the layout API.

Using a layout-owned `header` was considered but rejected because the Menu must remain a direct child of the page canvas and future header content has not been defined.

### Migrate the existing homepage to the named contract

The homepage will provide its existing primary content through the named main region and retain its own `main` element. This keeps the initial route semantically valid while proving the new layout API.

## Risks / Trade-offs

- [Pages can omit a `main` landmark] → Require pages with primary content to own a single `main` element and verify landmark structure during implementation.
- [Future hero markup could be structurally inconsistent across routes] → Keep the layout neutral now; define a shared hero component only when common behavior or styling emerges.
- [Empty chrome landmarks have limited standalone usefulness] → Treat the components as temporary structural placeholders and add accessible labels or content with the future navigation/footer work.
- [Named slots change page authoring syntax] → Migrate all current layout consumers as part of this change and document the contract in the delta spec.

## Migration Plan

1. Add the two placeholder chrome components and adopt them in the shared layout.
2. Replace the default slot with the ordered named slots, without fallback content or layout-owned wrappers.
3. Migrate existing pages to supply their primary content through the named main region.
4. Run formatting and a static build; inspect the rendered homepage landmark order.

Rollback consists of restoring the previous default-slot layout and homepage invocation; no data, Contentful, deployment, or compatibility migration is required.
