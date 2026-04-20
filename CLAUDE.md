# Portfolio2 — Luke Cannon's 90s Kitsch Portfolio

## Project Overview

A personal portfolio site built to look like an earnest GeoCities/early-blogspot page from 1998. The aesthetic is intentionally "so bad it's good" — committed to the bit, but restrained enough that it's readable and not overwhelming. The joke is that it's written and designed like a very enthusiastic 14-year-old webmaster, who also happens to be a skilled developer.

The site replaces lukecannon.dev, which is clean and competent but forgettable. This should be memorable.

## Tech Stack

- **Framework**: Astro (static site generator, compiles to plain HTML, zero JS by default)
- **Styling**: 98.css (for Windows 98-style UI components: windows, dialogs, buttons) + custom CSS for kitsch/background/color elements
- **Interactivity**: Vanilla JS in `<script>` tags — no framework
- **Animation**: Anime.js v4 — `animate()` for movement, `createTimeline()` for sequenced animations, `createDraggable()` for drag interactions
- **Backend**: Firebase Firestore (free tier) — page view counter and guestbook comments
- **Hosting**: TBD (Netlify or Vercel both work fine with Astro)

## Visual Reference

The Scryfall "Dootscape" April Fools design is the closest existing reference for the target vibe. Key things to take from it:
- **Starfield background** — tiny white dots on near-black, tiling seamlessly. Feels like deep space.
- **Segmented digital visitor counter** — styled like a scoreboard/calculator display ("You are visitor: 0000206232"), not just plain text.
- **Badge wall** — 88x31 badges laid out as a real section, not an afterthought.

What to dial back compared to that reference (it's slightly too intense):
- Skip the fire/flame border effect along the bottom edge — too much
- Don't pack badges so densely they become visual wallpaper — leave some breathing room
- Nothing from that design is mandatory, it's just the closest existing example of the right energy

## Aesthetic Guidelines

### Colors
- Background: near-black with a subtle dark navy tint (not pure `#000000` — too flat)
- Accents: neon — hot pink, lime green, cyan. Used as highlights, not everywhere.
- Text: white or near-white on dark sections; black on 98.css window elements
- No lavender, no soft gradients, no "modern minimal" anything

### Background
- Tiled starfield — tiny white/pale dots on dark background, seamlessly tiling
- Should feel like deep space, not a busy texture

### Typography
- 98.css will handle UI element fonts (system fonts, pixel-accurate)
- Comic Sans used deliberately and sparingly — it's a joke, not the whole site
- General body text should be readable (Verdana or Georgia — both very 90s web)

### UI Components
- 98.css `.window` components used for dialogs and popups (e.g. VisitorPopup), not for project sections
- Dialogs, inset borders, raised buttons — lean into 98.css wherever it makes sense
- Reusable `Modal.astro` component wraps 98.css window styling; open/close via `src/utils/modal.ts` (`openModal(id)` / `closeModal(id)`)
- Scrollbars styled if possible

### Project Section Design Pattern
Each project section on `/projects` is its own distinct visual world — not a uniform card/window layout:
- **Waystone**: Parody early-2000s software product page. Light `#d4d0c8` Win98-grey background, navy header, feature list, fake awards, system requirements gag. Reference: Download.com / WinZip era.
- **Portraits**: Cork board with draggable polaroid-style portrait prints and torn-paper notes pinned to it. Interactive — portraits are clickable to open a modal viewer.
- New project sections should each get a distinct treatment that fits the content, not a repeated template.

### Copy Voice
The writing throughout should sound like a very earnest 90s webmaster:
- "Welcome to my corner of the internet!"
- "This site is best viewed at 800x600 resolution"
- "Sign my guestbook!!!"
- Lists written like: "I like: coding, art, LARP, making cool things"
- Excessive exclamation marks in section headers are fine
- "Under construction" somewhere that never gets finished

### Decorative Elements
- Hit counter styled as a segmented digital display ("You are visitor: 0000206232") — scoreboard aesthetic, not plain text
- Web badges section — 88x31 pixel format, mix of downloaded and homemade, with some breathing room between them
- At least one "under construction" animated GIF
- Rotating joke messages section (cycles randomly through a JS array of one-liners)
- Blinkies or similar small animated images where appropriate

## Site Structure

Four pages, file-based Astro routing:

### `/` — Home (index.astro)
- Welcome message in 90s webmaster voice
- Hit counter (live, reads from Firestore)
- Rotating joke messages section (Anime.js, cycles randomly)
- Web badges strip
- Navigation to other pages
- "Under construction" gif somewhere

### `/projects` — Projects
- **Waystone** (character creator, `concordlarp.com`) — parody software product page (`src/components/waystone/WaystoneSection.astro`)
- **Portraits** — interactive corkboard with draggable prints and modal viewer (`src/components/portraits/PortraitsBoard.astro`)
- Additional projects as needed; each gets its own visual treatment

### `/contact` — Contact
- Links to: Email, Resume (PDF), LinkedIn, GitHub
- Styled as a 98.css dialog box
- Copy in 90s voice ("Want to hire me?? Send a message!!")

### `/guestbook` — Guestbook
- Lists existing comments from Firestore
- Form to submit a new comment (name + message)
- Standard form submission to start; pinball ball-shooter UI is a stretch goal (see below)

## Firebase Setup

- Firestore database with two collections:
  - `pageviews` — single document with a counter field, incremented on each homepage load
  - `guestbook` — collection of comment documents with fields: `name`, `message`, `timestamp`
- Firebase config stored in environment variables (Astro `.env` support)
- Never commit API keys — use `.env` and add to `.gitignore`

## Stretch Goals (Do Not Build Until Core Is Complete)

These are cute but non-essential. Save for last.

1. **Pinball ball-shooter comment submission**: User pulls down a plunger, releases it, a ball flies across the screen and hits the Submit button. Vanilla JS drag + CSS animation.
2. **Animated project unlock interactions**:
   - One project card is dark until user drags a torch GIF over it (illuminates)
   - Another is a locked door until user drags a key to the keyhole
3. More projects / badge collecting

## Development Notes

- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

### File Structure
- `src/pages/` — Astro pages (file-based routing)
- `src/layouts/` — Layout.astro (imports 98.css and tokens.css globally)
- `src/styles/tokens.css` — CSS custom properties for all design tokens (colors, fonts). Add new tokens here.
- `src/components/` — Shared components
  - `src/components/portraits/` — Corkboard section components
  - `src/components/waystone/` — Waystone product page components
  - `src/components/delights/` — Interactive Easter eggs (UFO, etc.)
- `src/utils/modal.ts` — `openModal(id)` / `closeModal(id)` helpers
- `src/assets/` — Build-time assets (images, GIFs, audio). Import in frontmatter to get processed URLs.
- `public/` — Static assets served at a stable URL (use for anything fetched at runtime via `fetch` or `new Audio()`)

### Anime.js Patterns
- **Module scripts** (`<script>`) can use `import` from animejs — this is the default and preferred.
- **`define:vars`** converts a script to a classic (non-module) script — cannot use `import` inside it. Use data attributes on elements to pass build-time values (e.g. asset URLs) to module scripts instead.
- Audio files and other non-image assets imported in frontmatter give a processed URL usable at runtime.

## What This Site Is Not

- Not minimal, not clean, not modern
- Not AI-generated looking
- Not trying to be taken seriously on a design level — the joke is that it IS taken seriously, in 1998
- Not overwhelming to the point of being unreadable — restraint in the right places
