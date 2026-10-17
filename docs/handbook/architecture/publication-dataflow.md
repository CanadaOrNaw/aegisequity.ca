---
title: Generation and publication dataflow
description: Understand validation order, coupled HTML inputs and partial or stale
  generation failures.
kind: concept
source_ref:
- build-blog.py#L18-L45
- build-blog.py#L48-L155
- tests/check-site.py#L40-L105
- CONTEXT.md#L10-L22
---

# Generation and publication dataflow

`build-blog.py` is one top-level script, not an import-safe library or scheduler. It is standard-library Python and writes directly into this checkout. [Commands](../reference/commands.md) lists its exact effects.

## Sources and outputs

```text
index.html topbar + preview markers --+
                                     +--> build-blog.py --> blog/<slug>/index.html
content/blog/<slug>.json + .html -----+                  --> blog/index.html
                                                        --> index.html preview island
                                                        --> sitemap.xml
                                                        --> blog/feed.xml
```

In words: the current homepage is both an authored page and a generator template input. Article JSON supplies metadata; its sibling HTML supplies trusted body markup. The generator also shares the homepage header with article/listing pages.

## Validation order matters

At `build-blog.py:25-45`, slug/date validation happens before future-publication filtering. A future UTC publication date is skipped before other required fields and body are read. Thus a scheduled-looking JSON file can still fail slug/date checks, but an absent future body is not detected until it becomes eligible.

Dates use Python's ISO date parser. Modification cannot precede publication, but future modification is not forbidden. Other required values are checked for truthiness, not a formal JSON type/length schema. Posts sort by the stored publication date string and slug descending. At least one eligible post is required.

Read time strips tags, counts whitespace-separated words, divides by 200, uses Python rounding and clamps to at least one minute. It is an estimate, not measured reading behavior.

## Rendering and trust

`page()` supplies complete HTML, metadata, RSS discovery and JSON-LD. `card()` supplies listing/preview cards. Metadata strings are HTML-escaped; JSON-LD replaces less-than characters. Article body HTML is inserted verbatim. TOC entries recognize only exact `h2` tags with IDs and reuse their inner title HTML (`build-blog.py:95-104`). Repository authors must review bodies as trusted publication code; this is not sanitization for arbitrary user input.

## Coupling and failure order

- The header regex requires the current indentation/class/newline shape and immediately calls `.group(0)` (`18-22`). A layout reformat can break a build before outputs.
- Article pages and the blog index are written before checking the homepage preview marker count (`92-137`). Missing/duplicated markers can therefore fail after some products changed.
- The homepage is rewritten, then sitemap and RSS are written (`138-154`). IO errors can leave a mixed generation.
- There is no dry-run, alternate output directory or multi-file atomic transaction.
- Existing article directories are never removed. Removing, renaming or future-redating an already-built slug can leave an old public URL behind.

A local checker scans all existing blog HTML. Stale directories can then disagree with the generated sitemap/RSS and fail checks. Do not invent a cleanup command or blindly delete directories; agree on intended publication/URL behavior with the owner first.

## Discovery products and limits

The homepage preview uses the top two posts. Sitemap includes home, listing and every eligible post; homepage lastmod is the greater of latest article modification and the fixed `2026-09-22` floor. That floor is not automatically updated when independent service copy changes. RSS includes all eligible posts with publication at UTC midnight and excerpt descriptions.

UTC date filtering is not publication scheduling. Something external must actually run the generator and publish approved products. That external automation is not implemented in this repository. Local generation and a passing test do not prove the hosted artifact or authorize deployment.

Related: [article trace](../tutorials/trace-existing-article.md), [metadata](../reference/blog-metadata-and-body.md), [article workflow](../how-to/update-article.md), [publication boundary](../how-to/review-publication-boundary.md).
