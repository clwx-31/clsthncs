#!/usr/bin/env python3
"""Generate sw.js from _partials/sw.js.

SHELL is everything the site needs to function offline and must all fetch
successfully or the install is abandoned. EXTRAS is cached best-effort, so a
single missing image can never break offline support. The cache name is a hash
of both lists, so any rebuild retires the previous cache automatically.
"""
import glob
import hashlib
import os

shell = sorted(glob.glob("*.html"))
shell += sorted(glob.glob("assets/*.css")) + sorted(glob.glob("assets/*.js"))
shell += ["assets/search-index.json"]
shell = [f for f in shell if os.path.isfile(f)]

extras = sorted(glob.glob("assets/images/*")) + sorted(glob.glob("assets/*.woff2"))
extras = [f for f in extras if os.path.isfile(f)]

digest = hashlib.sha256()
for f in shell + extras:
    digest.update(open(f, "rb").read())
version = digest.hexdigest()[:12]


def as_list(paths):
    return ",\n".join("  '%s'" % p for p in paths)


out = (open("_partials/sw.js", encoding="utf-8").read()
       .replace("{{VERSION}}", version)
       .replace("{{SHELL}}", as_list(shell))
       .replace("{{EXTRAS}}", as_list(extras)))
open("sw.js", "w", encoding="utf-8").write(out)
print("built sw.js (version %s, %d shell + %d extras)" % (version, len(shell), len(extras)))
