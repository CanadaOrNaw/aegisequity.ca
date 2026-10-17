---
title: Blog metadata and body reference
description: The complete implicit input contract, validation order and rendering
  conventions.
kind: reference
source_ref:
- build-blog.py#L25-L45
- build-blog.py#L80-L115
- build-blog.py#L131-L154
- content/blog/scope-custom-tech-project.json#L1-L11
- content/blog/scope-custom-tech-project.html#L3-L30
- tests/check-site.py#L61-L71
---

# Blog metadata and body reference

The source unit is `content/blog/<slug>.json` plus matching `<slug>.html`. There is no JSON Schema file, package API or Markdown compiler. The table describes implemented checks, not a stronger schema that does not exist.

## Required metadata

| Field | Implemented validation | Used for |
| --- | --- | --- |
| `slug` | Required key; regex `[a-z0-9]+(?:-[a-z0-9]+)*`; filename stem must match | Directory and `/blog/<slug>/` URL |
| `date_published` | Required key; `date.fromisoformat`; future UTC date causes post skip | Ordering, date label, schema and UTC-midnight RSS date |
| `date_modified` | Required key; date parser; must not precede publication | Schema and sitemap lastmod |
| `title` | Truthiness only | H1, cards, schema headline, RSS title |
| `seo_title` | Truthiness only | HTML/OG title |
| `description` | Truthiness only | HTML/OG description and schema |
| `category` | Truthiness only; free text | Card/article eyebrow |
| `excerpt` | Truthiness only | Cards, lede and RSS description |
| `keyword` | Truthiness only | BlogPosting keywords |

The six non-date/slug values are expected editorially to be strings, but code does not explicitly enforce JSON types or length limits. Missing accessed keys can raise `KeyError`; truthy wrong types may escape as strings or fail elsewhere. Extra keys are not rejected. No field is an application environment variable.

Validation order: slug → parse both dates → modification ordering → future-publication skip → truthy fields → body read. Future posts skip the latter checks. Future modification dates are not forbidden. At least one published post is required. Date/slug stored strings determine descending ordering after parsing/filtering.

## A real metadata example

This is the actual scoping article's public metadata, not a template with fake fields (`content/blog/scope-custom-tech-project.json:1-11`):

```json
{
  "slug": "scope-custom-tech-project",
  "title": "How to Scope a Custom Tech Project Before Anything Gets Built",
  "seo_title": "How to Scope a Custom Tech Project | Written Scope Guide",
  "description": "How to scope a custom tech project: define the job, map space power and data constraints, prototype the smallest useful version first, then plan handoff.",
  "keyword": "how to scope a custom tech project",
  "date_published": "2026-10-13",
  "date_modified": "2026-10-13",
  "category": "Custom builds",
  "excerpt": "Every project starts as a written scope before paid work, not a guess. Define the job, map the constraints, build the smallest useful version first, then plan the handoff."
}
```

Do not reuse the slug for a second article. An article removal/rename needs explicit old-URL review because generation does not remove existing directories.

## HTML body and headings

The sibling body is read with `read_text()` and inserted verbatim into the generated article. Metadata is escaped, but this body is trusted publication HTML. Review any scripts, remote resources or personal information deliberately; the generator is not a sanitizer.

The contents-list regex recognizes this exact source pattern:

```html
<h2 id="describe-the-job">Describe the job in one paragraph</h2>
```

It uses the ID as a fragment link and the inner heading HTML as title content. Other heading shapes are not generalized into a TOC. IDs and local link targets are later checked in the generated page. Read-time estimate strips tags, counts words, divides by 200, rounds and clamps at one minute.

## Generated contracts

Article `BlogPosting` contains headline, description, URL, dates, image, keyword, organization author/publisher, language and blog membership. BreadcrumbList names home, blog and article. Listing cards show category/title/date/read time/excerpt; preview uses the newest two. RSS uses excerpt, not the full body. Sitemap covers all eligible article URLs plus home/listing.

The site checker adds editorial guardrails: contact route, no price-like dollar-number string and no banned claim substrings in the parsed article body region (`certified`, `code-compliant`, `engineer-stamped`, `guarantee`). These assertions do not certify other content's truth or safety.

Related: [trace example](../tutorials/trace-existing-article.md), [generation failures](../architecture/publication-dataflow.md), [article workflow](../how-to/update-article.md), [test coverage](../development/test-strategy.md).
