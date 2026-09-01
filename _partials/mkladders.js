/* Regenerate the progression ladders on exercises.html from assets/program-data.js.
 *
 *   node _partials/mkladders.js
 *
 * Each ladder in the page body is delimited by
 *   <!-- LADDER:key -->  ...generated...  <!-- /LADDER:key -->
 * and everything between the markers is replaced. Ladders that have no entry in
 * program-data.js (front lever, muscle-up) are hand-written and left alone.
 *
 * The output is static HTML, so it works without JavaScript and gets picked up
 * by the search index — which JS-rendered ladders would not.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BODY = path.join(ROOT, '_partials/body/exercises.html');

global.window = {};
require(path.join(ROOT, 'assets/program-data.js'));
const { LADDERS } = global.window.CAL;

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderLadder(key) {
  const ladder = LADDERS[key];
  const items = ladder.rungs.map(r => (
    '  <li>' +
    '<span class="name">' + esc(r.n) + '</span>' +
    '<span class="gate">Gate: <b>' + esc(r.gate) + '</b></span>' +
    '<span class="cue-line"><b>Cue</b> ' + esc(r.cue) + '</span>' +
    '<details class="rung-how"><summary>Setup &amp; execution</summary>' +
    '<p>' + esc(r.how) + '</p>' +
    '<p class="avoid"><b>Most common error</b> ' + esc(r.avoid) + '</p>' +
    '</details>' +
    '</li>'
  )).join('\n');
  return '<ol class="ladder">\n' + items + '\n</ol>';
}

function main() {
  let src = fs.readFileSync(BODY, 'utf8');
  const found = [];
  let missing = [];

  src = src.replace(/<!-- LADDER:([\w-]+) -->[\s\S]*?<!-- \/LADDER:\1 -->/g, (_m, key) => {
    if (!LADDERS[key]) { missing.push(key); return _m; }
    found.push(key);
    return '<!-- LADDER:' + key + ' -->\n' + renderLadder(key) + '\n<!-- /LADDER:' + key + ' -->';
  });

  if (missing.length) {
    console.error('no data for ladder(s): ' + missing.join(', '));
    process.exit(1);
  }
  fs.writeFileSync(BODY, src);
  const rungs = found.reduce((n, k) => n + LADDERS[k].rungs.length, 0);
  console.log('regenerated %d ladders (%d rungs) in exercises.html', found.length, rungs);

  const unused = Object.keys(LADDERS).filter(k => !found.includes(k));
  if (unused.length) console.log('  note: no marker on exercises.html for: ' + unused.join(', '));
}

main();
