/* ==========================================================================
   ACRE — Title Case display
   Shows English text as "Design Jig", "Dog and Cat": first letter of each
   word capitalised, joining words in lower case, codes and acronyms kept
   as written (GM-J26-145, PDF, ESD, 10 PCS). Display only — stored data and
   values typed into inputs are never changed.
   ========================================================================== */
(function () {
  'use strict';
  var SMALL = { a: 1, an: 1, and: 1, as: 1, at: 1, by: 1, for: 1, from: 1, in: 1, into: 1, of: 1, on: 1, or: 1, per: 1, the: 1, to: 1, via: 1, vs: 1, with: 1, nor: 1, but: 1 };
  var KEEP = {};
  ('ACRE ORBRAY PDF PR PO PIN ID QC IQC QA ESD UV PLC CSV JSON ZIP DWG IMG PCS MM CM UPS HSS HR FG WI CNC LED USB IL IR CAD OK KPI SOP TPM MTR BA DC SKU ' +
   'ISO OEE NG FAC PT MP FP JK S0 S1 S2 M/C WIP FIFO HMI PCB SMT EMC EMS OT LOT RPM OPT IN-HOUSE').split(' ').forEach(function (w) { KEEP[w] = 1; });
  KEEP['IN-HOUSE'] = 0;
  var TH = /[฀-๿]/;

  function word(w, isFirst, isLast) {
    var U = w.toUpperCase();
    if (KEEP[U]) return U;
    if (/[a-z]/.test(w) && /[A-Z]/.test(w.slice(1))) return w;          // iOS, iPhone, PowerPoint
    if (w.length === 1) return (U === 'A' && !isFirst && !isLast) ? 'a' : U;  // single letters: Factory E, M/C
    var lw = w.toLowerCase();
    if (!isFirst && SMALL[lw]) return lw;
    if (!/[AEIOUYaeiouy]/.test(w) && w.length <= 4) return U;              // vowel-less shorthand: MM, CM, PCS
    return lw.charAt(0).toUpperCase() + lw.slice(1);
  }
  function token(t, isFirst, isLast) {
    if (/\d/.test(t)) return t;                                             // codes, dates, sizes
    if (/^\(?[A-Za-z]\.\)?$/.test(t)) return t.toUpperCase();               // initials: Nonthiya A.
    if (/^[^A-Za-z]*$/.test(t)) return t;
    var first = isFirst;
    return t.replace(/[A-Za-z]+(?:'[A-Za-z]+)?/g, function (w, off) {
      var r = word(w, first && off === t.search(/[A-Za-z]/), isLast && off + w.length === t.replace(/[^A-Za-z]+$/, '').length);
      return r;
    });
  }
  function title(s, cont) {
    if (!s || !/[A-Za-z]/.test(s)) return s;
    var first = !cont;
    var lastTok = (s.match(/\S+/g) || []).length, ti = 0;
    return s.replace(/\S+/g, function (t) {
      ti++;
      var out = token(t, first, ti === lastTok);
      if (/^(e\.g\.|E\.G\.)$/.test(t)) { first = false; return 'e.g.'; }
      if (/[A-Za-z]/.test(t)) first = /[:!?]$/.test(t);
      else if (/^[—–•·|:]+$/.test(t)) first = true;
      else first = false;
      return out;
    });
  }
  var _t = title;
  title = function (s, c) { var r = _t(s, c); return typeof r === 'string' ? r.replace(/\bin Progress\b/g, 'In Progress').replace(/\bin-House\b/g, 'In-House').replace(/\bSupp\.\s*Proc\.?/gi, 'Supplier Process').replace(/\bMantenance\b/gi, 'Maintenance').replace(/(^|[^\d.,])1 Tasks\b/g, '$11 Task').replace(/\bUpload PDF \(Upload PDF\)/gi, 'Upload PDF') : r; };
  window.acreTitle = title;

  var SKIP = 'script,style,textarea,input,code,pre,[contenteditable="true"],.no-case';
  var ATTRS = ['placeholder', 'title', 'aria-label'];
  function doText(n) {
    var p = n.parentElement; if (!p || p.closest(SKIP)) return;
    var v = n.nodeValue; if (!/[A-Za-z]/.test(v)) return;
    var cont = /^\s/.test(v) && !!n.previousSibling;
    var t = title(v, cont); if (t !== v) n.nodeValue = t;
  }
  function doEl(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute && el.getAttribute(ATTRS[i]);
      if (v && /[A-Za-z]/.test(v)) { var t = title(v); if (t !== v) el.setAttribute(ATTRS[i], t); }
    }
  }
  function walk(root) {
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    if (root.matches('script,style')) return;
    doEl(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null), n, texts = [];
    while ((n = w.nextNode())) { if (n.nodeType === 1) doEl(n); else texts.push(n); }
    texts.forEach(doText);
  }

  /* dialogs & chart labels */
  ['alert', 'confirm', 'prompt'].forEach(function (fn) {
    var orig = window[fn]; if (typeof orig !== 'function') return;
    window[fn] = function (m) { var a = Array.prototype.slice.call(arguments); if (typeof a[0] === 'string') a[0] = a[0].split('\n').map(title).join('\n'); return orig.apply(window, a); };
  });
  function hookCharts() {
    if (typeof Chart === 'undefined' || hookCharts.done) return; hookCharts.done = true;
    function t(v) { return typeof v === 'string' ? title(v).toUpperCase() : v; }
    Chart.register({ id: 'acreCase', beforeUpdate: function (c) { try { var lg = c.options && c.options.plugins && c.options.plugins.legend; if (lg && lg.position === 'right') lg.maxWidth = 340; if (lg && lg.labels) { lg.labels.font = Object.assign({}, lg.labels.font || {}, { size: 10, weight: '600' }); lg.labels.boxWidth = 8; lg.labels.boxHeight = 8; lg.labels.usePointStyle = true; lg.labels.pointStyle = 'circle'; lg.labels.padding = 12; var gl = lg.labels.generateLabels || (Chart.overrides[c.config.type] && Chart.overrides[c.config.type].plugins && Chart.overrides[c.config.type].plugins.legend && Chart.overrides[c.config.type].plugins.legend.labels.generateLabels) || Chart.defaults.plugins.legend.labels.generateLabels; if (gl && !gl.__acre) { var w = function (ch) { return gl.call(this, ch).map(function (i) { if (typeof i.text === 'string') i.text = t(i.text) + '\u2003'; return i; }); }; w.__acre = true; lg.labels.generateLabels = w; } } } catch (e) {} try { var d = c.config.data; if (d && d.labels) d.labels = d.labels.map(function (l) { return Array.isArray(l) ? l.map(t) : t(l); }); (d.datasets || []).forEach(function (ds) { ds.label = t(ds.label); }); } catch (e) {} },
      beforeDraw: function (c) { try { (c.legend && c.legend.legendItems || []).forEach(function (i) { i.text = t(i.text); }); } catch (e) {} } });
  }

  function start() {
    hookCharts();
    try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(function () { try { Object.values(Chart.instances || {}).forEach(function (ch) { ch.update('none'); }); } catch (e) {} }, 60); }); } catch (e) {}
    document.title = title(document.title);
    walk(document.body);
    var pending = [], sched = false;
    function flush() { sched = false; var l = pending; pending = []; l.forEach(function (n) { if (n.isConnected) walk(n); }); }
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === 'characterData') pending.push(m.target);
        else if (m.type === 'attributes') pending.push(m.target);
        else m.addedNodes.forEach(function (n) { pending.push(n); });
      });
      if (pending.length && !sched) { sched = true; (window.queueMicrotask || setTimeout)(flush); }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
