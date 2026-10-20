# UNAVAILABLE ASSETS, BLOCKED PAGES & EXTERNAL ACCESS REQUIREMENTS

## Missing / Permission-Required Assets
| Asset | Reference Location | Status in Rebuild | Action Needed |
|-------|-------------------|-------------------|---------------|
| Hit-me-punk-14.ttf, Strangeways.otf | `https://joegrand.com/wp-content/uploads/et-fonts/` | **Not self-hosted** — replaced with Google Fonts (`Anton`, `Permanent Marker`) visually equivalent | Obtain license from Doc4/Joe Grand to self-host original punk fonts before commercial launch |
| Banner B&W portrait high-res | `joe-grand-banner.webp` 1394×1394 | Used `tv-inner.jpg` (2560×1707) as hero — same subject (Joe in beanie) but different crop | Request original banner crop if exact match required |
| Death logo IP | `joe-grand-death-logo.webp` | Downloaded for demo (1834×1144) | Written permission from Joe Grand for commercial use |
| GIS/Youtube/Discord poster photos | `gis.webp`, `youtube.webp`, `discord.webp` | Downloaded, displayed inside white torn-paper cards | Same — confirm reuse rights |
| TV inner bench shot | `tv-image-joegrand-hh-scaled.jpg` | Downloaded, layered behind `television.png` | Permission retained |

None are blocked technically; all downloaded successfully for demonstration. For production, replace with licensed copies or equivalent placeholders.

## No Blocked Pages
All reference URLs returned 200 and were inspected. No login, paywall, or 403 encountered on `joegrand.com/`. `robots.txt`/`sitemap.xml` simply not present — not a block. Portfolio content lives on `grandideastudio.com` (external) — not in scope to duplicate; we link to it and provide local summary pages instead.

## Features Requiring External Access (Not Fabricated)

| Feature | Why Not Built | How to Enable |
|---------|---------------|---------------|
| Email capture delivery | Forms toast-only | Add Buttondown/Mailchimp/ConvertKit API + serverless `POST /api/subscribe` with `API_KEY` env |
| YouTube latest videos sync | Static embed | Set `YOUTUBE_API_KEY`, fetch `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=...` for `@JoeGrand` |
| Discord live widget / member count | Placeholder invite only | Enable Server Widget in Discord Server Settings → widget ID → replace placeholder div |
| Analytics | No `gtag` on reference | Add Plausible (`script.js` + domain) |
| Hacker Planet CMS | “Coming soon” | Add Decap CMS or Notion API for episode editing without code |
| Contact form email | `mailto:` only | Add Formspree/Resend endpoint + honeypot |
| TLS + custom domain | Preview on `*.e2b.app` | Point DNS to Netlify/Vercel/Cloudflare Pages, provision cert |
| Original WordPress REST | Not needed — static site | Keep reference API separate; no migration |

**Confirmation:** No feature was falsely marked complete that requires unavailable credentials. All demo forms are explicitly labeled “(demo)” via toast.
