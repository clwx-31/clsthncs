/* The exercise detail panel.

   Every set, rep and exercise on this site is a link. Without JavaScript it
   goes to that movement's entry in the exercise library, which is a real page
   with real instructions. With JavaScript, this intercepts the click and slides
   in the full brief for the rung you are actually on: what it trains, what
   equipment it needs and what to use instead, how to set up, how to execute,
   the one cue, the mistake to avoid, why this many sets and reps and this much
   rest, what to do if it is too hard or too easy, and what it feels like the
   first time.

   The point is that nobody should ever have to leave this site and google a
   movement to find out how to do it.

   A trigger is any element carrying data-ex="<ladder key>". Optional
   data-sets / data-min / data-max / data-rest / data-role describe the
   prescription, and add the "why these numbers" section when present.

   Depends on assets/program-data.js, and reads saved rungs from cal-rungs so
   the instructions match the rung you are on. */

(function () {
  'use strict';

  if (typeof window.CAL === 'undefined') return;
  var C = window.CAL;

  var panel, backdrop, body, titleEl, lastFocus;

  function rungs() {
    try {
      var raw = localStorage.getItem('cal-rungs');
      if (raw) return JSON.parse(raw);
    } catch (e) { /* private mode, corrupt value — fall through */ }
    return C.defaultRungs();
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* "Lower yourself. Press up. Repeat." -> an ordered list, so the execution
     reads as steps you follow rather than a paragraph you parse. */
  function steps(how) {
    var parts = String(how).match(/[^.!?]+[.!?]*\s*/g) || [];
    parts = parts.map(function (p) { return p.trim(); }).filter(Boolean);
    if (parts.length < 2) return '<p>' + esc(how) + '</p>';
    return '<ol class="xp-steps">' +
      parts.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
      '</ol>';
  }

  function section(label, html, cls) {
    if (!html) return '';
    return '<section class="xp-sec' + (cls ? ' ' + cls : '') + '">' +
      '<h3>' + esc(label) + '</h3>' + html + '</section>';
  }

  function build(trigger) {
    var key = trigger.getAttribute('data-ex');
    var g = C.guide(key, rungs());
    if (!g) return null;

    var ladder = C.LADDERS[key];
    var pos = C.rungIndex(key, rungs());
    var out = '';

    /* Where this sits on the ladder, and what it's for. */
    var meta = [];
    if (pos) meta.push('Rung ' + (pos.index + 1) + ' of ' + pos.count);
    if (ladder) meta.push(esc(ladder.name));
    if (meta.length) out += '<p class="xp-meta">' + meta.join(' &middot; ') + '</p>';
    if (ladder && ladder.trains) {
      out += '<p class="xp-trains"><b>Trains</b> ' + esc(ladder.trains) + '</p>';
    }

    /* The prescription, if this trigger came from a session table. */
    var sets = trigger.getAttribute('data-sets');
    var item = null;
    if (sets) {
      item = {
        k: key,
        sets: +sets,
        min: +trigger.getAttribute('data-min'),
        max: +trigger.getAttribute('data-max'),
        rest: +trigger.getAttribute('data-rest'),
        role: trigger.getAttribute('data-role') || 'secondary'
      };
      var u = C.unit(key);
      var range = item.min === item.max ? item.min : item.min + '–' + item.max;
      out += '<p class="xp-rx"><b>' + item.sets + ' × ' + range + '</b> ' + esc(u) +
        '<span>rest ' + item.rest + ' s</span></p>';
    }

    out += section('Equipment', '<p>' + esc(g.equip) +
      (g.sub ? ' <span class="xp-sub"><b>Don’t have it?</b> ' + esc(g.sub) + '</span>' : '') +
      '</p>', 'xp-equip');

    out += section('How to do it', steps(g.how));

    out += '<div class="xp-pair">' +
      '<p class="xp-cue"><b>Cue</b> ' + esc(g.cue) + '</p>' +
      '<p class="xp-avoid"><b>Avoid</b> ' + esc(g.avoid) + '</p>' +
      '</div>';

    if (g.first) out += section('First time', '<p>' + esc(g.first) + '</p>', 'xp-first');

    if (item) {
      var w = C.why(item);
      out += section('Why these numbers',
        '<p>' + esc(w.sets) + '</p><p>' + esc(w.reps) + '</p>' +
        '<p>' + esc(w.rest) + '</p><p>' + esc(w.effort) + '</p>');
    }

    out += '<div class="xp-adjust">' +
      '<div class="xp-down"><h3>Too hard?</h3><p>' + esc(g.easier) + '</p></div>' +
      '<div class="xp-up"><h3>Too easy?</h3><p>' + esc(g.harder) + '</p></div>' +
      '</div>';

    if (g.gate) {
      out += '<p class="xp-gate"><b>Earns the next rung</b> ' + esc(g.gate) + '</p>';
    }

    var href = trigger.getAttribute('href');
    if (href) out += '<p class="xp-more"><a href="' + esc(href) + '">' +
      'See the whole ladder in the exercise library →</a></p>';

    return { title: g.n, html: out };
  }

  function ensure() {
    if (panel) return;
    backdrop = document.createElement('div');
    backdrop.className = 'xp-backdrop';
    backdrop.hidden = true;
    backdrop.addEventListener('click', close);

    panel = document.createElement('aside');
    panel.className = 'xp-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'xp-title');
    panel.innerHTML =
      '<div class="xp-head">' +
        '<h2 id="xp-title"></h2>' +
        '<button type="button" class="xp-close" aria-label="Close">×</button>' +
      '</div>' +
      '<div class="xp-body"></div>';

    panel.querySelector('.xp-close').addEventListener('click', close);
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    titleEl = panel.querySelector('#xp-title');
    body = panel.querySelector('.xp-body');
  }

  function open(trigger) {
    var data = build(trigger);
    if (!data) return false;
    ensure();
    lastFocus = trigger;
    titleEl.textContent = data.title;
    body.innerHTML = data.html;
    body.scrollTop = 0;
    backdrop.hidden = false;
    panel.hidden = false;
    /* Let the element paint hidden=false before transitioning in. */
    requestAnimationFrame(function () {
      backdrop.classList.add('is-open');
      panel.classList.add('is-open');
    });
    document.documentElement.classList.add('xp-locked');
    panel.querySelector('.xp-close').focus();
    return true;
  }

  function close() {
    if (!panel || panel.hidden) return;
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.documentElement.classList.remove('xp-locked');
    var done = function () {
      panel.hidden = true;
      backdrop.hidden = true;
    };
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) done();
    else setTimeout(done, 200);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    lastFocus = null;
  }

  /* Keep tab focus inside the panel while it is open. */
  function trap(e) {
    if (e.key !== 'Tab' || !panel || panel.hidden) return;
    var f = panel.querySelectorAll('a[href], button:not([disabled])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-ex]') : null;
    if (!t) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    if (open(t)) e.preventDefault();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
    trap(e);
  });

  window.CALPanel = { open: open, close: close };
})();
