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


def attr(tag, name):
    m = re.search(r'\b%s\s*=\s*"([^"]*)"' % name, tag, re.I)
    return m.group(1) if m else None


def has_attr(tag, name):
    return re.search(r'\b%s\s*=' % name, tag, re.I) is not None


def accessibility(page, html):
    """Structural accessibility checks. Not a substitute for a real audit —
    these are the mistakes that are cheap to make and cheap to catch."""
    out, warn = [], []
    body = SCRIPTS.sub("", re.sub(r"<style\b.*?</style>", "", html, flags=re.S))

    if not re.search(r'<html[^>]*\blang\s*=', html, re.I):
        out.append("%s: <html> has no lang attribute" % page)

    h1s = re.findall(r"<h1\b", body)
    if len(h1s) != 1:
        out.append("%s: expected exactly one <h1>, found %d" % (page, len(h1s)))

    levels = [int(m) for m in re.findall(r"<h([1-6])\b", body)]
    prev = None
    for lvl in levels:
        if prev is not None and lvl > prev + 1:
            warn.append("%s: heading level jumps from h%d to h%d — screen readers "
                        "navigating by heading see a gap in the outline" % (page, prev, lvl))
            break
        prev = lvl

    for tag in re.findall(r"<img\b[^>]*>", body, re.I):
        if not has_attr(tag, "alt"):
            out.append("%s: <img> with no alt attribute (%s)" % (page, (attr(tag, "src") or "")[:50]))

    # A control is named by a wrapping <label>, a label[for=id], aria-label,
    # aria-labelledby, or (for buttons/links) its own text.
    labelled_for = set(re.findall(r'<label\b[^>]*\bfor\s*=\s*"([^"]+)"', body, re.I))
    wrapped = set()
    for block in re.findall(r"<label\b[^>]*>(.*?)</label>", body, re.S | re.I):
        for tag in re.findall(r"<(?:input|select|textarea)\b[^>]*>", block, re.I):
            wrapped.add(tag)

    for tag in re.findall(r"<(?:input|select|textarea)\b[^>]*>", body, re.I):
        kind = (attr(tag, "type") or "text").lower()
        if kind in ("hidden", "submit", "button", "image"):
            continue
        if attr(tag, "aria-label") or attr(tag, "aria-labelledby"):
            continue
        if tag in wrapped:
            continue
        tag_id = attr(tag, "id")
        if tag_id and tag_id in labelled_for:
            continue
        out.append("%s: form control has no accessible name (%s)" % (page, tag[:70]))

    for m in re.finditer(r"<button\b([^>]*)>(.*?)</button>", body, re.S | re.I):
        opening, inner = m.group(1), m.group(2)
        text = re.sub(r"<[^>]+>", "", re.sub(r'<[^>]*aria-hidden\s*=\s*"true".*?</[^>]+>', "", inner, flags=re.S)).strip()
        if not text and not attr(opening, "aria-label") and not attr(opening, "aria-labelledby"):
            out.append("%s: <button> has no accessible name (%s)" % (page, opening.strip()[:60]))

    for m in re.finditer(r"<a\b([^>]*\bhref[^>]*)>(.*?)</a>", body, re.S | re.I):
        opening, inner = m.group(1), m.group(2)
        text = re.sub(r"<[^>]+>", "", inner).strip()
        if not text and not attr(opening, "aria-label") and not re.search(r"<img\b", inner, re.I):
            out.append("%s: <a> has no discernible text (%s)" % (page, opening.strip()[:60]))

    for table in re.findall(r"<table\b.*?</table>", body, re.S | re.I):
        if "<tr" not in table.lower():
            continue  # populated at runtime; nothing to judge here
        if "<th" not in table.lower():
            out.append("%s: <table> has no header cells" % page)
            break

    return out, warn
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
    warnings = []

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
        for value in re.findall(r'class="([^"]+)"', s):
            for cls in value.split():
                if cls not in defined and cls not in ALLOW_UNSTYLED:
                    problems.append("%s: class .%s is used but never defined" % (p, cls))

        a11y_problems, a11y_warnings = accessibility(p, raw[p])
        problems.extend(a11y_problems)
        warnings.extend(a11y_warnings)

    if os.path.exists("sw.js"):
        listed = re.findall(r"^  '([^']+)',?$", open("sw.js", encoding="utf-8").read(), re.M)
        for a in listed:
            if not os.path.exists(a):
                problems.append("sw.js precaches missing file: %s" % a)
        for p in pages:
            if p not in listed:
                problems.append("sw.js does not precache page: %s" % p)

    if warnings:
        print("Warnings (not build-breaking):")
        for w in warnings:
            print("  " + w)
        print("")

    if problems:
        print("\n".join(problems))
        print("\n%d problem(s)" % len(problems))
        return 1
    print("OK — %d pages: links, anchors, assets, tag balance, skip-link targets, CSS classes, accessibility, precache list" % len(pages))
    return 0


if __name__ == "__main__":
    sys.exit(main())
