# Route Inventory — Joe Grand Rebuild (Independent)

**Reference:** https://joegrand.com/ inspected 2026-10-20 (Africa/Lagos). Single-page architecture (Divi + WordPress). No authenticated routes found.

## Pages Audited (joegrand.com)
| # | Reference URL / Path | Type | Content | Status in Rebuild |
|---|---|---|---|---|
| 1 | `/` | Page | Hero “HACKER pLANeT” + banner.webp + scribble-x + tagline “A new video series… Coming soon!” | **Rebuilt as `index.html` hero-planet** — faithful layout, responsive, locally hosted assets |
| 2 | `/#poster-gis` | Section (anchor within `/`) | Poster card: Projects + Engineering / Grand Idea Studio / gis.webp → https://grandideastudio.com/ | **Rebuilt as `index.html` poster-card #1 + dedicated `pages/projects.html`** — internal link to Projects, external to GIS kept as external |
| 3 | `/#poster-youtube` | Section | Poster card: Videos / YouTube / youtube.webp → https://www.youtube.com/@JoeGrand | **Rebuilt as poster-card #2 + `pages/videos.html`** with YouTube embed + subscribe CTA |
| 4 | `/#poster-discord` | Section | Poster card: Community / Official Discord / discord.webp → https://discord.com/invite/wud8KnF2Gm | **Rebuilt as poster-card #3 + `pages/community.html`** with Discord invite + guidelines |
| 5 | Grid: Hardware Hacking | Link block | STM32 Fault Injection / GitHub → https://github.com/joegrand/stm32-fault-injection | **Rebuilt as info-grid cell (row 1, col 1)** — external link, preserved |
| 6 | Grid: training course | Link block | Hardwear.io NL 2026 / Amsterdam → https://hardwear.io/trainings/nl-2026/... | **Rebuilt as info-grid cell (row 1, col 2)** |
| 7 | Grid: Wikipedia | Link block | information / Wikipedia / Joe Grand → https://en.wikipedia.org/wiki/Joe_Grand | **Rebuilt as info-grid cell (row 1, col 3)** |
| 8 | Grid: Cold Wallet | Link block | Watch / Cold Wallet / Joe Grand Cameo! → https://wellgousa.com/films/cold-wallet | **Rebuilt as info-grid cell (row 2, col 1)** — external |
| 9 | Grid: Darknet Diaries | Link block | Listen / DARKNET DIARIES / Episode 155: Kingpin → https://darknetdiaries.com/episode/155/ | **Rebuilt as info-grid cell (row 2, col 2)** |
| 10 | Grid: IMDb | Link block | information / IMDb / Joe Grand → https://www.imdb.com/name/nm2706174/ | **Rebuilt as info-grid cell (row 2, col 3)** |
| 11 | Bio: joe GRAnd | Section | TV composition (television.png + tv-inner.jpg + scribble-resistor.png) + bio paragraph with 7 inline links (DEFCON, L0pht, tools, badges, videos, talks, training) | **Rebuilt as `index.html#about` bio-section** — layered TV with CSS, inline links preserved as internal where appropriate |
| 12 | Header | Chrome | Crumpled-paper background (header-paper.webp) + punk-logo.webp + tagline | **Rebuilt as `.site-header`** — locally hosted, sticky top-nav added for independent navigation |
| 13 | Footer | Chrome | death-logo.webp + 11 social icons (email, YouTube, Discord, X, Facebook, Instagram, Threads, chaos.social, Bluesky, TikTok, GitHub) + © 2026 + Designed in Arkansas by Doc4 | **Rebuilt as `.site-footer`** — SVG icons inlined, mailto preserved, all social links preserved as external |

**No other indexable routes** found on the reference domain (no `/about`, `/blog`, `/sitemap.xml` content beyond homepage). `robots.txt` and `?feed=rss2` are WordPress defaults, not user-facing pages.

## New Internal Routes (Independent Implementation)
These do NOT exist on the reference but were added to satisfy “not merely copy the homepage” and to host external destinations without redirecting to joegrand.com:

| Route | Purpose | Internal Nav | Notes |
|---|---|---|---|
| `/index.html` | Home — full visual rebuild | Top nav Home, anchors #planet / #about | Responsive 1200 / 980 / 767 breakpoints |
| `/pages/projects.html` | Portfolio showcase (JTAGulator, fault injection, badges, talks) | Top nav Projects | Filters via `.chip` + `data-cat` |
| `/pages/videos.html` | YouTube + Hacker Planet teaser, Darknet Diaries, Cold Wallet | Top nav Videos | YouTube iframe embed, demo newsletter form |
| `/pages/community.html` | Discord, mailing list, guidelines, social cluster | Top nav Community, footer CTA | Discord widget placeholder + CoC |
| `/docs/ROUTE-INVENTORY.md` | This file | Footer “Route Inventory” | Delivered as requested |
| `/docs/FUNCTIONALITY-CHECKLIST.md` | Checklist + integrations backlog | Footer “Functionality Checklist” |  |

All new internal navigation uses relative URLs (`../index.html`, `pages/...`) and never links to `https://joegrand.com` except in documentation as the reference. External links (GIS, YouTube, Discord, GitHub, Wikipedia, Hardwear.io, WellGo, Darknet Diaries, IMDb, L0pht wiki, DEF CON) are intentionally kept as external — they are not joegrand.com redirects.

## Shared UI (preserved across all pages)
- Sticky top-nav with mobile hamburger (767px), search toggle, “Join Discord” CTA
- Paper-textured header with punk logo
- Poster-card shadows/tape, info-grid borders, TV layering, resistor scribble, footer death-logo + social grid
- Toast system, smooth scroll, reveal-on-scroll
- Forms: newsletter subscribe (demo handler)

## Responsive Layouts
- Desktop: 1200px max, 3-col posters, 3-col info-grid, TV 760px wide
- Tablet ≤980px: 2-col posters, 2-col info-grid, stacked content-grid
- Phone ≤767px: 1-col everything, hamburger menu, full-width cards

## Assets
Locally hosted in `/assets/` (downloaded from reference for faithful rebuild): header-paper.webp (663k), punk-logo.webp (143k), banner.webp (185k), gis/youtube/discord webp (257–663k), television.png (367k), tv-inner.jpg (590k), scribble-x/resistor, tape-one/two/three, death-logo.webp, favicon.png. No private credentials or proprietary backend reused.

## To-do Pass (2026-10-20) — new routes
- `/pages/about.html` — bio + verified timeline + Person schema
- `/pages/talks.html` — talks, recordings, slides, publications
- `/pages/training.html` — Hardware Hacking Basics syllabus + booking
- `/pages/press.html` — press kit (bios, licensing, interview index)
- `/pages/badges.html` — DEF CON badge gallery (DC14–DC18, DC27)
- `/pages/contact.html` — hire form (service categories, mailto, consent)
- `/pages/privacy.html` — privacy policy · `/pages/code-of-conduct.html` — real CoC
- `/pages/projects/jtagulator.html` · `/stm32-fault-injection.html` · `/trezor-recovery.html`
- `/404.html` (custom), `/sitemap.xml`, `/robots.txt`, `/js/config.js`
