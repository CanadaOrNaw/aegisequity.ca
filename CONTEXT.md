# aegisequity.ca - source-owned static website

## Inputs

| Source | File / location | Section / scope | Why |
|---|---|---|---|
| Entry | `CLAUDE.md` | Selected source/operation route | Owner and public-action boundary |
| Article source | `content/blog/SLUG.json`, `content/blog/SLUG.html` | Requested article only | Metadata/body authority |
| Generator | `build-blog.py` | Input/output/validation path | Generated blog, preview, sitemap and RSS behavior |
| Site/config | `index.html`, `styles.css`, `inquiry.js`, `CNAME`, `_config.yml` | Changed component/config only | Actual presentation, form and domain source |
| Guide | `docs/handbook/index.md` | Applicable task/reference/tests | Existing prerequisite and evidence route |

## Process

1. Resolve the requested page/article/config to its canonical source and approved public purpose.
2. Draft content against Aegis's existing facts and task outcome; generated pages are not the style/fact authority.
3. Use the existing generator/check workflow in an authorized environment; inspect changed output and `tests/check-site.py` results.
4. Follow source-linked docs, independent review and exact Git submission checks. A normal Git push to the public deployment destination is a publication action, not a private backup.

## Outputs

| Artifact | Location | Format |
|---|---|---|
| Authored source | Existing task-named root/content files | HTML, CSS, JS, JSON |
| Derived article views | `blog/`, homepage preview, `sitemap.xml`, RSS | Generator-owned output |
| Documentation | `docs/handbook/`, `docs/verification/` | Canonical Markdown and private review JSON |

## Checkpoints

| After step | Agent presents | Human decides |
|---|---|---|
| Draft content or changed public behavior | Claims, intended reader action and generated preview | Aegis/Zack approval under existing publication policy |

## Audit

| Check | Pass condition |
|---|---|
| Value/facts | Output serves the task's agreed reader purpose and approved company claims |
| Generation | Authoritative source regenerated; links/metadata/RSS/sitemap checks report actual results |
| Publication | Rights/privacy/deployment permissions are explicit; source success is not live acceptance |
