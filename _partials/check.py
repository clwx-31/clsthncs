#!/usr/bin/env python3
"""Sanity checks on the generated pages: internal links, anchors, asset paths,
tag balance, skip-link targets, CSS class coverage, and the service worker
precache list. No third-party dependencies — see _partials/test.js for the
behavior tests."""
import glob
import os
import re
import sys

SCRIPTS = re.compile(r"<script\b.*?</script>", re.S | re.I)
COMMENTS = re.compile(r"/\*.*?\*/", re.S)

# Classes that are markup hooks or deliberately carry no styling.
ALLOW_UNSTYLED = {"menu-label"}


def strip_comments(text):
    return COMMENTS.sub("", text)
TAGS = ["div", "table", "details", "main", "section", "ul", "ol", "tr", "td", "th", "nav", "header", "footer"]


def main():
    pages = sorted(glob.glob("*.html"))
    raw = {p: open(p, encoding="utf-8").read() for p in pages}
    clean = {p: SCRIPTS.sub("", s) for p, s in raw.items()}
    ids = {p: set(re.findall(r'id="([^"]+)"', s)) for p, s in raw.items()}
    css_classes = set()
    if os.path.exists("assets/style.css"):
        css_classes = set(re.findall(
            r"\.([A-Za-z][\w-]*)",
            strip_comments(open("assets/style.css", encoding="utf-8").read())))
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

        # Every class in the markup must be defined in the shared stylesheet or
        # in a <style> block on that page. Catches classes that lose their
        # styling in a restyle, or that were only ever defined on another page.
        inline = " ".join(re.findall(r"<style\b[^>]*>(.*?)</style>", raw[p], re.S))
        defined = css_classes | set(re.findall(r"\.([A-Za-z][\w-]*)", strip_comments(inline)))
        for attr in re.findall(r'class="([^"]+)"', s):
            for cls in attr.split():
                if cls not in defined and cls not in ALLOW_UNSTYLED:
                    problems.append("%s: class .%s is used but never defined" % (p, cls))

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
    print("OK — %d pages: links, anchors, assets, tag balance, skip-link targets, CSS classes, precache list" % len(pages))
    return 0


if __name__ == "__main__":
    sys.exit(main())
