---
title: Command and helper reference
description: Exact local commands, defaults, write effects and failure contracts implemented
  by this repository.
kind: reference
source_ref:
- README.md#L24-L26
- build-blog.py#L13-L155
- tests/check-site.py#L1-L105
- tests/test_inquiry.py#L44-L85
- tests/test-inquiry.mjs#L1-L102
- tests/test_portfolio.py#L1-L66
- tests/activate-inquiry.py#L13-L63
- .githooks/docs-pre-commit#L1-L4
---

# Command and helper reference

Commands below use the repository root as working directory. Python scripts derive their data root from `__file__`; the documented shell paths still assume that working directory. No application arguments or flags are parsed by these scripts. `-B` is Python's no-bytecode-write option, not a project flag. Decorative `aegis` strings on public pages are not commands.

## Read-only checks

| Command | Reads / behavior | Successful output |
| --- | --- | --- |
| `python3 -B tests/check-site.py` | Home, thank-you, every blog HTML, sitemap, RSS, config; imports form check | `PASS: 8 pages, 161 internal links, article metadata, 7 sitemap URLs and RSS.` at the 2026-10-17 reviewed snapshot; 162 internal links expected after the homepage `Portfolio` link (derived, not re-run) |
| `python3 -B tests/test_inquiry.py` | Current `index.html`; markup/mode assertions | `PASS: inquiry form is labeled and correctly configured for its current mode.` |
| `node tests/test-inquiry.mjs` | `inquiry.js` through synthetic VM fixtures; no real fetch | `PASS: dormant fallback, validation, honeypot, duplicate guard, success and error responses.` |
| `python3 -B tests/test_portfolio.py` | `zack/index.html` and `zack/work/*.html` plus the local files they reference; read-only by source. Not in the README; **not run** by any documentation pass | Per source, one `PASS: N portfolio pages, M local links/media/posters, ...` line; no observed output recorded |

Each observed command exited 0 on 2026-10-17. Assertion/parse/IO errors normally exit 1 through Python/Node's uncaught-error behavior; no custom machine-readable error taxonomy is implemented. `-O` would disable Python assertions and is not a supported verification invocation. Counts change with the site.

## Blog generation — writes publication files

```bash
python3 -B build-blog.py
```

Inputs: current `index.html`, every `content/blog/*.json` and eligible matching body. Defaults are fixed source constants: base `https://aegisequity.ca`, author Aegis Engineered Solutions, UTC current calendar date, 200 words/minute estimate, two preview posts and homepage-lastmod floor `2026-09-22`.

Effects in order: create/write eligible `blog/<slug>/index.html`; write `blog/index.html`; replace exactly one homepage preview island and write `index.html`; write `sitemap.xml`; write `blog/feed.xml`. Obsolete article directories are not deleted. There is no dry-run/output-dir/help flag and no import guard.

Successful completion exits 0 and prints `Built blog index, N article(s), RSS, homepage preview and sitemap.` Uncaught errors normally exit 1. Explicit `ValueError` cases include invalid slug/filename, modification before publication, missing truthy metadata, no eligible posts and missing/duplicated preview markers. JSON/date/key/body/header/IO errors can also abort. Some output writes precede the preview check; the build is not atomic.

**Not run during documentation authoring.** Follow [approved article workflow](../how-to/update-article.md) and [failure-order explanation](../architecture/publication-dataflow.md).

## Initial activation — owner only, not rotation

```bash
python3 -B tests/activate-inquiry.py
```

This interactive writer is not a test. No key arguments are accepted. It reads `index.html`; active form source exits immediately with `Form already active. No file changed.` (normal Python `SystemExit` message exit 1).

In exact dormant mode, it requires confirmation `yes` after strip/lower normalization, then obtains a UUID-style identifier through masked `getpass`. It never echoes the identifier. It validates one occurrence of every expected migration string and disabled placeholder field before writing. It writes a temporary root file, preserves permission bits, atomically replaces the page and removes leftovers.

Successful local replacement exits 0 and prints a not-deployed notice. Declined confirmation, format/string mismatch or already-active state normally exits 1 with a message. Filesystem errors are not converted into a special error code. This is a one-time exact migration, not provider configuration, rotation or deployment. **Not run here.** Never paste the real value into a command, example, docs or logs.

## External documentation hook adapter

`.githooks/docs-pre-commit` resolves the Git root and exits 2 if resolution fails. It then `exec`s the fleet-index documentation enforcement CLI against its shared registry and current Git root; its exit is the external process's exit. Its installation/effective Git configuration was not checked. File presence is not enforcement proof. No hook command was run here.

## Local preview is not a read-only test

The prior guide named a Python `http.server` bound to loopback. Starting it creates a service, serves raw files and does not apply Jekyll exclusions; the real inquiry form still targets the provider. This authoring task did not start one. Preview setup/port/access belongs to an explicit owner-approved session, not the offline tutorial. No project-specific preview CLI exists.

## Internal helpers

| Signature | Contract and limits | Source |
| --- | --- | --- |
| `page(title, description, path, body, schema, article=None)` | Full page string with escaped metadata, shared header and optional article times; trusted body; not a safe-to-import public library | `build-blog.py:48-77` |
| `card(post, heading="h2")` | Category/title/date/read-time/excerpt card; homepage supplies `h3` | `build-blog.py:80-84,123,133` |
| `activate(source: str, key: str) -> str` | Validates key and exact dormant replacements; returns new HTML or raises ValueError before file write | `tests/activate-inquiry.py:28-39` |
| `check_markup(root=ROOT)` | Read local index; returns None after assertions or raises; site checker reuses it | `tests/test_inquiry.py:44-80` |
| `Page(content)`, `Inquiry(html)`, `Markup(text)` | Test HTMLParser collectors, not browser DOM implementations | `tests/check-site.py:15-37`, `tests/test_inquiry.py:12-41`, `tests/test_portfolio.py:9-28` |
| `harness({ activated = true, valid = true, bot = false, fetchImpl } = {})` | Test-only synthetic objects/VM and submit helper, no application API | `tests/test-inquiry.mjs:10-45` |

See [metadata](blog-metadata-and-body.md), [provider fields](inquiry-fields-and-provider.md), [configuration](configuration-and-discovery.md) and [test strategy](../development/test-strategy.md) for the corresponding behavior contracts.
