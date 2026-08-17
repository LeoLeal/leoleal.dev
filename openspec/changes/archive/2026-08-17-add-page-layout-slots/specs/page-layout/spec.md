## Purpose

Defines the stable page-shell regions that let every Astro page compose its content without inheriting unintended markup or fallback content.

## ADDED Requirements

### Requirement: Ordered page-shell composition

The shared page layout SHALL render the Menu component, page-supplied hero content, page-supplied main content, and the Footer component in that order within the page canvas. Each of these regions SHALL be a direct child of the page canvas; the layout SHALL NOT wrap either page-supplied region in an additional semantic or structural element.

#### Scenario: Page supplies both named regions

- **WHEN** a page supplies hero and main content to the shared layout
- **THEN** the rendered page canvas orders the Menu, hero content, main content, and Footer from first to last as sibling regions

### Requirement: Empty named content regions

The shared page layout SHALL expose separately named `hero` and `main` content regions and SHALL NOT render fallback content for either region.

#### Scenario: Page omits a named region

- **WHEN** a page omits content for the hero or main region
- **THEN** the layout renders no substitute content in place of the omitted region

### Requirement: Fixed chrome semantic ownership

The Menu component SHALL render the navigation landmark for the page and the Footer component SHALL render the footer landmark. The shared page layout SHALL place the Menu component directly in the page canvas and SHALL NOT introduce a wrapping header landmark around it.

#### Scenario: Page renders the shared layout

- **WHEN** a page is rendered through the shared layout
- **THEN** its fixed chrome includes a navigation landmark before its supplied content and a footer landmark after it without a layout-owned header wrapper

### Requirement: Main landmark ownership

The shared page layout SHALL NOT add a `main` landmark around the main content region. A page that provides primary document content SHALL supply its own sole `main` landmark as part of that region.

#### Scenario: Page supplies primary content

- **WHEN** a page supplies primary document content to the main region
- **THEN** that content contains the page's single `main` landmark and the layout adds no additional `main` wrapper
