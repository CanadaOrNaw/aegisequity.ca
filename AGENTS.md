# aegisequity.ca

Static website for Aegis Equity Corp. Served live at https://aegisequity.ca via GitHub Pages.

## Where things live

| Path | Holds |
|---|---|
| `index.html styles.css` | the site |
| `CNAME` | the live domain binding — do not remove |
| `logo*.png shield-mark.svg` | brand assets |

## Note

This repo serves a live customer-facing domain. Deleting the GitHub remote takes the site offline.

## Rules

- One home per fact: link to the file that owns a fact instead of copying it.
- Never commit secret values. Record where they live.
- `_generated/` and build output are script-owned: change the script, not the file.
- Mirrored to Gitea by `~/.local/bin/gitstack_sync.sh`.

## Related

- `~/Projects/fleet-index` — every device, path and git history, and what happens to each
- `~/Projects/agrippa` — the AI system being built on top
