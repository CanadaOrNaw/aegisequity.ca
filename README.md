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

The contact form currently opens an email draft addressed to `admin@aegisequity.ca`; it does **not** send directly. Visitors must review and send that draft in their mail app, or use the published email/phone links. If their browser has no mail app configured, the email/phone links remain available. The on-page copy and button describe this behavior. Do not point the form at Web3Forms with its placeholder key: online sending cannot work until an Aegis-owned key is provided.

Activation (authorized owner only):

1. Obtain a **distinct Aegis Web3Forms access key**, not any client's key. Verify that Web3Forms has registered and verified `admin@aegisequity.ca` as the destination inbox for **that key** before routing this form to it. No site code can verify the destination from the key alone.
2. In `index.html`, change `#project-inquiry` to `action="https://api.web3forms.com/submit"` with `method="post"`; remove `enctype="text/plain"`. Replace only `AEGIS_WEB3FORMS_ACCESS_KEY_REQUIRED` with the Aegis key and remove `disabled` from **both** the `access_key` and `redirect` hidden inputs. Change the `.form-mode` text to something like “Submit your outline here. We will review it and reply by email.” and the button to “Send inquiry.” Update the `.form-privacy` text to remove the email-draft clause while keeping Web3Forms disclosure. Update the default-mode assertions in `tests/test_inquiry.py` so they check the activated markup instead.
3. Check the key, destination and native redirect on an authorized staging environment with a disposable inquiry and verify actual inbox delivery; test JavaScript success/failure as well as a JavaScript-disabled browser. Do not claim delivery just from an HTTP 200. Run `python3 build-blog.py`, `python3 tests/check-site.py`, and `node tests/test-inquiry.mjs` after the edits. The native form redirects to `/thank-you.html` only after Web3Forms reports success; fetch stays on the page and shows status. Web3Forms' browser error presentation for failed native POSTs is not documented, so do not promise it.

The Web3Forms access key is a **publicly embedded routing key**, not an authentication secret. Any browser can see and reuse it to submit to its bound inbox; do not place it in documentation, log output, or another client's site. Do not assume it keeps spam out. The form includes a simple honeypot; Web3Forms recommends additional anti-spam measures if necessary. No access key is currently installed here. Form entries will be processed by Web3Forms when online sending is active; the initial form asks only for a general project outline, not files or sensitive device data.

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
