---
title: Change impact and owner links
description: Review affected products, tests and docs while preserving existing status
  and business ownership.
kind: developer
source_ref:
- CONTEXT.md#L10-L26
- README.md#L24-L39
- CLAUDE.md#L12-L36
- docs/CONTEXT.md#L1-L5
- build-blog.py#L18-L155
- inquiry.js#L1-L79
- tests/check-site.py#L40-L105
- styles.css#L588-L1068
- tests/activate-inquiry.py#L28-L63
- tests/test_inquiry.py#L44-L85
- tests/test-inquiry.mjs#L10-L102
- _config.yml#L1-L13
- CNAME#L1
---

# Change impact and owner links

Review meaning before refreshing evidence. A hash tells you which bytes changed; it does not explain whether a claim remains correct. Private verification records bind exact source/page/navigation bytes after claim review; the author cannot approve their own work.

## Source-to-product-to-check map

| Change | Affected behavior/products | Existing check and documentation route |
| --- | --- | --- |
| Homepage header/markers | Header extraction/rebased links on all blog pages; preview substitution | Site check; [generation](../architecture/publication-dataflow.md), [layout how-to](../how-to/change-layout-or-branding.md) |
| Article fields/body/date/slug | Article, listing, top-two preview, RSS, sitemap; obsolete directories may remain | Intentional approved build then site check; [schema](../reference/blog-metadata-and-body.md), [article workflow](../how-to/update-article.md) |
| Generator templates/constants | Every generated public page/discovery product, metadata, estimates | Site check plus source review; no generator fixture suite; [commands](../reference/commands.md) |
| Form/JS/thank-you | Native encoding/redirect, JSON body, validation, statuses/retry, receipt wording | Markup + Node + site checks; [lifecycle](../architecture/inquiry-lifecycle.md), [fields](../reference/inquiry-fields-and-provider.md) |
| Activation helper | Exact dormant migration and public routing | Owner review; existing offline checks do not unit-test transformation; never use as rotation |
| CSS/brand | Responsive layout, focus/status visibility, honeypot presentation, visible SVG and share image | Structural checks plus separately authorized real browser review; [layout](../how-to/change-layout-or-branding.md) |
| CNAME/exclusions/discovery | Domain binding, possible private-source exposure, crawler/feed routes | Current assertion covers only three exclusion entries; actual hosted artifact unknown; [publication boundary](../how-to/review-publication-boundary.md) |
| Handbook/sidebar/assets | Reader tasks, source citations, interface coverage, local links and navigation | Independent correctness/task review and shared-site validation; never self-accept by hash refresh |

## Concrete maintainer flow

1. Identify exact changed paths against the last reviewed state, including additions/deletions/renames and configuration/wiring changes.
2. Read changed source and its real tests. Name affected defaults, errors, fields, dataflows and safety claims, not only page names.
3. Update affected explanation/reference/task pages and their source references. Keep the manifest's page/source/interface map complete. Explain a genuine no-doc-impact disposition with the actual change and reason.
4. Run only reviewed native safe examples. Generation writes and live requests need their own authorization; rendering docs must not execute arbitrary snippets.
5. Freeze source, pages, navigation, approved assets and verification map for independent source/claim review and first-use/maintainer task trials. Any relevant later edit invalidates that exact snapshot.
6. Parent integrates/reviews the shared site. A build is an integrity check, not content, runtime, provider or business acceptance.

## Keep existing authorities, do not create another tracker

- **Website behavior/approval:** root README and instructions, this repository's implementation and tests.
- **Domain/DNS/hosting evidence and shared documentation machinery:** existing fleet-index owner records named in `README.md:37` and root instructions. This handbook does not reproduce machine/service records.
- **Business publication queues, approvals, customer and financial records:** existing Aegis owner records routed by `CLAUDE.md:27-36`. Obtain context through the owner; do not import private rows or filenames into reader output.
- **Automation implementation/mail reminders:** scripts project ownership named in `README.md:38`, not an implementation found in this site repository.

Root prose still mentions retired systems and differs between AGENTS/CLAUDE. That is a routing-reconciliation task for the owner, not permission to restart or duplicate an automation system. [Collaboration](../collaboration.md) explains the actual contribution boundary; [status](../status.md) records observed limits without replacing a business queue.
