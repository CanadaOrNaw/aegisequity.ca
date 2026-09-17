# Aegis Equity Corp.

Custom Technology Builds — static website for aegisequity.ca.

## Files

- `index.html` — main site
- `styles.css` — all styles
- `shield-mark.svg` — current favicon / compact shield mark
- `logo.png` and `logo-mark.png` — legacy raster assets retained but not used by the current page

## Deployment

Hosted via GitHub Pages. Custom domain: aegisequity.ca.

The `CNAME` file must stay in the published GitHub Pages repo so GitHub keeps serving the site at `aegisequity.ca`.

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
