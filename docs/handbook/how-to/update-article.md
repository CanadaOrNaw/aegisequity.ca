---
title: "Update an approved article"
description: "Edit real source pairs and review the full generated write set without implying publication approval."
kind: "how-to"
source_ref: ["CLAUDE.md", "README.md#L24-L39", "build-blog.py#L25-L45", "build-blog.py#L92-L155"]
---

# Update an approved article

**Use after owner approval of the public topic/claims.** This workflow writes publication files. It was not executed as an article change in the documentation pass. For a safe first task, use the [read-only article trace](../tutorials/trace-existing-article.md).

## 1. Edit the correct source

Create or edit `content/blog/<slug>.json` and its matching `.html`. The slug must match the filename stem. Use the complete [metadata/body reference](../reference/blog-metadata-and-body.md), not generated HTML as a template authority.

Review factual claims, scope limitations, contact route and any linked device guidance. Public planning examples are not client proof or certified technical procedures. Do not include customer records, credentials, precise locations or prices merely because a checker accepts them.

Use exact heading-ID markup if an article contents list is needed. The body is trusted raw HTML, not sanitized input.

## 2. Review timing and old URLs

Publication is gated against the generator's current UTC date. A future date does not schedule a build. Removing/renaming/future-redating a previously generated article does not remove its old directory. Agree with the owner on old URL behavior before such a change; there is no supplied cleanup command.

Modification must not predate publication. The implementation does not reject future modification dates or enforce string lengths, so editorial review must not assume a formal schema did so.

## 3. Intentionally generate and inspect

Only after reviewing the generator's [write/failure behavior](../architecture/publication-dataflow.md), run from the repository root:

```bash
python3 -B build-blog.py
```

This creates/rewrites article pages, listing, homepage preview, sitemap and RSS. It prints `Built blog index, N article(s), RSS, homepage preview and sitemap.` on successful completion. `N` depends on the eligible source pairs. An exception can leave partial products; stop and inspect rather than publish a mixed state.

Review the intended source plus every changed generated product together. Do not hand-edit one generated page to make it look correct.

## 4. Run local checks

```bash
python3 -B tests/check-site.py
python3 -B tests/test_inquiry.py
node tests/test-inquiry.mjs
```

The latter two protect the homepage/form shared with the generated preview. See [test strategy](../development/test-strategy.md) for coverage and [offline tutorial](../tutorials/offline-verification.md) for observed current outputs.

## 5. Handoff without overclaiming

Update affected documentation and evidence, get independent review and ask the owner to approve the intended publication diff. This page provides no push/deploy command or authority. Local generation/checks prove neither hosted publication nor inbox delivery (`README.md:26-39`).

Related: [change-impact map](../maintenance/change-impact-and-owner-links.md), [publication boundary](review-publication-boundary.md).
