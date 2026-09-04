/* Regenerate the phase session tables on program.html from
   assets/program-data.js, between <!-- SESSIONS:0 --> and <!-- /SESSIONS:0 -->
   markers (one pair per phase, in PHASES order).

   These tables used to be hand-written, and they had drifted badly from the
   data: the "floor only" Onramp was prescribing Bulgarian split squats and
   Nordic curl negatives, both several rungs above where a beginner starts.
   Generating them makes that class of drift impossible, and it is what lets
   every row carry the data attributes the detail panel reads.

   Run by build.sh, ahead of page assembly. Same contract as mkladders.js:
   edit the data, never the generated markup. */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'assets', 'program-data.js'));
const C = global.window.CAL;

const BODY = path.join(ROOT, '_partials', 'body', 'program.html');

/* Photography, keyed by phase slug and session slot. */
const SLOT_SLUG = { A: 'push', B: 'pull', C: 'legs' };
const ALT = {
  'onramp-push': 'Beginner woman performing a controlled incline push-up with her hands on a sturdy bench',
  'onramp-pull': 'Beginner man performing an inverted row from a fixed waist-high rail',
  'onramp-legs': 'Beginner man performing a Bulgarian split squat with his rear foot supported on a chair',
  'foundation-push': 'Woman practicing a straight-arm chest-to-wall handstand in a concrete studio',
  'foundation-pull': 'Beginner man performing a band-assisted chin-up on a securely mounted bar',
  'foundation-legs': 'Woman practicing an assisted pistol squat while lightly holding a fixed post',
  'build-push': 'Man performing a controlled feet-elevated pike push-up with his hips high',
  'build-pull': 'Woman completing a strict overhand pull-up on an outdoor bar',
  'build-legs': 'Man holding the bottom position of a controlled unassisted pistol squat'
};

/* Where the photography shows a rung above where that phase starts you, say so.
   The alternative is a beginner in week 1 seeing a movement they will not touch
   for a month and assuming they are already behind. */
const CAPTION_NOTE = {
  'onramp-legs': 'Pictured: the Bulgarian split squat, two rungs up this ladder — where you are heading, not where you start.'
};

/* The warm-up is the same shape every session: raise your temperature, then
   prepare the joints the session is about to load. It is not in the program
   data because it is not progressed — it links to the prep section instead. */
const WARMUP = {
  A: [
    ['Easy cardio — jog in place, jumping jacks, or a brisk walk', '3 min', '—'],
    ['<a href="exercises.html#prep">Wrist and shoulder prep</a>', '1 round', '—'],
    ['Scapular push-ups', '2 × 10', '30 s']
  ],
  B: [
    ['Easy cardio', '3 min', '—'],
    ['<a href="exercises.html#prep">Wrist and shoulder prep</a>', '1 round', '—'],
    ['Scapular pulls — hang and shrug down, or band pull-aparts if you have a band', '2 × 12', '30 s']
  ],
  C: [
    ['Easy cardio', '3 min', '—'],
    ['<a href="exercises.html#prep">Lower-body prep</a> — leg swings, deep squat hold, ankle rocks', '1 round', '—'],
    ['Glute bridge', '2 × 15', '30 s']
  ]
};

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function groupRow(label) {
  return `<tr class="ex-group"><td colspan="3">${esc(label)}</td></tr>`;
}

/* One prescription row. The movement name is a real link to the exercise
   library, so it works with JavaScript off; exercise-panel.js intercepts the
   click and opens the full brief for the rung you are on. */
function exRow(item, index) {
  const ladder = C.LADDERS[item.k];
  const fixed = C.FIXED[item.k];
  const href = (ladder && ladder.page) || (fixed && fixed.page) || 'exercises.html';
  const unit = C.unit(item.k);
  const isHold = /sec/.test(unit);
  const range = item.min === item.max ? `${item.min}` : `${item.min}–${item.max}`;
  const suffix = isHold ? ' s' : '';

  /* Only print a per-side unit when it holds for every rung on the ladder.
     The squat ladder is two-legged at the bottom and per-leg from the split
     squat up, so this page — which cannot know your rung — stays quiet and
     the panel says it precisely. */
  const perSide = C.unitIsUniform(item.k) && /\/(side|leg)/.test(unit)
    ? ` /${/leg/.test(unit) ? 'leg' : 'side'}`
    : '';

  /* Name the pattern, not the rung: the rung is personal and the panel fills
     it in for whoever is reading. */
  const name = ladder
    ? `${esc(ladder.name)} <span class="ex-rung">your rung</span>`
    : esc(fixed ? fixed.n : item.k);

  const attrs = [
    `data-ex="${esc(item.k)}"`,
    `data-sets="${item.sets}"`,
    `data-min="${item.min}"`,
    `data-max="${item.max}"`,
    `data-rest="${item.rest}"`,
    `data-role="${esc(item.role || 'secondary')}"`
  ].join(' ');

  /* Anything from two minutes up reads better in minutes than in seconds. */
  const rest = item.rest >= 120
    ? `${Math.round(item.rest / 60 * 10) / 10} min`
    : `${item.rest} s`;

  const prefix = index != null ? `<strong>${index}.</strong> ` : '';
  const note = item.note ? `<span class="ex-note">${esc(item.note)}</span>` : '';

  return `<tr class="ex-row">` +
    `<td>${prefix}<a class="ex-link" href="${esc(href)}" ${attrs}>${name}</a>${note}</td>` +
    `<td class="num">${item.sets} × ${range}${suffix}${perSide}</td>` +
    `<td class="num">${rest}</td>` +
    `</tr>`;
}

function sessionCard(phase, slot) {
  const session = phase.sessions[slot];
  const slug = `${phase.name.toLowerCase()}-${SLOT_SLUG[slot]}`;
  const items = session.items;

  const skills = items.filter((i) => i.role === 'skill');
  const work = items.filter((i) => i.role === 'main' || i.role === 'secondary');
  const accessories = items.filter((i) => i.role === 'accessory');

  const rows = [];
  rows.push(groupRow('Warm-up · 8 min'));
  WARMUP[slot].forEach(([n, s, r]) => {
    rows.push(`<tr><td>${n}</td><td class="num">${s}</td><td class="num">${r}</td></tr>`);
  });

  if (skills.length) {
    rows.push(groupRow('Skill · practise fresh, never to failure'));
    skills.forEach((i) => rows.push(exRow(i, null)));
  }

  rows.push(groupRow('Main work'));
  work.forEach((i, n) => rows.push(exRow(i, n + 1)));

  if (accessories.length) {
    rows.push(groupRow('Finish'));
    accessories.forEach((i) => rows.push(exRow(i, null)));
  }
  rows.push('<tr><td>Log the session</td><td class="num">2 min</td><td class="num">—</td></tr>');

  const working = items.reduce((n, i) => n + i.sets, 0);

  return `<div class="card workout-card">
<figure class="workout-media">
  <img src="assets/images/workout-${slug}.webp" width="1280" height="800" loading="lazy" decoding="async" alt="${esc(ALT[slug])}">
  <figcaption>${esc(phase.name)} / Session ${slot}${
    CAPTION_NOTE[slug] ? `<span class="fig-note">${esc(CAPTION_NOTE[slug])}</span>` : ''
  }</figcaption>
</figure>
<h3>Session ${slot} — ${esc(session.title)}</h3>
<p class="session-meta">${working} sets total &middot; every row below is clickable for the full how-to</p>
<div class="table-wrap" style="margin-bottom:.5rem">
<table>
<thead><tr><th>Exercise</th><th class="num">Sets × reps</th><th class="num">Rest</th></tr></thead>
<tbody>
${rows.join('\n')}
</tbody>
</table>
</div>
</div>`;
}

function phaseBlock(phase) {
  return ['A', 'B', 'C'].map((slot) => sessionCard(phase, slot)).join('\n\n');
}

let src = fs.readFileSync(BODY, 'utf8');
let written = 0;

C.PHASES.forEach((phase, idx) => {
  const open = `<!-- SESSIONS:${idx} -->`;
  const close = `<!-- /SESSIONS:${idx} -->`;
  const start = src.indexOf(open);
  const end = src.indexOf(close);
  if (start < 0 || end < 0) {
    console.error(`mksessions: missing ${open} / ${close} in program.html`);
    process.exitCode = 1;
    return;
  }
  src = src.slice(0, start + open.length) + '\n' + phaseBlock(phase) + '\n' + src.slice(end);
  written++;
});

if (process.exitCode) return;
fs.writeFileSync(BODY, src);
console.log(`mksessions: wrote ${written} phase blocks into _partials/body/program.html`);
