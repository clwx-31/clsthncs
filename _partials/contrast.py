#!/usr/bin/env python3
"""WCAG contrast audit of the design tokens in assets/style.css.

Reads the custom properties from the light block, the prefers-color-scheme dark
block, and the [data-theme="dark"] block, then reports the contrast ratio for
the pairs that actually appear on the page. Non-hex values (color-mix, rgba,
gradients) are listed as unchecked rather than guessed at.

    python3 _partials/contrast.py [--strict]

--strict exits non-zero on any failure; by default it only reports, because
palette choices belong to whoever owns the design.
"""
import re
import sys

# (foreground token, background token, minimum ratio, what it is)
PAIRS = [
    ("--text", "--bg", 4.5, "body text on the page"),
    ("--text", "--bg-raised", 4.5, "body text on cards"),
    ("--text", "--bg-sunken", 4.5, "body text on table headers"),
    ("--text-muted", "--bg", 4.5, "secondary text on the page"),
    ("--text-muted", "--bg-raised", 4.5, "secondary text on cards"),
    ("--text-muted", "--bg-sunken", 4.5, "table header labels"),
    ("--text-faint", "--bg", 3.0, "hints and captions (large/decorative)"),
    ("--accent", "--bg", 4.5, "links in body text"),
    ("--accent", "--bg-raised", 4.5, "links on cards"),
    ("--accent", "--accent-soft", 4.5, "accent text in callouts"),
    ("--good", "--good-soft", 4.5, "text in tip callouts"),
    ("--warn", "--warn-soft", 4.5, "text in warning callouts"),
    ("--stop", "--stop-soft", 4.5, "text in stop callouts"),
    ("--border", "--bg", 1.4, "hairline borders (non-text)"),
]

BLOCKS = [
    ("light", r":root\s*\{(.*?)\}"),
    ("dark (system)", r'@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root[^{]*\{(.*?)\}'),
    ("dark (toggled)", r':root\[data-theme="dark"\]\s*\{(.*?)\}'),
]


def hex_to_rgb(value):
    v = value.strip().lstrip("#")
    if len(v) == 3:
        v = "".join(c * 2 for c in v)
    if len(v) != 6 or not re.fullmatch(r"[0-9a-fA-F]{6}", v):
        return None
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


def luminance(rgb):
    def channel(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (channel(x) for x in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(fg, bg):
    a, b = luminance(fg), luminance(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


def tokens_in(block):
    return dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", block))


def main():
    strict = "--strict" in sys.argv
    css = open("assets/style.css", encoding="utf-8").read()
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)

    light = {}
    failures = 0
    for name, pattern in BLOCKS:
        m = re.search(pattern, css, re.S)
        if not m:
            print("%s: block not found in style.css\n" % name)
            continue
        found = tokens_in(m.group(1))
        theme = dict(light)
        theme.update(found)
        if name == "light":
            light = dict(found)

        print("=== %s ===" % name)
        unchecked = []
        for fg_key, bg_key, minimum, label in PAIRS:
            fg_raw, bg_raw = theme.get(fg_key), theme.get(bg_key)
            if not fg_raw or not bg_raw:
                unchecked.append("%s on %s (token missing)" % (fg_key, bg_key))
                continue
            fg, bg = hex_to_rgb(fg_raw), hex_to_rgb(bg_raw)
            if not fg or not bg:
                unchecked.append("%s on %s (not a plain hex value)" % (fg_key, bg_key))
                continue
            r = ratio(fg, bg)
            ok = r >= minimum
            if not ok:
                failures += 1
            print("  %-4s %5.2f:1  (need %.1f)  %-38s  %s on %s"
                  % ("PASS" if ok else "FAIL", r, minimum, label, fg_key, bg_key))
        for u in unchecked:
            print("  --   unchecked: %s" % u)
        print("")

    if failures:
        print("%d pair(s) below the WCAG threshold." % failures)
        print("These are palette decisions — adjust the token, not the markup.")
        return 1 if strict else 0
    print("All checked pairs meet WCAG AA.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
