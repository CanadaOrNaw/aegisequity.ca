---
title: Test strategy and gaps
description: Know which assertions protect the site and which browser, generator and
  provider behavior remains untested.
kind: developer
source_ref:
- tests/check-site.py#L15-L105
- tests/test_inquiry.py#L12-L85
- tests/test-inquiry.mjs#L10-L102
- tests/activate-inquiry.py#L28-L63
- tests/test_portfolio.py#L1-L66
- inquiry.js#L45-L79
- _config.yml#L1-L13
- .githooks/docs-pre-commit#L1-L4
---

# Test strategy and gaps

The three documented offline tests have different inputs. [Run them safely](../tutorials/offline-verification.md); do not confuse one layer's pass with another layer's acceptance. A fourth file, `tests/test_portfolio.py`, is in the tree but is not in the README or the reviewed command set; see [portfolio link and media check](#portfolio-link-and-media-check).

## Current-tree Python checks

`tests/check-site.py` parses home, thank-you and every blog HTML page. Its `Page` class collects IDs, links, H1 count, canonical/description metadata and JSON-LD. Assertions cover duplicate IDs, local paths/anchors, required page metadata, article schema author/dates/contact, banned price/claim strings, homepage schema relationships/service-boundary copy, sitemap and RSS consistency. It calls `check_markup` too.

Remote/mail/tel links are not fetched. A price/claim substring ban is an editorial guardrail, not factual validation. Exclusion assertions currently cover only `content`, `build-blog.py` and `tests`, not all private-doc exclusions. Python `-O` disables assertions; it is not a valid replacement for the documented `-B` commands.

`tests/test_inquiry.py` parses the current HTML form. It checks expected active or dormant mode, hidden redirect, fallback contacts, labels/required attributes, email/tel types, message maximum and no file upload. It does not run actual browser constraints, layout or submission.

## Synthetic JavaScript fixture

`tests/test-inquiry.mjs:10-45` defines all its fixtures inline: form, key, honeypot, status, button, handlers, FormData and fetch. `vm.runInNewContext` executes the actual `inquiry.js`; assertions inspect its calls/state.

Covered cases are dormant no-fetch fallback, rapid duplicate submit, successful JSON response and reset, failure/429/false success/invalid JSON, thrown network error, checked bot and invalid fields. Failed requests retain entries and allow retry; success disables repeated sends for the lifetime of that controller.

The fixture does not use a browser or Web3Forms. It does not wait twenty seconds for the real timeout, validate native POST navigation, provider behavior, inbox receipt, accessibility, CSS or mobile layout. Fake FormData contains only selected fixture fields, not a second authoritative copy of the real form schema.

## Portfolio link and media check

`tests/test_portfolio.py` (66 lines, standard library only, no `__main__` guard, so running it executes the checks and prints one line) parses `zack/index.html` and every `zack/work/*.html` page. It asserts that every local `href`, `src` and `poster` resolves to an existing file or directory index, that any `#fragment` is an `id` on the target HTML page, and that every `<video>` has `muted`, `loop`, `playsinline` and `autoplay` plus a non-empty `aria-label` and `poster` (`tests/test_portfolio.py:30-48`). For `zack/work/sys-08.html` it asserts exactly three YouTube privacy-domain iframes whose embed paths match three expected video identifiers, with matching watch links in the same order, and that the portfolio home and that page both reference the two SYS-08 film files and the Before the Paver poster. It also asserts that one expected video identifier appears in `zack/work/sys-10.html` (`:50-65`). The success line has the form `PASS: N portfolio pages, M local links/media/posters, ...` (`:66`).

The 2026-10-26 author pass read this file but did not run it, so no observed output is recorded. It does not cover `zack-v2-archive/`, remote embeds (identifiers are compared, nothing is fetched), playback or rendering, or the separate form in `zack/index.html`. `check-site.py` resolves the homepage `Portfolio` link to `zack/index.html` but does not parse the portfolio pages.

## Other code and untested changes

The activation helper is a mutating owner operation despite its folder name. Its pure `activate(source, key)` validation/replace function is source-reviewed but not exercised by the supplied regression suite.

No isolated generator fixtures test future dates, malformed schema/body, missing header/preview markers, stale slug removal or partial write order. Do not claim these scenarios were reproduced. The behavior limits are source-derived and described in [generation concepts](../architecture/publication-dataflow.md).

## Contribution checks by change

| Change | Existing applicable checks | Separate evidence still needed |
| --- | --- | --- |
| Article/metadata/template | Intentional approved generation, then site check | Review generated diff and editorial claims; stale URL policy |
| Form markup/controller | Markup, Node and site checks | Real browser behavior; labeled live receipt only when owner approves |
| CSS/branding/navigation | Site links and applicable form checks | Browser/mobile/focus/visual inspection |
| Publication exclusions | Current structural assertion | Actual Jekyll/Pages artifact exclusion proof |
| Portfolio pages (`zack/`) | `tests/test_portfolio.py` (unrun by authors) plus the site check for the homepage link | Rendering, media playback, form delivery and anything under `zack-v2-archive/` |

No in-repo CI workflow automates these commands. The external documentation hook's installation is not established by its file. Independent documentation review must perform first-use and maintainer tasks without author guidance; these author-run checks do not meet that independent-review requirement.

Related: [commands](../reference/commands.md), [status](../status.md), [collaboration](../collaboration.md).
