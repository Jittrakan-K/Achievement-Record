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
