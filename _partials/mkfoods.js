/* Regenerate the food tables on nutrition.html from assets/food-data.js.
 *
 *   node _partials/mkfoods.js
 *
 * Same contract as mkladders.js: content between <!-- FOODS:group --> markers is
 * replaced with static HTML, so the tables work without JavaScript and land in
 * the search index. Edit the data, never the generated markup.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BODY = path.join(ROOT, '_partials/body/nutrition.html');

global.window = {};
require(path.join(ROOT, 'assets/food-data.js'));
const FOODS = global.window.FOODS;

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Highlight the macro the table is about, so the tables still read as
   "protein sources" rather than a wall of undifferentiated numbers. */
const LEAD = { protein: 'p', carb: 'c', fat: 'f' };

function table(group) {
  const lead = LEAD[group];
  const head = '<thead><tr><th>Food</th><th>Serving</th><th class="num">Cal</th>' +
    ['p', 'c', 'f'].map(k => {
      const label = { p: 'Protein', c: 'Carbs', f: 'Fat' }[k];
      return '<th class="num">' + (k === lead ? '<strong>' + label + '</strong>' : label) + '</th>';
    }).join('') +
    '<th>Notes</th></tr></thead>';

  const body = FOODS[group].map(f => (
    '<tr>' +
    '<td>' + esc(f.n) + '</td>' +
    '<td>' + esc(f.serving) + '</td>' +
    '<td class="num">' + f.cal + '</td>' +
    ['p', 'c', 'f'].map(k => {
      const v = f[k] + ' g';
      return '<td class="num">' + (k === lead ? '<strong>' + v + '</strong>' : v) + '</td>';
    }).join('') +
    '<td>' + esc(f.note) + '</td>' +
    '</tr>'
  )).join('\n    ');

  return '<div class="table-wrap">\n<table>\n' + head + '\n<tbody>\n    ' + body + '\n</tbody>\n</table>\n</div>';
}

let src = fs.readFileSync(BODY, 'utf8');
const done = [];
src = src.replace(/<!-- FOODS:(\w+) -->[\s\S]*?<!-- \/FOODS:\1 -->/g, (m, group) => {
  if (!FOODS[group]) { console.error('no food group named ' + group); process.exit(1); }
  done.push(group);
  return '<!-- FOODS:' + group + ' -->\n' + table(group) + '\n<!-- /FOODS:' + group + ' -->';
});

fs.writeFileSync(BODY, src);
const n = done.reduce((t, g) => t + FOODS[g].length, 0);
console.log('regenerated %d food tables (%d rows) in nutrition.html', done.length, n);
