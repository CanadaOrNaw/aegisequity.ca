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
- inquiry.js#L45-L79
- _config.yml#L1-L13
- .githooks/docs-pre-commit#L1-L4
---

# Test strategy and gaps

The three documented offline tests have different inputs. [Run them safely](../tutorials/offline-verification.md); do not confuse one layer's pass with another layer's acceptance.

## Current-tree Python checks

`tests/check-site.py` parses home, thank-you and every blog HTML page. Its `Page` class collects IDs, links, H1 count, canonical/description metadata and JSON-LD. Assertions cover duplicate IDs, local paths/anchors, required page metadata, article schema author/dates/contact, banned price/claim strings, homepage schema relationships/service-boundary copy, sitemap and RSS consistency. It calls `check_markup` too.

Remote/mail/tel links are not fetched. A price/claim substring ban is an editorial guardrail, not factual validation. Exclusion assertions currently cover only `content`, `build-blog.py` and `tests`, not all private-doc exclusions. Python `-O` disables assertions; it is not a valid replacement for the documented `-B` commands.

`tests/test_inquiry.py` parses the current HTML form. It checks expected active or dormant mode, hidden redirect, fallback contacts, labels/required attributes, email/tel types, message maximum and no file upload. It does not run actual browser constraints, layout or submission.

## Synthetic JavaScript fixture

`tests/test-inquiry.mjs:10-45` defines all its fixtures inline: form, key, honeypot, status, button, handlers, FormData and fetch. `vm.runInNewContext` executes the actual `inquiry.js`; assertions inspect its calls/state.

Covered cases are dormant no-fetch fallback, rapid duplicate submit, successful JSON response and reset, failure/429/false success/invalid JSON, thrown network error, checked bot and invalid fields. Failed requests retain entries and allow retry; success disables repeated sends for the lifetime of that controller.

The fixture does not use a browser or Web3Forms. It does not wait twenty seconds for the real timeout, validate native POST navigation, provider behavior, inbox receipt, accessibility, CSS or mobile layout. Fake FormData contains only selected fixture fields, not a second authoritative copy of the real form schema.

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

No in-repo CI workflow automates these commands. The external documentation hook's installation is not established by its file. Independent documentation review must perform first-use and maintainer tasks without author guidance; these author-run checks do not meet that independent-review requirement.

Related: [commands](../reference/commands.md), [status](../status.md), [collaboration](../collaboration.md).
