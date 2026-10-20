/* Site configuration — edit these values, no other code changes needed.
 *
 * newsletterEndpoint: paste a working endpoint and every .jg-newsletter form
 * on the site auto-wires. Works with:
 *  - Formspree  → https://formspree.io/f/XXXXXXXX
 *  - Buttondown → the "email subscribe" form action URL from your dashboard
 *  - Mailchimp  → list post URL (needs a tiny proxy; Mailchimp blocks CORS)
 * Fallbacks when empty: the form saves the address IN THE VISITOR'S BROWSER
 * (localStorage, jg_newsletter_pending) and opens their email app with a
 * ready-made subscribe request — honest, no fake promises.
 *
 * analyticsSrc/analyticsDomain: privacy-friendly analytics activation.
 * Paste your script URL (e.g. Umami "https://cloud.umami.is/script.js" or
 * Plausible "https://plausible.io/js/script.js") + your domain, and the
 * loader in app.js injects it — cookieless by design, so still no banner.
 *
 * siteBase: canonical origin used when a custom domain goes live
 * (see docs/CUSTOM-DOMAIN.md).
 */
window.JG_CONFIG = {
  newsletterEndpoint: '',
  analyticsSrc: '',
  analyticsDomain: '',
  siteBase: 'https://frankdenis.github.io/Joe_grand/'
};
