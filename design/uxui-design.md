# Immersive Front-End Portfolio

## 1. Project Overview & Aesthetic Architecture

Create a highly immersive, narrative-driven personal portfolio website built natively around a strict **Mobile-First Approach**. Every interaction, spacing rule, and typographic scale must be architected primarily for small touchscreens, with layout components scaling upward gracefully only at larger breakpoints.

### 🚨 CRITICAL VISUAL CONSTRAINT: FULLSCREEN IMAGERY WITH NO CARD CONTAINERS

* **Instagram Stories Paradigm:** All main views (About Me, Employer Intros, and individual Projects) must utilize the exact same structural layout: a **100vh/100vw full-bleed, full-screen background media canvas**, with all text, metadata, labels, and interactive buttons floating directly on top as a clean user interface overlay.


* **No Card-Like Containers:** Content overlays must **not** be enclosed inside boxes, cards, or borders. Text must sit completely unconfined over the background media.


* **Contrast Mechanism:** High contrast and readability must be achieved exclusively by setting the overlay font color to **pure white** and applying a smooth, subtle **dark background gradient layer** (e.g., a linear bottom-up or top-down gradient) directly over the background media canvas to separate text from imagery.


* **Zero Global Header/Footer Bars:** Do not generate a traditional top header or standard bottom footer block. The top and bottom edges of the viewport must remain completely open. All navigation is managed by the bottom Smart Toolbar.



### Identity, Branding, Color Palette & Typography

* **Primary Identity:** The website belongs to **Leonardo Leal**, Senior Frontend Architect & UI/UX Engineer.


* **Dual-Theme Support (Light & Dark Modes):** Generate adaptive system designs for both a Light Theme and a Dark Theme. The layout transition must be fluid, swapping the global canvas values cleanly while maintaining identical asset positioning. The initial state must dynamically match the user's system-selected theme.


* **The Single Accent Color:** Regardless of the active theme, use exactly ONE vibrant, high-contrast accent color exclusively reserved for active focus states, timeline segment lines, loading indicators, and primary CTA hits.


* **Typography:** Utilize an elegant, premium, slender high-fidelity editorial typeface setup (preferably an oblique one, in reference to a modern editorial style). Pair a clean, delicate but readable sans-serif for micro-metadata with a high-contrast serif or sharp display font for major headers. Don't use fonts with too voluptuous body style (impact, naturally bold fonts, etc.).



### Global Data Mapping Conventions (Industry & Location Architecture)

* **Industry Context Engine:** Every individual Employer and individual Project entry must feature a clearly defined **Industry Label** (e.g., Finance, Consulting, Automotive, Travel & Hospitality, etc.). This label must always be accompanied by a tightly paired, minimalist vector **Industry Icon** that visually identifies the sector.
* **Standardized Location Syntax:** All location data displayed across the entire system—including the Intro/About Me segment, Employer frames, and specific Project markets—must strictly adhere to a unified format: **[Country Flag Emoji/Vector] followed by the [City Name] label** (e.g., 🇬🇧 London, 🇺🇸 New York).

### Image Asset Blueprint Execution

* **About Me Section:** Populate the background canvas with a high-resolution, professional stock photo of a close face of a male person representing Leonardo Leal, with a mouse hover subtle shader effect as the mouse hovers the image for desktop and pointer devices.


* **Employers & Projects Sections:** Do NOT generate generic or abstract decorative background images. Every single background media asset slot must use a **literal, fullscreen wireframe placeholder** (e.g., a solid neutral gray background filling 100vh with clean diagonal crossing lines or explicit bounding lines labeled `[Fullscreen UX Wireframe Placeholder]`) to preserve pure structural focus.



## 2. Multi-Breakpoint Responsive Paradigm (Mobile-First Core)

* **Strict Multi-Device Responsiveness:** While developed with a mobile-first philosophy, all screens, spatial transitions, and interactive components must be completely responsive across smartphones, foldables, tablets, laptops, and ultra-wide desktop monitors without clipping text or breaking the strict 100vh fold rules.


* **Mobile Breakpoint (< 768px - Primary Focus):** All core navigation anchors collapse into a sticky bottom Smart Toolbar row engineered perfectly for native thumb reachability.


* **Tablet & Desktop Breakpoints (≥ 768px - Upward Scaling):** The bottom toolbar elegantly transforms into a minimal vertical sidebar dock vertically centered to the right viewport margin with some breathing space to the right edge of the screen.



## 3. Section-by-Section Component & Visual Architecture

### A. Intro Section: The Welcome Frame (About Me & Contact Hub)

* **Background Asset:** Full-bleed, fullscreen professional stock photo of a face closeup of a person with the active hover shader script container.


* **Lower Third UI Overlay (No Container):** Text and UI elements must float freely over a protective dark background gradient spanning the lower third of the viewport.


* Primary Title (White Font): **Leonardo Leal** | Frontend Architect & UI/UX Engineer.


* Geographic Badge (White Font): Follows the Standardized Location Syntax (e.g., "📍 Current Location: 🇬🇧 London").
* Value Proposition (White Font): 2-sentence punchy copy emphasizing pixel-perfect execution, design systems, and bridging complex logic with stunning UI.


* Core Expertise Tags: Muted, low-opacity capsule tags scaled for mobile readability.


* **Primary Contact CTA:** A prominent, beautifully styled primary action button reading **"Contact Me"** coated in the single vivid accent color.


* **Direct Social Integrations:** A row of clean, minimal vector icon anchors positioned right beside the CTA linking directly to official platforms:


* LinkedIn: `[linkedin.com/in/leoleal](https://linkedin.com/in/leoleal)`

* GitHub: `[GitHub Profile Link Placeholder]`



* **Top Margin Overlay:** Minimalist Vector Search Pill reading: `[🔍 Ask something about my experience...]`.


* **Suggestions:**  A "✨ Suggestions:" label in italic followed by 3 subtle ghost-button suggestion chips underneath the search input.



### B. Journey Section: Immersive Timeline Frame

* **Structural Grid & Gesture Architecture:**
* **Vertical Swiping (Up / Down):** Navigates non-linearly between entirely different Employers (e.g., [Employer 1] ↕ [Employer 2]).


* **Horizontal Swiping (Left / Right):** Navigates sequentially across slides within the active Employer (Employer Overview ↔ Project Slide 1 ↔ Project Slide 2).


* **Horizontal Tapping (Left / Right Viewport Edges):** Tapping inside a Project Slide cycles through its 3–5 nested layout background placeholders without changing the project slide context.




* **Sequential Slide Cadence:**
1. **Slide 1: Employer Overview Frame:** A standalone immersive title slide introducing the company environment. Features a full-bleed company branding/media background canvas. Floating overlay text sits directly on a background gradient in a crisp white font and includes: Company Name, Role, Duration, Employer Location (rendered via Standardized Location Syntax), and the paired Industry Icon + Industry Label metadata layer. No containing box allowed.


2. **Slide 2+: Project Component Frames:**
* **Background Asset:** Fullscreen, full-bleed wireframe placeholder background canvas. Left/right viewport edge taps cycle this background placeholder to the next internal image state. Bottom-aligned pagination dots reflect active asset index using the single accent color.


* **Bottom UI Overlay (No Container / Background Gradient):**
* Project Metadata (White Font): [Project Name] | Target Market Location (rendered via Standardized Location Syntax) | Paired Industry Icon + Industry Label.
* Text Detail Area (White Font): Bulleted overview of your technical contribution, framework stack, and core impact metrics cleanly overlaying the fullscreen placeholder asset. Kept perfectly legible purely through a subtle underlying background gradient layer.









### C. Non-Linear Navigation Component: Birds-Eye View Grid

* **Interaction Triggers:** Triggered exclusively via a native pinch-to-zoom-out gesture on trackpads/mobile viewports within the Experience section. *(Note: Reaching the end of an individual employer's project sequence does NOT auto-trigger this screen; it must remain on the final slide or loop back).*


* **Visual Transformation:** Current 100vh frame executes a smooth 3D spatial scale-down animation shrinking into a 2D grid matrix of all Employers.


* **Content Elements:** Each grid element maps an individual employer featuring its location indicator (Flag + City), Role, Industry Icon + Label, and Project Count badge. Tapping any item executes a zoom-in animation resetting the 100vh player to that selection.



### D. Intelligent Vector-Search Overlay

* **Trigger:** Interacting with the top-anchored Search Pill.


* **UI Layout:** Fullscreen blurred canvas overlay with a singular centered text focus field.


* **Result UI Layout:** Search entries must return a clean horizontal carousel or grid of visual Result Frames.


* **Frame Design:** Every result must use the first squareish wireframe placeholder image of the corresponding project as its full-bleed background imagery.


* **Frame Content Layer:** Overlaid cleanly at the bottom of the frame using high-contrast white text sitting over a background gradient: Project Name, Target Market Location (Flag + City), Employer Name, paired Industry Context metadata, and a 1-sentence "Search Match" text snippet highlighted with the system's single accent color. No bounding card boxes.


* **Interaction Destination:** Tapping a result immediately closes the search overlay and transports (snaps) the 100vh main player directly to that chosen Employer + Project Slide state.



### E. Smart Toolbar Component

* **Layout & Navigation Items:** A sticky, thumb-reachable bottom bar populated with the following vector icons in order:
1. **Intro/Home Icon:** Snaps the viewport to the active "About Me" frame.
2. **Journey/Timeline Icon:** Snaps the viewport to the active "Experience / Timeline" frame.
3. **Theme Switch Icon:** Swaps between Dark and Light mode, dynamically transforming between a **Sun icon** (when Light Theme is active) and a **Moon icon** (when Dark Theme is active).
4. **Visual Separator:** A thin, solid **vertical line** separating the active settings from the terminal launcher.
5. **Console/Terminal Icon:** Disabled state styled as a ghost icon with an explicit **opacity of 0.3** (reserved for future development).


* **Responsive Sidebar Transformation:** When scaled up to Tablet & Desktop breakpoints ($\geq$ 768px), the toolbar shifts into a minimal vertical dock anchored to the right edge of the screen.


* **Order & Alignment:** The layout flows strictly from **top-to-bottom** (Home at the top, Console/Terminal at the bottom).
* **Separator Adaptation:** The visual separator rotates seamlessly, transforming from a vertical line into a thin, solid **horizontal line** dividing the theme switch icon from the disabled console icon.