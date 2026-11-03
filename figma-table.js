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
    var meta = [fac, dept].filter(Boolean).join(' · ');

    return '<tr class="at-row is-' + s + '">' +
      '<td class="at-no">' + (i + 1) + '</td>' +
      '<td class="at-task"><button type="button" class="at-title" onclick="viewAchievementDetail(\'' + id + '\')">' + esc(up(it.title || '-')) + '</button>' +
        '<div class="at-tags">' + (it.code ? '<span class="at-code">' + esc(up(it.code)) + '</span>' : '') +
        '<span class="at-cat"><i style="background:' + esc(cat.color || '#A0AEC0') + '"></i>' + esc(clean(up(cat.name))) + '</span>' +
        (it.quotation && it.quotation !== '-' ? '<span class="at-quote">Q ' + esc(it.quotation) + '</span>' : '') + '</div></td>' +
      '<td class="at-status"><span class="at-pill is-' + s + '">' + LABEL[s] + '</span>' +
        (!redundant ? '<span class="at-sub" title="Sub status">' + esc(sub) + '</span>' : '') +
        '<span class="at-prog"><span class="at-bar"><span style="width:' + pct + '%"></span></span><b>' + pct + '%</b></span></td>' +
      '<td class="at-req">' + (reqName ? '<b>' + esc(reqName) + '</b>' : '<span class="at-dim">–</span>') + (meta ? '<small>' + esc(meta) + '</small>' : '') + '</td>' +
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
