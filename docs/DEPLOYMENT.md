# DEPLOYMENT INSTRUCTIONS

## Preview Link (Current)
This workspace serves the build on **port 8000**:

```
python3 -m http.server 8000 --directory /home/user/joegrand-rebuild
```

Arena preview URL: `https://8000-{sandboxId}.e2b.app/` → loads `index.html`  
Direct routes:
- `/` (home)
- `/pages/projects.html`
- `/pages/videos.html`
- `/pages/community.html`
- `/docs/ROUTE-INVENTORY.md` etc.

## Static Hosting (Recommended)
The site is **fully static** — no Node, no DB, no credentials.

### Option A — Netlify
1. Zip `joegrand-rebuild/` (or push to GitHub)
2. Netlify → New site → Deploy manually → drop folder
3. Build command: (none) — Publish directory: `.` (or `joegrand-rebuild`)
4. Domain: `joegrand-rebuild.netlify.app` → add custom domain when ready
5. Verify direct links: `/pages/projects.html` etc. (Netlify handles SPA fine for static)

### Option B — Cloudflare Pages / Vercel
- Same as above: import GitHub repo, framework: None, output: `.`
- Ensure `assets/` is included (12 files)

### Option C — Any static host
`scp -r joegrand-rebuild/* user@host:/var/www/html/` + TLS via Let’s Encrypt.

## Environment
No env vars required for demo. For integrations (see UNAVAILABLE-ASSETS.md), add:
```
YOUTUBE_API_KEY=...
BUTTONDOWN_API_KEY=...
DISCORD_WIDGET_ID=...
```

## Post-Deploy Checklist
- [ ] Visit preview on mobile + desktop, test hamburger/search/forms (see QA-REPORT.md)
- [ ] Confirm grep for `joegrand.com` in deployed HTML is 0 (except docs)
- [ ] Replace demo embeds/placeholders (YouTube demo ID, Discord widget)
- [ ] License original punk fonts + death-logo for commercial use
- [ ] Add analytics (Plausible) if desired

## Download
All files under `/home/user/joegrand-rebuild/` — ready to download as zip from workspace.

## Independent Navigation Confirmation
All internal `<a>` use relative URLs (`index.html`, `pages/...`, `#...`, `docs/...`). No link targets `https://joegrand.com`. External links are intentional third parties only (GIS, YouTube, Discord, GitHub, Wikipedia, Hardwear.io, WellGo, Darknet Diaries, IMDb, DEF CON, L0pht, Doc4) with `target=_blank rel=noopener`. Verified via `grep -r joegrand.com --include="*.html" | wc -l` → **0**.
