/* Shared behavior: theme, navigation, progress, reveal, and checklist persistence. */
(function () {
  var THEME_KEY = 'cal-theme';

  function applyTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  try { applyTheme(localStorage.getItem(THEME_KEY)); } catch (error) {}

  function currentTheme() {
    var explicit = document.documentElement.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var main = document.querySelector('main');
    if (main && !main.id) main.id = 'content';

    var themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
      var syncTheme = function () {
        var dark = currentTheme() === 'dark';
        themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        themeButton.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
      };
      syncTheme();
      themeButton.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (error) {}
        syncTheme();
      });
    }

    var menuButton = document.querySelector('.menu-toggle');
    var nav = document.querySelector('nav.main');
    if (menuButton && nav) {
      var closeMenu = function () {
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
      };
      menuButton.addEventListener('click', function () {
        var isOpen = document.body.classList.toggle('menu-open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
      });
      nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) closeMenu();
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMenu();
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) closeMenu();
      });
    }

    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav.main a').forEach(function (link) {
      var target = link.getAttribute('href').split('/').pop().split('#')[0];
      if (target === here) link.setAttribute('aria-current', 'page');
    });

    document.querySelectorAll('input[type="checkbox"][id]').forEach(function (box) {
      var key = 'cal-check-' + box.id;
      try { if (localStorage.getItem(key) === '1') box.checked = true; } catch (error) {}
      box.addEventListener('change', function () {
        try { localStorage.setItem(key, box.checked ? '1' : '0'); } catch (error) {}
      });
    });

    var progressBar = document.querySelector('.scroll-progress span');
    if (progressBar) {
      var ticking = false;
      var drawProgress = function () {
        var total = document.documentElement.scrollHeight - window.innerHeight;
        var progress = total > 0 ? Math.min(1, window.scrollY / total) : 0;
        progressBar.style.transform = 'scaleX(' + progress + ')';
        ticking = false;
      };
      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(drawProgress);
          ticking = true;
        }
      }, { passive: true });
      drawProgress();
    }

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && 'IntersectionObserver' in window) {
      var revealItems = document.querySelectorAll('.hero, main > h2, main > .grid, main > .card, main > .note, main > .tip, main > .warn-box, main > .stop-box, main > .table-wrap, main > .statement, main > .pathways, main > .workout-visuals');
      document.documentElement.classList.add('reveal-ready');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -7% 0px', threshold: 0.06 });
      revealItems.forEach(function (item, index) {
        item.style.setProperty('--reveal-delay', Math.min(index % 3, 2) * 55 + 'ms');
        observer.observe(item);
      });
    }
    // Keyboard: "/" jumps to search, unless you're typing into something.
    document.addEventListener('keydown', function (ev) {
      if (ev.key !== '/' || ev.metaKey || ev.ctrlKey || ev.altKey) return;
      var el = ev.target;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) return;
      if ((location.pathname.split('/').pop() || '') === 'search.html') return;
      ev.preventDefault();
      location.href = 'search.html';
    });

    // Offline badge — appears only when the browser reports no connection.
    var badge = document.createElement('div');
    badge.textContent = 'Offline \u2014 showing the cached copy';
    badge.setAttribute('role', 'status');
    badge.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:200;' +
      'background:var(--bg-raised,#fff);color:var(--text-muted,#555);border:1px solid var(--border,#ddd);' +
      'border-radius:20px;padding:.35rem .85rem;font-size:.78rem;box-shadow:0 2px 10px rgba(0,0,0,.15);display:none';
    document.body.appendChild(badge);
    var syncOnline = function () { badge.style.display = navigator.onLine ? 'none' : 'block'; };
    window.addEventListener('online', syncOnline);
    window.addEventListener('offline', syncOnline);
    syncOnline();
  });

  // Service worker: makes the whole site usable at a park with no signal.
  // Registered outside DOMContentLoaded so it starts as early as possible.
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* offline support is optional */ });
    });
  }
})();
