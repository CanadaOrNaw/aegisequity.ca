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

The existing job front door and current runtime are owned by `~/scripts/CLAUDE.md` and `~/scripts/claude-agents/CONTEXT.md`; the Aegis owner controls the weekly article workflow. Queue/log facts remain with `~/02_business/Aegis Engineered Solutions/blog/`. Retained OpenClaw prompts are history, not runtime authority.

## Related

- `~/Projects/fleet-index` — every device, path and git history, and what happens to each
- `~/Projects/fleet-index/08_retirement/target-architecture.md` - Agrippa retirement history, not a live dependency

Read [handbook](docs/handbook/index.md) and its status before work. Before handoff, follow the [living-docs contract](file:///home/zack/Projects/fleet-index/_system/documentation/POLICY.md): review evidence, refresh canonical pages/status, rebuild views and pass working/staged checks.
