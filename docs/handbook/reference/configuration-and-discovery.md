---
title: Configuration and discovery
description: All source constants, publication files, metadata and non-existent environment
  configuration.
kind: reference
source_ref:
- _config.yml#L1-L13
- CNAME#L1
- robots.txt#L1-L4
- build-blog.py#L13-L16
- build-blog.py#L41-L43
- build-blog.py#L105-L154
- index.html#L6-L17
- thank-you.html#L8-L10
- styles.css#L1-L21
- styles.css#L755-L846
- .gitignore#L1-L30
- LICENSE#L1-L7
- .githooks/docs-pre-commit#L1-L4
- inquiry.js#L5-L55
- index.html#L247-L252
- tests/check-site.py#L94-L104
---

# Configuration and discovery

Configuration is a set of plain files and source constants. There is no precedence engine, application config loader, environment-variable contract or command-line override. Do not invent `.env` setup or provider-key environment names.

## Fixed values and inputs

| Owner | Setting | Effect |
| --- | --- | --- |
| `build-blog.py:13-16` | Root = script directory; base `https://aegisequity.ca`; author Aegis Engineered Solutions | Source/output root and generated URLs/attribution |
| `build-blog.py:41,133` | 200 words/minute; top two preview posts | Read-time estimate and homepage cards |
| `build-blog.py:140-145` | Homepage lastmod floor `2026-09-22` | Greater of floor/latest article modification; independent copy changes need review |
| `inquiry.js` and form markup | Provider endpoint, native redirect/subject; 20,000 ms abort | [Provider reference](inquiry-fields-and-provider.md) |
| `styles.css:1-21` | Ink/muted/navy/gold/cyan/green, panels, radius, mono/sans tokens | Visual properties only; local/system font stack, no remote font import |
| `styles.css:755-846,1052-1068` | 700 px form columns; 900 px major collapse | Responsive rules, not rendered acceptance |

## Publication files

`CNAME` contains the declared custom domain. `README.md` identifies GitHub Pages; `_config.yml` identifies Jekyll build exclusions. Neither proves current DNS, Pages settings or hosted output.

The complete `exclude` list is README, CLAUDE, AGENTS and CONTEXT Markdown, `content`, `build-blog.py`, `tests`, `docs`, `.docs-check`, `.githooks`. The [publication guide](../how-to/review-publication-boundary.md) explains the artifact-verification gap. A raw preview server does not apply it.

`robots.txt` allows all crawlers and points to `https://aegisequity.ca/sitemap.xml`. It is advisory discovery, not access control. Public host-verification artifacts are retained; their token values are not copied or needed to use this handbook.

## SEO, structured data and feeds

- Homepage defines canonical/description/Open Graph and Organization/WebSite/Service schema with provider/publisher IDs (`index.html:6-17`). `logo.png` is still used for OG/schema imagery.
- Article/listing templates define canonical, RSS discovery, Open Graph and BlogPosting/BreadcrumbList or Blog schema (`build-blog.py:48-77,105-129`).
- `sitemap.xml` is generated for home, listing and current eligible posts. Each URL carries the chosen lastmod.
- `/blog/feed.xml` is RSS2.0 with Atom self-link, all eligible post title/link/permalink GUID/UTC publication date/excerpt. It is not a full article-body export.
- Thank-you page is noindex, has no canonical and is intentionally absent from sitemap (`thank-you.html:8`, checker assertions).

No remote link, crawler behavior or actual search indexing was verified.

## Repository and integration boundaries

`.gitignore:1-13` retains common OS/editor temporary rules. The documentation rules at `15-30` add bounded Git inclusion behavior:

| Path/rule | Effect for new, otherwise untracked files |
| --- | --- |
| `/docs/verification/*` | Ignore private verification output by default |
| Exact exceptions for `manifest.json` and `review.json` | Keep the canonical private coverage/review contracts eligible for version control |
| `/docs/handbook/assets/` | Ignore assets until a separately approved rule admits exact assets |
| `/docs/**/_generated/`, `/docs/**/.generated/`, `/docs/**/build/`, `/docs/**/node_modules/`, `/docs/**/.fixture/` | Recursively ignore these generated/dependency/temporary directories anywhere below docs, including nested topic directories |
| `/docs/handbook/**/.env*`, `/docs/handbook/**/*.env`, `/docs/handbook/**/credentials*`, `/docs/handbook/**/*.log`, `/docs/handbook/**/*.db` | Recursively ignore these bounded private/runtime forms below the handbook; `.env*` includes suffixed environment names |
| `/.docs-check/` | Ignore the root documentation-check output directory |

Authored handbook Markdown and `sidebar.json` are not covered by these new ignore rules. `author-checks.json` is local private supporting evidence, not one of the two allowed verification JSON exceptions. Git ignore rules neither remove already tracked files from the index nor enforce runtime/publication privacy. They do not replace Jekyll artifact review or a secret/data protection policy. No files were staged or untracked by this documentation update.

`LICENSE` reserves proprietary rights; this site is not open source. Do not copy it to another client's site without permission.

The docs pre-commit wrapper delegates to the shared fleet-index checker with a registry and detected Git root. It does not contain a second project-local config schema. Effective hook installation was not queried, and its presence alone proves no enforcement.

No dependency/version manifest or in-repo CI/deployment workflow was found. See [requirements](../development/source-map-and-requirements.md), [commands](commands.md) and [maintenance map](../maintenance/change-impact-and-owner-links.md).
