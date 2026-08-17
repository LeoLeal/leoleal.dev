# Design System Foundation Specification

## Purpose

Defines the shared visual, responsive, thematic, and accessibility contract that every leoleal.dev page and future interface component can consume consistently.

## Requirements

### Requirement: Authoritative semantic design tokens

The site SHALL expose shared semantic CSS custom properties derived from the stable colour, typography, spacing, radius, and responsive-threshold values in `design/leoleal.dev.pen`, and token consumers SHALL use those properties instead of duplicating equivalent values.

#### Scenario: A page consumes the global foundation

- **WHEN** any route is rendered through the shared site layout
- **THEN** the authoritative semantic design tokens are available to that route without a route-specific token import

#### Scenario: A Pen token changes

- **WHEN** an authoritative stable Pen token is intentionally updated
- **THEN** its mapped semantic CSS property can be updated centrally without changing every consuming component

### Requirement: System-responsive theme contract

The site SHALL select its light or dark semantic colour values from the visitor's system colour-scheme preference by default, and SHALL define an explicit root-level theme contract that can override system preference in a future theme-switching change without altering token consumers.

#### Scenario: System preference is light

- **WHEN** the visitor has not selected an explicit site theme and the system preference is light
- **THEN** the site renders with the light semantic palette

#### Scenario: System preference is dark

- **WHEN** the visitor has not selected an explicit site theme and the system preference is dark
- **THEN** the site renders with the dark semantic palette

#### Scenario: A future explicit theme is applied

- **WHEN** a supported explicit light or dark theme value is present on the document root
- **THEN** semantic token consumers resolve to that theme without requiring component-specific theme rules

### Requirement: Accessible palette usage

Default text, muted text, accent text, and filled-action foreground combinations SHALL meet WCAG 2.2 AA contrast requirements for their intended text sizes in both light and dark themes.

#### Scenario: Core palette contrast is evaluated

- **WHEN** the foundation palette is checked in either supported theme
- **THEN** text and interactive foreground combinations meet the required WCAG 2.2 AA contrast ratio against their documented surfaces

#### Scenario: Theme preference changes

- **WHEN** the active theme changes from light to dark or dark to light
- **THEN** foreground and background tokens change together without exposing an intermediate inaccessible combination

### Requirement: Portfolio typography

The site SHALL use Newsreader for display typography, Geist for body and interface typography, and IBM Plex Mono for utility typography, while retaining readable fallback stacks whenever a web font is delayed or unavailable.

#### Scenario: Web fonts are available

- **WHEN** the configured font resources load successfully
- **THEN** content renders with the design-system typeface assigned to its semantic typography role

#### Scenario: Web fonts are unavailable

- **WHEN** a configured font resource is blocked, delayed, or fails to load
- **THEN** the content remains visible and readable using the corresponding fallback stack

#### Scenario: Localized content contains Portuguese characters

- **WHEN** pt-BR content includes diacritics used by Portuguese
- **THEN** the selected web font or its fallback renders those characters without missing glyphs

### Requirement: Accessible global document defaults

Every page SHALL inherit global defaults that preserve semantic element behaviour, visible keyboard focus, readable zoomed content, appropriately constrained media, inherited form-control typography, and reduced-motion preferences.

#### Scenario: Keyboard focus is visible

- **WHEN** a visitor navigates to an interactive element using the keyboard
- **THEN** the focused element has a clearly visible indicator that is not communicated by colour alone

#### Scenario: Content is zoomed

- **WHEN** a visitor zooms the page to 200 percent at a supported responsive size
- **THEN** content remains readable and operable without two-dimensional scrolling for ordinary page content

#### Scenario: Reduced motion is requested

- **WHEN** the visitor enables reduced motion at operating-system or browser level
- **THEN** non-essential global motion and transition effects are removed or reduced

#### Scenario: Embedded media exceeds its container

- **WHEN** an image, video, SVG, or other replaced media element is larger than its containing block
- **THEN** the media remains within the available inline size without distorting its intrinsic aspect ratio

### Requirement: Responsive page canvas

The page canvas SHALL occupy the full available viewport inline size through 1920px inclusive and SHALL use a centred maximum inline size of 1920px on wider viewports.

#### Scenario: Viewport is no wider than 1920px

- **WHEN** the viewport inline size is 1920px or less
- **THEN** the page canvas occupies the full available inline size

#### Scenario: Viewport is wider than 1920px

- **WHEN** the viewport inline size exceeds 1920px
- **THEN** the page canvas remains 1920px wide and is centred within the excess inline space

#### Scenario: Writing direction changes

- **WHEN** layout is evaluated using a different writing direction
- **THEN** centring and spacing remain expressed relative to logical inline and block axes rather than physical left, right, width, or height assumptions

### Requirement: Container-led responsive styling

Responsive component and section behaviour SHALL use intrinsic sizing, container queries, and container-query units when the rule depends on an available container; viewport queries or viewport-relative units SHALL be reserved for behaviour that genuinely depends on the viewport.

#### Scenario: A component responds to available space

- **WHEN** a component's containing block crosses one of its layout thresholds without the viewport changing
- **THEN** the component adapts according to its container rather than requiring a viewport breakpoint

#### Scenario: A rule genuinely depends on the viewport

- **WHEN** behaviour cannot be expressed relative to an element's container, content, or intrinsic size
- **THEN** the implementation may use a viewport query or viewport-relative unit and documents that viewport dependency

### Requirement: Logical CSS geometry

Site-authored styles SHALL use logical sizing, spacing, positioning, border, and overflow properties instead of physical equivalents wherever a logical property exists.

#### Scenario: CSS geometry is reviewed

- **WHEN** the design-system foundation is inspected
- **THEN** declarations use properties such as `inline-size`, `block-size`, and logical inset, margin, padding, and border forms rather than physical-axis equivalents

### Requirement: Progressive view transitions

Eligible same-origin document navigation SHALL use the native View Transition API when supported and appropriate, without making navigation or content access depend on transition support.

#### Scenario: View transitions are supported

- **WHEN** the browser supports the configured native transition and reduced motion is not requested
- **THEN** eligible navigation receives meaningful visual continuity

#### Scenario: View transitions are unsupported

- **WHEN** the browser does not support the View Transition API
- **THEN** navigation completes normally without a transition or additional dependency

#### Scenario: Reduced motion is requested during navigation

- **WHEN** the browser supports view transitions but the visitor requests reduced motion
- **THEN** navigation remains functional and non-essential transition animation is suppressed
