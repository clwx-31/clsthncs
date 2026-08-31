#!/usr/bin/env python3
"""Smoke-test the published site.

    python3 _partials/live.py [base-url]

Checks things that only break after deployment: missing files, wrong content
types, a service worker precaching paths that 404, and a search index that
doesn't parse. Standard library only.
"""
import json
import re
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor

DEFAULT_BASE = "https://clwx-31.github.io/clsthncs/"
TIMEOUT = 20

EXPECTED_TYPE = {
    ".html": "text/html", ".css": "text/css", ".json": "application/json",
    ".xml": "xml", ".txt": "text/plain", ".webp": "image/webp", ".jpg": "image/jpeg",
}
JS_TYPES = ("javascript", "ecmascript")


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "clsthncs-smoke-test"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return r.status, r.headers.get("Content-Type", ""), r.read()


def main():
    base = (sys.argv[1] if len(sys.argv) > 1 else DEFAULT_BASE).rstrip("/") + "/"
    problems, checked = [], 0
    print("smoke-testing " + base + "\n")

    # 1. sitemap drives the page list, so a stale sitemap shows up here too
    try:
        _, _, body = get(base + "sitemap.xml")
        urls = re.findall(r"<loc>([^<]+)</loc>", body.decode("utf-8"))
    except Exception as e:
        print("FAIL sitemap.xml: %s" % e)
        return 1
    print("PASS sitemap.xml lists %d urls" % len(urls))

    def check_url(url):
        try:
            status, ctype, body = get(url)
        except urllib.error.HTTPError as e:
            return "%s -> HTTP %s" % (url, e.code)
        except Exception as e:
            return "%s -> %s" % (url, e)
        if status != 200:
            return "%s -> HTTP %d" % (url, status)
        if len(body) < 200:
            return "%s -> suspiciously small (%d bytes)" % (url, len(body))
        ext = "." + url.rsplit(".", 1)[-1] if "." in url.rsplit("/", 1)[-1] else ".html"
        if ext == ".js":
            if not any(t in ctype for t in JS_TYPES):
                return "%s -> served as %s, not JavaScript" % (url, ctype)
        elif ext in EXPECTED_TYPE and EXPECTED_TYPE[ext] not in ctype:
            return "%s -> served as %s, expected %s" % (url, ctype, EXPECTED_TYPE[ext])
        return None

    with ThreadPoolExecutor(max_workers=8) as pool:
        for result in pool.map(check_url, urls):
            checked += 1
            if result:
                problems.append(result)
    print("%s %d pages reachable with the right content type"
          % ("PASS" if not problems else "FAIL", checked))

    # 2. the service worker must not precache anything that 404s, or install fails
    try:
        _, ctype, body = get(base + "sw.js")
        sw = body.decode("utf-8")
        if not any(t in ctype for t in JS_TYPES):
            problems.append("sw.js served as %s, not JavaScript" % ctype)
        assets = re.findall(r"^  '([^']+)',?$", sw, re.M)
        version = (re.search(r"var VERSION = '([^']+)'", sw) or [None, "?"])[1]
        print("PASS sw.js served (version %s, %d precached files)" % (version, len(assets)))
        with ThreadPoolExecutor(max_workers=8) as pool:
            for result in pool.map(check_url, [base + a for a in assets]):
                if result:
                    problems.append("precached: " + result)
        print("%s every precached file resolves" % ("PASS" if not any(p.startswith("precached") for p in problems) else "FAIL"))
    except Exception as e:
        problems.append("sw.js: %s" % e)

    # 3. search is useless if the index doesn't parse
    try:
        _, _, body = get(base + "assets/search-index.json")
        data = json.loads(body)
        n = len(data.get("records", []))
        if n < 50:
            problems.append("search index has only %d records" % n)
        else:
            print("PASS search index parses (%d records across %d pages)" % (n, data.get("pages", 0)))
    except Exception as e:
        problems.append("search-index.json: %s" % e)

    try:
        _, _, body = get(base + "robots.txt")
        if b"Sitemap:" not in body:
            problems.append("robots.txt does not point at the sitemap")
        else:
            print("PASS robots.txt points at the sitemap")
    except Exception as e:
        problems.append("robots.txt: %s" % e)

    print("")
    if problems:
        for p in problems:
            print("FAIL " + p)
        print("\n%d problem(s)" % len(problems))
        return 1
    print("Live site looks healthy.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
