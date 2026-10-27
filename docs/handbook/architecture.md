---
title: "Architecture map"
description: "See source/product ownership and the boundaries between browser, generator, provider and hosting."
kind: "concept"
source_ref: ["CONTEXT.md", "build-blog.py#L13-L155", "inquiry.js#L1-L79", "_config.yml#L1-L13", "index.html#L6-L209", "tests/activate-inquiry.py#L1-L63", "tests/check-site.py#L1-L105", "tests/test_portfolio.py#L1-L66", "zack/index.html"]
---

# Architecture map

The implementation has two independent paths: **build public articles locally** and **submit an inquiry from a visitor's browser**. Static hosting serves their files; it is not the form's backend.

```mermaid
flowchart LR
  S[Article metadata and HTML] --> G[Python generator]
  H[Homepage header and markers] --> G
  G --> P[Article pages and listing]
  G --> D[Preview, RSS and sitemap]
  P --> B[Visitor browser]
  D --> B
  B --> F[External Web3Forms endpoint]
  F --> M[Mailbox delivery outside repository]
```

In words: the generator reads article pairs and parts of the homepage, then writes public files. The browser reads the static site and may send an inquiry to an external provider. The provider's mail relay and mailbox are outside local code and test observation.

## Component responsibilities

| Component | Owns | Does not own |
| --- | --- | --- |
| `index.html`, `thank-you.html`, `styles.css`, `shield-mark.svg` | Public copy, layout, field attributes, contact alternatives and outcomes | Provider routing confirmation or customer records |
| `inquiry.js` | Validation UI, duplicate guard, JSON request, acceptance/error state | Server validation, spam resistance or inbox receipt |
| `content/blog/` | Five public metadata/body pairs | Generated pages or device implementation |
| `build-blog.py` | Article/listing templates, structured data, TOC, preview, feed, sitemap | Scheduler, stale-path deletion, atomic multi-file build |
| `tests/` | Local structure/markup, portfolio link/media and synthetic JS checks; separate owner activation utility | Browser rendering, provider/mailbox or deployment acceptance |
| `zack/`, `zack-v2-archive/` | Separate personal-portfolio pages (home, ten case pages, own CSS/JS/media) linked from the homepage nav; the archive directory holds the previous version. Nothing in `build-blog.py` references them | The generator, `inquiry.js`, the Aegis inquiry form docs or the sitemap; reviewed here only by inventory, the homepage link and the portfolio test's rules |
| `_config.yml`, `CNAME`, `robots.txt` | Declared publish exclusions, custom domain, crawler discovery | Actual remote Pages/DNS state |
| Private docs and external hook adapter | Maintainer explanations and shared documentation enforcement route | A second live business status authority |

## Follow a lifecycle

- [Generation and publication dataflow](architecture/publication-dataflow.md): validation order, trusted HTML and output failure modes.
- [Inquiry lifecycle](architecture/inquiry-lifecycle.md): active/dormant, native/enhanced, provider/inbox states.
- [Developer source map](development/source-map-and-requirements.md): modules, native runtimes and real extension points.

The decorative `$ aegis solve`/`$ aegis notes` strings and homepage sample `build-spec.json` are presentation, not repository CLIs or schemas. No local backend, database, payment handler, device runtime or camera dashboard implementation is present.
