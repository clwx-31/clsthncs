#!/usr/bin/env python3
"""Build assets/search-index.json from the generated pages.

One record per <h2 id="..."> section, so a hit can link straight to the anchor.
Text is stripped of markup and squeezed; scripts and style blocks are dropped.
"""
import html
import json
import os
import re
import sys

PAGES = [
    ("index.html", "Start Here"),
    ("fundamentals.html", "Fundamentals"),
    ("exercises.html", "Exercise Library"),
    ("program.html", "The Program"),
    ("goals.html", "Goals & Metrics"),
    ("nutrition.html", "Nutrition"),
    ("recovery.html", "Recovery & Injury"),
    ("gear.html", "Gear & Shopping List"),
    ("tracker.html", "Tracker"),
    ("faq.html", "FAQ & Myths"),
    ("references.html", "References"),
    ("today.html", "Today's Session"),
    ("rungs.html", "Rung Finder"),
    ("cards.html", "Session Cards"),
]

DROP = re.compile(r"<(script|style|svg|datalist)\b.*?</\1>", re.S | re.I)
TAG = re.compile(r"<[^>]+>")
WS = re.compile(r"\s+")


def text_of(chunk):
    chunk = DROP.sub(" ", chunk)
    chunk = re.sub(r"<(li|p|td|th|tr|div|h[1-6])\b[^>]*>", " ", chunk, flags=re.I)
    chunk = TAG.sub(" ", chunk)
    return WS.sub(" ", html.unescape(chunk)).strip()


def main():
    records = []
    for path, title in PAGES:
        if not os.path.exists(path):
            continue
        src = open(path, encoding="utf-8").read()
        main_m = re.search(r"<main\b[^>]*>(.*)</main>", src, re.S | re.I)
        body = main_m.group(1) if main_m else src

        # Everything before the first h2 belongs to the page intro.
        parts = re.split(r'<h2\s+id="([^"]+)"[^>]*>(.*?)</h2>', body, flags=re.S)
        intro = text_of(parts[0])
        if intro:
            records.append({
                "p": path, "pt": title, "a": "", "h": title,
                "t": intro[:2500], "k": ""
            })

        for i in range(1, len(parts), 3):
            anchor, heading, chunk = parts[i], text_of(parts[i + 1]), parts[i + 2]
            subs = [text_of(x) for x in re.findall(r"<h3\b[^>]*>(.*?)</h3>", chunk, re.S)]
            subs += [text_of(x) for x in re.findall(r"<summary\b[^>]*>(.*?)</summary>", chunk, re.S)]
            records.append({
                "p": path, "pt": title, "a": anchor, "h": heading,
                "t": text_of(chunk)[:4000], "k": " · ".join(s for s in subs if s)[:600],
            })

    os.makedirs("assets", exist_ok=True)
    with open("assets/search-index.json", "w", encoding="utf-8") as f:
        json.dump({"pages": len({r["p"] for r in records}), "records": records},
                  f, ensure_ascii=False, separators=(",", ":"))
    size = os.path.getsize("assets/search-index.json")
    print("built assets/search-index.json (%d records, %d bytes)" % (len(records), size))


if __name__ == "__main__":
    sys.exit(main())
