# Aegis Equity Corp.

Custom Technology Builds — static website for aegisequity.ca.

## Files

- `index.html` — main site and project inquiry form
- `inquiry.js` — enhanced online submission after activation
- `thank-you.html` — native form success redirect (not proof of a direct visit)
- `styles.css` — all styles
- `shield-mark.svg` — current favicon / compact shield mark
- `logo.png` and `logo-mark.png` — legacy raster assets retained but not used by the current page

## Deployment

Hosted via GitHub Pages. Custom domain: aegisequity.ca.

The `CNAME` file must stay in the published GitHub Pages repo so GitHub keeps serving the site at `aegisequity.ca`.

## Project inquiries

The live inquiry form posts by HTTPS to Web3Forms with an Aegis-specific routing key and an HTTPS success redirect. The owner confirmed `admin@aegisequity.ca` as the destination. Email and phone links remain available if online submission fails. The previous `mailto:` form action opened a mail draft and caused browser insecure-form hover warnings; it was replaced on 2026-09-22.

The owner used `tests/activate-inquiry.py` in a private terminal to install the key. That helper works only in placeholder mode and is **not** a key-rotation procedure. The key is intentionally **public in the site HTML** (a routing identifier, not an authentication credential): do not copy its value into docs, logs, chat, or another client's website. The basic honeypot is not a guarantee against spam.

Run `python3 -B build-blog.py`, `python3 -B tests/check-site.py`, `python3 -B tests/test_inquiry.py`, and `node tests/test-inquiry.mjs` after changes. An actual delivery check still requires one clearly labeled browser submission and confirmation in the Aegis inbox. The fetch path displays in-page status; native form POST redirects to `/thank-you.html` after Web3Forms accepts it. Do **not** infer inbox delivery solely from the build or the form's success response. A single test POST from this host on 2026-09-22 was rejected with Cloudflare HTTP 403 (read-only requests to Web3Forms were blocked there too); do not repeat that POST until checking for any receipt.

## License

Copyright © 2025–2026 Aegis Equity Corp. All rights reserved. This is a proprietary business website — not open source.


## 🏢 Business context

Aegis Equity Corp. is one of the two businesses the automation stack serves. This repo is the **public face**: a static site, no build step, deployed as plain files.

- Where the domain, DNS and hosting decisions are recorded: fleet-index `07_machines/` and `02_fleet/services.md`.
- The Aegis mail digest and reminders that run alongside it: [`scripts`](http://127.0.0.1:3000/zack/scripts) (`aegis_mail_digest.py`, `aegis_culinary_blog_reminder.py`).
- Anything that **publishes or sends on behalf of the business** is a gated action in the Agrippa design: it gets drafted for approval, never sent autonomously.


---

## 🔗 Where this fits

| Repo | What it holds |
|---|---|
| **[fleet-index](http://127.0.0.1:3000/zack/fleet-index)** | every device, every path, every git history — and what happens to each in the refresh |
| **[agrippa](http://127.0.0.1:3000/zack/agrippa)** | the private AI system being built on top: the OS, the harness, the runtime |

<sub>Mirrored to Gitea by <code>~/.local/bin/gitstack_sync.sh</code>. Index checked against reality daily at 05:45 by <code>icm-fidelity.sh</code>.</sub>
