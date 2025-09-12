# Minimalist Health UI

Design a TrB‑DeepHealth LLM Testing Platform UI with a minimalist aesthetic, focusing on clarity, trust, and safety. The interface should serve developers, researchers, healthcare organizations, and regulators who need to validate LLMs before deployment in mental‑health products. The design must be clean, functional, and accessible while embedding mental‑health UI principles such as trauma‑informed colors and a non‑dismissable 988 crisis banner.

## Visual Style

A minimalist design language: sans‑serif typography, generous white space, and a restrained color palette.
Use subtle drop shadows and rounded corners only on interactive elements.
No textures or heavy graphics; keep images minimal and purpose‑driven.

- Primary colors: calm teal/blue‑green (#005C65, #017A8D) for interface elements and accents.
- Accent colors: warm peachy tones (#ECA97C, #F3B890) used sparingly for buttons, badges, and call‑to‑action elements.
- Neutral background: off‑white (#FAFAFA) or light gray (#F5F5F5) to keep focus on content.

## Core UI Components

Use Tailwind utility classes for spacing and alignment; keep the design uncluttered.

### Header

Fixed top bar with platform logo, title “TrB‑DeepHealth: LLM Testing Platform”, and a subtitle “Testing LLMs for Safe Mental Health Product Development”.
Include a “Theme Toggle” (light/dark) and a “Docs” link.
988 crisis banner sits just below the header, non‑dismissable, with teal background and white text: “If you or someone you know is in crisis, call 988 immediately.”

### Sidebar (Scenario Panel)

Each item shows an icon from FontAwesome, a title, and a short description (max 2 lines).
Hover: subtle background highlight (#E2E8F0).
“+ Add Custom Scenario” button at the bottom, using a circular icon.

Collapsible vertical panel on the left containing a list of pre‑configured test scenarios:

- Crisis Detection Suite
- Medical Boundary Tests
- Emotional Support Validation
- Youth Safety Protocols
- Custom Test Builder

### Main Area (Test Interface)

Chat‑style panel occupying majority of the viewport.
Input box at bottom with placeholder “Type your prompt…”. Minimum touch area 44px in height.
Real‑time response display with timestamps. Each LLM reply is annotated with a safety flag badge (green, yellow, red) and a tooltip explaining the flag.
“Run Test” button (primary teal) and “Batch Mode” toggle (secondary gray) above the chat.
Metrics should animate numbers when updated and change color based on thresholds (green >80, yellow 50‑79, red <50).

Real‑time metrics bar below the chat showing:

- Safety Score
- Boundary Compliance
- Empathy Rating
- Response Time (ms)
- Consistency Score

### Results Analyzer

- Slide‑in panel from the right or modal overlay when “View Results” is clicked.
- Displays comprehensive charts (Recharts) for each metric, with tooltips.
- Export options: CSV, PDF, JSON. Export button styled in warm accent.
- Comparison view placeholder for side‑by‑side LLM comparison.

### Dashboard & History

Separate page/tab showing:

- Test History table (date, scenario, safety score, duration).
- Compliance Report card with check marks for each regulatory element.
- Export button at top right.

## Interaction & Animation

- Hover effects: slight scale (1.02) on buttons, fade‑in on tooltips.
- Transition animations: smooth slide‑in for panels, fade‑out for modals, subtle pulse on safety flag when flagged.
- Focus styles: clear outline for keyboard navigation, respecting WCAG 2.1 AA contrast.
- Loading states: skeleton screens for chat and results panels.

## Texture & Material

- No paper or hand‑drawn textures; use flat design.
- Icons sourced from FontAwesome; images only if needed from Unsplash or Pexels.

## Layout Guidelines

- Use a responsive grid: sidebar 250px wide on desktop, collapsible on mobile. Main content flex‑grow.
- On mobile, stack sidebar in a drawer that slides in from the left.
- Ensure all interactive elements are at least 44px tall and 44px wide for touch.

## Element Relationship

- Sidebar items are primary navigation; main area is focus of interaction.
- Metrics bar sits directly beneath chat, indicating real‑time feedback.
- Results panel overlays without blocking the entire view; can be dismissed.

## Target User Experience

- Convey safety and trust: calm colors, clear safety badges, and a prominent crisis banner.
- Prioritize clarity: minimal text, concise labels, and clear call‑to‑action.
- Facilitate efficiency: quick navigation, real‑time metrics, and easy export.

## Device Context

- Provide a desktop frame (browser window) and a high‑resolution tablet frame (iPad Pro) to preview responsive behavior.
- Include screen orientation toggles for portrait/landscape preview.

## Resources

Use copyright‑free resources like FontAwesome, Unsplash, Pexels, or similar services for image, font, and video placeholders.
