## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: CompactSelect supports constrained toolbar placement

CompactSelect SHALL support a caller-selected block-start menu placement so its options remain visible and operable when the trigger is inside a fixed bottom toolbar. The placement SHALL have a functional fallback where CSS anchor positioning is unavailable.

#### Scenario: Select opens in a fixed bottom toolbar

- **WHEN** a CompactSelect configured for block-start placement is opened near the viewport block-end
- **THEN** its option list appears above the trigger within the visible viewport and preserves existing pointer and keyboard operation

#### Scenario: Anchor positioning is unavailable

- **WHEN** the browser does not support CSS anchor positioning
- **THEN** the option list still uses the requested block-start placement through the fallback layout
