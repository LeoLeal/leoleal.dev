# Content Sourcing Specification

## Purpose

Defines the portfolio's authoritative content boundaries so editorial data, interface language, and static site copy remain predictable and safely localized.

## Requirements

### Requirement: Contentful is limited to designated editorial sections

Contentful SHALL be the source of truth only for the localized About Me and Journey editorial sections. Contentful content SHALL be fetched during static builds, and credentials or authenticated Contentful requests SHALL NOT be exposed to browser code.

#### Scenario: Site builds editorial sections

- **WHEN** a static site build retrieves About Me or Journey content
- **THEN** it obtains the applicable localized entries from Contentful without exposing credentials in the generated browser assets

#### Scenario: Another feature needs content

- **WHEN** a feature outside the About Me and Journey editorial sections introduces visible content
- **THEN** that content remains code-owned unless a later approved change explicitly expands the Contentful boundary

### Requirement: Interface labels are maintained per locale in source control

Reusable interface labels SHALL be stored in separate source-controlled files for en-GB and pt-BR and selected according to the active route locale. Components SHALL consume those locale sources rather than duplicate translated labels in component markup.

#### Scenario: Shared interface renders in either locale

- **WHEN** a shared component renders on the en-GB or pt-BR route
- **THEN** its interface labels are resolved from the corresponding locale file

#### Scenario: A new shared label is introduced

- **WHEN** a feature adds a new reusable interface label
- **THEN** the label is defined for both supported locale files before the feature is complete

### Requirement: Content ownership guidance remains explicit

Repository guidance and OpenSpec project context SHALL state the Contentful and locale-file boundaries consistently so future planned and implemented changes evaluate content ownership before adding copy or CMS fields.

#### Scenario: Future work is planned

- **WHEN** an agent or contributor consults repository and OpenSpec guidance for a content-bearing feature
- **THEN** both sources identify About Me and Journey as the only Contentful-owned sections and interface labels as per-locale source files
