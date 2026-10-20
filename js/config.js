/* Site configuration — edit these values, no other code changes needed.
 * newsletterEndpoint: paste a working endpoint and every .jg-newsletter form
 * on the site auto-wires. Until it is set, forms save addresses locally in the
 * visitor's own browser (localStorage) and say so honestly — no fake promises.
 *
 * Works with:
 *  - Formspree  → https://formspree.io/f/XXXXXXXX
 *  - Buttondown → use their "email subscribe" form action URL
 *  - Mailchimp  → list post URL (or a small proxy; Mailchimp blocks CORS)
 */
window.JG_CONFIG = {
  newsletterEndpoint: '',
  siteBase: 'https://frankdenis.github.io/Joe_grand/'
};
