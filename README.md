# CLSTHNCS

A static, no-build beginner calisthenics field guide, written for a 5'9", 150 lb lifter
training three days a week starting with no equipment. All units are US customary.

## Pages

| File | What's in it |
| --- | --- |
| `index.html` | Start here: profile numbers, the six factors that determine results, the 12-month roadmap, week-1 checklist |
| `fundamentals.html` | Progressive overload, the five levers, sets/reps/volume, RIR, tempo, rest, frequency, double progression, form, 12 beginner mistakes, glossary |
| `exercises.html` | Progression ladders with rep gates for every pattern — push-up, dip, pike/handstand, pull-up, row, squat, hinge, calves, core, L-sit, front lever, muscle-up — plus warm-up prep and no-equipment substitutions |
| `program.html` | The 24-week, 3-day/week program in three phases, with session tables, week-by-week calendar, deloads, cardio, and what to do when life interferes |
| `goals.html` | 12-test baseline protocol, measurement protocols, Navy body-fat calculator, strength standards by training age, 3/6/12-month targets, milestone checklist, "it's not working" diagnostic |
| `nutrition.html` | Live TDEE/macro calculator, rate of gain, protein/carb/fat guidance, food tables with grams, a sample 2,800 kcal day, grocery list, appetite strategies, hydration, supplements, bulk vs cut |
| `recovery.html` | Sleep protocol, rest days, DOMS vs injury, pain traffic light, tendon adaptation, the five common calisthenics injuries, mobility routine, stretching, deloads, overtraining |
| `gear.html` | Tier 0 (free) through Tier 3 shopping list with price ranges and Amazon category search links, pull-up bar comparison and safety checks, what to skip, three sample budgets |
| `tracker.html` | Browser-local logger: body metrics with a rolling-average chart, workout log with personal bests, weekly review, progress photos (IndexedDB, on-device), baseline-test comparison, JSON/CSV export and import |
| `faq.html` | ~25 FAQs, 15 myths, and a symptom → cause → fix troubleshooting table |
| `references.html` | Sources for the site's claims, what the evidence does *not* settle, and how the guidance changes by sex, age, and starting point |
| `rungs.html` | Eleven questions that set your starting rung on every ladder, saved to `cal-rungs` |
| `today.html` | Session runner: derives your week, picks the next session, shows rungs and last time's numbers, times rests, logs into `cal-workouts` |
| `cards.html` | Printable session cards and a 24-week wall calendar, generated from the program data and your saved rungs |
| `search.html` | Client-side search across every section, backed by a build-time index. `/` from any page opens it |

## Structure

Pages are assembled from parts so the shared chrome lives in one place:

```
_partials/head.html      <!doctype> through the nav, with {{TITLE}} / {{DESC}}
_partials/foot.html      disclaimer footer and closing tags
_partials/body/*.html    the <main> content of each page — this is where the writing lives
_partials/mk.sh          head + body + foot -> page
_partials/mkindex.py     assets/search-index.json, one record per <h2> section
_partials/sw.js          service worker template ({{VERSION}}, {{SHELL}}, {{EXTRAS}})
_partials/mksw.py        stamps the template into sw.js with a content-hash version
_partials/check.py       links, anchors, assets, tag balance, CSS classes, accessibility
_partials/mkmeta.py      sitemap.xml and robots.txt
_partials/live.py        smoke-tests the published site
build.sh                 rebuilds every page, the search index, sw.js, sitemap.xml, robots.txt
assets/style.css         all styling (design tokens at the top, light + dark)
assets/site.js           theme, nav, checklists, "/" search shortcut, SW registration
assets/program-data.js   the 24-week program and all eleven ladders, as data —
                         every rung carries how / cue / avoid
_partials/mkladders.js   regenerates the ladders on exercises.html from that data
assets/food-data.js      42 foods with full macros, feeding the tables and the
                         day builder on nutrition.html
_partials/mkfoods.js     regenerates those tables from the data
_partials/check-food.py  holds every food row to macro/calorie arithmetic
assets/images/           photography and session illustrations
.nojekyll                tells GitHub Pages to serve the files as-is
```

Verify before committing:

```sh
npm install          # once — pulls jsdom for the test harness
npm run verify       # build + static checks + food arithmetic + behavior tests
```

`npm run verify` runs three things:

- **`./build.sh`** — regenerates every page, the search index, and `sw.js`.
- **`_partials/check.py`** — internal links, anchors, asset paths, tag balance,
  skip-link targets, and the service worker precache list. No dependencies.
- **`_partials/test.js`** — serves the repo on an ephemeral port, loads every
  page in jsdom, and asserts that nothing throws plus ~130 specific behaviors:
  the nutrition calculator and body-fat estimator, the tracker (weights,
  rolling average, chart geometry, personal bests, weekly review, baseline-test
  deltas, deletion, backup round-trip), the session runner (week and phase
  derivation, volume ramp, deloads, RIR capture, session rotation, what gets
  logged), the rung finder, the printable cards, and search. Run this after any
  restyle: it catches markup changes that silently break the scripts.

After publishing, smoke-test what actually went out:

```sh
npm run live        # or: python3 _partials/live.py <base-url>
```

That checks every URL in the sitemap for a 200 and the right content type,
confirms the service worker's precache list resolves (one 404 in it aborts the
install and leaves users with no offline copy), and that the search index
parses.

Edit a body file (or the header, footer, or stylesheet), then:

```sh
./build.sh
```

The generated `*.html` files at the repo root are committed, because GitHub Pages
serves them directly — there is no build step on the server.

### Restyling

Content and presentation are separate. To change the look, replace
`assets/style.css` and, if needed, the markup in `_partials/head.html` /
`_partials/foot.html`, then run `./build.sh`. The body files use semantic,
class-light markup: `.card`, `.grid`, `.stat`, `.ladder`, `.ex` (a `<details>`
exercise entry), `.note` / `.tip` / `.warn-box` / `.stop-box`, `.table-wrap`,
`.toc`, `.next-prev`, `.checklist`. Nothing depends on the current colors.

## Publishing to GitHub Pages

1. Create an empty repository on GitHub — no README, no `.gitignore`, no license.

2. From this directory:

   ```sh
   git add .
   git commit -m "Add calisthenics beginner site"
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages**. Under *Build and deployment*, set
   **Source** to `Deploy from a branch`, **Branch** to `main`, folder `/ (root)`,
   and click **Save**.

4. Wait one to two minutes. The site goes live at:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

   If you name the repo `<your-username>.github.io`, it is served at
   `https://<your-username>.github.io/` instead.

To publish later changes: `./build.sh && git add . && git commit -m "..." && git push`.
Pages redeploys automatically within a minute or two.

### Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Where exercise instructions live

`assets/program-data.js` is the single source of truth for every movement: all
eleven ladders, 76 rungs, and seven accessories, each with

- `n` — the name
- `gate` — the performance that earns the next rung
- `how` — setup and execution, in the order you do them
- `cue` — the one thing that matters while you are doing it
- `avoid` — the mistake people actually make on that specific rung

Three surfaces consume it, so they cannot drift apart:

- **`exercises.html`** — `_partials/mkladders.js` regenerates the ladders into
  the page between `<!-- LADDER:key -->` markers, as *static* HTML so it works
  without JavaScript and gets picked up by the search index. `build.sh` runs it
  first; edit the data, never the generated markup. The front lever and
  muscle-up ladders have no data entry and are left hand-written.
- **`today.html`** — a "How to do it" disclosure on each exercise, showing the
  instructions for the rung you are actually on.
- **`cards.html`** — the one-line cue, printed under each exercise name.

Adding a rung means adding one object to the data and rerunning `./build.sh`.

`assets/food-data.js` works the same way: 42 foods with calories and all three
macros per serving, generating the three tables on `nutrition.html` via
`_partials/mkfoods.js` and driving the day builder on that page.
`_partials/check-food.py` fails the build if any row's macros stop reconciling
with its calories, which is how a transposed digit gets caught.

## Handoff notes for the visual pass

One accessibility warning is deliberately left open because the fix is a design
decision, not a content one. `python3 _partials/check.py` reports it on every
prose page:

> heading level jumps from h2 to h4

`.card` blocks use `<h4>` for their titles, so a screen reader navigating by
heading sees h2 → h4 with nothing between. The reason it hasn't been changed is
that `assets/style.css` currently styles `h3` as a large section heading and
`h4` as a small uppercase label, so promoting the tags would visibly break the
design. The clean fix, when the design settles:

1. Add a rule to `assets/style.css` that reproduces the current `h4` appearance
   under a class, e.g.
   `.card-h { font-size: .72rem; font-weight: 800; letter-spacing: .095em; text-transform: uppercase; margin: 0 0 .55rem; }`
2. Change `<h4>` to `<h3 class="card-h">` inside `.card` blocks in
   `_partials/body/*.html`.
3. Rebuild — the warning disappears and nothing looks different.

`today.html` already does this with a page-scoped `.card-h`, if you want to see
the shape of it.

## Offline support

`sw.js` is a service worker generated by the build. It precaches every page,
the stylesheet, `site.js`, and the search index (the shell — install fails and
the previous cache is kept if any of them can't be fetched), then caches images
best-effort. Pages are served network-first so a rebuild appears immediately
when online; assets are cache-first.

The cache name embeds a hash of the cached content, so publishing new content
retires the old cache with no manual version bumping. To verify: load the site,
go offline in DevTools, and navigate — an "Offline" badge appears and pages
still work.

## Data and privacy

The tracker stores everything in `localStorage` under `cal-weights`,
`cal-workouts`, and `cal-tests`. Nothing is uploaded and there is no account or
analytics of any kind. Clearing browser data erases it — use the JSON export.

## Disclaimer

Educational content, not medical advice. See the footer on every page.
