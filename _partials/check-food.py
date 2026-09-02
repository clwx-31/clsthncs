#!/usr/bin/env python3
"""Hold every food row to arithmetic sanity.

Macros times 4/4/9 should land near the listed calories. Fibre and sugar
alcohols legitimately pull the real figure below the shorthand, so the tolerance
is one-sided and generous — the point is catching a transposed digit, not
policing Atwater factors.
"""
import json
import re
import subprocess
import sys

TOLERANCE_OVER = 0.14   # macros may over-predict (fibre)
TOLERANCE_UNDER = 0.08  # under-predicting means a macro is probably missing


def main():
    js = "global.window={};require('./assets/food-data.js');console.log(JSON.stringify(window.FOODS.all));"
    rows = json.loads(subprocess.check_output(["node", "-e", js], text=True))
    problems = []
    for r in rows:
        implied = r["p"] * 4 + r["c"] * 4 + r["f"] * 9
        if r["cal"] <= 0:
            problems.append("%s: non-positive calories" % r["n"])
            continue
        drift = (implied - r["cal"]) / r["cal"]
        if drift > TOLERANCE_OVER:
            problems.append("%-28s %s: macros imply %d kcal vs %d listed (+%.0f%%)"
                            % (r["n"], r["serving"], implied, r["cal"], drift * 100))
        elif drift < -TOLERANCE_UNDER:
            problems.append("%-28s %s: macros imply only %d kcal vs %d listed (%.0f%%) — a macro may be missing"
                            % (r["n"], r["serving"], implied, r["cal"], drift * 100))
        for key in ("p", "c", "f"):
            if r[key] < 0:
                problems.append("%s: negative %s" % (r["n"], key))

    if problems:
        print("\n".join(problems))
        print("\n%d of %d rows fail the arithmetic check" % (len(problems), len(rows)))
        return 1
    print("OK — %d food rows: macros reconcile with calories" % len(rows))
    return 0


if __name__ == "__main__":
    sys.exit(main())
