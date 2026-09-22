#!/usr/bin/env python3
"""Build the Aegis blog: article pages, blog index, RSS, homepage preview and sitemap. Standard library only.

Source: content/blog/<slug>.json (metadata) + <slug>.html (article body). Output is generated; never hand-edit it.
"""
import datetime as dt
import email.utils
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
BASE = "https://aegisequity.ca"
AUTHOR = "Aegis Engineered Solutions"
e = lambda value: html.escape(str(value), quote=True)

home = (ROOT / "index.html").read_text()
header = re.search(r'  <header class="topbar">.*?</header>\n', home, re.S).group(0)
header = header.replace('href="#"', 'href="/"').replace('src="shield-mark.svg"', 'src="/shield-mark.svg"')
header = re.sub(r'href="#([a-z-]+)"', r'href="/#\1"', header)
header = header.replace('href="/blog/"', 'href="/blog/" aria-current="page"')

posts = []
for path in sorted((ROOT / "content/blog").glob("*.json")):
    post = json.loads(path.read_text())
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", post["slug"]) or path.stem != post["slug"]:
        raise ValueError(f"Invalid slug in {path.name}")
    published = dt.date.fromisoformat(post["date_published"])
    modified = dt.date.fromisoformat(post["date_modified"])
    if modified < published:
        raise ValueError(f"Modification predates publication: {path.name}")
    if published > dt.datetime.now(dt.timezone.utc).date():
        continue  # Articles dated in the future are not published early.
    for field in ("title", "seo_title", "description", "category", "excerpt", "keyword"):
        if not post.get(field):
            raise ValueError(f"Missing {field}: {path.name}")
    post["body"] = path.with_suffix(".html").read_text()
    post["url"] = f'/blog/{post["slug"]}/'
    post["date_label"] = published.strftime("%B %d, %Y").replace(" 0", " ")
    post["minutes"] = max(1, round(len(re.sub(r"<[^>]+>", " ", post["body"]).split()) / 200))
    posts.append(post)
posts.sort(key=lambda post: (post["date_published"], post["slug"]), reverse=True)
if not posts:
    raise ValueError("At least one published post is required")


def page(title, description, path, body, schema, article=None):
    times = ""
    if article:
        times = f'\n  <meta property="article:published_time" content="{e(article["date_published"])}">\n  <meta property="article:modified_time" content="{e(article["date_modified"])}">'
    return f'''<!doctype html>
<html lang="en-CA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(title)}</title>
  <meta name="description" content="{e(description)}">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/svg+xml" href="/shield-mark.svg">
  <link rel="canonical" href="{BASE}{e(path)}">
  <link rel="alternate" type="application/rss+xml" title="Aegis Engineered Solutions blog" href="/blog/feed.xml">
  <meta property="og:type" content="{'article' if article else 'website'}">
  <meta property="og:url" content="{BASE}{e(path)}">
  <meta property="og:title" content="{e(title)}">
  <meta property="og:description" content="{e(description)}">
  <meta property="og:image" content="{BASE}/logo.png">{times}
  <script type="application/ld+json">{json.dumps(schema, ensure_ascii=False).replace('<', chr(92) + 'u003c')}</script>
</head>
<body>
{header}
  <main class="blog-main">
{body}
  </main>
</body>
</html>
'''


def card(post, heading="h2"):
    return (f'<article class="post-card"><p class="eyebrow">{e(post["category"])}</p>'
            f'<{heading}><a href="{post["url"]}">{e(post["title"])}</a></{heading}>'
            f'<p class="post-meta"><time datetime="{post["date_published"]}">{post["date_label"]}</time> · {post["minutes"]} min read</p>'
            f'<p>{e(post["excerpt"])}</p><a class="post-link" href="{post["url"]}">read the note →</a></article>')


cta = ('<aside class="post-cta"><p class="eyebrow">start</p><h2>Have a problem like this?</h2>'
       '<p>Start with a brief overview of the problem. We can discuss photos and technical details after first contact.</p>'
       '<a class="btn primary" href="/#contact">Describe the problem</a>'
       '<a class="btn secondary" href="/#systems">See the systems</a></aside>')

blog_dir = ROOT / "blog"
blog_dir.mkdir(exist_ok=True)
for post in posts:
    headings = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', post["body"])
    contents = ('<nav class="post-contents" aria-label="In this note"><p class="eyebrow">in this note</p><ul>'
                + ''.join(f'<li><a href="#{e(anchor)}">{title}</a></li>' for anchor, title in headings) + '</ul></nav>') if headings else ''
    body = (f'    <article class="post">\n      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span>'
            f'<a href="/blog/">Blog</a><span aria-hidden="true">/</span><span>{e(post["title"])}</span></nav>\n'
            f'      <header class="post-head"><p class="eyebrow">{e(post["category"])}</p><h1>{e(post["title"])}</h1>'
            f'<p class="post-meta">By {AUTHOR} · <time datetime="{post["date_published"]}">{post["date_label"]}</time> · {post["minutes"]} min read</p>'
            f'<p class="lede">{e(post["excerpt"])}</p></header>\n'
            f'      <div class="post-layout"><div class="post-body">{post["body"]}</div><div class="post-side">{contents}{cta}</div></div>\n'
            f'      <p class="post-back"><a class="post-link" href="/blog/">← all notes</a></p>\n    </article>')
    schema = {"@context": "https://schema.org", "@graph": [
        {"@type": "BlogPosting", "@id": BASE + post["url"] + "#article", "headline": post["title"], "description": post["description"],
         "url": BASE + post["url"], "mainEntityOfPage": BASE + post["url"], "datePublished": post["date_published"],
         "dateModified": post["date_modified"], "image": [BASE + "/logo.png"], "keywords": post["keyword"],
         "author": {"@type": "Organization", "name": AUTHOR, "url": BASE + "/"},
         "publisher": {"@type": "Organization", "name": "Aegis Equity Corp.", "url": BASE + "/", "logo": {"@type": "ImageObject", "url": BASE + "/logo.png"}},
         "inLanguage": "en-CA", "isPartOf": {"@id": BASE + "/blog/#blog"}},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": BASE + "/blog/"},
            {"@type": "ListItem", "position": 3, "name": post["title"], "item": BASE + post["url"]}]}]}
    directory = blog_dir / post["slug"]
    directory.mkdir(exist_ok=True)
    (directory / "index.html").write_text(page(post["seo_title"], post["description"], post["url"], body, schema, post))

body = ('    <section class="blog-intro"><p class="command-line">$ aegis notes --practical</p><h1>Build notes</h1>'
        '<p class="lede">How custom parts, power setups, sensors and small tools actually get measured, scoped and built. '
        'Practical notes from Durham Region and the Kawarthas.</p></section>\n'
        '    <section class="post-list" aria-label="Latest notes">' + ''.join(card(post) for post in posts) + '</section>')
schema = {"@context": "https://schema.org", "@type": "Blog", "@id": BASE + "/blog/#blog", "url": BASE + "/blog/",
          "name": "Aegis Engineered Solutions blog", "description": "Practical notes on custom parts, power systems, sensors and small tools.",
          "blogPost": [{"@type": "BlogPosting", "headline": p["title"], "url": BASE + p["url"], "datePublished": p["date_published"]} for p in posts]}
(blog_dir / "index.html").write_text(page("Custom Tech Build Notes | Aegis Engineered Solutions",
                                          "Practical notes on custom 3D-printed parts, solar and battery setups, sensors, dashboards and small tools from Aegis Engineered Solutions in Durham Region and the Kawarthas.",
                                          "/blog/", body, schema))

preview = ('<!-- BLOG-PREVIEW:START -->\n    <section class="blog-preview" aria-labelledby="notes-heading">\n'
           '      <div class="section-copy compact"><p class="eyebrow">notes</p><h2 id="notes-heading">Latest from the build notes.</h2></div>\n'
           '      <div class="post-list">' + ''.join(card(p, "h3") for p in posts[:2]) + '</div>\n'
           '      <p class="post-back"><a class="post-link" href="/blog/">all build notes →</a></p>\n    </section>\n    <!-- BLOG-PREVIEW:END -->')
home, count = re.subn(r'<!-- BLOG-PREVIEW:START -->.*?<!-- BLOG-PREVIEW:END -->', lambda _: preview, home, flags=re.S)
if count != 1:
    raise ValueError("Homepage blog preview markers missing or duplicated")
(ROOT / "index.html").write_text(home)

lastmod = max(p["date_modified"] for p in posts)
urls = [("/", lastmod), ("/blog/", lastmod)] + [(p["url"], p["date_modified"]) for p in posts]
(ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                  + ''.join(f'  <url>\n    <loc>{BASE}{e(u)}</loc>\n    <lastmod>{d}</lastmod>\n  </url>\n' for u, d in urls) + '</urlset>\n')
items = []
for p in posts:
    published = dt.datetime.fromisoformat(p["date_published"]).replace(tzinfo=dt.timezone.utc)
    items.append(f'<item><title>{e(p["title"])}</title><link>{BASE}{p["url"]}</link><guid isPermaLink="true">{BASE}{p["url"]}</guid>'
                 f'<pubDate>{email.utils.format_datetime(published)}</pubDate><description>{e(p["excerpt"])}</description></item>')
(blog_dir / "feed.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>'
                                   f'<title>Aegis Engineered Solutions blog</title><link>{BASE}/blog/</link>'
                                   '<description>Practical notes on custom parts, power systems, sensors and small tools.</description><language>en-ca</language>'
                                   f'<atom:link href="{BASE}/blog/feed.xml" rel="self" type="application/rss+xml" />' + ''.join(items) + '</channel></rss>\n')
print(f"Built blog index, {len(posts)} article(s), RSS, homepage preview and sitemap.")
