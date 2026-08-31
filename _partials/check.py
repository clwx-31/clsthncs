#!/usr/bin/env python3
"""Sanity checks on the generated pages: internal links, anchors, asset paths,
tag balance, and the service worker precache list."""
import glob
import os
import re
import sys

SCRIPTS = re.compile(r"<script\b.*?</script>", re.S | re.I)
TAGS = ["div", "table", "details", "main", "section", "ul", "ol", "tr", "td", "th", "nav", "header", "footer"]


def main():
    pages = sorted(glob.glob("*.html"))
    raw = {p: open(p, encoding="utf-8").read() for p in pages}
    clean = {p: SCRIPTS.sub("", s) for p, s in raw.items()}
    ids = {p: set(re.findall(r'id="([^"]+)"', s)) for p, s in raw.items()}
    problems = []

    for p, s in clean.items():
        for href in re.findall(r'href="([^"]+)"', s):
            if href.startswith(("http", "mailto:", "data:")):
                continue
            page, _, frag = href.partition("#")
            if page and not os.path.exists(page):
                problems.append("%s -> %s (missing file)" % (p, href))
                continue
            target = page or p
            if frag and frag not in ids.get(target, set()):
                problems.append("%s -> %s (missing anchor)" % (p, href))
        for src in re.findall(r'src="([^"]+)"', s):
            if src.startswith(("http", "data:")):
                continue
            if not os.path.exists(src):
                problems.append("%s -> %s (missing src)" % (p, src))
        for tag in TAGS:
            opened = len(re.findall(r"<%s[\s>]" % tag, s))
            closed = len(re.findall(r"</%s>" % tag, s))
            if opened != closed:
                problems.append("%s: <%s> unbalanced (%d open, %d close)" % (p, tag, opened, closed))
        if 'id="content"' not in s:
            problems.append("%s: no id=\"content\" for the skip link" % p)

    if os.path.exists("sw.js"):
        listed = re.findall(r"^  '([^']+)',?$", open("sw.js", encoding="utf-8").read(), re.M)
        for a in listed:
            if not os.path.exists(a):
                problems.append("sw.js precaches missing file: %s" % a)
        for p in pages:
            if p not in listed:
                problems.append("sw.js does not precache page: %s" % p)

    if problems:
        print("\n".join(problems))
        print("\n%d problem(s)" % len(problems))
        return 1
    print("OK — %d pages: links, anchors, assets, tag balance, skip-link targets, precache list" % len(pages))
    return 0


if __name__ == "__main__":
    sys.exit(main())
