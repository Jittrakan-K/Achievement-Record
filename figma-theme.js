/* Chart styling for the Drafting Table interface layer (visual defaults only) */
(function () {
  if (typeof Chart === 'undefined') return;
  var d = Chart.defaults;
  d.font.family = '"NoEmoji", "Helvetica Neue", Helvetica, Arial, "Noto Sans Thai", "Sarabun", sans-serif';
  d.font.size = 12;
  d.color = '#A0AEC0';
  d.borderColor = '#E2E8F0';
  if (d.plugins && d.plugins.tooltip) {
    var t = d.plugins.tooltip;
    t.backgroundColor = '#2D3748'; t.padding = 10; t.cornerRadius = 8; t.boxPadding = 4;
    t.titleFont = { weight: '600' }; t.bodyFont = { weight: '400' };
    t.callbacks = t.callbacks || {};
  }
  if (d.plugins && d.plugins.legend && d.plugins.legend.labels) {
    d.plugins.legend.labels.usePointStyle = true; d.plugins.legend.labels.pointStyle = 'rectRounded'; d.plugins.legend.labels.boxWidth = 8; d.plugins.legend.labels.boxHeight = 8;
  }
  if (d.elements) {
    if (d.elements.bar) { d.elements.bar.borderRadius = 99; d.elements.bar.borderSkipped = false; }
    if (d.datasets && d.datasets.bar) { d.datasets.bar.maxBarThickness = 22; }
    if (d.elements.arc) { d.elements.arc.borderWidth = 2; d.elements.arc.borderColor = '#FFFFFF'; }
  }
  var FAMILY = d.font.family;
  function swapFamilies(o, depth) {
    if (!o || typeof o !== 'object' || depth > 8) return;
    Object.keys(o).forEach(function (k) {
      var v = o[k];
      if (k === 'family' && typeof v === 'string') o[k] = FAMILY;
      else if (v && typeof v === 'object' && !(v instanceof HTMLElement) && !Array.isArray(v)) swapFamilies(v, depth + 1);
    });
  }
  var EMOJI = /[\u2600-\u27BF\u2B00-\u2BFF\uFE0F\u200D]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDC00-\uDEFF]/g;
  function clean(t) { if (typeof t !== 'string') return t; t = t.replace(EMOJI, '').replace(/^\s+/, ''); return (window.acreTranslateStrict && /[฀-๿]/.test(t)) ? window.acreTranslateStrict(t) : t; }
  Chart.register({
    id: 'fxTypography',
    beforeDatasetsDraw: function (chart) {
      try {
        if (chart.config.type !== 'bar' || (chart.options && chart.options.indexAxis === 'y')) return;
        var a = chart.chartArea, ctx = chart.ctx; ctx.save(); ctx.fillStyle = '#F2F4F8';
        chart.data.datasets.forEach(function (ds, i) {
          var meta = chart.getDatasetMeta(i); if (meta.hidden) return;
          meta.data.forEach(function (el) {
            var w = el.width || 0, x = el.x - w / 2, h = a.bottom - a.top, r = Math.min(w / 2, 99);
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(x, a.top, w, h, r); else ctx.rect(x, a.top, w, h);
            ctx.fill();
          });
        });
        ctx.restore();
      } catch (e) {}
    },
    beforeDraw: function (chart) {
      try { (chart.legend && chart.legend.legendItems || []).forEach(function (i) { i.text = clean(i.text); }); } catch (e) {}
    },
    beforeInit: function (chart) { try { swapFamilies(chart.config.options, 0); } catch (e) {} },
    beforeUpdate: function (chart) { try { swapFamilies(chart.config.options, 0); } catch (e) {} }
  });
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('12px "NoEmoji"', '\uD83D\uDCC1'),
      document.fonts.load('400 12px "Noto Sans Thai"'),
      document.fonts.load('700 12px "Noto Sans Thai"')
    ]).then(function () {
      try { Object.values(Chart.instances || {}).forEach(function (c) { c.update('none'); }); } catch (e) {}
    }).catch(function () {});
  }
})();

/* Text-default emoji written with U+FE0F force colour glyphs in Chrome.
   Removing only that invisible selector from rendered text lets the
   interface font take over; form fields and pickers are left alone. */
(function () {
  var VS = /️/g;
  var SKIP = 'input,textarea,select,option,script,style,[contenteditable],.ws-icon-opt,.avatar-opt-btn,#pinVisibilityIcon,#pinTargetAvatar,.pin-avatar-large,#mobileAuthIcon,.cat-icon-opt,.icon-picker-opt,.emoji-keep';
  function fixNode(n) {
    if (n.nodeType === 3) {
      if (n.nodeValue.indexOf('️') === -1) return;
      var p = n.parentElement; if (!p || p.closest(SKIP)) return;
      n.nodeValue = n.nodeValue.replace(VS, '');
    } else if (n.nodeType === 1) {
      if (n.matches && n.matches('script,style,textarea,select')) return;
      var w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT, null), t, list = [];
      while ((t = w.nextNode())) if (t.nodeValue.indexOf('️') !== -1) list.push(t);
      list.forEach(fixNode);
    }
  }
  function start() {
    fixNode(document.body);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (m.type === 'characterData') fixNode(m.target);
        else m.addedNodes.forEach(fixNode);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* Options in drop-down lists: strip emoji so every choice is text only */
(function () {
  var EMO = /[☀-➿⬀-⯿️‍←-⇿⌀-⏿]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDC00-\uDEFF]/g;
  function fix(root) {
    var list = root.querySelectorAll ? root.querySelectorAll('option') : [];
    if (root.tagName === 'OPTION') list = [root];
    Array.prototype.forEach.call(list, function (o) {
      var t = o.textContent;
      if (EMO.test(t)) { EMO.lastIndex = 0; var n = t.replace(EMO, '').replace(/\s{2,}/g, ' ').trim(); if (n !== t) o.textContent = n; }
      EMO.lastIndex = 0;
    });
  }
  function start() {
    fix(document);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === 'characterData' && m.target.parentElement && m.target.parentElement.tagName === 'OPTION') fix(m.target.parentElement);
        m.addedNodes && m.addedNodes.forEach(function (n) { if (n.nodeType === 1) fix(n); });
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
