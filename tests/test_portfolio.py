"""Read-only portfolio links, media and SYS-08 playback wiring checks."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO = ROOT / "zack"

class Markup(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.refs = []
        self.videos = []
        self.iframes = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        for field in ("href", "src", "poster"):
            if a.get(field):
                self.refs.append(a[field])
        if tag == "video":
            self.videos.append(a)
        if tag == "iframe":
            self.iframes.append(a)

pages = {p: Markup(p.read_text()) for p in [PORTFOLIO / "index.html", *sorted((PORTFOLIO / "work").glob("*.html"))]}
count = 0
for page, parsed in pages.items():
    for ref in parsed.refs:
        u = urlsplit(ref)
        if u.scheme or u.netloc:
            continue
        target = ROOT / unquote(u.path).lstrip("/") if u.path.startswith("/") else page.parent / unquote(u.path)
        if not u.path:
            target = page
        if target.is_dir():
            target /= "index.html"
        assert target.exists(), (page.relative_to(ROOT), ref)
        if u.fragment and target.suffix == ".html":
            assert u.fragment in Markup(target.read_text()).ids, (page.relative_to(ROOT), ref)
        count += 1
    for video in parsed.videos:
        assert all(flag in video for flag in ("muted", "loop", "playsinline", "autoplay")), page
        assert video.get("aria-label") and video.get("poster"), page

case = pages[PORTFOLIO / "work/sys-08.html"]
assert len(case.iframes) == 3
for frame, video_id in zip(case.iframes, ("0kVID1IQWEE", "j_diuj0nAIg", "snLAAeTeTwU")):
    embed = urlsplit(frame["src"])
    assert embed.hostname == "www.youtube-nocookie.com" and embed.path == f"/embed/{video_id}"
    assert f"https://www.youtube.com/watch?v={video_id}" in case.refs
home = pages[PORTFOLIO / "index.html"]
assert "media/sys08-epictetus.mp4" in home.refs
assert "../media/sys08-epictetus.mp4" in case.refs
assert "media/sys08-before-the-paver.mp4" in home.refs
assert "../media/sys08-before-the-paver.mp4" in case.refs
assert "media/sys08-before-the-paver.jpg" in home.refs
assert "../media/sys08-before-the-paver.jpg" in case.refs
watch_urls = [f"https://www.youtube.com/watch?v={video_id}" for video_id in ("0kVID1IQWEE", "j_diuj0nAIg", "snLAAeTeTwU")]
assert [ref for ref in case.refs if ref in watch_urls] == watch_urls
assert "eWLfF3wh5ks" in (PORTFOLIO / "work/sys-01.html").read_text()
print(f"PASS: {len(pages)} portfolio pages, {count} local links/media/posters, muted inline loops and SYS-08 embed/watch target.")
