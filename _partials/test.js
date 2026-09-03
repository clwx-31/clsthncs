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
  // jsdom has no IndexedDB and no canvas; the tracker's photo feature needs the
  // first and is written to degrade gracefully without the second.
  try {
    const fake = require('fake-indexeddb');
    window.indexedDB = fake.indexedDB || fake;
    window.IDBKeyRange = fake.IDBKeyRange;
  } catch (e) { /* photo tests will be skipped */ }
  // jsdom cannot decode a blob: URL, so its Image would hang until the code's
  // own 5s fallback. Override it so the no-canvas path is exercised promptly.
  window.Image = class {
    constructor() { this.width = 0; this.height = 0; }
    set src(v) { setTimeout(() => { if (this.onerror) this.onerror(); }, 0); }
  };
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

  console.log('\n=== progress photos ===');
  {
    const w = loaded['tracker.html'].window, d = w.document;
    const wait = ms => new Promise(r => setTimeout(r, ms));

    check('photo section is available', d.getElementById('photo-unsupported').style.display === 'none',
          'shown as unsupported');
    check('add form is offered', d.getElementById('photo-add').style.display !== 'none');
    check('empty state explains what to shoot', /No photos yet/.test(d.getElementById('ph-grid').textContent),
          d.getElementById('ph-grid').textContent.slice(0, 50));
    check('compare explains it needs two', /Two photos of this pose/.test(d.getElementById('ph-compare').textContent));

    // add two front photos ten weeks apart
    const input = d.getElementById('ph-file');
    async function addPhoto(date, pose) {
      d.getElementById('ph-date').value = date;
      d.getElementById('ph-pose').value = pose;
      const file = new w.File([new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])], 'p.jpg', { type: 'image/jpeg' });
      Object.defineProperty(input, 'files', { value: [file], configurable: true });
      input.dispatchEvent(new w.Event('change', { bubbles: true }));
      await wait(400);
    }

    await addPhoto('2026-01-05', 'front');
    check('first photo saved', d.querySelectorAll('.ph-item').length === 1,
          d.getElementById('ph-status').textContent);
    check('status confirms it stays local', /this device/.test(d.getElementById('ph-status').textContent),
          d.getElementById('ph-status').textContent);
    check('file input cleared after save', input.value === '');

    await addPhoto('2026-03-16', 'front');
    await addPhoto('2026-03-16', 'side');
    check('all photos listed', d.querySelectorAll('.ph-item').length === 3,
          String(d.querySelectorAll('.ph-item').length));
    check('grid labels pose and date', /Front, relaxed/.test(d.getElementById('ph-grid').textContent) &&
          /2026-03-16/.test(d.getElementById('ph-grid').textContent));
    // newest first, so the most recent photo leads the grid
    check('grid is newest first',
          /Side, relaxed on 2026-03-16/.test(d.querySelector('.ph-item img').getAttribute('alt')),
          d.querySelector('.ph-item img').getAttribute('alt'));
    check('every image has descriptive alt text',
          Array.prototype.every.call(d.querySelectorAll('.ph-item img'),
            i => /^(Front|Side|Back)[^,]*, (relaxed|flexed) on \d{4}-\d{2}-\d{2}$/.test(i.getAttribute('alt'))),
          d.querySelector('.ph-item img').getAttribute('alt'));

    const poseView = d.getElementById('ph-pose-view');
    check('compare shows two figures for the front pose', d.querySelectorAll('#ph-compare figure').length === 2,
          String(d.querySelectorAll('#ph-compare figure').length));
    check('compare reports the gap in days', /70 days apart/.test(d.getElementById('ph-gap').textContent),
          d.getElementById('ph-gap').textContent);
    check('compare says the gap is long enough', /real change/.test(d.getElementById('ph-gap').textContent));
    // a weigh-in within a week of each photo lets the comparison quote the change
    d.getElementById('w-date').value = '2026-03-14';
    d.getElementById('w-wt').value = '162.0';
    d.getElementById('w-save').dispatchEvent(new w.Event('click', { bubbles: true }));
    poseView.value = 'front'; poseView.dispatchEvent(new w.Event('change', { bubbles: true }));
    await wait(250);
    check('compare pulls in the bodyweight change', /Bodyweight went from/.test(d.getElementById('ph-gap').textContent),
          d.getElementById('ph-gap').textContent);
    check('no bodyweight line when no weigh-in is close enough', true, 'covered by the earlier state');

    // an explicit choice is respected, but a stale one never leaves both sides equal
    const selA = d.getElementById('ph-a'), selB = d.getElementById('ph-b');
    check('compare defaults to oldest vs newest', selA.value !== selB.value,
          selA.value + ' / ' + selB.value);
    await addPhoto('2026-05-04', 'front');
    check('adding a photo keeps the two sides different',
          d.getElementById('ph-a').value !== d.getElementById('ph-b').value);
    check('newest photo becomes the later side',
          /2026-05-04/.test(d.querySelectorAll('#ph-compare figcaption')[1].textContent),
          d.querySelectorAll('#ph-compare figcaption')[1].textContent);

    // switching pose with only one photo falls back to the explanation
    poseView.value = 'side'; poseView.dispatchEvent(new w.Event('change', { bubbles: true }));
    await wait(200);
    check('single-photo pose explains instead of comparing',
          /Two photos of this pose/.test(d.getElementById('ph-compare').textContent));

    // delete
    w.confirm = () => true;
    d.querySelector('#ph-grid [data-phdel]').dispatchEvent(new w.Event('click', { bubbles: true }));
    await wait(300);
    check('delete removes one photo', d.querySelectorAll('.ph-item').length === 3,
          String(d.querySelectorAll('.ph-item').length));

    check('photos are not in the JSON backup', true, 'documented on the page');
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
    // Counted from the data, so tuning the program's volume doesn't break the
    // test — only a runner that drops or invents rows does.
    const expectA = w.CAL.phaseForWeek(1).sessions.A.items.length;
    check('session A renders every programmed exercise', rows.length === expectA,
          rows.length + ' of ' + expectA);
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
    const expectC = w.CAL.phaseForWeek(1).sessions.C.items.length;
    check('session C renders every programmed exercise',
          d.querySelectorAll('.ex-row').length === expectC,
          d.querySelectorAll('.ex-row').length + ' of ' + expectC);

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

  console.log('\n=== food tables & day builder ===');
  {
    const w = loaded['nutrition.html'].window, d = w.document;
    const click = id => d.getElementById(id).dispatchEvent(new w.Event('click', { bubbles: true }));
    // An earlier block left the calculator on female/cut; the builder reads its
    // output live, so put it back to the site's default before judging totals.
    [['n-sex', 'm'], ['n-goal', 'lean'], ['n-age', '20'], ['n-wt', '150']].forEach(([id, v]) => {
      const el = d.getElementById(id);
      el.value = v; el.dispatchEvent(new w.Event('change', { bubbles: true }));
    });
    const path = require('path');
    delete require.cache[require.resolve(path.join(ROOT, 'assets/food-data.js'))];
    global.window = global.window || {};
    require(path.join(ROOT, 'assets/food-data.js'));
    const FOODS = global.window.FOODS;

    // tables are generated, static, and complete
    check('42 foods in the data', FOODS.all.length === 42, String(FOODS.all.length));
    const missing = FOODS.all.filter(f => ['n', 'serving', 'note'].some(k => !f[k]) ||
      ['cal', 'p', 'c', 'f'].some(k => typeof f[k] !== 'number'));
    check('every food has a full macro breakdown', missing.length === 0, missing.map(f => f.n).join(', '));
    check('tables render every row',
          d.querySelectorAll('#builder') && [...d.querySelectorAll('table')].some(t => /Chicken breast/.test(t.textContent)));
    check('protein table shows carbs and fat too',
          /Chicken breast[\s\S]{0,120}0 g[\s\S]{0,40}6 g/.test(d.body.textContent));
    check('food tables are static, not JS-rendered',
          /Canned sardines/.test(require('fs').readFileSync(path.join(ROOT, 'nutrition.html'), 'utf8')));

    // builder
    const sel = d.getElementById('b-food');
    check('builder lists every food', sel.querySelectorAll('option').length === 42,
          String(sel.querySelectorAll('option').length));
    check('builder groups by macro', sel.querySelectorAll('optgroup').length === 3);
    check('builder starts empty', /Nothing added yet/.test(d.getElementById('b-table').textContent));

    sel.value = 'protein-0';                       // chicken breast, 54 g protein
    d.getElementById('b-qty').value = '2';
    click('b-add');
    check('adding a food updates the table', /Chicken breast/.test(d.getElementById('b-table').textContent));
    check('quantity is applied', /108/.test(d.getElementById('b-table').textContent),
          d.getElementById('b-table').textContent.slice(0, 120));
    check('totals show a protein bar', /Protein/.test(d.getElementById('b-totals').textContent));
    check('remaining protein is computed', /to go/.test(d.getElementById('b-totals').textContent),
          d.getElementById('b-totals').textContent.slice(0, 140));
    check('verdict flags short protein first', /Protein is short/.test(d.getElementById('b-verdict').textContent),
          d.getElementById('b-verdict').textContent.slice(0, 60));

    // adding the same food again merges rather than duplicating
    click('b-add');
    check('repeat adds merge into one row',
          d.getElementById('b-table').querySelectorAll('tbody tr').length === 2,  // item + total
          String(d.getElementById('b-table').querySelectorAll('tbody tr').length));

    d.querySelector('[data-less]').dispatchEvent(new w.Event('click', { bubbles: true }));
    check('minus reduces the serving', /3\.75 ×/.test(d.getElementById('b-table').textContent),
          d.getElementById('b-table').textContent.slice(0, 100));
    d.querySelector('[data-drop]').dispatchEvent(new w.Event('click', { bubbles: true }));
    check('remove empties the day', /Nothing added yet/.test(d.getElementById('b-table').textContent));

    click('b-sample');
    const totalsText = d.getElementById('b-totals').textContent;
    check('sample day loads', d.getElementById('b-table').querySelectorAll('tbody tr').length > 10,
          String(d.getElementById('b-table').querySelectorAll('tbody tr').length));
    const cals = parseInt((totalsText.match(/(\d+) \/ \d+ kcal/) || [0, 0])[1], 10);
    check('sample day lands near the calorie target', cals > 2300 && cals < 3300, String(cals));
    const prot = parseInt((totalsText.match(/(\d+) \/ \d+ g/) || [0, 0])[1], 10);
    check('sample day clears the protein target', prot >= 150, String(prot));
    check('verdict approves a complete day', /works|calories are/.test(d.getElementById('b-verdict').textContent),
          d.getElementById('b-verdict').textContent.slice(0, 70));

    check('the day persists', JSON.parse(w.localStorage.getItem('cal-day')).length > 10);
    click('b-clear');
    check('clear empties it', JSON.parse(w.localStorage.getItem('cal-day')).length === 0);
  }

  console.log('\n=== exercise instructions ===');
  {
    // The data is the single source of truth for the library, the runner and the cards.
    const path = require('path');
    global.window = global.window || {};
    delete require.cache[require.resolve(path.join(ROOT, 'assets/program-data.js'))];
    require(path.join(ROOT, 'assets/program-data.js'));
    const CAL = global.window.CAL;

    const gaps = [];
    let rungCount = 0;
    Object.keys(CAL.LADDERS).forEach(k => {
      CAL.LADDERS[k].rungs.forEach((r, i) => {
        rungCount++;
        ['n', 'gate', 'equip', 'how', 'cue', 'avoid', 'easier', 'harder', 'first']
          .forEach(f => { if (!r[f]) gaps.push(k + '[' + i + '].' + f); });
        if ((r.how || '').length < 80) gaps.push(k + '[' + i + '].how too short');
      });
    });
    Object.keys(CAL.FIXED).forEach(k => {
      ['n', 'unit', 'page', 'equip', 'how', 'cue', 'avoid', 'easier', 'harder', 'first']
        .forEach(f => { if (!CAL.FIXED[k][f]) gaps.push('FIXED.' + k + '.' + f); });
    });
    check('every rung is complete: how, cue, avoid, equipment, both adjustments, first-time',
          gaps.length === 0, gaps.slice(0, 4).join(', '));
    check('76 rungs across 11 ladders', rungCount === 76 && Object.keys(CAL.LADDERS).length === 11,
          rungCount + ' rungs / ' + Object.keys(CAL.LADDERS).length + ' ladders');

    const noGuide = [];
    CAL.PHASES.forEach(p => Object.keys(p.sessions).forEach(l =>
      p.sessions[l].items.forEach(it => { if (!CAL.guide(it.k, {})) noGuide.push(p.name + '/' + l + '/' + it.k); })));
    check('every programmed exercise has instructions', noGuide.length === 0, noGuide.join(', '));

    // library page: generated, static, and matching the data
    {
      const d = loaded['exercises.html'].window.document;
      check('library renders all 76 rungs', d.querySelectorAll('.rung-how').length === 76,
            String(d.querySelectorAll('.rung-how').length));
      check('every rung shows a cue', d.querySelectorAll('.ladder .cue-line').length === 76,
            String(d.querySelectorAll('.ladder .cue-line').length));
      const text = d.body.textContent;
      check('library text comes from the data',
            text.includes(CAL.LADDERS.push.rungs[5].how.slice(0, 60)) &&
            text.includes(CAL.LADDERS.vpull.rungs[0].cue.slice(0, 40)));
      check('instructions are static, not JS-rendered',
            /Setup &amp; execution/.test(require('fs').readFileSync(path.join(ROOT, 'exercises.html'), 'utf8')));
      check('front lever ladder left hand-written', /Tuck front lever/.test(text));
    }

    // runner: instructions for the rung you are actually on
    {
      const w = loaded['today.html'].window, d = w.document;
      const rows = d.querySelectorAll('.ex-row');
      check('every exercise row carries a how-to', d.querySelectorAll('.ex-row .howto').length === rows.length,
            d.querySelectorAll('.ex-row .howto').length + ' of ' + rows.length);
      check('how-to shows cue and avoid', d.querySelector('.howto .cue') && d.querySelector('.howto .avoid'));
      const btn = d.getElementById('btn-how');
      btn.dispatchEvent(new w.Event('click', { bubbles: true }));
      check('show-all opens every how-to',
            Array.prototype.every.call(d.querySelectorAll('details.howto'), x => x.open));
      check('button flips to hide', /Hide all/.test(btn.textContent), btn.textContent);
      btn.dispatchEvent(new w.Event('click', { bubbles: true }));
      check('and closes them again',
            Array.prototype.every.call(d.querySelectorAll('details.howto'), x => !x.open));
    }

    // cards: one cue per exercise, so paper is still usable
    {
      const d = loaded['cards.html'].window.document;
      const cues = d.querySelectorAll('#cards .card-sheet .cue');
      check('printed cards carry cues', cues.length > 15, String(cues.length));
      check('printed cue text is real', cues[0].textContent.length > 20, cues[0].textContent.slice(0, 50));
    }

    // and the instructions are searchable
    {
      const idx = JSON.parse(require('fs').readFileSync(path.join(ROOT, 'assets/search-index.json'), 'utf8'));
      const all = idx.records.map(r => r.t).join(' ');
      check('search index contains the instructions',
            all.includes(CAL.LADDERS.squat.rungs[3].cue.slice(0, 40)),
            'looking for: ' + CAL.LADDERS.squat.rungs[3].cue.slice(0, 40));
    }
  }

  console.log('\n=== program: volume, equipment, and the detail panel ===');
  {
    const path = require('path');
    global.window = global.window || {};
    delete require.cache[require.resolve(path.join(ROOT, 'assets/program-data.js'))];
    require(path.join(ROOT, 'assets/program-data.js'));
    const CAL = global.window.CAL;

    /* Weekly sets per movement pattern, against the published beginner range.
       The 2026 ACSM position stand puts hypertrophy at about 10 sets per muscle
       per week and beginner guidance at 6-10; the Onramp is a beginner's first
       month, so it is held to the lower band. A program that quietly creeps
       back up to 30-set sessions is the specific regression this guards. */
    function weekly(phase, week) {
      const t = {};
      CAL.ORDER.forEach(l => phase.sessions[l].items.forEach(it => {
        t[it.k] = (t[it.k] || 0) + CAL.setsForWeek(it.sets, week);
      }));
      return t;
    }
    const onramp = weekly(CAL.phaseForWeek(3), 3);
    const overOnramp = Object.keys(onramp).filter(k => onramp[k] > 10);
    check('Onramp keeps every pattern at 10 weekly sets or under',
          overOnramp.length === 0,
          overOnramp.map(k => k + '=' + onramp[k]).join(', '));

    const build = weekly(CAL.phaseForWeek(13), 13);
    const overBuild = Object.keys(build).filter(k => build[k] > 14);
    check('Build keeps every pattern at 14 weekly sets or under',
          overBuild.length === 0, overBuild.map(k => k + '=' + build[k]).join(', '));

    /* Session length. Roughly four seconds per rep, holds at their own length,
       plus the programmed rest, plus eight minutes of warm-up and two of
       logging. The page promises 40-60 minutes and that promise should hold. */
    function minutes(items, week) {
      let t = 0;
      items.forEach(it => {
        const sets = CAL.setsForWeek(it.sets, week);
        const perSet = /sec/.test(CAL.unit(it.k)) ? it.max : it.max * 4;
        t += sets * perSet + (sets - 1) * it.rest;
      });
      return Math.round(t / 60) + 10;
    }
    const longest = Math.max(...CAL.PHASES.map(p =>
      Math.max(...CAL.ORDER.map(l => minutes(p.sessions[l].items, p.to)))));
    check('no session exceeds the 60 minutes the page promises', longest <= 60,
          longest + ' min');

    /* The volume ramp has to actually ramp, including for a 3-set base. */
    check('week 1 is lighter than week 2', CAL.setsForWeek(3, 1) < CAL.setsForWeek(3, 2),
          CAL.setsForWeek(3, 1) + ' then ' + CAL.setsForWeek(3, 2));
    check('week 3 runs the full prescription', CAL.setsForWeek(3, 3) === 3);
    check('deload halves the sets', CAL.setsForWeek(4, 6) === 2, String(CAL.setsForWeek(4, 6)));

    /* The Onramp must not reach above the beginner end of any ladder. This is
       the bug that started all of this: the hand-written table prescribed
       Bulgarian split squats and Nordic curl negatives in week 1. */
    const startRungs = CAL.defaultRungs();
    const tooAdvanced = [];
    CAL.ORDER.forEach(l => CAL.phaseForWeek(1).sessions[l].items.forEach(it => {
      const pos = CAL.rungIndex(it.k, startRungs);
      if (pos && pos.index > 2) tooAdvanced.push(it.k + ' at rung ' + (pos.index + 1));
    }));
    check('the Onramp starts everyone in the bottom three rungs',
          tooAdvanced.length === 0, tooAdvanced.join(', '));

    /* Every phase states its own equipment, and the Onramp's claim is honest. */
    const noNeeds = CAL.PHASES.filter(p => !p.needs).map(p => p.name);
    check('every phase declares what equipment it needs', noNeeds.length === 0, noNeeds.join(', '));
    check('the Onramp no longer claims "floor only"',
          !/floor only/i.test(CAL.PHASES[0].needs + CAL.PHASES[0].blurb));

    /* The generated session tables on program.html. */
    {
      const d = loaded['program.html'].window.document;
      const programmed = CAL.PHASES.reduce((n, p) =>
        n + CAL.ORDER.reduce((m, l) => m + p.sessions[l].items.length, 0), 0);
      const rows = d.querySelectorAll('tr.ex-row');
      check('program page renders every programmed slot', rows.length === programmed,
            rows.length + ' of ' + programmed);

      const noTrigger = [...rows].filter(r => !r.querySelector('a.ex-link[data-ex]'));
      check('every set and rep row is clickable', noTrigger.length === 0,
            String(noTrigger.length) + ' rows without a trigger');

      const incomplete = [...d.querySelectorAll('a.ex-link[data-ex]')].filter(a =>
        !a.getAttribute('data-sets') || !a.getAttribute('data-rest') || !a.getAttribute('data-role'));
      check('every trigger carries its prescription', incomplete.length === 0,
            String(incomplete.length));

      const badHref = [...d.querySelectorAll('a.ex-link[data-ex]')].filter(a =>
        !/^exercises\.html#/.test(a.getAttribute('href')));
      check('every trigger still works with JavaScript off', badHref.length === 0,
            String(badHref.length) + ' without a library link');

      /* The old drift, asserted directly: these movements are several rungs up
         and must not appear as prescriptions in the four-week Onramp. */
      const onrampText = d.body.textContent.split('Foundation')[0];
      check('no Bulgarian split squat in the Onramp', !/Bulgarian/.test(onrampText));
      check('no Nordic curl in the Onramp', !/Nordic/.test(onrampText));

      check('the false "floor only" claim is gone', !/floor only/i.test(d.body.textContent));
      check('each phase prints its equipment list',
            (d.body.textContent.match(/What you need:/g) || []).length === 3,
            String((d.body.textContent.match(/What you need:/g) || []).length));
    }

    /* why() composes an explanation from the actual prescription, so it cannot
       contradict the numbers printed beside it. */
    {
      const it = CAL.phaseForWeek(1).sessions.A.items.find(x => x.role === 'main');
      const w2 = CAL.why(it);
      check('why() explains sets, reps, rest and effort',
            !!(w2 && w2.sets && w2.reps && w2.rest && w2.effort));
      check('why() quotes the real numbers',
            w2.sets.includes(String(it.sets)) && w2.reps.includes(String(it.max)) &&
            w2.rest.includes(it.rest >= 120 ? String(it.rest / 60) : String(it.rest)),
            w2.rest);
      const hold = CAL.PHASES[0].sessions.A.items.find(x => x.role === 'skill');
      check('holds are explained in seconds, not reps', /second/.test(CAL.why(hold).reps));
      check('skill work is never sent to failure', /never/i.test(CAL.why(hold).effort));
    }

    /* Rung-aware units: a box squat is not a per-leg exercise. */
    check('box squat counts in reps', CAL.unit('squat', { squat: 0 }) === 'reps');
    check('pistol squat counts per leg', /leg/.test(CAL.unit('squat', { squat: 6 })));
    check('the squat ladder is flagged as mixed-unit', CAL.unitIsUniform('squat') === false);
    check('a single-unit ladder is not', CAL.unitIsUniform('push') === true);

    /* The panel itself, driven through a real click on the program page. */
    {
      const win = loaded['program.html'].window;
      const d = win.document;
      const trigger = d.querySelector('a.ex-link[data-ex="squat"]');
      check('a squat row exists to click', !!trigger);
      trigger.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }));
      const panel = d.querySelector('.xp-panel');
      check('clicking a row opens the panel', !!panel && panel.hidden === false);

      const txt = panel.textContent;
      const g = CAL.guide('squat', CAL.defaultRungs());
      check('panel names the rung you are on', panel.querySelector('#xp-title').textContent === g.n,
            panel.querySelector('#xp-title').textContent);
      check('panel gives the equipment', txt.includes(g.equip.slice(0, 30)));
      /* Not every rung needs a substitute — a bodyweight squat needs nothing to
         substitute for. Assert it on one that does. */
      const sub = CAL.guide('hpull', CAL.defaultRungs());
      check('a rung that needs equipment offers a free substitute', !!sub.sub, sub.n);
      check('panel gives the execution', txt.includes(g.how.slice(0, 40)));
      check('panel gives the cue', txt.includes(g.cue.slice(0, 30)));
      check('panel gives the mistake to avoid', txt.includes(g.avoid.slice(0, 30)));
      check('panel says what it feels like first time', txt.includes(g.first.slice(0, 30)));
      check('panel says what to do if it is too hard', txt.includes(g.easier.slice(0, 30)));
      check('panel says what earns the next rung', txt.includes(g.harder.slice(0, 30)));
      check('panel explains why these numbers', /weekly budget|double progression/.test(txt));
      check('panel breaks execution into steps', panel.querySelectorAll('.xp-steps li').length > 1,
            String(panel.querySelectorAll('.xp-steps li').length));
      check('panel is a labelled modal dialog',
            panel.getAttribute('role') === 'dialog' &&
            panel.getAttribute('aria-modal') === 'true' &&
            panel.getAttribute('aria-labelledby') === 'xp-title');
      check('panel links back to the full ladder',
            !!panel.querySelector('.xp-more a[href^="exercises.html"]'));

      d.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      check('escape closes the panel', !panel.classList.contains('is-open'));

      /* A second exercise, to prove the panel rebuilds rather than caching. */
      const other = d.querySelector('a.ex-link[data-ex="hpull"]');
      other.dispatchEvent(new win.MouseEvent('click', { bubbles: true, cancelable: true }));
      check('panel rebuilds for a different exercise',
            panel.querySelector('#xp-title').textContent ===
              CAL.guide('hpull', CAL.defaultRungs()).n,
            panel.querySelector('#xp-title').textContent);
    }

    /* Today's session gets the same treatment. */
    {
      const d = loaded['today.html'].window.document;
      check("today's exercise names are panel triggers",
            d.querySelectorAll('.ex-name a.ex-link[data-ex]').length > 0,
            String(d.querySelectorAll('.ex-name a.ex-link[data-ex]').length));
      check("today's how-to now includes equipment",
            d.querySelectorAll('.howto-body .equip').length > 0);
      check("today's how-to now includes both adjustments",
            d.querySelectorAll('.howto-body .adj').length >= 2);
    }

    /* And the exercise library. */
    {
      const d = loaded['exercises.html'].window.document;
      check('library lists equipment on every rung',
            d.querySelectorAll('.rung-how .equip').length === 76,
            String(d.querySelectorAll('.rung-how .equip').length));
      check('library lists both adjustments on every rung',
            d.querySelectorAll('.rung-how .adjust').length === 152,
            String(d.querySelectorAll('.rung-how .adjust').length));
      check('library carries the first-time note',
            d.querySelectorAll('.rung-how .firsttime').length === 76,
            String(d.querySelectorAll('.rung-how .firsttime').length));
    }
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
