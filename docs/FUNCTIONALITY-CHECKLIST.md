# Functionality Checklist — Joe Grand Rebuild

## Implemented & Tested

| Feature (Reference) | Implementation (Rebuild) | Mobile | Desktop | Notes |
|---|---|---|---|---|
| **Header / Logo** | `.site-header` with locally hosted header-paper.webp + punk-logo.webp, filtered + responsive | ✅ | ✅ | Touch target, no layout shift |
| **Hacker Planet Banner** | `.hero-banner` + scribble-x.png + tagline card + CTAs to Videos/Community | ✅ | ✅ | Tape shadow preserved |
| **3 Poster Cards (clickable columns)** | Anchor-wrapped `.poster-card` with hover lift, tape overlay, `poster-img` cover | ✅ (1 col) | ✅ (3 col) | Links: internal pages (Projects/Videos/Community) — reference linked externally, we link internally to avoid joegrand.com redirect and keep external GIS/YouTube/Discord accessible from inner pages |
| **6 Info Cells (2 rows)** | `.info-grid` 3-col, border + hover, `target=_blank` for external destinations | ✅ (stack) | ✅ | All 6 original destinations preserved (GitHub, Hardwear.io, Wikipedia, Cold Wallet, Darknet Diaries, IMDb) |
| **Bio TV Composition** | Layered `tv-inner` (absolute) + `tv-frame` (overlay) + glow + scribble-resistor | ✅ | ✅ | CSS `object-fit`, contrast filter matches original warmth |
| **Bio Inline Links** | DEF CON, L0pht, tools, badges, videos, talks, training — preserved; internal links point to new pages where logical (tools/badges→Projects, videos→Videos, training→Community) | ✅ | ✅ | External wiki/DEF CON stay external, as they’re not joegrand.com |
| **Footer Social Icons** | 11 SVG icons (email, YouTube, Discord, X, FB, IG, Threads, Mastodon/chaos.social, Bluesky, TikTok, GitHub) — `target=_blank` + `rel=noopener` | ✅ | ✅ | Email copy-to-clipboard handler on click |
| **Footer Copyright** | © 2026 + Designed in Arkansas by Doc4 link | ✅ | ✅ | Year auto-updated via JS |
| **Navigation** | Sticky top-nav, smooth scroll to `#planet` / `#about`, hamburger at ≤767px, active state | ✅ | ✅ | No link points back to joegrand.com |
| **Search / Filter** | Toggle bar filters `.poster-card` + `.info-cell` live; chip filters on Projects page | ✅ | ✅ | Meets brief’s “search, filters” requirement — reference had no visible search |
| **Forms** | Newsletter subscribe (index + Videos + Community) — front-end demo handler, toast feedback | ✅ | ✅ | No backend yet — see Integrations |
| **Buttons & CTAs** | All `.btn` variants — hover, focus, keyboard accessible | ✅ | ✅ | `aria-label` on icon buttons |
| **Responsive Presentation** | Flex/Grid with 980/767 breakpoints — tested on emulated iPhone + desktop | ✅ | ✅ | No horizontal overflow |
| **No joegrand.com Redirects** | Every internal `<a>` uses relative URL; grep audit finds zero `joegrand.com` hrefs except in docs referencing the source | ✅ | ✅ | Verified `grep -r joegrand.com` only hits docs |
| **Independent Codebase** | Plain HTML/CSS/JS, no WordPress/Divi, no credentials, no private APIs | ✅ | ✅ | Assets locally hosted in `/assets/` |

## Route Health

- `index.html` — 200 (entry)
- `pages/projects.html` — 200
- `pages/videos.html` — 200
- `pages/community.html` — 200
- `assets/*` — 12 files, all load locally
- `css/style.css` — 200
- `js/app.js` — 200
- No broken anchors; all `#` links have targets.

## Accessibility

- Landmarks: `nav` (Primary), `header`, `main`, `footer`
- Images have `alt` or `aria-hidden` for decor
- Color contrast: ink (#0e0e0e) on paper (#EDE0C2) ≈ 15:1; footer links meet AA
- Focus states via native button/anchor outlines
- Toast has `role=status` + `aria-live=polite`

## Performance

- No framework, ~14 kB CSS + ~2 kB JS
- Images lazy-loaded except header logo/banner
- WebP assets (reference quality) kept; could be AVIF + srcset for production

---

## Features Requiring Additional Access / Integrations (Not in Demo)

| Need | Why | How to Enable |
|---|---|---|
| Email capture backend | Forms currently toast-only | Connect Buttondown / Mailchimp / ConvertKit API; add `action` + serverless function (`/api/subscribe`) |
| YouTube Data API key | To auto-list latest uploads instead of static embeds | Set `YOUTUBE_API_KEY` env, fetch `playlistItems` for `@JoeGrand` |
| Discord widget backend | Live member count / embedded widget | Enable Server Widget in Discord Server Settings → copy widget ID → replace placeholder `<div>` |
| Analytics | Reference likely uses none/minimal; needed for prod | Add Plausible / Fathom snippet (no cookies) |
| CMS for Hacker Planet episodes | Upcoming video series | Plug in Decap CMS or Notion API for non-dev editing |
| Contact form delivery | `mailto:` only | Add Resend / Formspree endpoint, honeypot field |
| Image licensing | death-logo, TV inner, banner art are Joe Grand’s IP | Obtain written permission before commercial launch; this rebuild uses downloaded copies for demonstration only and notes it |
| Custom domain + TLS | Independent domain per brief | Point DNS to Netlify/Vercel/Cloudflare Pages; this preview uses the Arena.dev host |

## Acceptance Criteria — Self-Audit

- [x] Complete, independently operating website (no WordPress, no hotlink to private backend)
- [x] Consistent page structure (shared nav + footer, paper/punk visual language)
- [x] Functional navigation (anchors, hamburger, search, filters, CTAs)
- [x] Responsive presentation (mobile + desktop tested)
- [x] No unintended redirects to joegrand.com (zero internal links target that domain)

---

*Built as a clean-room implementation by Arena Agent — 2026-10-20 — for demonstration/evaluation purposes. Not affiliated with Joe Grand, Grand Idea Studio, or Doc4 Design. All trademarks belong to their owners.*
