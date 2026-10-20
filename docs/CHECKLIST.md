# To-do Checklist — Status (as of 2026-10-20, commit pending)

Legend: ✅ done · 🟡 partial/blocked · ⬜ pending (owner: **you** unless noted)

## 1. Fix now (embarrassing or misleading)
- ✅ Rickroll (`dQw4w9WgXcQ`) replaced with the real video — "How I hacked a hardware crypto wallet and recovered $2 million" (`dT9y-KQbqi4`), plus the real Cold Wallet trailer (`Rv668hG9UnY`) and Joe Grand clip (`98EqPjDqgSA`).
- 🟡 Newsletter forms (Home, Videos, Community) are wired through `js/config.js`: paste a Buttondown/Formspree/Mailchimp URL into `newsletterEndpoint` and all three forms go live instantly. Until then they honestly save locally and say so. **Needs your provider account.** The "One email/month" promise is removed everywhere.
- ✅ Real links added: Hardware Hacking Basics → course intro video + training page; Prototype This! → IMDb (tt1267244), Discovery page, and Joe's clips playlist; DEF CON Badge Talks → real recordings (DC15/17/18/22/24/27) + Joe's playlists.
- ✅ Placeholder text removed: Discord-widget copy replaced with live stats + explanation, Code-of-Conduct placeholder → link to real CoC page, "Demo form…" text gone, "YouTube Policy" and "Independent Note" blocks deleted, "Replace video IDs" gone.
- ✅ Footer "Docs" (.md) link removed; replaced with a real footer link row (About/Projects/Badges/Talks/Training/Press/Contact/Privacy/CoC/Repo).
- ✅ "Watch teaser" now opens the actual Cold Wallet official trailer on YouTube (Well Go USA channel).

## 2. Verify content
- ✅ Discord member count corrected: was fabricated "~5k+" → real **~1,970 members / ~218 online** (Discord invite API, 2026-10-20).
- ✅ "Wired, BBC" claims removed → replaced with verified outlets: The Verge, EL PAÍS, PCMag, NXP, Hackaday, CSO, WaPo.
- ✅ "Honorary Doctor" **verified** — honorary Doctorate of Science in Technology, University of Advancing Technology (kept).
- ✅ "Congress testimony at 22" **verified** — PCMag + Senate record, May 19, 1998, age 22 (kept).
- ✅ "$2M" in video title **verified** — actual video title; 6M+ views (kept).
- 🟡 Social handles: X, YouTube, Mastodon cross-verified from Joe's official profiles; Instagram/Threads/TikTok/Facebook follow his consistent `@joegrandofficial` naming. Final confirmation by user recommended.
- ✅ Hardwear.io NL 2026 course link live (HTTP 200).
- ✅ Fan tribute vs official **decided: fan tribute** — stated on the home hero callout and in every page footer. Flip only with Joe's written permission.

## 3. Pages to build
- ✅ About (`pages/about.html`) — long bio + 14-entry verified timeline + Person schema.
- ✅ Project pages — `pages/projects/jtagulator.html`, `stm32-fault-injection.html`, `trezor-recovery.html` (specs, write-ups, resources). 🟡 Rest of catalog links out to the official portfolio by design.
- ✅ Badge gallery (`pages/badges.html`) — DC14–DC18 + DC27, year by year, photo licensing routed to official portfolio.
- ✅ Talks & Publications (`pages/talks.html`) — dated, with recordings/slides/books.
- ✅ Training (`pages/training.html`) — syllabus (9 modules), details, 2026 schedule, booking buttons.
- ✅ Contact/Hire (`pages/contact.html`) — service-category select, honest mailto compose, consent line.
- ✅ Press kit (`pages/press.html`) — short/long bio, licensing notes, interview index.
- 🟡 Shop/links — nothing to sell on a fan page; catalog links live in Projects. Revisit if an official store launches.
- ✅ Code of Conduct (real text, Contributor Covenant 2.1 adapted) + Privacy Policy.
- ✅ Custom 404 (`404.html`, auto-served by GitHub Pages).

## 4. Design and UX
- 🟡 Mobile/tablet/desktop — responsive media queries added for all new grids; hamburger + TV overlay work via `js/app.js` base. Final human visual sweep on devices pending.
- 🟡 Contrast — reviewed pass (yellow/pink on charcoal ≥ 4.5:1); run Lighthouse for the formal score.
- ✅ Search icon (⌕) toggles a real debounced filter across posters, info cells, and page cards.
- ✅ Filter chips (All / Security Tools / Badges / Talks & Media) have real behavior + `aria-pressed`.
- ✅ `:focus-visible` outlines added site-wide for keyboard users.
- ✅ Consistent button wording; ✦ ▶ ◐ are decorative next to real text labels (`aria-hidden`), never alone.

## 5. Technical and SEO
- ✅ Alt text everywhere; decorative images `alt=""` + `aria-hidden`.
- ✅ Open Graph + Twitter cards with social preview image on all pages; `theme-color`.
- ✅ Unique meta description on every page.
- ✅ Person JSON-LD (home + about), `sitemap.xml`, `robots.txt`.
- ✅ Favicon + apple-touch icon.
- ✅ Hero portrait compressed (see commit) + `loading="lazy"` below the fold, `decoding="async"`.
- ✅ YouTube embeds → click-to-play facades on `youtube-nocookie.com` (no cookies until play).
- ⬜ Lighthouse 90+ — run after deploy; architecture is Lighthouse-ready.
- ✅ Broken links — internal path validator + external HEAD audit run with this commit (see CI log in commit message / workspace output).
- ⬜ Privacy-friendly analytics — needs your Plausible/Umami account & domain. No fake counters added.
- ⬜ Custom domain via GitHub Pages — your decision (one API call + DNS when ready).

## 6. Legal and ethics
- 🟡 Image/logo licensing — documented (`pages/press.html`); assets are tribute-use recreations; official media requests routed to the studio. Formal audit when you confirm the fan-tribute status.
- ✅ No cookies set by the site; YouTube is click-to-play, so no cookie notice required today. Revisit if analytics/ads are added.
- ✅ Consent checkbox + unsubscribe promise on every newsletter form (also documented in Privacy).

## 7. Before launch
- ⬜ Joe Grand / team review — requires you to send it to them.
- ✅ Proofread pass (claims verified against sources in this commit).
- ✅ Link & form test pass (this commit's audit).
- ⬜ Search Console sitemap submission — after custom-domain decision.

## External references verified 2026-10-20
- `dT9y-KQbqi4` $2M Trezor recovery · `Rv668hG9UnY` Cold Wallet trailer · `98EqPjDqgSA` Cold Wallet clip · `EI9wiOgNl8U` course intro
- Playlists: Wallet Hacking, DEFCON Badges, JTAGulator, Presentations, Interviews, Livestreams, Prototype This, PCB Deconstruction, Awesome Electronics Workshop (all from `@JoeGrand`)
- Talks: DC15 `T38C1KqE4io`, DC17 `z6W-kgoN0WE`, DC18 `9VDwC5nBTrs`, DC22 (archive.org), DC24 (media.defcon.org), DC26 workshop PDF, DC27 `gnZQcWIX02A` + `BnJT3wdhGFc`, L0pht hearing `VJEty2LVFUw`
- Press: The Verge, EL PAÍS, PCMag, Darknet Diaries #155, Crowd Supply, CSO, NYT, hackaday, NXP, WaPo
- Prototype This! IMDb `tt1267244` + discovery.com · Cold Wallet IMDb `tt27307826` + wellgousa.com
- Discord invite `wud8KnF2Gm` → guild "Joe Grand's Official Server" (1,969 members live)
