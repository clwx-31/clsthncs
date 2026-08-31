#!/usr/bin/env python3
"""Generate sitemap.xml and robots.txt.

BASE must match where the site is actually published — update it if the repo
or the Pages URL ever moves, or search engines will be pointed at dead URLs.
"""
import datetime
import glob
import os

BASE = "https://clwx-31.github.io/clsthncs/"

# Rough priority: the pages someone should land on first, then the rest.
PRIORITY = {
    "index.html": "1.0", "program.html": "0.9", "exercises.html": "0.9",
    "fundamentals.html": "0.9", "nutrition.html": "0.8", "goals.html": "0.8",
    "recovery.html": "0.8", "gear.html": "0.7", "today.html": "0.7",
    "rungs.html": "0.7", "tracker.html": "0.6", "cards.html": "0.6",
    "faq.html": "0.7", "references.html": "0.6", "search.html": "0.3",
}

pages = sorted(glob.glob("*.html"))
today = datetime.date.today().isoformat()

rows = []
for p in pages:
    mtime = datetime.date.fromtimestamp(os.path.getmtime(p)).isoformat()
    loc = BASE if p == "index.html" else BASE + p
    rows.append(
        "  <url>\n"
        "    <loc>%s</loc>\n"
        "    <lastmod>%s</lastmod>\n"
        "    <priority>%s</priority>\n"
        "  </url>" % (loc, mtime, PRIORITY.get(p, "0.5"))
    )

with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + "\n".join(rows) + "\n</urlset>\n")

with open("robots.txt", "w", encoding="utf-8") as f:
    f.write("User-agent: *\nAllow: /\n\nSitemap: %ssitemap.xml\n" % BASE)

print("built sitemap.xml (%d urls) and robots.txt" % len(pages))
