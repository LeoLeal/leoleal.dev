## Purpose

Defines the shared, localized navigation chrome and its adaptive behavior across page contexts, viewport sizes, scroll states, and colour themes.

## ADDED Requirements

### Requirement: Menu provides one composable navigation landmark

The shared Menu SHALL render one navigation landmark with a localized accessible name. It SHALL provide a leading-content region that defaults to the Leonardo Leal name and accent mark, allow a caller to replace that default, accept caller-provided page navigation, and allow the search control to be enabled or omitted without changing the landmark structure.

#### Scenario: Home page uses menu defaults

- **WHEN** the home page renders the Menu without replacement leading content
- **THEN** the Menu displays the Leonardo Leal name and accent mark with the home-page navigation

#### Scenario: Another page supplies leading content

- **WHEN** a non-home page supplies a back control to the Menu leading-content region
- **THEN** the supplied control replaces the Leonardo Leal name and accent mark

#### Scenario: Search is omitted

- **WHEN** a page configures the Menu not to show search
- **THEN** no search trigger is rendered and the remaining controls preserve their order and accessible operation

### Requirement: Desktop and tablet menu changes with scroll position

At desktop and tablet breakpoints, the Menu SHALL be sticky at the block-start of the page canvas. At the top of the document it SHALL occupy the full available page-canvas inline size; after the visitor scrolls away from the top it SHALL transition into the centred floating layout defined for that breakpoint without changing navigation meaning or focus order.

#### Scenario: Document is at its initial position

- **WHEN** a desktop or tablet page is at the top of the document
- **THEN** the Menu is displayed as the full-width top navigation for the active breakpoint

#### Scenario: Visitor scrolls down

- **WHEN** a desktop or tablet visitor scrolls beyond the menu transition threshold
- **THEN** the Menu remains available at block-start and animates into a centred, bordered, elevated floating pill

#### Scenario: Visitor returns to the top

- **WHEN** a desktop or tablet visitor returns to the top of the document
- **THEN** the Menu transitions back to its full-width top layout

### Requirement: Menu adapts its content at supported breakpoints

The Menu SHALL use the Pen-defined responsive content hierarchy. Tablet layouts SHALL use compact labels and search copy where required for available space. Mobile layouts SHALL omit the home-page brand and wide link row, represent page-specific navigation with a compact selection control, hide the back-control label, render the contact action icon-only, omit the search shortcut, and use the short search label.

#### Scenario: Tablet page navigation is rendered

- **WHEN** the Menu is displayed at the tablet breakpoint
- **THEN** labels and search copy use their localized compact forms while every destination and action remains available

#### Scenario: Home page is rendered on mobile

- **WHEN** the home page Menu is displayed at the mobile breakpoint
- **THEN** it is a fixed bottom toolbar containing the enabled search trigger, theme control, and icon-only contact action without the brand or wide home-page link row

#### Scenario: Non-home page is rendered on mobile

- **WHEN** a non-home page with multiple page-navigation destinations is displayed at the mobile breakpoint
- **THEN** its Menu contains an icon-only back control, a compact destination selector, the theme control, and the icon-only contact action, plus search only when enabled by that page

### Requirement: Mobile menu remains reachable without obscuring content

At the mobile breakpoint, the Menu SHALL remain fixed near the viewport block-end, account for device safe-area insets, fit within the available inline size, and preserve sufficient page-end clearance for document content to remain reachable and visible.

#### Scenario: Visitor scrolls a mobile page

- **WHEN** a mobile visitor scrolls anywhere in the document
- **THEN** the floating Menu remains available at the viewport block-end without changing between full-width and compact states

#### Scenario: Visitor reaches the end of mobile content

- **WHEN** a mobile visitor reaches the document end
- **THEN** the final content can be scrolled clear of the fixed Menu and remains operable

### Requirement: Floating menu uses intrinsic inline sizing

In every floating state, the Menu container SHALL use `inline-size: auto` so its inline size is derived exclusively from its currently visible children and inline padding. The floating endpoint SHALL NOT receive a fixed, preferred, minimum, or maximum inline size. Where supported, the transition from the full-width state SHALL use modern CSS intrinsic-size interpolation to animate to `auto`; centring and viewport placement SHALL be provided by an independent positioning container without stretching the floating Menu.

#### Scenario: Desktop or tablet menu becomes floating

- **WHEN** the sticky Menu transitions away from its full-width top state
- **THEN** its floating container animates to `inline-size: auto` and finishes at the intrinsic inline size of its visible controls and padding

#### Scenario: Mobile menu content changes

- **WHEN** mobile Menu children differ because search or slotted navigation is enabled or omitted
- **THEN** the fixed floating container grows or shrinks intrinsically with those children instead of retaining a prescribed inline size

#### Scenario: Intrinsic-size interpolation is unavailable

- **WHEN** the browser cannot interpolate from the full-width value to `auto`
- **THEN** the Menu switches directly to the same intrinsic floating endpoint without losing sticky behavior, content, or interaction

### Requirement: Menu labels are locale-aware

Every visible label, compact label, accessible name, and shortcut hint owned by the Menu SHALL come from the active en-GB or pt-BR interface-label source. The Menu SHALL NOT require translated strings embedded in its component markup.

#### Scenario: English route renders the Menu

- **WHEN** the Menu is rendered for the en-GB route
- **THEN** all Menu-owned visible and assistive labels use the en-GB interface-label source

#### Scenario: Portuguese route renders the Menu

- **WHEN** the Menu is rendered for the pt-BR route
- **THEN** all Menu-owned visible and assistive labels use the pt-BR interface-label source and responsive layouts remain usable with their translated lengths

### Requirement: ThemeSwitcher provides the only new child behavior

ThemeSwitcher SHALL be the only new functional child component developed for Menu. It SHALL switch between the supported light and dark themes, expose a localized accessible name describing the available action, update its visual state, and persist the visitor's explicit selection for later pages and visits. In the absence of an explicit selection, the site SHALL respect the visitor's system preference.

#### Scenario: Visitor changes theme

- **WHEN** a visitor activates the theme control
- **THEN** ThemeSwitcher changes the page to the other supported theme, updates the control name and icon, and stores the explicit selection

#### Scenario: Visitor has no stored theme

- **WHEN** a visitor loads a page without a persisted explicit theme
- **THEN** the rendered theme follows the visitor's current system preference

### Requirement: Theme changes use an opening iris transition

When the native View Transition API is available and reduced motion is not requested, ThemeSwitcher SHALL reveal the incoming theme with an expanding circular mask originating at the theme control and opening until the new theme covers the viewport. The same incoming-theme iris behavior SHALL apply when changing to light and when changing to dark.

#### Scenario: Visitor switches to dark theme

- **WHEN** a visitor switches from light to dark with View Transitions available
- **THEN** the dark-theme snapshot is revealed by a circle expanding from the ThemeSwitcher control until it covers the viewport

#### Scenario: Visitor switches to light theme

- **WHEN** a visitor switches from dark to light with View Transitions available
- **THEN** the light-theme snapshot is revealed by a circle expanding from the ThemeSwitcher control until it covers the viewport

#### Scenario: View Transitions are unavailable

- **WHEN** a visitor changes theme in a browser without the View Transition API
- **THEN** ThemeSwitcher applies and persists the new theme immediately without the iris animation

#### Scenario: Reduced motion is requested

- **WHEN** a visitor requests reduced motion and changes theme
- **THEN** ThemeSwitcher applies and persists the new theme without the iris animation

### Requirement: Menu delegates element behavior to atoms and callers

Menu SHALL compose its search, navigation selection, back, and contact elements from existing design-system atoms or caller-provided slotted atoms. Menu SHALL NOT add search events, search keyboard shortcuts, routing handlers, overlay behavior, or other custom functionality to those elements. Existing native destinations and atom-owned behavior SHALL remain unchanged.

#### Scenario: Search affordance is rendered

- **WHEN** a page enables the Menu search affordance
- **THEN** Menu renders the localized atom presentation without registering a search action, shortcut, event contract, or overlay

#### Scenario: Slotted navigation atom changes value

- **WHEN** a caller supplies a CompactSelect navigation atom and its value changes
- **THEN** Menu does not interpret the value or perform navigation on the caller's behalf

#### Scenario: Back or contact atom has a destination

- **WHEN** a caller supplies a destination through a back or contact Button atom
- **THEN** ordinary native link behavior is preserved without Menu-owned event handling

### Requirement: Menu interaction and motion remain accessible

All interactive Menu atoms SHALL retain their atom-owned keyboard behavior, visible focus, and accessible names and SHALL meet WCAG 2.2 AA contrast in both themes. Menu state changes SHALL preserve DOM order and focus, and non-essential transition motion SHALL be suppressed when reduced motion is requested.

#### Scenario: Visitor navigates with a keyboard

- **WHEN** a visitor tabs through the Menu and operates its controls without a pointer
- **THEN** focus follows the visual reading order, remains visible, and each atom retains its existing semantics and behavior

#### Scenario: Reduced motion is requested

- **WHEN** a visitor requests reduced motion and scrolls between Menu states
- **THEN** the Menu changes state without non-essential animated movement while remaining sticky or fixed as appropriate
