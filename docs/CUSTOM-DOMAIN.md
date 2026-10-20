# Custom domain via GitHub Pages — activation runbook

The site is already wired so a domain switch is a 4-step job (one config line + 3 files).

## 1. Buy / pick the domain
e.g. `hackerplanet.fan`, `joegrand.fans`, etc. Needs YOU (account ownership at the registrar).

## 2. DNS at your registrar
For an apex domain (`hackerplanet.fan`):
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```
For a subdomain (`www.hackerplanet.fan`):
```
CNAME www   frankdenis.github.io
```

## 3. Tell GitHub (one command, uses the saved PAT)
```bash
curl -X PUT \
  -H "Authorization: Bearer $(cat ~/.joegrand_github_pat)" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/frankdenis/Joe_grand/pages \
  -d '{"cname":"www.hackerplanet.fan"}'
```
(GitHub auto-issues the TLS cert; "Enforce HTTPS" is already on.)

## 4. Update the site (already prepared)
- `js/config.js` → `siteBase: 'https://www.hackerplanet.fan/'`
- `sitemap.xml` → swap the base URL in all `<loc>` entries
- `robots.txt` → sitemap line
- HTML files → canonical + og:url already read below (canonicals added this pass); script in repo root note: run the sed from `docs/CUSTOM-DOMAIN.md`

Then re-run the link audit + Lighthouse at the new URL and submit the new sitemap to Google Search Console.
