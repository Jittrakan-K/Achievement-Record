/* ==========================================================================
   ACRE — clean task table ("Fit screen" mode)
   Replaces the compact table markup with a calmer six-column layout and a
   status column that shows the sub step and achievement %. Uses the app's
   own data helpers and actions; "Full columns" mode and the private-project
   table are left to the original renderer.
   ========================================================================== */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function js(s) { return esc(String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")); }
  function up(s) { try { return uppercaseEnglish(s || ''); } catch (e) { return String(s || '').toUpperCase(); } }
  function clean(s) { return String(s || '').replace(/[☀-➿⬀-⯿️‍]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDC00-\uDEFF]/g, '').trim(); }
  function strip(v) { try { return stripLeadingNumberCode(v); } catch (e) { return v; } }
  function initials(n) { var p = clean(n).replace(/\(.*?\)/g, '').split(/[\s./-]+/).filter(Boolean); return p.length ? ((p[0][0] || '') + (p[1] ? p[1][0] : (p[0][1] || ''))).toUpperCase() : '–'; }
  function st(it) { var s = it.status || 'wait'; return s === 'cancle' ? 'cancel' : (s === 'pending' ? 'wait' : s); }
  var LABEL = { done: 'DONE', in_progress: 'IN PROGRESS', wait: 'PENDING', cancel: 'CANCELLED' };
  var ICON = {
    pdf: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
    folder: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    img: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>',
    edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    del: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>'
  };

  function fmtDate(v) {
    if (!v) return '–';
    var d = new Date(v); if (isNaN(d)) return esc(v);
    return d.getDate() + ' ' + ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()] + ' ' + String(d.getFullYear()).slice(2);
  }

  function row(it, i) {
    var cats = []; try { cats = categories; } catch (e) {}
    var cat = (cats || []).find(function (c) { return c.id === it.categoryId; }) || { name: 'GENERAL', color: '#A0AEC0' };
    var s = st(it), xl = {};
    try { xl = getTaskExcelTracking(it) || {}; } catch (e) {}
    var pct = Math.max(0, Math.min(100, Math.round(Number(xl.achievementPct != null ? xl.achievementPct : (xl.achievement || 0) * 100)) || 0));
    var sub = up(strip(xl.subStatus || ''));
    var redundant = !sub || (s === 'done' && sub === 'FINISHED') || (s === 'wait' && (sub === 'PENDING' || sub === 'NOT START')) || (s === 'cancel' && sub === 'CANCEL');
    var id = js(it.id);

    var files = '';
    if (it.pdfAttachment) files += '<button type="button" class="at-file" onclick="openPdfAttachment(\'' + id + '\')" title="Open job request PDF">' + ICON.pdf + '<span>PDF</span></button>';
    if (it.workFolder) {
      var n = (typeof it.workFolder === 'object' && it.workFolder.fileCount) ? it.workFolder.fileCount : '';
      files += '<button type="button" class="at-file is-folder" onclick="openWorkFolderModal(\'' + id + '\')" title="Open work folder">' + ICON.folder + '<span>' + (n || 'DIR') + '</span></button>';
    }
    if (it.imageData) {
      var isPdf = false; try { isPdf = isDrawingPdf(it.imageData); } catch (e) {}
      files += '<button type="button" class="at-file is-dwg" onclick="openDrawingAttachment(\'' + id + '\')" title="Open drawing">' + (isPdf ? ICON.pdf : ICON.img) + '<span>DWG</span></button>';
    }

    var note = clean(it.note && it.note !== '-' ? it.note : '');
    var desc = clean(it.description || '');
    var reqName = up(it.requestName || ''), dept = up(it.department || ''), fac = up(it.factory || '');
    var meta = dept || fac;
    var quote = clean(it.quotation || ''); if (quote === '-') quote = ''; quote = up(quote);
    var PAL = ['#3182CE', '#38B2AC', '#805AD5', '#DD6B20', '#D53F8C', '#319795', '#2F855A', '#B7791F'];
    var hk = 0, hs = (reqName || meta); for (var q = 0; q < hs.length; q++) hk = (hk * 31 + hs.charCodeAt(q)) >>> 0;
    var reqCol = PAL[hk % PAL.length];

    return '<tr class="at-row is-' + s + '">' +
      '<td class="at-no">' + (i + 1) + '</td>' +
      '<td class="at-task"><button type="button" class="at-title" onclick="viewAchievementDetail(\'' + id + '\')">' + esc(up(it.title || '-')) + '</button>' +
        '<div class="at-tags">' + (it.code ? '<span class="at-code">' + esc(up(it.code)) + '</span>' : '') +
        '<span class="at-cat"><i style="background:' + esc(cat.color || '#A0AEC0') + '"></i>' + esc(clean(up(cat.name))) + '</span>' +
        '</div></td>' +
      '<td class="at-status"><span class="at-pill is-' + s + '">' + LABEL[s] + '</span>' +
        (!redundant ? '<span class="at-sub" title="Sub status">' + esc(sub) + '</span>' : '') +
        '<span class="at-prog"><span class="at-bar"><span style="width:' + pct + '%"></span></span><b>' + pct + '%</b></span>' +
        (quote ? '<span class="at-quote" title="Quotation">Q: ' + esc(quote) + '</span>' : '') + '</td>' +
      '<td class="at-req">' + (reqName || meta ? '<div class="at-req-in"><span class="at-req-av" style="color:' + reqCol + ';background:' + reqCol + '1A">' + esc(initials(reqName || meta)) + '</span>' +
        '<span class="at-req-tx">' + (reqName ? '<b>' + esc(reqName) + '</b>' : '') + (meta && meta.toLowerCase() !== reqName.toLowerCase() ? '<small>' + esc(meta) + '</small>' : '') + '</span></div>' : '<span class="at-dim">–</span>') + '</td>' +
      '<td class="at-note">' + (note ? '<span class="at-note-main">' + esc(up(note)) + '</span>' : '') + (desc ? '<small>' + esc(up(desc)) + '</small>' : (note ? '' : '<span class="at-dim">–</span>')) + '</td>' +
      '<td class="at-owner">' + (it.assignee ? '<span class="at-av">' + esc(initials(it.assignee)) + '</span><span class="at-owner-name">' + esc(up(it.assignee)) + '</span>' : '<span class="at-dim">–</span>') + '</td>' +
      '<td class="at-files">' + (files || '<span class="at-dim">–</span>') + '</td>' +
      '<td class="at-end"><span class="at-date">' + fmtDate(it.completionDate || it.requestDate) + '</span>' +
        '<span class="at-actions"><button type="button" class="at-icon" onclick="openAchievementModal(\'' + id + '\')" title="Edit">' + ICON.edit + '</button>' +
        '<button type="button" class="at-icon is-danger" onclick="deleteAchievement(\'' + id + '\')" title="Delete">' + ICON.del + '</button></span></td>' +
      '</tr>';
  }

  function render(container, items) {
    var c = { done: 0, in_progress: 0, wait: 0, cancel: 0 };
    items.forEach(function (it) { c[st(it)]++; });
    var html = '<div class="at-wrap">' +
      '<div class="at-bar-top"><div class="at-summary"><b>' + items.length + '</b> TASKS' +
        '<span class="at-sum-chip is-done">' + c.done + ' DONE</span><span class="at-sum-chip is-in_progress">' + c.in_progress + ' IN PROGRESS</span>' +
        '<span class="at-sum-chip is-wait">' + c.wait + ' PENDING</span>' + (c.cancel ? '<span class="at-sum-chip is-cancel">' + c.cancel + ' CANCELLED</span>' : '') + '</div>' +
        '<div class="at-mode"><button type="button" class="on" onclick="setTableMode(\'compact\')">FIT SCREEN</button><button type="button" onclick="setTableMode(\'full\')">FULL COLUMNS</button></div></div>';
    if (!items.length) {
      html += '<div class="at-empty"><b>No tasks match your filters</b><span>Try another search or reset the filters.</span></div></div>';
    } else {
      html += '<div class="at-scroll"><table class="at-table"><thead><tr>' +
        '<th class="at-no">#</th><th>TASK</th><th>STATUS</th><th>REQUESTER</th><th>NOTE</th><th>OWNER</th><th>FILES</th><th class="at-end">DATE</th>' +
        '</tr></thead><tbody>' + items.map(row).join('') + '</tbody></table></div></div>';
    }
    container.innerHTML = html;
  }

  (function () { if (document.getElementById('fxTableCss')) return; var st = document.createElement('style'); st.id = 'fxTableCss'; st.textContent = `/* ==========================================================================
   Clean task table
   ========================================================================== */
.at-wrap { background: #fff; border-radius: 15px; box-shadow: 0 3.5px 5.5px rgba(0,0,0,.02); overflow: hidden; }
.at-bar-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 18px; border-bottom: 1px solid #EDF2F7; flex-wrap: wrap; }
.at-summary { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #A0AEC0; letter-spacing: .03em; flex-wrap: wrap; }
.at-summary > b { font-size: 16px; color: #2D3748; margin-right: -2px; }
.at-sum-chip { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: #F8F9FA; color: #718096; }
.at-sum-chip.is-done { color: #2F855A; background: #F0FFF4; }
.at-sum-chip.is-in_progress { color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, #fff); }
.at-sum-chip.is-wait { color: #C05621; background: #FFFAF0; }
.at-mode { display: inline-flex; background: #F8F9FA; border-radius: 10px; padding: 3px; }
.at-mode button { border: 0; background: none; height: 28px; padding: 0 12px; border-radius: 8px; font: inherit; font-size: 11px; font-weight: 700; color: #A0AEC0; cursor: pointer; letter-spacing: .03em; }
.at-mode button.on { background: #fff; color: #2D3748; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
.at-scroll { overflow-x: auto; }
.at-table { width: 100%; border-collapse: collapse; table-layout: fixed; min-width: 1040px; }
.at-table th { text-align: left; font-size: 10.5px; font-weight: 700; color: #A0AEC0; letter-spacing: .05em; padding: 12px 12px; border-bottom: 1px solid #EDF2F7; background: #fff; white-space: nowrap; }
.at-table td { padding: 14px 12px; border-bottom: 1px solid #EDF2F7; vertical-align: middle; font-size: 12.5px; color: #2D3748; }
.at-table tbody tr:last-child td { border-bottom: 0; }
.at-table tbody tr:hover td { background: #FAFBFC; }
.at-table th:nth-child(1) { width: 44px; } .at-table th:nth-child(2) { width: 25%; } .at-table th:nth-child(3) { width: 150px; }
.at-table th:nth-child(4) { width: 15%; } .at-table th:nth-child(5) { width: 22%; } .at-table th:nth-child(6) { width: 13%; }
.at-table th:nth-child(7) { width: 112px; } .at-table th:nth-child(8) { width: 96px; }
.at-no { color: #CBD5E0; font-weight: 700; text-align: center; font-variant-numeric: tabular-nums; }
.at-row.is-done td.at-no { box-shadow: inset 3px 0 0 #48BB78; }
.at-row.is-cancel td { opacity: .6; }
.at-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; border: 0; background: none; padding: 0; font: inherit; text-align: left; cursor: pointer; font-size: 13px; font-weight: 700; color: #2D3748; line-height: 1.4; }
.at-title:hover { color: var(--primary); }
.at-tags { display: flex; align-items: center; gap: 8px; margin-top: 6px; flex-wrap: wrap; }
.at-code { font-size: 10.5px; font-weight: 700; color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, #fff); padding: 2px 7px; border-radius: 6px; letter-spacing: .02em; }
.at-cat { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 700; color: #718096; letter-spacing: .03em; }
.at-cat i { width: 7px; height: 7px; border-radius: 2px; display: inline-block; }
.at-quote { font-size: 10.5px; font-weight: 700; color: #C05621; }
.at-status { }
.at-pill { display: inline-block; font-size: 10.5px; font-weight: 700; letter-spacing: .04em; padding: 4px 9px; border-radius: 7px; color: #fff; }
.at-pill.is-done { background: #48BB78; } .at-pill.is-in_progress { background: var(--primary); } .at-pill.is-wait { background: #F6AD55; } .at-pill.is-cancel { background: #CBD5E0; }
.at-sub { display: block; margin-top: 6px; font-size: 10px; font-weight: 700; color: #718096; letter-spacing: .03em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.at-prog { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.at-bar { flex: 1; height: 5px; border-radius: 99px; background: #EDF2F7; overflow: hidden; max-width: 90px; }
.at-bar > span { display: block; height: 100%; border-radius: 99px; background: var(--primary); }
.at-row.is-done .at-bar > span { background: #48BB78; }
.at-row.is-wait .at-bar > span { background: #F6AD55; }
.at-row.is-cancel .at-bar > span { background: #CBD5E0; }
.at-prog b { font-size: 11px; color: #4A5568; font-variant-numeric: tabular-nums; min-width: 30px; }
.at-req b { display: block; font-size: 12.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.at-req small, .at-note small { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 11px; color: #A0AEC0; font-weight: 500; margin-top: 3px; line-height: 1.45; }
.at-req small { -webkit-line-clamp: 1; }
.at-note-main { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; font-size: 12px; font-weight: 700; color: #C05621; }
.at-owner { white-space: nowrap; }
.at-av { display: inline-flex; width: 26px; height: 26px; border-radius: 8px; align-items: center; justify-content: center; background: color-mix(in srgb, var(--primary) 10%, #fff); color: var(--primary); font-size: 10px; font-weight: 700; vertical-align: middle; margin-right: 8px; }
.at-owner-name { font-size: 12px; font-weight: 700; vertical-align: middle; }
.at-files { white-space: nowrap; }
.at-file { display: inline-flex; align-items: center; gap: 4px; height: 26px; padding: 0 7px; margin: 2px 4px 2px 0; border: 1px solid #E2E8F0; border-radius: 7px; background: #fff; color: #718096; font: inherit; font-size: 10px; font-weight: 700; cursor: pointer; }
.at-file:hover { border-color: var(--primary); color: var(--primary); }
.at-file.is-folder svg { color: #D69E2E; }
.at-end { text-align: right; white-space: nowrap; }
.at-date { display: block; font-size: 11.5px; font-weight: 700; color: #718096; font-variant-numeric: tabular-nums; }
.at-actions { display: inline-flex; gap: 4px; margin-top: 6px; opacity: .55; transition: opacity .15s ease; }
.at-table tr:hover .at-actions, .at-actions:focus-within { opacity: 1; }
.at-icon { width: 28px; height: 28px; border-radius: 8px; border: 1px solid #E2E8F0; background: #fff; color: #718096; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; }
.at-icon:hover { color: var(--primary); border-color: var(--primary); }
.at-icon.is-danger:hover { color: #E53E3E; border-color: #FEB2B2; background: #FFF5F5; }
.at-dim { color: #CBD5E0; }
.at-empty { padding: 48px 20px; text-align: center; display: flex; flex-direction: column; gap: 4px; }
.at-empty b { font-size: 14px; color: #2D3748; } .at-empty span { font-size: 12.5px; color: #A0AEC0; }
.at-req small { -webkit-line-clamp: 2 !important; }
.at-req b { white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.at-req small { -webkit-line-clamp: 2 !important; }
.at-req b { white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.at-quote { display: inline-block !important; margin-top: 7px !important; font-size: 10px !important; font-weight: 700 !important; color: #C05621 !important; background: #FFFAF0 !important; border: 1px solid #FBD38D !important; padding: 2px 7px !important; border-radius: 6px !important; letter-spacing: .02em; font-variant-numeric: tabular-nums; white-space: nowrap; }
.at-req-in { display: flex; align-items: center; gap: 10px; min-width: 0; }
.at-req-av { flex: none; width: 30px; height: 30px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-size: 10.5px; font-weight: 700; text-transform: uppercase !important; letter-spacing: .02em; }
.at-req-tx { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
html body .at-req-tx b { display: -webkit-box !important; -webkit-box-orient: vertical; -webkit-line-clamp: 2 !important; font-size: 12.5px !important; font-weight: 600 !important; color: #2D3748 !important; line-height: 1.3 !important; white-space: normal !important; overflow: hidden; }
html body .at-req-tx small { display: block !important; margin: 0 !important; font-size: 11px !important; font-weight: 500 !important; color: #A0AEC0 !important; line-height: 1.3 !important; white-space: nowrap !important; overflow: hidden; text-overflow: ellipsis; }
`; document.head.appendChild(st); })();
  var orig = window.renderTableView;
  if (typeof orig === 'function') {
    window.renderTableView = function (container, items) {
      var priv = false, mode = 'compact';
      try { priv = isPrivateProjectWorkspace(currentWorkspaceId); } catch (e) {}
      try { mode = tableMode; } catch (e) {}
      if (priv || mode !== 'compact') return orig.apply(this, arguments);
      render(container, items || []);
    };
    try { if (typeof currentView !== 'undefined' && currentView === 'table') renderContent(); } catch (e) {}
  }
})();
