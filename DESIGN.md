# Design

Captured from the existing code (styles/cosmic.css, styles/blog.css, index.html, blog/*.html). This is the committed visual system; preserve identity, refine craft.

## Theme

Dark observatory. Near-black space backgrounds, a single red accent (MKBHD black/white/red), white text, starfield canvas behind everything, one signature 3D "My Universe" scene. The blog pages are the most refined expression of the system: restrained, typographic, terminal-flavored details (status dots, waveform SVGs, beep dividers).

## Color

- `--bg-deep: #0a0a0a` (body)
- `--bg-surface: #141414` (cards, bars)
- `--bg-elevated: #1e1e1e` (controls)
- `--accent-red: #e50914`, `--accent-red-light: #ff2d3b`, `--accent-red-dark: #b30710`
- `--text-primary: #f5f5f5`, `--text-secondary: #a0a0a0`, `--text-muted: #666`
- Borders: `rgba(255,255,255,0.08)`; red-tinted borders at ~0.2 alpha for hover/active.
- Per-passion colors exist in the universe/dive system (green football, yellow tennis, purple Nietzsche, etc.); they appear only inside dive modals and 3D spheres, never on the page chrome.

Strategy: restrained. Red stays an accent (lines, links, active states, key words), never large fills except small buttons and the active nav dot.

## Typography

- Display: Space Grotesk (500/700). Headings, titles, nav brand.
- Body: Inter (400/500/700).
- Poppins is loaded as fallback legacy; do not extend its use.
- Body size 1.05-1.1rem, line-height ~1.7-1.8 for prose; essays cap around 65-75ch.
- Section titles: large Space Grotesk with one red-accent word.

## Components

- **Glass card** (`.glass-card`): dark translucent surface, 1px subtle border, 16px radius, red-tinted glow on hover, slight lift. Used for projects, stats, books, sports.
- **Dot nav** (`.controls`): fixed right-side circular icon buttons with tooltips; active = red gradient circle. Mobile: bottom bar.
- **Timeline**: 2-col grid, red left rule, circular red icon, duration chip.
- **Skill accordions**: bordered category rows with pill clouds.
- **Dive modal** (`.content-deep-dive`): centered dark sheet, emoji, colored title, accent bar, essay paragraphs. The signature reading surface.
- **Blog system** (blog.css): topbar `VINEETH.`, eyebrow + hero dek + status dot, TOC rail, stat strips, beep dividers, waveform SVGs.

## Motion

- Starfield twinkle + cursor parallax; cursor red glow (desktop only).
- `[data-reveal]` fade/slide on section activation.
- Typing headline loop in hero.
- Card tilt on hover (subtle, 6deg).
- All gated behind prefers-reduced-motion already; keep it that way.
- Easing: ease-out / cubic-bezier(0.16, 1, 0.3, 1) for modals.

## Layout

- Single-page tab architecture: sections are absolutely positioned, toggled by `.active` via the dot nav (not a scroll page). Each section is its own "room", which fits the "one heavy thing at a time" principle.
- Container padding ~3rem 18rem on desktop, stepping down through breakpoints (1432 / 1250 / 1070 / 970 / 700 / 660 / 600 / 520).
- Grids: portfolio and book/sport cards 3 -> 2 -> 1 columns.

## Known rough edges (for audits)

- index.html head lacks description/OG/favicon while blog pages have full meta.
- Hover-only project titles and links are invisible to touch and keyboard.
- Contact section facts lag the timeline (old Google title); form posts to a placeholder endpoint.
- Duplicate project cards; one timeline glow animates to an off-palette purple.
- No deep links to sections (tab state is not in the URL).
