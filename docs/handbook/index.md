---
title: Aegis website
description: Maintain the actual static website, article generator and inquiry integration
  safely.
kind: overview
source_ref:
- README.md#L3-L39
- CONTEXT.md#L3-L26
- index.html#L159-L165
- tests/check-site.py#L105
- tests/test_inquiry.py#L83-L85
- tests/test-inquiry.mjs#L102
---

# Aegis website

This repository is the publication source for Aegis Equity's static website. It presents bounded custom technology work and accepts short project inquiries. The articles are public planning notes, not client records or device-control software.

There is no application server or package installer here. A Python script generates the blog; browsers handle the inquiry through an external form provider. See [the architecture](architecture.md) before changing either boundary.

## Choose a task

| I need to… | Start here |
| --- | --- |
| Check this checkout without sending anything | [Offline verification tutorial](tutorials/offline-verification.md) |
| Understand one real source-to-page example | [Trace an existing article](tutorials/trace-existing-article.md) |
| Edit an approved article | [Article workflow](how-to/update-article.md) |
| Change layout, navigation or branding | [Layout change guide](how-to/change-layout-or-branding.md) |
| Understand a failed or apparently successful inquiry | [Inquiry diagnosis](how-to/diagnose-inquiry.md) |
| Find commands, defaults and field contracts | [Command reference](reference/commands.md), [metadata](reference/blog-metadata-and-body.md), [form fields](reference/inquiry-fields-and-provider.md) |
| Contribute or find who decides | [Collaboration and working state](collaboration.md) |

## What works, and what is not proven

The current local tree contains five article source pairs and their generated pages. The three offline checks passed on 2026-10-17: eight pages, 161 internal links and seven sitemap URLs, plus form markup and synthetic JavaScript behavior. These are local checks, not live acceptance. [Status](status.md) states the limits and the dated provider history.

The public service boundaries exclude licensed engineering sign-off, electrical/structural certification and life-safety work (`index.html:159-165`). Do not turn sample scopes, terminal-style copy or the sample build specification into claims of implemented software or completed client work.

## Safe contribution boundary

Edit authored source, not generated article pages or the homepage's generated preview island. A local build does not authorize a push, domain change or form submission. Keep business records, routing identifiers and private documentation out of the public artifact. [Publication review](how-to/review-publication-boundary.md) explains what the current exclusions do and do not prove.

**Source authority:** `README.md:3-39` and `CONTEXT.md:3-26`. For maintainer routes, use the [working guide](guide.md) and [source map](development/source-map-and-requirements.md).
