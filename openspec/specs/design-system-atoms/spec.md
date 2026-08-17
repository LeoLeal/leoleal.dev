# Design System Atoms Specification

## Purpose

Provides consistent, accessible primitive controls for the portfolio's pages while preserving the visual contract of the authoritative design system.

## Requirements

### Requirement: Design-system atoms are available to page composition

The site SHALL provide reusable Button, Tag, ImageNumberBadge, and CompactSelect atoms. Each atom SHALL visually use the shared semantic design tokens in both supported colour themes and SHALL remain usable at supported responsive sizes.

#### Scenario: Atom is rendered in either theme

- **WHEN** any atom is rendered with the site's light or dark theme active
- **THEN** its foreground, surface, border, and typography remain legible and conform to the shared design-system palette and type roles

#### Scenario: Atom is rendered in localized content

- **WHEN** an atom receives English or Brazilian Portuguese text
- **THEN** its caller-provided text remains readable without locale-specific component variants

### Requirement: Button supports semantic actions and navigation

The Button atom SHALL represent actions with a native button control and navigation with a native link when given a destination. It SHALL support primary, secondary, and tertiary visual variants, an optional rounded modifier, optional leading and trailing icon content, label content, and consumer-provided styling hooks needed for responsive composition.

#### Scenario: Action button is rendered

- **WHEN** a consumer renders a Button without a navigation destination
- **THEN** the atom exposes native button semantics and the selected primary, secondary, or tertiary visual variant

#### Scenario: Navigation button is rendered

- **WHEN** a consumer renders a Button with a navigation destination
- **THEN** the atom exposes a native link with the selected Button styling

#### Scenario: Labelled button includes icons

- **WHEN** a Button has a label and optional leading or trailing icon content
- **THEN** its content is ordered leading icon, label, trailing icon and remains centred within the control

#### Scenario: Tertiary button is rendered

- **WHEN** a consumer selects the tertiary variant
- **THEN** the Button preserves control spacing and icon slots without a visible border or filled background and presents an underlined text-link affordance on hover

### Requirement: Icon-only buttons are square and named

When a Button has no label and exactly one icon, it SHALL render as a square control with a locked 1:1 aspect ratio for both rounded and non-rounded forms. An icon-only Button SHALL have an accessible name.

#### Scenario: Rounded icon-only button is rendered

- **WHEN** a rounded Button has one icon and no label
- **THEN** it is a square, pill-cornered control whose icon is centred and whose accessible name is available to assistive technology

#### Scenario: Non-rounded icon-only button is rendered

- **WHEN** a non-rounded Button has one icon and no label
- **THEN** it is a square, standard-cornered control whose icon is centred and whose accessible name is available to assistive technology

### Requirement: Tags and image-number badges convey non-interactive metadata

The Tag atom SHALL render non-interactive skill metadata, and the ImageNumberBadge atom SHALL render non-interactive image sequence metadata. Both SHALL expose their text content without requiring pointer interaction.

#### Scenario: Skill tag is rendered

- **WHEN** a consumer provides a skill label
- **THEN** the atom renders it as outlined utility metadata without link or button semantics

#### Scenario: Image-number badge is rendered

- **WHEN** a consumer provides an image number
- **THEN** the atom renders it as raised, outlined utility metadata without link or button semantics

### Requirement: Compact select provides an accessible custom dropdown

The CompactSelect atom SHALL present caller-provided options through a custom dropdown menu. It SHALL expose an accessible trigger and listbox, preserve keyboard operation and selected-value semantics, submit its selected value when used in a form, and accept an initial selected value.

#### Scenario: Visitor operates the dropdown with a keyboard

- **WHEN** a visitor focuses CompactSelect and opens, navigates, or closes it with a keyboard
- **THEN** the active option and selected value update without requiring pointer input

#### Scenario: Visitor selects an option

- **WHEN** a visitor activates an enabled dropdown option
- **THEN** the menu closes, the trigger displays the selected label, and the associated form value updates

#### Scenario: Initial selected value is supplied

- **WHEN** a consumer provides a valid initial selected value or marks an option as selected
- **THEN** the trigger and selected option state display that option when the page loads

### Requirement: CompactSelect supports constrained toolbar placement

CompactSelect SHALL support a caller-selected block-start menu placement so its options remain visible and operable when the trigger is inside a fixed bottom toolbar. The placement SHALL have a functional fallback where CSS anchor positioning is unavailable.

#### Scenario: Select opens in a fixed bottom toolbar

- **WHEN** a CompactSelect configured for block-start placement is opened near the viewport block-end
- **THEN** its option list appears above the trigger within the visible viewport and preserves existing pointer and keyboard operation

#### Scenario: Anchor positioning is unavailable

- **WHEN** the browser does not support CSS anchor positioning
- **THEN** the option list still uses the requested block-start placement through the fallback layout
