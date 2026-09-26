#!/usr/bin/env python3
"""Build the static site: wraps each src/*.html page in the shared head, header, and footer.

Edit pages in src/, shared chrome in partials/, then run:  python3 build.py
Output pages are written to the project root (ready to upload as-is).
"""
from pathlib import Path

ROOT = Path(__file__).parent
SITE = "https://flintriverchurch.org"
FONTS = ("https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800"
         "&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&display=swap")

PAGES = {
    "index.html": dict(
        path="",
        title="Flint River Church | Primitive Baptist Church in Huntsville, AL",
        desc="Flint River Primitive Baptist Church in Huntsville, Alabama — worshiping since 1808. "
             "Sunday School 9:00 a.m., Worship 10:30 a.m. at 213 Winchester Road. Plan your first visit.",
        preload="assets/img/hero-cross.webp",
        jsonld=True,
    ),
    "visit.html": dict(
        path="visit.html",
        title="Plan Your Visit | Flint River Church, Huntsville AL",
        desc="New to Flint River Church? Service times, directions, what to expect on your first Sunday, "
             "kids info, and answers to common questions. 213 Winchester Road, Huntsville, AL.",
    ),
    "about.html": dict(
        path="about.html",
        title="About Us & What We Believe | Flint River Church",
        desc="Flint River Primitive Baptist Church: our vision, mission, beliefs, pastor, "
             "and history as Alabama's oldest Baptist church, constituted in 1808.",
    ),
    "ministries.html": dict(
        path="ministries.html",
        title="Ministries | Flint River Church, Huntsville AL",
        desc="Youth, music, outreach, care, and Christian education ministries at Flint River Church "
             "in Huntsville, Alabama. Find your place to belong and serve.",
    ),
    "events.html": dict(
        path="events.html",
        title="Events & Church Calendar | Flint River Church",
        desc="Upcoming events at Flint River Church in Huntsville, AL: Communion Sundays, Family & Friends Day, "
             "Homecoming, revival, STEAM Summer Camp, and more.",
    ),
}


def head(p):
    url = f"{SITE}/{p['path']}"
    preload = (f'  <link rel="preload" as="image" href="{p["preload"]}" type="image/webp">\n'
               if p.get("preload") else "")
    jsonld = (ROOT / "partials/jsonld.html").read_text() if p.get("jsonld") else ""
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{p['title']}</title>
  <meta name="description" content="{p['desc']}">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Flint River Church">
  <meta property="og:title" content="{p['title']}">
  <meta property="og:description" content="{p['desc']}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{SITE}/assets/img/og.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#13203a">
  <link rel="icon" href="assets/img/logo-mark.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="{FONTS}" rel="stylesheet">
{preload}  <link rel="stylesheet" href="css/style.css">
{jsonld}</head>
<body>
"""


def main():
    header = (ROOT / "partials/header.html").read_text()
    footer = (ROOT / "partials/footer.html").read_text()
    urls = []
    for name, p in PAGES.items():
        body = (ROOT / "src" / name).read_text()
        # Mark the current page in the nav
        nav = header.replace(f'<a href="{name}">', f'<a href="{name}" aria-current="page">')
        (ROOT / name).write_text(head(p) + nav + "\n" + body + "\n" + footer + "</body>\n</html>\n")
        urls.append(f"{SITE}/{p['path']}")
        print("built", name)
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "".join(f"  <url><loc>{u}</loc></url>\n" for u in urls) + "</urlset>\n")
    (ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n")


if __name__ == "__main__":
    main()
