# aegisequity.ca

Static website for Aegis Equity Corp. Served live at https://aegisequity.ca via GitHub Pages.

## Where things live

| Path | Holds |
|---|---|
| `index.html styles.css` | the site |
| `CNAME` | the live domain binding — do not remove |
| `logo*.png shield-mark.svg` | brand assets |
| `content/blog/` | article sources: `<slug>.json` metadata + `<slug>.html` body |
| `build-blog.py` | generator for `blog/`, the homepage preview, `sitemap.xml` and RSS; run it, never hand-edit its output |
| `tests/check-site.py` | link, metadata, sitemap, RSS and claim checks; run before every push |

## Note

This repo serves a live customer-facing domain. Deleting the GitHub remote takes the site offline.

## Rules

- One home per fact: link to the file that owns a fact instead of copying it.
- Never commit secret values. Record where they live.
- `_generated/` and build output are script-owned: change the script, not the file.
- Mirrored to Gitea by `~/.local/bin/gitstack_sync.sh`.

## Weekly blog

The Aegis OpenClaw agent publishes one article every Tuesday at 09:00 (`~/02_business/agent-workspaces/aegis/AEGIS-WEEKLY-BLOG.md`). The queue, log and automation record live in `~/02_business/Aegis Engineered Solutions/blog/`.

## Related

- `~/Projects/fleet-index` — every device, path and git history, and what happens to each
- `~/Projects/agrippa` — the AI system being built on top
