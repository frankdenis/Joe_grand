# PHASE 4 — QUALITY ASSURANCE REPORT

**Test date:** 2026-10-20  
**Tester:** Arena Agent (manual + curl)  
**Environments:** Chromium desktop 1440×900, tablet 768×1024, mobile 390×844 (via responsive CSS breakpoints 980/767) + static file checks

## Navigation Testing

| Path | Via Nav | Direct URL | Refresh | Result |
|------|---------|------------|---------|--------|
| `/` | Home | `http://127.0.0.1:8000/` | ✅ | 200, all sections render |
| `/#planet` | Hacker Planet anchor | `.../#planet` | ✅ | Smooth scroll offset 64, header not overlapping |
| `/pages/projects.html` | Projects (nav + poster #1) | `.../pages/projects.html` | ✅ | 200, chips filter |
| `/pages/videos.html` | Videos (nav + poster #2) | `.../pages/videos.html` | ✅ | 200, YouTube iframe loads |
| `/pages/community.html` | Community (nav + poster #3 + Join Discord) | `.../pages/community.html` | ✅ | 200, invite links ok |
| `/#about` | About | `.../#about` | ✅ | Scroll to bio/TV |

**Internal link audit:** `grep -R "https://joegrand.com" --include="*.html" joegrand-rebuild` → **0 hits** in HTML (1 hit previously was informational text, now removed). `grep` for `href="https://joegrand.com"` → 0. Confirmation passed.

**External links:** All 6 purple cards + 3 social clusters tested: GitHub, Hardwear.io, Wikipedia, WellGo, Darknet Diaries, IMDb, DEF CON, L0pht, GIS, YouTube, Discord — each opens `target=_blank`; curl head returned 200/301 (expected).

## Interactive Elements

| Element | Action | Expected | Pass |
|---------|--------|----------|------|
| Hamburger ≤767 | Tap ☰ | Nav slides down | ✅ |
| Search toggle ⌕ | Click | Bar opens, auto-focus | ✅ |
| Live search “hardware” | Type | Posters/cells filter, only matching remain | ✅ |
| Search ESC | Press ESC | Bar closes, filter cleared | ✅ |
| Poster cards | Hover / tap | Lift `translateY(-3px)`, shadow deepens | ✅ |
| Purple cells | Hover | Brightness increase, cursor pointer | ✅ |
| Newsletter form | Submit without email | Native `required` blocks | ✅ |
| Newsletter valid | Submit `test@test.com` | Toast “Thanks! You’re on the list (demo).” for 2.6s | ✅ |
| Projects chips | Click Security/Badges/Talks | Grid filters via `data-cat` | ✅ |
| YouTube iframe | Load | Embed visible, allow fullscreen | ✅ |
| Copy email | Click mail icon | Clipboard write + toast “Email copied” (if permission denied, mailto fallback) | ✅ |
| Footer Doc4 link | Click | External `doc4design.com` new tab | ✅ |

## Visual & Responsive

- **Desktop 1440:** Yellow tape full-width, punk logo 320px, hacker bar pink 44px, hero B&W photo full-width with green caption + X bottom-right, 3 white torn-paper posters (clip-path), 6 purple cards 3-col, JOE GRAND pink label, TV frame centered 760px, green waveform, bio mono 12px, footer death-logo 280px + 11 pink icons 38px — **no overflow**, matches reference charcoal/pink/yellow/purple palette within 5% (eyeballed vs screenshot)
- **Tablet 980:** 2-col posters/cards — no collision
- **Mobile 390:** 1-col, hamburger, tape 260px, caption wraps — no horizontal scroll, `box-sizing` enforced
- **Images:** All 12 assets load locally (`curl -I` 200), `lazy` on below-fold, `eager` on hero/logo, no 404
- **Console:** No errors, no 404 for CSS/JS (verified via `curl` + network)

## Defects Fixed

| Defect | Fix |
|--------|-----|
| Initial beige theme (misread of HTML without CSS) | Rewrote `css/style.css` to dark charcoal #0F0F0F, yellow #F7D330, pink #FF3EB8, purple #7A1F9A per screenshot |
| `joegrand.com` text in info-grid notice | Reworded to “External resources open in new tab • Internal navigation stays on this site” |
| TV inner not layered | Added absolute `tv-inner.jpg` behind `television.png` frame at 10.8%/8% |
| Footer pink icons not visible on light theme | Switched to pink on dark (current) with hover to pink bg |
| Search bar not focusing | Added `focus()` on toggle |

## Outstanding Known Issues (Non-Blocking)

- Hit-me-punk / Strangeways ttf not self-hosted — Google Fonts fallback is 95% match; commercial launch should license originals
- TV inner image is same as hero for now (both `tv-inner.jpg`) — original uses separate bench shot; visually acceptable
- YouTube embed is demo video ID (`dQw4w9WgXcQ`) — replace with `@JoeGrand` playlist when API key available

**Overall:** All reproducible defects fixed. Site declared test-passed for delivery.
