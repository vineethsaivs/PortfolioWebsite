# Design

Captured from styles/cosmic.css, styles/blog.css, index.html and blog/*.html. This is the committed visual system; preserve identity, refine craft.

## Theme

Black observatory. Pure black space, white text, one red (MKBHD black/white/red), starfield canvas behind everything, one signature 3D "My Universe" scene. The blog pages are the most refined expression of the system: restrained, typographic, terminal-flavored details (status dots, waveform SVGs, beep dividers).

## Color

Black is the room, white is the voice, red is the signal.

- One red: `#ed0612`. 4.5:1 or better on pure black, on pure white, and under white text.
- Dark (default): ground `#000`, surface `#0f0f0f`, text `#fff` / `#b8b8b8` / `#8c8c8c`.
- Light: ground `#fff`, surface `#f4f4f4`, text `#0a0a0a` / `#404040` / `#6b6b6b`.
- Red's jobs, and no others: the primary action, where you are (active nav), the red full stop after page titles, "wrong" (struck values, invalid fields), hover feedback, and at most one solid red block per page (Trojan PR panel, the Off hours closing band).
- Never: red body text, red labels at rest, red gradients or glows.
- Links are white (black in light) with a quiet underline that turns red.
- The universe planets are the one place with other colors.
- Blog: same palette; blue appears only in charts, and small red labels on grey use a lighter tint for contrast.
- One toggle (top right), one `localStorage` key (`theme`) for the whole site, via `js/theme.js`.

## Typography

- Display: Space Grotesk (500/700). Headings, names, quotes' titles.
- Body: Inter (400/500/700). No other web fonts on the main site.
- Mono (system stack) only for real code and values.
- Prose caps at 65-75ch.
- Page titles: large, left aligned, sentence case, white with a red full stop. No eyebrow labels.

## Components

- **Rows over cards:** lists (builds, essays, sports, timeline, ledger) are rows split by 1px rules.
- **Bookshelf:** covers stand on a shared shelf rule; titles, quotes and cues align across columns.
- **Courts:** each sport is an authored line drawing of its field of play.
- **Features:** projects with image or code panel, sized by importance (6 or 3 of 6 columns).
- **Fix rows:** wrong value struck through, correct value large, one paragraph, PR link.
- **Disclosure:** native `<details>` (research, skills, earlier projects).
- **Essay dialog:** native `<dialog>`, the signature reading surface. White or black page, one short red rule.
- **Nav:** right-side rail of circular links with tooltips; bottom bar on phones, active item shows its label.
- **Blog system** (blog.css): topbar, hero dek, TOC rail, stat strips, beep dividers.

## Motion

- Starfield twinkle and parallax.
- One authored moment: the hero headline rising into focus, with the orbiting portrait.
- Section fade on change; magnetic hero buttons.
- All off under prefers-reduced-motion.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.

## Layout

- One page, one section visible at a time. Nav items are real links; the hash picks the section.
- Content column 66rem. Breakpoints 1100 / 900 / 700.

## Known rough edges

- Open-source counts are static (dated on the page).
- The resume PDF is dated March 2026.
