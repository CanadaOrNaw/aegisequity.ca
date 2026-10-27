---
title: Trace one existing article
description: Follow a real metadata/body pair into existing generated output without
  running the generator.
kind: tutorial
source_ref:
- content/blog/scope-custom-tech-project.json#L1-L11
- content/blog/scope-custom-tech-project.html#L1-L30
- build-blog.py#L25-L45
- build-blog.py#L92-L154
- index.html#L229-L235
- tests/check-site.py#L87-L105
---

# Trace one existing article

**Outcome:** understand the publication lifecycle by following `scope-custom-tech-project`, not by creating test content or running a mutating build.

## Prerequisites

Use a read-only editor on this checkout. No provider, service, customer record or package install is needed. Complete [offline verification](offline-verification.md) first if you want the current local check result.

## 1. Read the actual pair

Open `content/blog/scope-custom-tech-project.json`. Its slug matches the filename stem; it has title, SEO title, description, keyword, publication/modification dates, category and excerpt. Both dates are `2026-10-13`.

Open the matching `.html`. It contains trusted article HTML with exact `h2` IDs. Its round-number camera scenario is explicitly illustrative, not a client record (`content/blog/scope-custom-tech-project.html:20-23`).

## 2. Follow loading and validation

Read `build-blog.py:25-45`:

1. JSON files are scanned in filename order.
2. Slug format and filename equality are checked.
3. Dates are parsed; modification must not precede publication.
4. Future UTC publication dates are skipped before remaining required fields/body are read.
5. Truthy metadata and the sibling body are loaded, a read-time estimate is computed, and posts sort newest date then slug first.

Do not import the generator to inspect it: importing executes the top-level write workflow.

## 3. Follow each output

| Existing output to inspect | What to observe | Generator |
| --- | --- | --- |
| `blog/scope-custom-tech-project/index.html` | Body, canonical `/blog/scope-custom-tech-project/`, article schema and heading contents links | `build-blog.py:95-118` |
| `blog/index.html` | Newest-first card for this article | `build-blog.py:120-129` |
| `index.html`, between the two BLOG-PREVIEW markers | Current newest two posts; scope article first | `build-blog.py:131-138` |
| `sitemap.xml` | Scope article URL and modification date | `build-blog.py:140-145` |
| `blog/feed.xml` | Its title/link/date/excerpt RSS item | `build-blog.py:146-154` |

All five current body sources were found unchanged inside their existing generated article pages during the source audit. This is a source/product correspondence observation, not proof of fresh generation or build idempotence.

## 4. Check the existing structure

```bash
python3 -B tests/check-site.py
```

The 2026-10-17 reviewed tree printed `PASS: 8 pages, 161 internal links, article metadata, 7 sitemap URLs and RSS.` and exited 0. After the homepage gained its `Portfolio` nav link the same command should print 162 internal links (derived by counting, not re-run). It checks current products without writing them.

If a source is newer than its product, stop and review an owner-approved build; do not claim the trace proves freshness. If a post is absent, first inspect dates and slug/body pairing. Never assume the generator deleted an old slug: it does not.

## Cleanup and next step

No cleanup is needed. You did not build or send anything. Continue with [generation concepts](../architecture/publication-dataflow.md), [metadata reference](../reference/blog-metadata-and-body.md), then the separately gated [article-edit workflow](../how-to/update-article.md).
