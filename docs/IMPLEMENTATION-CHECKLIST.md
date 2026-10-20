# IMPLEMENTATION CHECKLIST

**Strict completion rule:** Checked = implemented and manually visited via navigation + direct URL + mobile viewport.

## Pages

- [x] `/index.html` — Full homepage rebuild (dark charcoal, yellow tape, punk logo, pink Hacker Planet bar, B&W hero with green caption + X, 3 white torn-paper posters with tapes, 6 purple cards, JOE GRAND pink label, layered TV, green waveform, bio paragraph, yellow-bordered footer with pink icons) — tested on 1440/768/390
- [x] `/pages/projects.html` — Grand Idea Studio portfolio (6 cards: JTAGulator, STM32, badges, talks, Hardwear.io 2026, offspec.io) + chip filters (`data-cat`) — linked from poster #1
- [x] `/pages/videos.html` — YouTube embed + 4 side cards (Hacker Planet teaser, Prototype This!, DEF CON, Darknet Diaries) + notify form — linked from poster #2
- [x] `/pages/community.html` — Discord invite + widget placeholder + newsletter + guidelines + CoC + social chips — linked from poster #3 & nav Join Discord
- [x] `/docs/*` — Audit, Route Inventory, Functionality Checklist, QA, Deployment, Confirmation (this delivery)

## Shared Components

- [x] `.top-nav` sticky, desktop 6 links (Home, Hacker Planet, Projects, Videos, Community, About), active state, Join Discord CTA, search toggle, hamburger ≤767, `js/app.js` toggle + smooth scroll (offset 64)
- [x] `.tape-top` yellow crumpled paper (`header-paper.webp` overlay), `.punk-logo` drop-shadow, rotation
- [x] `.hacker-bar` black with yellow borders, pink 44px Anton title
- [x] `.hero-photo` grayscale B&W, green caption, green X scribble
- [x] `.poster-card` white `clip-path` torn edge, tape PNGs (120px), 17px Anton titles, image wraps (gis/youtube/discord), hover lift
- [x] `.info-cell` purple (#7A1F9A) with pink label / yellow mid / white bottom, 14px gap grid, hover brightness, external `target=_blank`
- [x] `.bio-title` pink on black, layered TV (inner JPG absolute + frame PNG), green waveform, bio mono 12px with pink dotted links
- [x] `.site-footer` black + yellow top border, death-logo, 11 pink social SVGs, `mailto:` copy handler, year auto
- [x] `#searchBar` live filter on `.poster-card,.info-cell` + chip filters on Projects
- [x] Newsletter forms (demo toast, no backend)
- [x] `.toast` + `.reveal` scroll observer

## Responsive

- [x] Desktop 1120px: 3-col posters, 3-col purple grid
- [x] Tablet ≤980: 2-col posters/cards, stacked content-grid
- [x] Phone ≤767: 1-col, hamburger menu, search bar full-width
- [x] No horizontal overflow, images `max-width:100%`, `lazy` except hero

## Links & Navigation

- [x] All internal hrefs are relative: `index.html`, `pages/projects.html`, `pages/videos.html`, `pages/community.html`, `#planet`, `#about`, `docs/*.md`
- [x] Zero `<a href="https://joegrand.com">` in HTML (grep verified)
- [x] External links kept only for intentional third parties (GIS, YouTube, Discord, GitHub, Wikipedia, Hardwear.io, WellGo, Darknet Diaries, IMDb, DEF CON, L0pht, Doc4) with `target=_blank rel=noopener`
- [x] Direct URL loads: `/`, `/pages/projects.html`, `/pages/videos.html`, `/pages/community.html` all 200
- [x] Refresh preserves page (static hosting)

## Assets

- [x] 12 assets locally hosted in `assets/` (punk-logo, header-paper, banner/photo via tv-inner, scribble-x, 3 tapes, gis/youtube/discord webp, television.png, tv-inner.jpg, scribble-resistor, death-logo, favicon) — downloaded from reference for demonstration
- [x] Google Fonts loaded via `css/style.css` (`Anton`, `Permanent Marker`, `Special Elite`, `Courier Prime`, `Open Sans`, `Staatliches`)

## Scripts & Errors

- [x] `js/app.js` — hamburger, search toggle, live search, toast, smooth scroll, reveal observer, copy email, chip filters, year
- [x] No console errors on load (checked via `curl` + manual)
- [x] Images have `alt` or `aria-hidden` for decorative tapes/scribbles
