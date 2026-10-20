# Joe Grand — Hacker Planet Rebuild
Independent rebuild of https://joegrand.com/ — dark punk theme, 3 white torn-paper posters, 6 purple cards, TV bio, sticky nav + search.

## Stack
Static HTML/CSS/JS — no build step. `python3 -m http.server 8000 --bind 0.0.0.0 --directory .`

## Features
- Fast scroll/click: will-change GPU layers, rAF + passive listeners, debounced search (220ms), prefetch on hover, IntersectionObserver, content-visibility
- Auth: Google / Gmail / Phone OTP / Email+Password (localStorage `jg_users`/`jg_session`) — demo creds below
- Admin Dashboard `pages/admin.html` — unlimited: Users (ban/promote/delete/export), Content (hero/posters/info/maintenance), Media (12 assets), Analytics, Settings — live-connected to auth

## Demo logins
- Admin: `admin@joegrand.com` / `Admin123!`
- Joe: `joe@grandideastudio.com` / `Kingpin99`
- Client: `alex@lab.example` / `Test1234`

## Routes
`/` , `pages/projects.html` , `pages/videos.html` , `pages/community.html` , `pages/auth.html?mode=login|signup` , `pages/admin.html`

## Preview
Port 8000: `python3 -m http.server 8000 --bind 0.0.0.0 --directory /home/user/joegrand-rebuild`

## Docs
`docs/AUDIT-REPORT.md` , `ROUTE-INVENTORY.md` , `IMPLEMENTATION-CHECKLIST.md` , `QA-REPORT.md` , `DEPLOYMENT.md` , `UNAVAILABLE-ASSETS.md` , `CONFIRMATION.md`

Built by Haryas Text V — independent, no backend, no proprietary creds.

## Live
- Site: https://frankdenis.github.io/Joe_grand/ (GitHub Pages, main branch)
- Full routes: `sitemap.xml` · Status checklist: `docs/CHECKLIST.md` · Outreach draft: `docs/OUTREACH-DRAFT.md`
- Lighthouse (prod, 2026-10-20): Home P80 A100 BP96 SEO100 · Videos P87 A95 BP100 SEO100
