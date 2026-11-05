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
  function svg(c) {
    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='" + c + "'/>" +
      "<rect x='15' y='15' width='34' height='34' rx='5' fill='none' stroke='#fff' stroke-width='5' stroke-linejoin='round'/>" +
      "<path d='M26 15v34M15 26h34' fill='none' stroke='#fff' stroke-width='5' stroke-linecap='round'/></svg>";
  }
  function sync() {
    if (document.title !== 'ACRE') document.title = 'ACRE';
    var c = (getComputedStyle(document.documentElement).getPropertyValue('--primary') || '').trim() || '#005BAC';
    if (c === last) return; last = c;
    var href = 'data:image/svg+xml,' + encodeURIComponent(svg(c));
    var link = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; link.type = 'image/svg+xml'; document.head.appendChild(link); }
    link.href = href;
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', c);
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
