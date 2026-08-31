#!/bin/sh
# Rebuild every page from _partials/. Run after editing a body file, the shared
# header/footer, or the stylesheet.
set -eu
cd "$(dirname "$0")"

build() { _partials/mk.sh "$1" "$2" "$3" "_partials/body/$1"; }

build index.html        "Start Here"        "A complete beginner's guide to calisthenics, built for a 5'9\" 150 lb lifter training three days a week with no equipment."
build fundamentals.html "Fundamentals"      "Progressive overload, RIR, sets and reps, tempo, rest, frequency, and the five ways to make a bodyweight exercise harder."
build exercises.html    "Exercise Library"  "Progression ladders for every calisthenics movement, from wall push-ups to the front lever, with rep gates, cues, and common mistakes."
build program.html      "The Program"       "A 24-week, three-day-a-week calisthenics program in three phases, starting with no equipment."
build goals.html        "Goals & Metrics"   "Baseline testing, strength standards, measurement protocols, and 3/6/12-month calisthenics targets for a 150 lb beginner."
build nutrition.html    "Nutrition"         "Calories, protein, carbs, fat, a live macro calculator, food lists, sample days, hydration, and supplements for building muscle at 150 lb."
build recovery.html     "Recovery & Injury" "Sleep protocol, rest days, soreness vs injury, tendon health, the five common calisthenics injuries, mobility, and deloads."
build gear.html         "Gear & Shopping List" "What calisthenics equipment to buy in what order, with price ranges, pull-up bar comparisons, and what to skip."
build tracker.html      "Tracker"           "A local workout, body-metric, and baseline-test tracker that stores everything in your browser."
build faq.html          "FAQ & Myths"       "Direct answers to common beginner calisthenics questions, myths worth unlearning, and a troubleshooting table."
build references.html   "References"        "Sources for the claims on this site, what the evidence does not settle, and how the guidance changes by sex, age, and starting point."
build search.html       "Search"            "Search every section of the site. Works offline once the page has been visited."

# Search index, built from the generated pages.
python3 _partials/mkindex.py

# Service worker. Its version is a hash of everything it caches, so a rebuild
# automatically invalidates the previous offline copy.
python3 _partials/mksw.py
