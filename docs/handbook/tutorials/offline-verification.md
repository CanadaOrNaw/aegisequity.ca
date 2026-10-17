---
title: Verify the checkout offline
description: Run the real local checks without a build, service, provider request
  or install.
kind: tutorial
source_ref:
- README.md#L24-L26
- tests/check-site.py#L40-L105
- tests/test_inquiry.py#L44-L85
- tests/test-inquiry.mjs#L10-L102
---

# Verify the checkout offline

**Outcome:** confirm local publication structure, current form markup and the JavaScript controller under synthetic responses. This is not an installation, browser test or delivery test.

## Prerequisites

- Use this repository's root as your terminal's working directory.
- Existing `python3` and `node` commands must be available. The project uses Python standard-library modules and Node builtins. There is no dependency installer or pinned version manifest here.
- Read the routing and duplicate-send cautions in `README.md:24-26`. You need no provider key, `.env`, account, inbox access or network.

If either interpreter is unavailable, stop and tell the maintainer. Do not improvise an install or environment repair as part of this walkthrough.

## 1. Check current publication files

```bash
python3 -B tests/check-site.py
```

At the reviewed 2026-10-17 snapshot, the command exited 0 and printed:

```text
PASS: 8 pages, 161 internal links, article metadata, 7 sitemap URLs and RSS.
```

The counts describe this snapshot, not permanent invariants. The check reads existing files; it does not regenerate them. `-B` prevents Python bytecode cache writes. Do not use `-O`: these checks rely on assertions.

## 2. Check the actual form markup

```bash
python3 -B tests/test_inquiry.py
```

Observed exit 0:

```text
PASS: inquiry form is labeled and correctly configured for its current mode.
```

This validates the current active/dormant mode, labels and field attributes by parsing HTML. It does not open the browser or send the form.

## 3. Exercise the controller with fake responses

```bash
node tests/test-inquiry.mjs
```

Observed exit 0:

```text
PASS: dormant fallback, validation, honeypot, duplicate guard, success and error responses.
```

The test loads `inquiry.js` into a Node VM with in-file DOM, FormData and fetch stubs. It checks duplicate submission, success/reset and errors that retain entries. No real request is made. It does not wait out the real twenty-second abort path.

## If a step fails

Read the first assertion/parse error and its file path. Find the owning source with the [developer map](../development/source-map-and-requirements.md). Do not patch a generated page just to hide a failure. If an article was renamed or removed, review [stale output behavior](../architecture/publication-dataflow.md) before doing anything destructive. A failure is not permission to submit a live inquiry, rotate its key or publish.

## Cleanup and next step

No files, service or credentials need cleanup: these three reviewed commands read local files and use synthetic state only. Source bytes remained unchanged after execution.

Next, [trace a real article](trace-existing-article.md), or use the [test coverage guide](../development/test-strategy.md) to understand what these results do not prove. A current delivery claim still requires a separately approved labeled browser submission and inbox receipt.
