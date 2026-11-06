/* ==========================================================================
   ACRE — separate pages (desktop / tablet ≥769px)
   Dashboard, Tasks and Timeline each show only their own content instead of
   one long scrolling page. Uses the app's own navigation (desktopNavigateTo)
   and view switching; nothing in app.js is changed. Phones keep their
   bottom tab bar, which already works this way.
   ========================================================================== */
(function () {
  'use strict';
  var KEY = 'acre_page_v1';
  var PAGES = ['dashboard', 'tasks', 'timeline'];
  function isWide() { return window.matchMedia('(min-width: 769px)').matches; }
  function getPage() { return document.body.getAttribute('data-acre-page') || 'dashboard'; }

  function markNav(page) {
    document.querySelectorAll('.desktop-nav-link').forEach(function (b) { b.classList.remove('active'); });
    var el = document.getElementById('deskNav' + page.charAt(0).toUpperCase() + page.slice(1));
    if (el) el.classList.add('active');
  }
  function setPage(page, opts) {
    if (PAGES.indexOf(page) === -1) page = 'dashboard';
    document.body.setAttribute('data-acre-page', page);
    try { localStorage.setItem(KEY, page); } catch (e) {}
    markNav(page);
    if (!(opts && opts.keepScroll)) window.scrollTo(0, 0);
  }
  window.acreSetPage = setPage;

  /* nav links */
  var origNav = window.desktopNavigateTo;
  if (typeof origNav === 'function') {
    window.desktopNavigateTo = function (dest) {
      if (!isWide()) return origNav.apply(this, arguments);
      navigating = true;
      try { origNav.apply(this, arguments); } finally { navigating = false; }
      setPage(dest);
    };
  }

  /* anything that jumps to the task list (filters from dashboard cards,
     "view all", requester rows…) opens the Tasks page instead of scrolling */
  var navigating = false;
  var origScroll = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function () {
    if (isWide() && (this.id === 'controlsBar' || this.id === 'viewContainer' || (this.classList && this.classList.contains('controls-bar')))) {
      var target = (typeof currentView !== 'undefined' && currentView === 'timeline') ? 'timeline' : 'tasks';
      if (getPage() === 'dashboard' || navigating) setPage(target); else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (isWide() && (this.id === 'statsGrid' || (this.classList && this.classList.contains('analytics-section'))) && getPage() !== 'dashboard') {
      setPage('dashboard');
    }
    return origScroll.apply(this, arguments);
  };

  /* Cards / Timeline / Table switcher keeps the menu in step */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest && e.target.closest('.view-tab');
    if (!tab || !isWide()) return;
    var v = tab.getAttribute('data-view');
    setPage(v === 'timeline' ? 'timeline' : 'tasks', { keepScroll: true });
  });

  function init() {
    var saved = 'dashboard';
    try { saved = localStorage.getItem(KEY) || 'dashboard'; } catch (e) {}
    if (PAGES.indexOf(saved) === -1) saved = 'dashboard';
    if (saved === 'dashboard') setPage('dashboard', { keepScroll: true });
    else if (typeof origNav === 'function') { navigating = true; try { origNav(saved); } finally { navigating = false; } setPage(saved); }
    else setPage(saved);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 60); });
  else setTimeout(init, 60);
})();

/* ACRE — browser tab: title "ACRE" and a favicon in the workspace theme colour */
(function () {
  'use strict';
  var last = '';
  function acreMark(c, size) {
    var cx = 32, cy = 32, r = 19, n = 10, gap = 15, done = 8, segs = '';
    for (var i = 0; i < n; i++) {
      var a0 = (-90 + i * 36 + gap / 2) * Math.PI / 180, a1 = (-90 + (i + 1) * 36 - gap / 2) * Math.PI / 180;
      var x0 = (cx + r * Math.cos(a0)).toFixed(2), y0 = (cy + r * Math.sin(a0)).toFixed(2), x1 = (cx + r * Math.cos(a1)).toFixed(2), y1 = (cy + r * Math.sin(a1)).toFixed(2);
      segs += "<path d='M" + x0 + " " + y0 + " A" + r + " " + r + " 0 0 1 " + x1 + " " + y1 + "' stroke='#fff' stroke-opacity='" + (i < done ? 1 : .32) + "'/>";
    }
    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'" + (size ? " width='" + size + "' height='" + size + "'" : "") + ">" +
      "<defs><linearGradient id='acreT' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#fff' stop-opacity='.12'/><stop offset='1' stop-color='#000' stop-opacity='.08'/></linearGradient></defs>" +
      "<rect width='64' height='64' rx='16' fill='" + c + "'/><rect width='64' height='64' rx='16' fill='url(#acreT)'/>" +
      "<rect x='.5' y='.5' width='63' height='63' rx='15.5' fill='none' stroke='#fff' stroke-opacity='.14'/>" +
      "<g fill='none' stroke-width='4' stroke-linecap='round'>" + segs + "</g>" +
      "<path d='M24.5 32.6l5.2 5.2 9.8-10.6' fill='none' stroke='#fff' stroke-width='4.6' stroke-linecap='round' stroke-linejoin='round'/></svg>";
  }
  window.acreMark = acreMark;
  function svg(c) { return acreMark(c); }
  function sync() {
    if (document.title !== 'ACRE') document.title = 'ACRE';
    var c = (getComputedStyle(document.documentElement).getPropertyValue('--primary') || '').trim() || '#005BAC';
    if (c === last) return; last = c;
    var href = 'data:image/svg+xml,' + encodeURIComponent(svg(c));
    var link = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; link.type = 'image/svg+xml'; document.head.appendChild(link); }
    link.href = href;
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', c);
    document.querySelectorAll('.brand-app-icon, .mobile-brand-icon-circle').forEach(function (el) {
      el.classList.add('acre-mark'); el.innerHTML = acreMark(c).replace(/acreT/g, 'acreT' + Math.random().toString(36).slice(2, 7));
    });
  }
  sync();
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
  var t = document.querySelector('title'); if (t) new MutationObserver(function () { if (document.title !== 'ACRE') document.title = 'ACRE'; }).observe(t, { childList: true, characterData: true, subtree: true });
  window.addEventListener('load', sync);
})();

/* ACRE — job type dropdown: show what each code means */
(function () {
  'use strict';
  var L = { D: 'D (DESIGN)', R: 'R (REPAIR)', M: 'M (MODIFY)', I: 'I (INCREASE)', A: 'A (ASSY/INSTALL)', S: 'S (SIMULATION)',
    'D-A': 'D-A (DESIGN + ASSY/INSTALL)', 'D-I': 'D-I (DESIGN + INCREASE)', 'D-I-A': 'D-I-A (DESIGN + INCREASE + ASSY)', 'I-A': 'I-A (INCREASE + ASSY/INSTALL)',
    'R-A': 'R-A (REPAIR + ASSY/INSTALL)', 'M-I': 'M-I (MODIFY + INCREASE)', 'M-A': 'M-A (MODIFY + ASSY/INSTALL)', 'D-M': 'D-M (DESIGN + MODIFY)',
    'D-M-I': 'D-M-I (DESIGN + MODIFY + INCREASE)', 'I-R': 'I-R (INCREASE + REPAIR)', 'R-D': 'R-D (REPAIR + DESIGN)', 'I-M': 'I-M (INCREASE + MODIFY)',
    T: 'T (TRAINING)', AC: 'AC (ACTIVITY / 5S)', Q: 'Q (QUOTATION)', '': '-- AUTO --' };
  function apply() {
    var s = document.getElementById('achvJobType'); if (!s) return; s.classList.add('no-case');
    Array.prototype.forEach.call(s.options, function (o) { var t = L[o.value]; if (t && o.textContent !== t) o.textContent = t; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  setTimeout(apply, 500); setTimeout(apply, 2000);
  var s = document.getElementById('achvJobType');
  if (s) new MutationObserver(function () { setTimeout(apply, 0); }).observe(s, { childList: true, subtree: true, characterData: true });
})();

/* ACRE — team tables: short column headers so they never collide */
(function () {
  'use strict';
  var MAP = [[/count\s*\(%\s*of\s*all\)/i, 'Tasks'], [/team\s*share\s*\(%\)/i, 'Share']];
  function fix(root) {
    (root || document).querySelectorAll('.eng-support-table th').forEach(function (th) {
      var t = th.textContent.trim();
      MAP.forEach(function (m) { if (m[0].test(t)) th.textContent = m[1]; });
    });
  }
  function watch() {
    ['engDesignSupportContainer', 'engMaintSupportContainer'].forEach(function (id) {
      var el = document.getElementById(id); if (!el || el.__fxw) return; el.__fxw = 1;
      fix(el); new MutationObserver(function () { fix(el); }).observe(el, { childList: true, subtree: true, characterData: true });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
  setTimeout(watch, 1500);
})();
