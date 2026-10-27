---
title: Change layout or branding
description: Modify the real presentation owner while protecting generator coupling
  and form behavior.
kind: how-to
source_ref:
- index.html#L8-L38
- index.html#L229-L292
- build-blog.py#L18-L22
- build-blog.py#L48-L84
- styles.css#L1-L21
- styles.css#L588-L846
- styles.css#L848-L1068
- README.md#L11-L12
- shield-mark.svg#L1-L13
---

# Change layout or branding

## Find the actual owner

| Change | Source | Coupled behavior |
| --- | --- | --- |
| Homepage copy/sections | `index.html`, outside preview markers | Service JSON-LD and homepage factual assertions may need review |
| Header/navigation | `index.html:20-38` | Generator regex extracts it and rebases links for every blog page. The homepage nav gained a `Portfolio` link to `/zack/` at `index.html:30`; generated blog pages carry the header from their last generation and did not contain that link when the 2026-10-26 pass searched them, so it reaches them only after an approved regeneration |
| Form layout/focus/status | `styles.css:588-759`, markup/controller | Native field constraints and enhanced states must remain usable |
| Blog layout/template | `styles.css:848-1068`, generator `page`/`card`/schema | Article/listing and homepage cards share classes/templates |
| Visible brand/favicon | `shield-mark.svg` and HTML/template references | Current visible page uses SVG |
| Share/schema image | `logo.png` metadata references | Raster image remains actively referenced, despite README's legacy shorthand |

`logo-mark.png` is retained too. Do not delete retained assets just because visible markup does not use them.

## Protect coupled inputs

Keep the generator's expected header structure and exactly one preview marker pair unless deliberately changing the generator in the same separately approved application task. Markers are not a general HTML templating system. Do not manually edit generated preview cards or blog pages.

CSS tokens are at `styles.css:1-21`. Form rows become two columns at a minimum width of 700 px; major home/blog layouts collapse at a maximum width of 900 px. These source rules are not visual acceptance evidence.

## Check and review

1. Review source plus affected metadata, accessibility labels/focus/status and relative navigation.
2. An approved regeneration is needed when the shared header/templates change. Follow [article workflow](update-article.md) for the complete write set and partial-output caution.
3. Run the three [offline checks](../tutorials/offline-verification.md). They catch structural regressions, not appearance.
4. Arrange authorized browser/mobile/focus inspection before acceptance. No real rendering test ran in the documentation pass; do not infer contrast, mobile usability or compatibility from CSS alone.
5. Update relevant [source map](../development/source-map-and-requirements.md)/[architecture](../architecture.md) claims and submit the intended diff for owner review. No publication is authorized by these steps.

Related: [test gaps](../development/test-strategy.md), [configuration reference](../reference/configuration-and-discovery.md).
