#!/usr/bin/env python3
"""Generate sw.js from _partials/sw.js with a content-hash version and asset list.

Everything the site needs offline goes in the precache list. The version is a
hash of that content, so any rebuild retires the previous cache automatically.
"""
import glob
import hashlib
import os

files = sorted(glob.glob("*.html"))
files += ["assets/style.css", "assets/site.js", "assets/search-index.json"]
files += sorted(glob.glob("assets/images/*"))
files += sorted(glob.glob("assets/*.woff2"))
files = [f for f in files if os.path.isfile(f)]

digest = hashlib.sha256()
for f in files:
    digest.update(open(f, "rb").read())
version = digest.hexdigest()[:12]

template = open("_partials/sw.js", encoding="utf-8").read()
assets = ",\n".join("  '%s'" % f for f in files)
out = template.replace("{{VERSION}}", version).replace("{{ASSETS}}", assets)
open("sw.js", "w", encoding="utf-8").write(out)
print("built sw.js (version %s, %d cached files)" % (version, len(files)))
