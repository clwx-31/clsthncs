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
               'today.html','rungs.html','cards.html','references.html','search.html'];

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

  console.log('\n=== weekly review ===');
  {
    const w = loaded['tracker.html'].window, d = w.document;
    const set = (id, v) => { d.getElementById(id).value = v; };
    const click = id => d.getElementById(id).dispatchEvent(new w.Event('click', { bubbles: true }));
    const day = n => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

    // start from a clean log so the numbers below are exact
    w.localStorage.setItem('cal-workouts', '[]');

    // one older session to beat, then three inside the last 7 days
    set('k-date', day(10)); set('k-ex', 'Chin-up'); set('k-reps', '4,3,3'); click('k-save');
    set('k-date', day(5)); set('k-ex', 'Chin-up'); set('k-reps', '6,5,4'); click('k-save');
    set('k-date', day(3)); set('k-ex', 'Push-up'); set('k-reps', '12,11,10'); click('k-save');
    set('k-date', day(1)); set('k-ex', 'Chin-up'); set('k-reps', '5,5,4'); click('k-save');

    check('counts sessions in the last 7 days', d.getElementById('r-sessions').textContent === '3',
          d.getElementById('r-sessions').textContent);
    check('counts working sets', +d.getElementById('r-sets').textContent === 9,
          d.getElementById('r-sets').textContent);
    // last 7 days: chin-up 6+5+4, push-up 12+11+10, chin-up 5+5+4 = 62
    check('counts total reps', +d.getElementById('r-reps').textContent === 62,
          d.getElementById('r-reps').textContent);
    // chin-up 6 beats the older 4; push-up has no prior history so it is not "beaten"
    check('detects a beaten best', d.getElementById('r-pbs').textContent === '1',
          d.getElementById('r-pbs').textContent);
    check('names the beaten exercise with the gain', /Chin-up/.test(d.getElementById('r-pbtable').textContent) &&
          /\+2/.test(d.getElementById('r-pbtable').innerHTML), d.getElementById('r-pbtable').textContent.slice(0, 90));
    check('flags first-time exercises separately', /first time/.test(d.getElementById('r-pbtable').textContent),
          d.getElementById('r-pbtable').textContent.slice(0, 90));
    check('first-time count reported', d.getElementById('r-pbs-d').textContent.indexOf('first time') > 0,
          d.getElementById('r-pbs-d').textContent);
    check('verdict reacts to a good week', /on track|good week/i.test(d.getElementById('r-verdict').textContent),
          d.getElementById('r-verdict').textContent.slice(0, 80));
    check('sleep shows as unavailable without notes', d.getElementById('r-sleep').textContent === '—',
          d.getElementById('r-sleep').textContent);

    // sleep is read out of the runner's note format
    set('k-date', day(2)); set('k-ex', 'Dip'); set('k-reps', '6,6'); set('k-note', 'felt flat · 6 h sleep');
    click('k-save');
    check('reads sleep out of session notes', /6\.0/.test(d.getElementById('r-sleep').textContent),
          d.getElementById('r-sleep').textContent);
    check('flags short sleep', /Under 7 hours/.test(d.getElementById('r-sleep-d').textContent),
          d.getElementById('r-sleep-d').textContent);
  }

  console.log('\n=== tracker backup round-trip ===');
  {
    const w = loaded['tracker.html'].window, d = w.document;

    // seed some program state the tracker itself never writes
    w.localStorage.setItem('cal-plan', JSON.stringify({ start: '2026-01-05' }));
    w.localStorage.setItem('cal-rungs', JSON.stringify({ push: 5, vpull: 3 }));
    w.localStorage.setItem('cal-check-m-9', '1');

    // capture what the export button actually produces
    let captured = null;
    w.URL.createObjectURL = function (blob) { captured = blob; return 'blob:test'; };
    d.getElementById('d-export').dispatchEvent(new w.Event('click', { bubbles: true }));
    check('export produced a blob', !!captured);
    const readBlob = b => new Promise((res, rej) => {
      if (typeof b.text === 'function') return b.text().then(res, rej);
      const fr = new w.FileReader();
      fr.onload = () => res(fr.result); fr.onerror = rej;
      fr.readAsText(b);
    });
    const payload = JSON.parse(await readBlob(captured));

    check('backup includes weigh-ins', Array.isArray(payload.weights) && payload.weights.length > 0);
    check('backup includes workouts', Array.isArray(payload.workouts) && payload.workouts.length > 0);
    check('backup includes baseline tests', Array.isArray(payload.tests) && payload.tests.length > 0);
    check('backup includes the program start date', payload.plan && payload.plan.start === '2026-01-05',
          JSON.stringify(payload.plan));
    check('backup includes your rungs', payload.rungs && payload.rungs.push === 5, JSON.stringify(payload.rungs));
    check('backup includes ticked boxes', payload.checks && payload.checks['cal-check-m-9'] === '1',
          JSON.stringify(payload.checks));
    check('backup is versioned', payload.version === 2 && /backup/.test(payload.format || ''));

    // import: an older backup must not wipe the fields it predates
    const legacy = JSON.stringify({ exported: '2026-01-01', weights: [{ d: '2026-01-01', w: 149 }], workouts: [], tests: [] });
    const file = new w.File([legacy], 'old.json', { type: 'application/json' });
    const input = d.getElementById('d-file');
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    w.confirm = () => true; w.alert = () => {};
    input.dispatchEvent(new w.Event('change', { bubbles: true }));
    await new Promise(r => setTimeout(r, 250));
    check('old backup replaces weigh-ins', JSON.parse(w.localStorage.getItem('cal-weights')).length === 1,
          w.localStorage.getItem('cal-weights'));
    check('old backup leaves rungs intact', JSON.parse(w.localStorage.getItem('cal-rungs')).push === 5,
          w.localStorage.getItem('cal-rungs'));
    check('old backup leaves the plan intact', JSON.parse(w.localStorage.getItem('cal-plan')).start === '2026-01-05');

    // a full v2 backup restores everything
    const full = JSON.stringify({ format: 'calisthenics-start-backup', version: 2,
      weights: [], workouts: [], tests: [], plan: { start: '2025-09-01' },
      rungs: { push: 8 }, checks: { 'cal-check-m-16': '1' } });
    Object.defineProperty(input, 'files', { value: [new w.File([full], 'new.json')], configurable: true });
    input.dispatchEvent(new w.Event('change', { bubbles: true }));
    await new Promise(r => setTimeout(r, 250));
    check('v2 backup restores the plan', JSON.parse(w.localStorage.getItem('cal-plan')).start === '2025-09-01');
    check('v2 backup restores rungs', JSON.parse(w.localStorage.getItem('cal-rungs')).push === 8);
    check('v2 backup restores ticked boxes', w.localStorage.getItem('cal-check-m-16') === '1');

    // junk is rejected rather than half-applied
    Object.defineProperty(input, 'files', { value: [new w.File(['not json at all'], 'junk.json')], configurable: true });
    let alerted = '';
    w.alert = m => { alerted = m; };
    input.dispatchEvent(new w.Event('change', { bubbles: true }));
    await new Promise(r => setTimeout(r, 250));
    check('junk file is rejected', /could not be read/i.test(alerted), alerted);
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
    // keyboard navigation
    const key = k => q.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
    key('ArrowDown');
    check('arrow down selects the first hit', d.querySelectorAll('.sr.sel').length === 1);
    check('first hit is the one selected', d.querySelector('.sr').classList.contains('sel'));
    key('ArrowDown');
    check('arrow down moves on', !d.querySelector('.sr').classList.contains('sel') &&
          d.querySelectorAll('.sr.sel').length === 1);
    key('ArrowUp'); key('ArrowUp');
    check('arrow up wraps to the last hit',
          d.querySelectorAll('.sr')[d.querySelectorAll('.sr').length - 1].classList.contains('sel'));
    check('only ever one row selected', d.querySelectorAll('.sr.sel').length === 1);

    key('Escape');
    await new Promise(r => setTimeout(r, 250));
    check('escape clears the query', q.value === '');
    check('escape clears the results', d.querySelectorAll('.sr').length === 0);

    // suggestion chips still drive the search after the markup change
    d.querySelector('#suggest [data-q]').dispatchEvent(new w.Event('click', { bubbles: true }));
    await new Promise(r => setTimeout(r, 300));
    check('suggestion chip runs a search', d.querySelectorAll('.sr').length > 0,
          d.getElementById('status').textContent);

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
    check('week 1 ramps sets down to 2', pushRow.querySelectorAll('input[data-j]').length === 2,
          String(pushRow.querySelectorAll('input[data-j]').length));

    // enter a set -> row marked done + persisted + timer starts
    const inputs = pushRow.querySelectorAll('input[data-j]');
    inputs.forEach(i => { i.value = '8'; i.dispatchEvent(new w.Event('change', { bubbles: true })); });
    check('row marked complete without needing RIR', pushRow.classList.contains('done'));
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

    // RIR and session context are captured
    const rirBox = pushRow.querySelector('[data-rir]');
    check('every working set row has an RIR box', !!rirBox);
    check('skill rows have no RIR box', !d.querySelector('.ex-row.skill-row [data-rir]'));
    rirBox.value = '2'; rirBox.dispatchEvent(new w.Event('change', { bubbles: true }));
    check('RIR persisted', JSON.parse(w.localStorage.getItem('cal-session-rir'))[Object.keys(JSON.parse(w.localStorage.getItem('cal-session-rir')))[0]] === '2');

    const felt = d.getElementById('c-felt'); felt.value = 'flat'; felt.dispatchEvent(new w.Event('change', { bubbles: true }));
    const sleep = d.getElementById('c-sleep'); sleep.value = '6'; sleep.dispatchEvent(new w.Event('input', { bubbles: true }));
    const cnote = d.getElementById('c-note'); cnote.value = 'left elbow twinged'; cnote.dispatchEvent(new w.Event('input', { bubbles: true }));
    check('session context persisted', JSON.parse(w.localStorage.getItem('cal-session-ctx')).felt === 'flat');

    // finish writes into the shared workout log
    const p2 = d.querySelector('.ex-row:nth-child(2) input[type=number]');
    if (p2) { p2.value = '10'; p2.dispatchEvent(new w.Event('change', { bubbles: true })); }
    click(d.getElementById('btn-finish'));
    const logged = JSON.parse(w.localStorage.getItem('cal-workouts') || '[]');
    check('finish wrote workout entries', logged.length > 0, String(logged.length));
    check('entries carry a ladder key', logged.every(e => !!e.key));
    check('entries carry numeric sets', logged.every(e => e.sets.every(n => typeof n === 'number')));
    check('session label recorded', /^A · /.test(logged[0].session), logged[0].session);
    check('RIR carried into the log', logged.some(e => e.rir === '2'), JSON.stringify(logged.map(e => e.rir)));
    check('session context carried into the log', /felt flat · 6 h sleep · left elbow twinged/.test(logged[0].note),
          logged[0].note);
    check('context cleared after logging', !JSON.parse(w.localStorage.getItem('cal-session-ctx')).felt);
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

    // checkpoint and end-of-program guidance
    wk.value = '1'; click(d.getElementById('p-save'));
    check('week 1 prompts the baseline test', /baseline test/i.test(d.getElementById('weeknote').textContent),
          d.getElementById('weeknote').textContent.slice(0, 60));
    wk.value = '12'; click(d.getElementById('p-save'));
    check('week 12 flags the checkpoint', /checkpoint/i.test(d.getElementById('weeknote').textContent),
          d.getElementById('weeknote').textContent.slice(0, 60));
    wk.value = '17'; click(d.getElementById('p-save'));
    check('ordinary weeks show no callout', d.getElementById('weeknote').style.display === 'none');
    wk.value = '30'; click(d.getElementById('p-save'));
    check('past week 24 reads sensibly', /past week 24/.test(d.getElementById('s-week').textContent),
          d.getElementById('s-week').textContent);
    check('past week 24 points at what comes next', /what comes after|rung finder/i.test(d.getElementById('weeknote').textContent),
          d.getElementById('weeknote').textContent.slice(0, 60));
    check('past week 24 still serves a session', d.querySelectorAll('.ex-row').length > 0);
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

  console.log('\n=== printable cards (cards.html) ===');
  {
    const w = loaded['cards.html'].window, d = w.document;
    const click = el => el.dispatchEvent(new w.Event('click', { bubbles: true }));

    check('three cards for the first phase', d.querySelectorAll('#cards .card-sheet').length === 3,
          String(d.querySelectorAll('#cards .card-sheet').length));
    check('cards name real exercises', /push-up/i.test(d.getElementById('cards').textContent));
    check('cards have rep boxes', d.querySelectorAll('#cards .boxes i').length > 10,
          String(d.querySelectorAll('#cards .boxes i').length));
    check('cards show rest times', /min|\bs\b/.test(d.querySelector('#cards .card-sheet').textContent));

    click(d.querySelector('[data-phase="all"]'));
    check('all nine cards', d.querySelectorAll('#cards .card-sheet').length === 9,
          String(d.querySelectorAll('#cards .card-sheet').length));
    check('all three phases named', ['Onramp','Foundation','Build'].every(n => d.getElementById('cards').textContent.includes(n)));

    const rows = d.querySelectorAll('#calendar tbody tr');
    check('calendar has 24 weeks', rows.length === 24, String(rows.length));
    check('four deload weeks shaded', d.querySelectorAll('#calendar tr.deload').length === 4,
          String(d.querySelectorAll('#calendar tr.deload').length));
    check('week 1 flags the baseline test', /Baseline test/.test(rows[0].textContent), rows[0].textContent);
    check('each week has three session boxes', rows[10].querySelectorAll('td.box').length === 3);
    check('baseline test sheet lists all twelve tests', /Max push-ups[\s\S]*Wall handstand/.test(d.body.textContent));
    check('baseline sheet has retest columns', /Wk 1[\s\S]*Wk 9[\s\S]*Wk 12[\s\S]*Wk 24/.test(d.body.textContent));
    check('measurement sheet has seven rows',
          [...d.querySelectorAll('.card-sheet')].some(c => /Tape measurements/.test(c.textContent) &&
            c.querySelectorAll('tbody tr').length === 7));
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
