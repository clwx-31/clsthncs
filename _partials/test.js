/* Behavior tests for the generated site.
 *
 *   npm install jsdom     (once, anywhere on the path)
 *   node _partials/test.js
 *
 * Serves the repo on an ephemeral port, loads every page in jsdom, and checks
 * that nothing throws and that the calculators, tracker, and search actually
 * produce the right numbers. Run it after ./build.sh, especially after a
 * restyle — it catches markup changes that break the scripts.
 */

let JSDOM, VirtualConsole;
try {
  ({ JSDOM, VirtualConsole } = require('jsdom'));
} catch (e) {
  console.error('jsdom is not installed. Run:  npm install jsdom');
  process.exit(2);
}

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

let BASE;
const PAGES = ['index.html','fundamentals.html','exercises.html','program.html','goals.html',
               'nutrition.html','recovery.html','gear.html','tracker.html','faq.html',
               'today.html','rungs.html','references.html','search.html'];

let failures = [];
function check(name, cond, detail) {
  if (cond) console.log('  PASS ' + name);
  else { console.log('  FAIL ' + name + (detail ? ' — ' + detail : '')); failures.push(name); }
}

function shim(window) {
  window.matchMedia = window.matchMedia || function (q) {
    return { matches: false, media: q, addEventListener(){}, removeEventListener(){}, addListener(){}, removeListener(){} };
  };
  // jsdom has no fetch; node's fetch needs absolute URLs, so resolve against the page.
  window.fetch = function (u, o) { return global.fetch(new window.URL(u, window.location.href).href, o); };
  window.scrollTo = window.scrollTo || function(){};
  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class { constructor(cb){this.cb=cb;} observe(el){ this.cb([{isIntersecting:true, target:el}], this); } unobserve(){} disconnect(){} };
  }
  if (!window.ResizeObserver) window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
  if (!window.requestAnimationFrame) window.requestAnimationFrame = function(f){ return setTimeout(f, 0); };
  window.URL.createObjectURL = window.URL.createObjectURL || function(){ return 'blob:stub'; };
  window.URL.revokeObjectURL = window.URL.revokeObjectURL || function(){};
}

async function load(page) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push(e.message || String(e)));
  vc.on('error', (...a) => errors.push(a.join(' ')));
  const dom = await JSDOM.fromURL(BASE + page, {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
    virtualConsole: vc, beforeParse: shim
  });
  await new Promise(r => setTimeout(r, 700));
  return { dom, window: dom.window, errors };
}

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  BASE = 'http://127.0.0.1:' + server.address().port + '/';
  console.log('serving ' + ROOT + ' on ' + BASE + '\n');

  console.log('=== page loads (no JS errors) ===');
  const loaded = {};
  for (const p of PAGES) {
    try {
      const r = await load(p);
      loaded[p] = r;
      const real = r.errors.filter(e => !/Not implemented|Could not parse CSS/i.test(e));
      check(p, real.length === 0, real.slice(0, 2).join(' | '));
    } catch (e) { check(p, false, e.message); }
  }

  console.log('\n=== nutrition calculator (default: male 20, 5\'9", 150 lb, light, lean bulk) ===');
  {
    const w = loaded['nutrition.html'].window, d = w.document;
    const txt = id => (d.getElementById(id) || {}).textContent || '';
    const num = id => parseFloat(txt(id).replace(/[^0-9.]/g, ''));
    check('BMR ~1681', Math.abs(num('o-bmr') - 1681) < 5, txt('o-bmr'));
    check('TDEE ~2490', Math.abs(num('o-tdee') - 2490) < 15, txt('o-tdee'));
    check('target ~2790', Math.abs(num('o-target') - 2790) < 20, txt('o-target'));
    check('protein 150 g', num('o-p') === 150, txt('o-p'));
    check('carbs 370-380 g', num('o-c') > 365 && num('o-c') < 385, txt('o-c'));
    check('fat 75-80 g', num('o-f') > 74 && num('o-f') < 81, txt('o-f'));
    // switch to cut and confirm it recalculates
    const goal = d.getElementById('n-goal');
    goal.value = 'cut'; goal.dispatchEvent(new w.Event('change'));
    check('cut lowers target', num('o-target') < 2100, txt('o-target'));
    check('cut raises protein', num('o-p') === 180, txt('o-p'));
    // female recalculates lower
    goal.value = 'lean'; goal.dispatchEvent(new w.Event('change'));
    const sex = d.getElementById('n-sex');
    sex.value = 'f'; sex.dispatchEvent(new w.Event('change'));
    check('female target lower than male', num('o-target') < 2600, txt('o-target'));
  }

  console.log('\n=== goals body-fat calculator ===');
  {
    const w = loaded['goals.html'].window, d = w.document;
    const num = id => parseFloat((d.getElementById(id).textContent || '').replace(/[^0-9.]/g, ''));
    // male, 69in, neck 14, waist 30 -> ~11%
    check('male BF plausible (8-15%)', num('bfout') > 8 && num('bfout') < 15, d.getElementById('bfout').textContent);
    check('lean mass + fat mass = weight', Math.abs(num('lmout') + num('fmout') - 150) < 0.3,
          num('lmout') + ' + ' + num('fmout'));
    const waist = d.getElementById('bfw');
    waist.value = '36'; waist.dispatchEvent(new w.Event('input'));
    check('bigger waist raises BF', num('bfout') > 18, d.getElementById('bfout').textContent);
    const sexSel = d.getElementById('bfsex');
    sexSel.value = 'f'; sexSel.dispatchEvent(new w.Event('change'));
    check('female shows hip field', d.getElementById('hipwrap').style.display === '', d.getElementById('hipwrap').style.display);
  }

  console.log('\n=== tracker ===');
  {
    const w = loaded['tracker.html'].window, d = w.document;
    const set = (id, v) => { const e = d.getElementById(id); e.value = v; };
    const click = id => d.getElementById(id).dispatchEvent(new w.Event('click', { bubbles: true }));

    // ten daily weigh-ins climbing from 150 to 151.8
    for (let i = 0; i < 10; i++) {
      const day = new Date(Date.UTC(2026, 0, 5 + i)).toISOString().slice(0, 10);
      set('w-date', day); set('w-wt', (150 + i * 0.2).toFixed(1));
      if (i === 0) set('w-waist', '30'); if (i === 9) set('w-waist', '30.25');
      click('w-save');
    }
    check('10 entries counted', d.getElementById('s-count').textContent === '10', d.getElementById('s-count').textContent);
    check('latest weight 151.8', /151\.8/.test(d.getElementById('s-latest').textContent), d.getElementById('s-latest').textContent);
    check('7-day average shown', /1\d\d\.\d/.test(d.getElementById('s-avg').textContent), d.getElementById('s-avg').textContent);
    check('trend positive', /^\+/.test(d.getElementById('s-trend').textContent.trim()), d.getElementById('s-trend').textContent);
    check('total change +1.8', /\+1\.8/.test(d.getElementById('s-total').textContent), d.getElementById('s-total').textContent);
    check('chart drawn', d.querySelector('#chart svg') !== null);
    check('chart path has coords', (d.querySelector('#chart path') || {}).getAttribute &&
          /M[\d.]+ [\d.]+/.test(d.querySelector('#chart path').getAttribute('d')));
    check('waist delta shown', /0\.2/.test(d.getElementById('s-waist').textContent), d.getElementById('s-waist').textContent);

    // workouts
    set('k-date', '2026-01-14'); set('k-ex', 'Push-up'); set('k-rung', 'floor'); set('k-reps', '8, 8, 7, 6'); set('k-rir', '2');
    click('k-save');
    set('k-date', '2026-01-16'); set('k-ex', 'Push-up'); set('k-rung', 'floor'); set('k-reps', '9,9,8,7');
    click('k-save');
    set('k-date', '2026-01-16'); set('k-ex', 'Pull-up'); set('k-reps', '3 2 2');
    click('k-save');
    check('3 exercise entries', d.getElementById('s-entries').textContent === '3', d.getElementById('s-entries').textContent);
    check('2 distinct sessions', d.getElementById('s-sessions').textContent === '2', d.getElementById('s-sessions').textContent);
    const pb = d.getElementById('pb-table').textContent;
    check('PB push-up = 9', /Push-up[\s\S]*?9/.test(pb), pb.slice(0, 120));
    check('PB lists pull-up', /Pull-up/.test(pb));
    check('space-separated reps parsed', /Pull-up[\s\S]*?3/.test(pb));
    // filter
    const filt = d.getElementById('k-filter'); filt.value = 'pull'; filt.dispatchEvent(new w.Event('input'));
    await new Promise(r => setTimeout(r, 50));
    check('filter narrows table', !/Push-up/.test(d.getElementById('k-table').textContent));
    filt.value = ''; filt.dispatchEvent(new w.Event('input'));

    // baseline tests
    set('t-date', '2026-01-05'); set('t-pushups', '12'); set('t-pullups', '0'); set('t-plank', '45');
    click('t-save');
    set('t-date', '2026-04-05'); set('t-pushups', '24'); set('t-pullups', '3'); set('t-plank', '90');
    click('t-save');
    const tt = d.getElementById('t-table').textContent;
    check('test table has both dates', /2026-01-05/.test(tt) && /2026-04-05/.test(tt));
    check('push-up delta +12', /\+12/.test(d.getElementById('t-table').innerHTML), '');
    check('pull-up delta +3', /\+3/.test(d.getElementById('t-table').innerHTML), '');

    // deletion
    const delBtn = d.querySelector('#w-table [data-wdel]');
    w.confirm = () => true;
    delBtn.dispatchEvent(new w.Event('click', { bubbles: true }));
    check('delete removes an entry', d.getElementById('s-count').textContent === '9', d.getElementById('s-count').textContent);

    // persistence
    check('localStorage populated', JSON.parse(w.localStorage.getItem('cal-workouts')).length === 3);
  }

  console.log('\n=== search ===');
  {
    const w = loaded['search.html'].window, d = w.document;
    const q = d.getElementById('q');
    q.value = 'first pull-up'; q.dispatchEvent(new w.Event('input'));
    await new Promise(r => setTimeout(r, 400));
    const html = d.getElementById('results').innerHTML;
    check('returns results', d.querySelectorAll('.sr').length > 0, d.getElementById('status').textContent);
    check('highlights matches', /<mark>/.test(html));
    check('links have anchors', /href="[a-z]+\.html#/.test(html));
    q.value = 'zzzzqqqq'; q.dispatchEvent(new w.Event('input'));
    await new Promise(r => setTimeout(r, 400));
    check('no-match message', /Nothing found/.test(d.getElementById('status').textContent), d.getElementById('status').textContent);
  }

  console.log('\n=== session runner (today.html) ===');
  {
    const w = loaded['today.html'].window, d = w.document;
    const click = el => el.dispatchEvent(new w.Event('click', { bubbles: true }));

    check('prompts for setup when unconfigured', d.getElementById('nodata').style.display !== 'none');
    click(d.getElementById('p-today'));
    check('week 1 after "starts today"', /^1\b/.test(d.getElementById('s-week').textContent.trim()),
          d.getElementById('s-week').textContent);
    check('phase is Onramp', /Onramp/.test(d.getElementById('s-phase').textContent), d.getElementById('s-phase').textContent);
    check('session A suggested first', d.getElementById('s-sess').textContent.trim() === 'A', d.getElementById('s-sess').textContent);

    const rows = d.querySelectorAll('.ex-row');
    check('session A has 7 exercises', rows.length === 7, String(rows.length));
    check('skill row flagged', d.querySelectorAll('.ex-row.skill-row').length === 1);
    // week 1 ramps: a base-4 exercise should show 2 sets
    const pushRow = [...rows].find(r => /push-up/i.test(r.querySelector('.ex-name').textContent));
    check('week 1 ramps sets down to 2', pushRow.querySelectorAll('input[type=number]').length === 2,
          String(pushRow.querySelectorAll('input[type=number]').length));

    // enter a set -> row marked done + persisted + timer starts
    const inputs = pushRow.querySelectorAll('input[type=number]');
    inputs.forEach(i => { i.value = '8'; i.dispatchEvent(new w.Event('change', { bubbles: true })); });
    check('row marked complete', pushRow.classList.contains('done'));
    check('entries persisted', JSON.stringify(JSON.parse(w.localStorage.getItem('cal-session'))).includes('8'));
    check('rest timer running', /^\d+:\d\d$/.test(d.getElementById('t-num').textContent),
          d.getElementById('t-num').textContent);

    // rung adjustment changes the prescribed exercise
    const before = pushRow.querySelector('.ex-name').textContent;
    click(d.querySelector('[data-rung="push"][data-dir="1"]'));
    const after = [...d.querySelectorAll('.ex-row')].map(r => r.querySelector('.ex-name').textContent).join('|');
    check('harder rung changes exercise name', !after.includes(before.trim()), before + ' -> ' + after.slice(0, 60));
    check('rung saved', JSON.parse(w.localStorage.getItem('cal-rungs')).push === 2,
          String(JSON.parse(w.localStorage.getItem('cal-rungs')).push));

    // finish writes into the shared workout log
    const p2 = d.querySelector('.ex-row:nth-child(2) input[type=number]');
    if (p2) { p2.value = '10'; p2.dispatchEvent(new w.Event('change', { bubbles: true })); }
    click(d.getElementById('btn-finish'));
    const logged = JSON.parse(w.localStorage.getItem('cal-workouts') || '[]');
    check('finish wrote workout entries', logged.length > 0, String(logged.length));
    check('entries carry a ladder key', logged.every(e => !!e.key));
    check('entries carry numeric sets', logged.every(e => e.sets.every(n => typeof n === 'number')));
    check('session label recorded', /^A · /.test(logged[0].session), logged[0].session);
    check('advances to session B', d.getElementById('s-sess').textContent.trim() === 'B',
          d.getElementById('s-sess').textContent);
    check('entered numbers cleared', Object.keys(JSON.parse(w.localStorage.getItem('cal-session'))).length === 0);

    // manual session pick
    click(d.querySelector('[data-pick="C"]'));
    check('manual pick switches session', d.getElementById('s-sess').textContent.trim() === 'C');
    check('session C has 8 exercises', d.querySelectorAll('.ex-row').length === 8,
          String(d.querySelectorAll('.ex-row').length));

    // deload week
    const wk = d.getElementById('p-week'); wk.value = '6';
    click(d.getElementById('p-save'));
    check('week 6 recognised', /^6\b/.test(d.getElementById('s-week').textContent.trim()), d.getElementById('s-week').textContent);
    check('deload notice shown', d.getElementById('deload').style.display !== 'none');
    // week 20 -> Build phase
    wk.value = '20'; click(d.getElementById('p-save'));
    check('week 20 is Build phase', /Build/.test(d.getElementById('s-phase').textContent), d.getElementById('s-phase').textContent);
  }

  console.log('\n=== rung finder (rungs.html) ===');
  {
    const w = loaded['rungs.html'].window, d = w.document;
    const click = el => el.dispatchEvent(new w.Event('click', { bubbles: true }));

    check('11 ladders rendered', d.querySelectorAll('.rq').length === 11, String(d.querySelectorAll('.rq').length));
    check('summary lists unanswered', /not answered yet/.test(d.getElementById('summary').textContent));

    const radio = d.querySelector('input[name="q-push"][value="5"]');
    radio.checked = true; radio.dispatchEvent(new w.Event('change', { bubbles: true }));
    check('answer marks the card', d.getElementById('rq-push').classList.contains('answered'));
    check('summary reflects the answer', /Full push-up/.test(d.getElementById('summary').textContent),
          d.getElementById('summary').textContent.slice(0, 80));

    click(d.getElementById('btn-none'));
    check('defaults fill every ladder', !/not answered yet/.test(d.getElementById('summary').textContent));
    check('progress counter complete', /11 of 11/.test(d.getElementById('count').textContent),
          d.getElementById('count').textContent);
    check('status message kept alongside count', /defaults/i.test(d.getElementById('saved').textContent),
          d.getElementById('saved').textContent);

    click(d.getElementById('btn-save'));
    const saved = JSON.parse(w.localStorage.getItem('cal-rungs') || '{}');
    check('rungs saved to storage', Object.keys(saved).length === 11, String(Object.keys(saved).length));

    click(d.getElementById('btn-reset'));
    check('reset clears answers', /not answered yet/.test(d.getElementById('summary').textContent));
  }

  console.log('\n=== shared behavior ===');
  {
    const w = loaded['goals.html'].window, d = w.document;
    const box = d.querySelector('input[type="checkbox"][id]');
    box.checked = true; box.dispatchEvent(new w.Event('change'));
    check('checkbox persisted', w.localStorage.getItem('cal-check-' + box.id) === '1');
    const t = d.querySelector('.theme-toggle');
    if (t) {
      t.dispatchEvent(new w.Event('click', { bubbles: true }));
      check('theme toggle sets data-theme', !!d.documentElement.getAttribute('data-theme'),
            String(d.documentElement.getAttribute('data-theme')));
    } else check('theme toggle present', false, 'no .theme-toggle found');
    check('main has id=content', !!d.getElementById('content'));
  }

  console.log('\n' + (failures.length ? failures.length + ' FAILURE(S): ' + failures.join(', ') : 'ALL CHECKS PASSED'));
  server.close();
  process.exit(failures.length ? 1 : 0);
})();
