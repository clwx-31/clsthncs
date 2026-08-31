/* Shared site behavior: theme toggle + nav highlighting + local persistence helpers. */
(function () {
  var KEY = 'cal-theme';

  function applyTheme(t) {
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  try { applyTheme(localStorage.getItem(KEY)); } catch (e) {}

  function currentTheme() {
    var explicit = document.documentElement.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      var sync = function () { btn.textContent = currentTheme() === 'dark' ? '☀' : '☾'; };
      sync();
      btn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
        sync();
      });
    }

    // Mark the current page in the nav
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav.main a').forEach(function (a) {
      var target = a.getAttribute('href').split('/').pop().split('#')[0];
      if (target === here) a.setAttribute('aria-current', 'page');
    });

    // Persist any checkbox that has an id, so checklists survive a reload
    document.querySelectorAll('input[type="checkbox"][id]').forEach(function (box) {
      var k = 'cal-check-' + box.id;
      try { if (localStorage.getItem(k) === '1') box.checked = true; } catch (e) {}
      box.addEventListener('change', function () {
        try { localStorage.setItem(k, box.checked ? '1' : '0'); } catch (e) {}
      });
    });
  });
})();
