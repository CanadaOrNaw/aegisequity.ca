#!/usr/bin/env python3
"""Validate the shipped HTML links, metadata, sitemap and RSS without network calls."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re
import xml.etree.ElementTree as ET

from test_inquiry import check_markup

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, content):
        super().__init__(); self.ids = set(); self.links = []; self.h1s = 0
        self.canonical = []; self.description = []; self.schemas = []; self.in_schema = False
        self.feed(content)

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate id {attrs['id']}"
            self.ids.add(attrs['id'])
        if tag == 'h1': self.h1s += 1
        for attr in ('href', 'src'):
            if attrs.get(attr): self.links.append(attrs[attr])
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical.append(attrs['href'])
        if tag == 'meta' and attrs.get('name') == 'description': self.description.append(attrs['content'])
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.in_schema = True

    def handle_endtag(self, tag):
        if tag == 'script': self.in_schema = False

    def handle_data(self, value):
        if self.in_schema: self.schemas.append(json.loads(value))


files = [ROOT / 'index.html', ROOT / 'thank-you.html'] + sorted((ROOT / 'blog').rglob('*.html'))
pages = {path: Page(path.read_text()) for path in files}
links = 0
for path, page in pages.items():
    text = path.read_text()
    assert page.h1s == 1, f"Expected one H1: {path}"
    assert len(page.description) == 1 and page.description[0], f"Missing description: {path}"
    assert len(page.canonical) == (0 if path == ROOT / 'thank-you.html' else 1), f"Unexpected canonical: {path}"
    if path != ROOT / 'thank-you.html':
        assert 'noindex' not in text, f"noindex on {path}"
    assert '—' not in re.sub(r'<script.*?</script>', '', text, flags=re.S) or path == ROOT / 'index.html', f"Em dash in {path}"
    for link in page.links:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc: continue
        target = ((ROOT / parsed.path.lstrip('/')) if parsed.path.startswith('/') else (path.parent / parsed.path)) if parsed.path else path
        if target.is_dir(): target = target / 'index.html'
        target = target.resolve()
        assert target.exists(), f"Broken link {link} in {path.relative_to(ROOT)}"
        if parsed.fragment and target in pages:
            assert unquote(parsed.fragment) in pages[target].ids, f"Broken anchor {link} in {path}"
        links += 1
    if path.parent not in (ROOT, ROOT / 'blog'):
        schema = page.schemas[0]['@graph'][0]
        assert schema['@type'] == 'BlogPosting'
        assert schema['url'] == page.canonical[0]
        assert schema['author']['name'] == 'Aegis Engineered Solutions'
        assert schema['dateModified'] >= schema['datePublished']
        assert any(l.startswith('mailto:admin@aegisequity.ca') for l in page.links), f"No contact route: {path}"
        body = text.split('class="post-body">', 1)[1]
        assert not re.search(r'\$\s?\d', body), f"Price in article: {path}"
        for banned in ('certified', 'code-compliant', 'engineer-stamped', 'guarantee'):
            assert banned not in body.lower(), f"Unsupported claim '{banned}' in {path}"

# Keep the buyer-facing homepage and its structured data aligned with real services.
home = ROOT / 'index.html'
home_text = home.read_text()
home_schema = pages[home].schemas[0]['@graph']
by_type = {node['@type']: node for node in home_schema}
assert {'Organization', 'WebSite', 'Service'} <= by_type.keys(), 'Missing factual business schema'
assert by_type['Service']['provider']['@id'] == by_type['Organization']['@id']
assert by_type['WebSite']['publisher']['@id'] == by_type['Organization']['@id']
assert 'Durham Region and the Kawarthas' in home_text
assert 'Can you make a single replacement part?' in home_text
assert 'Can you combine hardware and software?' in home_text
assert 'licensed engineering sign-off' in home_text
check_markup(ROOT)

sitemap = ET.parse(ROOT / 'sitemap.xml')
locations = [x.text for x in sitemap.findall('.//{*}loc')]
assert len(locations) == len(set(locations)), "Duplicate sitemap URLs"
for url in locations:
    target = ROOT / urlsplit(url).path.lstrip('/')
    if target.is_dir(): target /= 'index.html'
    assert target.exists(), f"Missing sitemap destination: {url}"
for path, page in pages.items():
    if path == ROOT / 'thank-you.html':
        assert not page.canonical and 'name="robots" content="noindex"' in path.read_text(), "Thank-you must be unindexed"
    else:
        assert page.canonical[0] in locations, f"Page not in sitemap: {path}"
articles = [p for p in files if p.parent not in (ROOT, ROOT / 'blog')]
rss = ET.parse(ROOT / 'blog/feed.xml')
assert len(rss.findall('.//item')) == len(articles), "RSS item count differs from articles"
excluded = open(ROOT / '_config.yml').read()
for private in ('content', 'build-blog.py', 'tests'):
    assert f'- {private}' in excluded, f"{private} is not excluded from the published site"
print(f'PASS: {len(files)} pages, {links} internal links, article metadata, {len(locations)} sitemap URLs and RSS.')
