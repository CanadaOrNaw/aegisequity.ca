---
title: Working guide
description: Pick the right safe workflow for articles, layout, form failures and
  publication review.
kind: how-to
source_ref:
- README.md#L20-L39
- CONTEXT.md#L10-L22
- build-blog.py#L131-L155
- inquiry.js#L25-L79
---

# Working guide

Use this page to choose a workflow, not as a command sequence to run blindly.

## First local check

Follow [offline verification](tutorials/offline-verification.md). It reads the current checkout and exercises only a stubbed inquiry controller. It does not build, serve, send or publish anything.

## Editing routes

- **Article:** [Update an approved article](how-to/update-article.md). Metadata/body pairs feed all generated publication products.
- **Layout, navigation or branding:** [Change layout](how-to/change-layout-or-branding.md). Homepage header formatting is also a generator input.
- **Inquiry:** [Diagnose by observed state](how-to/diagnose-inquiry.md). Check whether a message already arrived before retrying a live submission. Do not rerun the activation helper as a repair.
- **Private/public separation or domain concerns:** [Review publication boundaries](how-to/review-publication-boundary.md). Preserve `CNAME`; escalate actual Pages/DNS state to its owner.

## Before a change is handed off

Read the affected [source/interface reference](reference/commands.md), update the relevant explanation, and run the applicable offline checks. [The change-impact map](maintenance/change-impact-and-owner-links.md) lists affected products and checks.

A source edit, successful local generation or passing test does not authorize a push or external submission. The business owner still controls those actions (`README.md:26-39`). [Status](status.md) names the live verification limits.
