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
    return d.getDate() + ' ' + ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()] + ' ' + d.getFullYear();
  }

  function row(it, i, full) {
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
    var codeTx = up(clean(it.code || '')); if (codeTx === '-' || codeTx.toLowerCase() === reqName.toLowerCase() || codeTx.toLowerCase() === meta.toLowerCase()) codeTx = '';
    var quote = clean(it.quotation || ''); if (quote === '-') quote = ''; quote = up(quote);
    var qList = quote ? quote.split(/\s*[,/;]\s*|\s+/).filter(Boolean) : [];
    var PAL = ['#3182CE', '#38B2AC', '#805AD5', '#DD6B20', '#D53F8C', '#319795', '#2F855A', '#B7791F'];
    var hk = 0, hs = (reqName || meta); for (var q = 0; q < hs.length; q++) hk = (hk * 31 + hs.charCodeAt(q)) >>> 0;
    var reqCol = PAL[hk % PAL.length];

    var statusCell = '<td class="at-status"><div class="at-st-top"><span class="at-pill is-' + s + '">' + LABEL[s] + '</span>' +
        (quote ? '<span class="at-quote" title="Quotation: ' + esc(quote) + '">Q: ' + esc(qList[0]) + (qList.length > 1 ? '<em class="at-quote-more">+' + (qList.length - 1) + '</em>' : '') + '</span>' : '') + '</div>' +
        '<div class="at-st-meta"><span class="at-sub" title="Sub status">' + (!redundant ? esc(sub) : '&nbsp;') + '</span><b>' + pct + '%</b></div>' +
        '<span class="at-bar"><span style="width:' + pct + '%"></span></span></td>';
    var reqCell = '<td class="at-req">' + (reqName || meta ? '<div class="at-req-in"><span class="at-req-av" style="color:' + reqCol + ';background:' + reqCol + '1A">' + esc(initials(reqName || meta)) + '</span>' +
        '<span class="at-req-tx">' + (reqName ? '<b>' + esc(reqName) + '</b>' : '') + (meta && meta.toLowerCase() !== reqName.toLowerCase() ? '<small>' + esc(meta) + '</small>' : '') + (codeTx ? '<em class="at-req-code" title="Request number">' + esc(codeTx) + '</em>' : '') + '</span></div>' : '<span class="at-dim">–</span>') + '</td>';
    var taskCell = '<td class="at-task"><button type="button" class="at-title" onclick="viewAchievementDetail(\'' + id + '\')">' + esc(up(it.title || '-')) + '</button>' +
        '<div class="at-tags">' +
        '<span class="at-cat"><i style="background:' + esc(cat.color || '#A0AEC0') + '"></i>' + esc(clean(up(cat.name))) + '</span></div></td>';
    var noteCell = '<td class="at-note">' + (note ? '<span class="at-note-main">' + esc(up(note)) + '</span>' : '') + (desc ? '<small>' + esc(up(desc)) + '</small>' : (note ? '' : '<span class="at-dim">–</span>')) + '</td>';
    var filesCell = '<td class="at-files">' + (files || '<span class="at-dim">–</span>') + '</td>';
    var actCell = '<span class="at-actions"><button type="button" class="at-icon" onclick="openAchievementModal(\'' + id + '\')" title="Edit">' + ICON.edit + '</button>' +
        '<button type="button" class="at-icon is-danger" onclick="deleteAchievement(\'' + id + '\')" title="Delete">' + ICON.del + '</button></span>';
    if (full) {
      var dash = function (v) { v = clean(v || ''); return v && v !== '-' ? v : ''; };
      var team = '';
      if (it.assignee) team += '<div class="af-owner"><span class="at-av">' + esc(initials(it.assignee)) + '</span><b>' + esc(up(it.assignee)) + '</b></div>';
      [['Tooling', xl.toolingTeam], ['Design', xl.designSupport], ['Maintenance', xl.maintenanceSupport]].forEach(function (p) {
        var v = dash(p[1]); if (v) team += '<div class="af-line"><span>' + p[0] + '</span>' + esc(up(v)) + '</div>';
      });
      var jt = ''; try { jt = getJobTypeTitle(xl.jobType); } catch (e) { jt = xl.jobType || ''; }
      var subJob = dash(strip(xl.subJobType || '')), pri = dash(xl.priority);
      var priCls = /super/i.test(pri) ? 'is-super' : (/high/i.test(pri) ? 'is-high' : (/low/i.test(pri) ? 'is-low' : 'is-mid'));
      var job = (dash(jt) ? '<b class="af-strong">' + esc(up(jt)) + '</b>' : '<span class="at-dim">–</span>') +
        '<div class="af-sub">' + (subJob ? esc(up(subJob)) : '') + (subJob && pri ? ' · ' : '') + (pri ? '<span class="af-pri ' + priCls + '"><i></i>' + esc(up(pri)) + '</span>' : '') + '</div>';
      var proc = dash(it.process), facv = dash(it.factory);
      var loc = (facv ? '<b class="af-strong">' + esc(up(facv)) + '</b>' : '<span class="at-dim">–</span>') + (proc ? '<div class="af-sub">' + esc(up(proc)) + '</div>' : '');
      var dates = '';
      if (dash(xl.actionDate)) dates += '<div class="af-date"><span>Started</span>' + fmtDate(xl.actionDate) + '</div>';
      if (it.completionDate) dates += '<div class="af-date is-done"><span>Done</span>' + fmtDate(it.completionDate) + '</div>';
      if (!dates && it.requestDate) dates += '<div class="af-date"><span>Requested</span>' + fmtDate(it.requestDate) + '</div>';
      return '<tr class="at-row is-' + s + '">' +
        '<td class="at-no af-stick-a">' + (i + 1) + '</td>' + taskCell.replace('<td class="at-task">', '<td class="at-task af-stick-b">') + statusCell +
        '<td class="af-team">' + (team || '<span class="at-dim">–</span>') + '</td>' +
        '<td class="af-job">' + job + '</td>' + reqCell + '<td class="af-loc">' + loc + '</td>' +
        '<td class="af-dates">' + (dates || '<span class="at-dim">–</span>') + '</td>' + noteCell + filesCell +
        '<td class="at-end af-stick-c">' + actCell + '</td></tr>';
    }
    return '<tr class="at-row is-' + s + '">' +
      '<td class="at-no">' + (i + 1) + '</td>' +
      '<td class="at-task"><button type="button" class="at-title" onclick="viewAchievementDetail(\'' + id + '\')">' + esc(up(it.title || '-')) + '</button>' +
        '<div class="at-tags">' +
        '<span class="at-cat"><i style="background:' + esc(cat.color || '#A0AEC0') + '"></i>' + esc(clean(up(cat.name))) + '</span>' +
        '</div></td>' +
      '<td class="at-status"><div class="at-st-top"><span class="at-pill is-' + s + '">' + LABEL[s] + '</span>' +
        (quote ? '<span class="at-quote" title="Quotation: ' + esc(quote) + '">Q: ' + esc(qList[0]) + (qList.length > 1 ? '<em class="at-quote-more">+' + (qList.length - 1) + '</em>' : '') + '</span>' : '') + '</div>' +
        '<div class="at-st-meta"><span class="at-sub" title="Sub status">' + (!redundant ? esc(sub) : '&nbsp;') + '</span><b>' + pct + '%</b></div>' +
        '<span class="at-bar"><span style="width:' + pct + '%"></span></span></td>' +
      '<td class="at-req">' + (reqName || meta ? '<div class="at-req-in"><span class="at-req-av" style="color:' + reqCol + ';background:' + reqCol + '1A">' + esc(initials(reqName || meta)) + '</span>' +
        '<span class="at-req-tx">' + (reqName ? '<b>' + esc(reqName) + '</b>' : '') + (meta && meta.toLowerCase() !== reqName.toLowerCase() ? '<small>' + esc(meta) + '</small>' : '') + (codeTx ? '<em class="at-req-code" title="Request number">' + esc(codeTx) + '</em>' : '') + '</span></div>' : '<span class="at-dim">–</span>') + '</td>' +
      '<td class="at-note">' + (note ? '<span class="at-note-main">' + esc(up(note)) + '</span>' : '') + (desc ? '<small>' + esc(up(desc)) + '</small>' : (note ? '' : '<span class="at-dim">–</span>')) + '</td>' +
      '<td class="at-owner">' + (it.assignee ? '<span class="at-av">' + esc(initials(it.assignee)) + '</span><span class="at-owner-name">' + esc(up(it.assignee)) + '</span>' : '<span class="at-dim">–</span>') + '</td>' +
      '<td class="at-files">' + (files || '<span class="at-dim">–</span>') + '</td>' +
      '<td class="at-end is-swapped"><span class="at-actions"><button type="button" class="at-icon" onclick="openAchievementModal(\'' + id + '\')" title="Edit">' + ICON.edit + '</button>' +
        '<button type="button" class="at-icon is-danger" onclick="deleteAchievement(\'' + id + '\')" title="Delete">' + ICON.del + '</button></span>' +
        '<span class="at-date">' + fmtDate(it.completionDate || it.requestDate) + '</span></td>' +
      '</tr>';
  }

  function counts(items) { var c = { done: 0, in_progress: 0, wait: 0, cancel: 0 }; items.forEach(function (it) { c[st(it)]++; }); return c; }
  function summary(items, c) {
    function item(k, label) { return '<span class="at-sum-item is-' + k + '"><i></i>' + label + '<b>' + c[k] + '</b></span>'; }
    return '<div class="at-summary"><span class="at-sum-total"><b>' + items.length + '</b>Tasks</span>' +
      item('done', 'Done') + item('in_progress', 'In Progress') + item('wait', 'Pending') + (c.cancel ? item('cancel', 'Cancelled') : '') + '</div>';
  }
  function modeToggle(full) {
    return '<div class="at-mode"><button type="button" class="' + (full ? '' : 'on') + '" onclick="setTableMode(\'compact\')">Fit Screen</button>' +
      '<button type="button" class="' + (full ? 'on' : '') + '" onclick="setTableMode(\'full\')">Full Columns</button></div>';
  }
  function render(container, items) {
    var c = counts(items);
    var html = '<div class="at-wrap">' +
      '<div class="at-bar-top">' + summary(items, c) + modeToggle(false) + '</div>';
    if (!items.length) {
      html += '<div class="at-empty"><b>No tasks match your filters</b><span>Try another search or reset the filters.</span></div></div>';
    } else {
      html += '<div class="at-scroll"><table class="at-table"><thead><tr>' +
        '<th class="at-no">#</th><th>TASK</th><th>STATUS</th><th>REQUESTER</th><th>NOTE</th><th>OWNER</th><th class="at-files">FILES</th><th class="at-end">DATE</th>' +
        '</tr></thead><tbody>' + items.map(function (it, i) { return row(it, i); }).join('') + '</tbody></table></div></div>';
    }
    container.innerHTML = html;
  }
  function g(name, d) { try { return eval(name); } catch (e) { return d; } }
  function sel(type, cur, label, opts) {
    var on = cur && cur !== 'all';
    var curLabel = 'All'; opts.forEach(function (o) { if (o[0] === cur) curLabel = o[1]; });
    return '<label class="af-select' + (on ? ' is-on' : '') + '"><span>' + label + '</span><b>' + esc(curLabel) + '</b><select onchange="setExcelFilter(\'' + type + '\', this.value)">' +
      '<option value="all"' + (on ? '' : ' selected') + '>All</option>' +
      opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (cur === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select></label>';
  }
  function renderFull(container, items) {
    var c = counts(items), score = 0;
    items.forEach(function (it) { try { var x = getTaskExcelTracking(it); score += (typeof x.achievement === 'number' ? x.achievement : 0); } catch (e) {} });
    var avg = items.length ? (score / items.length * 100).toFixed(1) : '0.0';
    var fs = g('currentSectionFilter', 'all'), fj = g('currentJobTypeFilter', 'all'), fsj = g('currentSubJobTypeFilter', 'all'), fp = g('currentPriorityFilter', 'all'), fss = g('currentSubStatusFilter', 'all');
    var any = [fs, fj, fsj, fp, fss].some(function (v) { return v && v !== 'all'; });
    var html = '<div class="at-wrap is-full">' +
      '<div class="at-bar-top">' + summary(items, c) +
        '<div class="af-right"><span class="af-score" title="Achievement score of the tasks shown"><span>Achievement</span><b>' + score.toFixed(1) + ' / ' + items.length + '</b><em>' + avg + '%</em></span>' + modeToggle(true) + '</div></div>' +
      '<div class="af-filters">' +
        sel('section', fs, 'Section', [['S0', 'S0 · Carried over'], ['S1', 'S1 · Day 1–15'], ['S2', 'S2 · Day 16–31']]) +
        sel('jobType', fj, 'Job Type', [['D', 'Design'], ['R', 'Repair'], ['M', 'Modify'], ['I', 'Increase'], ['A', 'Assy / Install'], ['S', 'Simulation'], ['T', 'Training'], ['AC', 'Activity / 5S'], ['Q', 'Quote']]) +
        sel('subJobType', fsj, 'Sub Job', [['01 In-house', 'In-House'], ['02 Outsource', 'Outsource'], ['All', 'In-House + Outsource']]) +
        sel('priority', fp, 'Priority', [['Super High', 'Super High'], ['High', 'High'], ['Medium', 'Medium'], ['Low', 'Low']]) +
        sel('subStatus', fss, 'Sub Status', [['00 Not Start', 'Not Start · 0%'], ['01 Req. Analysis', 'Req. Analysis · 10%'], ['02 Concept Design', 'Concept Design · 20%'], ['03 User Approval 1', 'User Approval 1 · 30%'], ['04 Detailed Drawing', 'Detailed Drawing · 40%'], ['05 Quote Request', 'Quote Request · 50%'], ['06 User Approval 2', 'User Approval 2 · 60%'], ['07 Supp. Proc.', 'Supplier Process · 70%'], ['08 P.Techno. Proc.', 'P.Techno Process · 80%'], ['09 Verification', 'Verification · 90%'], ['10 Finished', 'Finished · 100%'], ['Pending', 'Pending · 0%'], ['Cancel', 'Cancel · 100%']]) +
        (any ? '<button type="button" class="af-clear" onclick="resetAllFilters()">Clear filters</button>' : '') +
      '</div>';
    if (!items.length) {
      html += '<div class="at-empty"><b>No tasks match your filters</b><span>Try another search or reset the filters.</span></div></div>';
    } else {
      html += '<div class="at-scroll af-scroll"><table class="at-table af-table"><thead><tr>' +
        '<th class="at-no af-stick-a">#</th><th class="af-stick-b">TASK</th><th>STATUS</th><th>TEAM</th><th>JOB TYPE</th><th>REQUESTER</th><th>LOCATION</th><th>DATES</th><th>NOTE</th><th class="at-files">FILES</th><th class="at-end af-stick-c">ACTIONS</th>' +
        '</tr></thead><tbody>' + items.map(function (it, i) { return row(it, i, true); }).join('') + '</tbody></table></div></div>';
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
.at-pill.is-done { background: #48BB78; } .at-pill.is-in_progress { background: var(--primary); } .at-pill.is-wait { background: #E53E3E; } .at-pill.is-cancel { background: #CBD5E0; }
.at-sub { display: block; margin-top: 6px; font-size: 10px; font-weight: 700; color: #718096; letter-spacing: .03em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.at-prog { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.at-bar { flex: 1; height: 5px; border-radius: 99px; background: #EDF2F7; overflow: hidden; max-width: 90px; }
.at-bar > span { display: block; height: 100%; border-radius: 99px; background: var(--primary); }
.at-row.is-done .at-bar > span { background: #48BB78; }
.at-row.is-wait .at-bar > span { background: #E53E3E; }
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

/* balanced layout */
html body .at-table th:nth-child(1) { width: 48px !important; } html body .at-table th:nth-child(2) { width: 22% !important; } html body .at-table th:nth-child(3) { width: 212px !important; }
html body .at-table th:nth-child(4) { width: 15% !important; } html body .at-table th:nth-child(5) { width: auto !important; } html body .at-table th:nth-child(6) { width: 124px !important; }
html body .at-table th.at-end { text-align: right; }
html body .at-table:not(.af-table) th:nth-child(3), html body .at-table:not(.af-table) td.at-status { padding-left: 8px !important; padding-right: 36px !important; }
html body .at-table:not(.af-table) th:nth-child(4), html body .at-table:not(.af-table) td.at-req { padding-left: 4px !important; }
html body .at-st-top { flex-wrap: nowrap; }
html body .at-table th:nth-child(7) { width: 84px !important; } html body .at-table th:nth-child(8) { width: 104px !important; }
html body .at-table td { padding: 16px 14px; }
html body .at-table th { padding: 12px 14px; }
html body .at-table th.at-files, html body .at-table td.at-files { text-align: center; }
html body .at-table td.at-files .at-file { margin: 2px; }
.at-st-top { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
html body .at-st-top .at-quote { margin-top: 0 !important; padding: 3px 7px !important; }
.at-st-meta { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin-top: 8px; }
html body .at-st-meta .at-sub { margin: 0; font-size: 10.5px; font-weight: 600; color: #718096; letter-spacing: 0; min-width: 0; }
.at-st-meta b { font-size: 11px; font-weight: 700; color: #4A5568; font-variant-numeric: tabular-nums; }
html body .at-status > .at-bar { display: block !important; max-width: 160px !important; width: 100% !important; height: 5px !important; margin-top: 6px; }
html body .at-st-meta { max-width: 160px; }
html body .at-av { width: 30px; height: 30px; border-radius: 10px; font-size: 10.5px; margin-right: 10px; }
html body .at-owner-name { font-weight: 600; font-size: 12.5px; }
html body .at-end .at-date { display: block; font-size: 12px; font-weight: 600; color: #718096; }
html body .at-end .at-actions { display: inline-flex; gap: 6px; margin-top: 8px; }

/* ---------- pills: text optically centred ---------- */
html body .at-pill, html body .at-quote, html body .at-code, html body .pu-badge, html body .workspace-tab-count, html body .af-pri {
  display: inline-flex !important; align-items: center !important; justify-content: center !important; line-height: 1 !important; vertical-align: middle;
}
html body .at-pill { height: 22px; padding: 0 9px !important; }
html body .at-quote { height: 22px; padding: 0 8px !important; }
html body .at-code { height: 20px; padding: 0 7px !important; }
html body .pu-badge { height: 24px; padding: 0 12px !important; font-size: 11.5px !important; }
html body .workspace-tab-count { height: 20px !important; min-width: 26px !important; padding: 0 7px !important; }

/* ---------- summary line ---------- */
html body .at-summary { gap: 0 !important; font-size: 12.5px !important; font-weight: 500 !important; color: #718096 !important; letter-spacing: 0 !important; }
.at-sum-total { display: inline-flex; align-items: baseline; gap: 6px; padding-right: 16px; margin-right: 16px; border-right: 1px solid #E2E8F0; color: #718096; font-weight: 600; }
.at-sum-total b { font-size: 18px; font-weight: 700; color: #2D3748; letter-spacing: -.01em; }
.at-sum-item { display: inline-flex; align-items: center; gap: 7px; margin-right: 18px; color: #718096; font-weight: 500; white-space: nowrap; }
.at-sum-item:last-child { margin-right: 0; }
.at-sum-item i { width: 8px; height: 8px; border-radius: 50%; background: #CBD5E0; }
.at-sum-item b { color: #2D3748; font-weight: 700; font-variant-numeric: tabular-nums; }
.at-sum-item.is-done i { background: #48BB78; } .at-sum-item.is-in_progress i { background: var(--primary); } .at-sum-item.is-wait i { background: #E53E3E; } .at-sum-item.is-cancel i { background: #CBD5E0; }
html body .at-bar-top { padding: 16px 20px !important; }
html body .at-mode button.on { background: #fff; color: #2D3748; box-shadow: 0 1px 3px rgba(0,0,0,.08); }

/* ---------- finished rows: grey ---------- */
html body .at-row.is-done > td { background: #ECEEF1 !important; }
html body .at-row.is-done:hover > td { background: #E5E8EC !important; }
html body .at-row.is-wait > td { background: #FFF5F5 !important; }
html body .at-row.is-wait:hover > td { background: #FFEDED !important; }
html body .at-row.is-wait .at-bar { background: #FED7D7 !important; }
html body .at-row.is-done .at-bar { background: #D9DDE3 !important; }
html body .at-row.is-done td.at-no { box-shadow: none !important; }
html body .at-row.is-done .at-title { color: #4A5568; }
html body .at-row.is-cancel > td { background: #FAFAFB !important; }
html body .at-row.is-cancel .at-title { color: #A0AEC0; text-decoration: line-through; text-decoration-color: #CBD5E0; }

/* ---------- full columns ---------- */
.af-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.af-score { display: inline-flex; align-items: baseline; gap: 8px; font-size: 12px; color: #718096; font-weight: 500; padding-right: 12px; border-right: 1px solid #E2E8F0; }
.af-score b { color: #2D3748; font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; }
.af-score em { font-style: normal; color: #2F855A; font-weight: 700; font-size: 12px; }
.af-filters { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 12px 20px; border-bottom: 1px solid #EDF2F7; background: #FCFCFD; }
.af-select { position: relative; display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 30px 0 12px; border: 1px solid #E2E8F0; border-radius: 10px; background: #fff; cursor: pointer; font-size: 12px; color: #718096; font-weight: 500; }
.af-select::after { content: ''; position: absolute; right: 12px; top: 50%; width: 6px; height: 6px; border-right: 1.5px solid #A0AEC0; border-bottom: 1.5px solid #A0AEC0; transform: translateY(-70%) rotate(45deg); pointer-events: none; }
.af-select span { white-space: nowrap; }
.af-select > b { font-weight: 700; color: #2D3748; white-space: nowrap; }
.af-select.is-on > b { color: var(--primary); }
html body .af-select select { -webkit-appearance: none; appearance: none; border: 0 !important; background: transparent !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; height: auto !important; min-height: 0 !important; width: auto !important; font: inherit; font-size: 12px !important; font-weight: 700 !important; color: #2D3748 !important; cursor: pointer; outline: none; position: absolute; inset: 0; opacity: 0; }
.af-select.is-on { border-color: color-mix(in srgb, var(--primary) 45%, #fff); background: color-mix(in srgb, var(--primary) 6%, #fff); color: var(--primary); }
.af-clear { border: 0; background: none; color: #E53E3E; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; padding: 0 6px; height: 34px; }
.af-scroll { overflow-x: auto; }
html body .af-table { min-width: 1960px !important; table-layout: fixed; }
html body .af-table th:nth-child(1) { width: 48px !important; } html body .af-table th:nth-child(2) { width: 270px !important; } html body .af-table th:nth-child(3) { width: 184px !important; }
html body .af-table th:nth-child(4) { width: 170px !important; } html body .af-table th:nth-child(5) { width: 160px !important; } html body .af-table th:nth-child(6) { width: 190px !important; }
html body .af-table th:nth-child(7) { width: 160px !important; } html body .af-table th:nth-child(8) { width: 150px !important; } html body .af-table th:nth-child(9) { width: auto !important; }
html body .af-table th:nth-child(10) { width: 120px !important; } html body .af-table th:nth-child(11) { width: 96px !important; }
.af-stick-a, .af-stick-b, .af-stick-c { position: sticky; z-index: 2; background: #fff; }
.af-stick-a { left: 0; } .af-stick-b { left: 48px; box-shadow: 1px 0 0 #EDF2F7; } .af-stick-c { right: 0; box-shadow: -1px 0 0 #EDF2F7; }
html body .af-table thead th.af-stick-a, html body .af-table thead th.af-stick-b, html body .af-table thead th.af-stick-c { z-index: 3; background: #fff; }
html body .af-table td.at-end { text-align: right; }
html body .af-table td.at-end .at-actions { margin-top: 0 !important; opacity: 1; }
.af-owner { display: flex; align-items: center; gap: 0; }
.af-owner b { font-size: 12.5px; font-weight: 600; color: #2D3748; }
.af-line { font-size: 11px; color: #4A5568; margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.af-line span { display: inline-block; min-width: 72px; color: #A0AEC0; font-weight: 500; }
.af-strong { display: block; font-size: 12.5px; font-weight: 600; color: #2D3748; line-height: 1.35; }
.af-sub { margin-top: 4px; font-size: 11px; color: #A0AEC0; font-weight: 500; display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.af-pri { gap: 5px; font-weight: 600; color: #718096; }
.af-pri i { width: 6px; height: 6px; border-radius: 50%; background: #A0AEC0; }
.af-pri.is-super i { background: #E53E3E; } .af-pri.is-super { color: #C53030; }
.af-pri.is-high i { background: #DD6B20; } .af-pri.is-high { color: #C05621; }
.af-pri.is-mid i { background: #3182CE; } .af-pri.is-low i { background: #A0AEC0; }
.af-date { white-space: nowrap; display: flex; justify-content: space-between; gap: 8px; font-size: 12px; font-weight: 600; color: #4A5568; font-variant-numeric: tabular-nums; }
.af-date + .af-date { margin-top: 5px; }
.af-date span { color: #A0AEC0; font-weight: 500; font-size: 11px; }
.af-date.is-done { color: #2F855A; }

/* ---------- timeline ---------- */
html body .atl { padding: 8px 24px 24px !important; }
.atl-group { position: relative; }
.atl-head { display: flex; align-items: baseline; gap: 10px; padding: 18px 0 12px; }
.atl-head h4 { margin: 0; font-size: 15px; font-weight: 700; color: #2D3748; }
.atl-head span { font-size: 12px; color: #A0AEC0; font-weight: 500; }
.atl-list { position: relative; padding-left: 26px; }
.atl-list::before { content: ''; position: absolute; left: 6px; top: 6px; bottom: 6px; width: 2px; border-radius: 2px; background: #EDF2F7; }
.atl-item { position: relative; margin-bottom: 12px; }
.atl-item:last-child { margin-bottom: 0; }
.atl-dot { position: absolute; left: -26px; top: 20px; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 3px solid #CBD5E0; box-sizing: border-box; }
.atl-item.is-done .atl-dot { border-color: #48BB78; background: #48BB78; box-shadow: inset 0 0 0 2px #fff; }
.atl-item.is-in_progress .atl-dot { border-color: var(--primary); }
.atl-item.is-wait .atl-dot { border-color: #E53E3E; }
.atl-card { background: #fff; border: 1px solid #EDF2F7; border-radius: 14px; padding: 16px 18px; transition: border-color .15s ease, box-shadow .15s ease; }
.atl-card:hover { border-color: #E2E8F0; box-shadow: 0 4px 14px rgba(15, 23, 42, .05); }
.atl-item.is-done .atl-card { background: #ECEEF1; border-color: #ECEEF1; }
.atl-item.is-wait .atl-card { background: #FFF5F5; border-color: #FED7D7; }
.atl-item.is-cancel .atl-card { background: #FAFAFB; }
.atl-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.atl-title { border: 0; background: none; padding: 0; font: inherit; text-align: left; cursor: pointer; font-size: 14px; font-weight: 700; color: #2D3748; line-height: 1.4; text-transform: uppercase !important; }
.atl-title:hover { color: var(--primary); }
html body .atl .at-tags { margin-top: 8px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.atl-desc { margin: 10px 0 0; font-size: 12.5px; color: #718096; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.atl-note { margin: 8px 0 0; font-size: 12px; color: #4A5568; line-height: 1.5; padding-left: 10px; border-left: 2px solid #F6AD55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.atl-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(160, 174, 192, .2); }
.atl-meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 12px; color: #A0AEC0; }
.atl-meta b { color: #4A5568; font-weight: 600; }
.atl-meta i { width: 3px; height: 3px; border-radius: 50%; background: #CBD5E0; }
html body .atl .at-actions { margin-top: 0 !important; opacity: 1; }

/* request number under the requester */
html body .at-req-code { display: block; margin-top: 3px; font-style: normal; font-size: 10.5px; font-weight: 600; color: var(--primary); letter-spacing: .02em; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
html body .at-req-tx { gap: 1px !important; }
html body .at-req-av { width: 32px !important; height: 32px !important; }
html body .at-table td.at-task .at-tags { margin-top: 6px; }
/* pills: fixed height + matching line-height so the label sits in the middle in any font */
html body .at-pill, html body .at-quote, html body .pu-badge, html body .workspace-tab-count, html body .status-pill {
  display: inline-block !important; vertical-align: middle; text-align: center; white-space: nowrap;
}
html body .at-pill, html body .at-quote { height: 22px !important; line-height: 23px !important; padding-top: 0 !important; padding-bottom: 0 !important; }
html body .at-quote { line-height: 21px !important; }
html body .pu-badge { height: 24px !important; line-height: 25px !important; padding-top: 0 !important; padding-bottom: 0 !important; }
@supports (text-box: trim-both cap alphabetic) {
  html body .at-pill, html body .at-quote, html body .pu-badge, html body .status-pill {
    text-box: trim-both cap alphabetic; height: auto !important; line-height: 1 !important;
  }
  html body .at-pill { padding-top: 7px !important; padding-bottom: 7px !important; }
  html body .at-quote { padding-top: 6px !important; padding-bottom: 6px !important; }
  html body .pu-badge { padding-top: 8px !important; padding-bottom: 8px !important; }
  html body .workspace-tab-count { text-box: trim-both cap alphabetic; height: auto !important; min-height: 0 !important; line-height: 1 !important; padding-top: 5px !important; padding-bottom: 5px !important; }
}

/* task table: everything in capitals */
html body .at-wrap:not(.atl), html body .at-wrap:not(.atl) * { text-transform: uppercase !important; }
html body .at-wrap:not(.atl) .at-sum-item, html body .at-wrap:not(.atl) .at-sum-total, html body .at-wrap:not(.atl) .at-sub, html body .at-wrap:not(.atl) .at-cat { letter-spacing: .03em; }

/* rows: every column starts on the same top line */
html body .at-table:not(.af-table) td, html body .af-table td { vertical-align: top !important; }
html body .at-table td.at-no { padding-top: 19px !important; }
html body .at-title { line-height: 1.45 !important; padding-top: 2px !important; }
html body .at-req-in { align-items: flex-start !important; }
html body .at-req-av { margin-top: -2px; }
html body .at-req-tx b { padding-top: 2px; }
html body .at-note-main, html body .at-note > small:first-child { padding-top: 3px; }
html body .at-owner { padding-top: 14px !important; }
html body .at-owner .at-av { vertical-align: middle; }
html body .at-files { padding-top: 12px !important; }
html body .at-end .at-date { padding-top: 3px; }
html body .at-end .at-actions { margin-top: 6px !important; }
html body .at-row td.at-task .at-tags { margin-top: 5px; }
html body .at-cat { display: inline-flex !important; align-items: center !important; line-height: 1 !important; gap: 6px !important; }
html body .at-cat i { flex: none; width: 7px !important; height: 7px !important; border-radius: 2px; }
/* summary line: one centre line */
html body .at-summary { align-items: center !important; line-height: 1 !important; }
html body .at-sum-total { align-items: center !important; gap: 7px !important; }
html body .at-sum-total b { font-size: 16px !important; line-height: 1 !important; }
html body .at-sum-item { line-height: 1 !important; }
html body .at-sum-item b { line-height: 1 !important; }
/* workspace tab: name and count on one centre line */
html body .workspace-tab-btn { align-items: center !important; }
html body .workspace-tab-name { line-height: 20px !important; }
html body .workspace-tab-count { display: inline-flex !important; align-items: center !important; justify-content: center; height: 20px !important; line-height: 1 !important; padding: 0 7px !important; text-box: none !important; font-variant-numeric: tabular-nums; }
@supports (text-box: trim-both cap alphabetic) {
  html body .workspace-tab-name { line-height: 1 !important; text-box: trim-both cap alphabetic !important; }
  html body .workspace-tab-count { display: inline-block !important; height: auto !important; line-height: 1 !important; padding: 5px 7px !important; text-box: trim-both cap alphabetic !important; }
  html body .workspace-tab-btn, html body .workspace-tab-info { align-items: center !important; }
}

/* vertical rhythm: status and requester blocks share one height with even gaps */
html body .at-table td { padding-top: 16px !important; padding-bottom: 16px !important; }
html body .at-status .at-st-top { height: 22px; align-items: center; }
html body .at-status .at-st-meta { margin-top: 8px !important; height: 14px; align-items: center !important; line-height: 14px !important; }
html body .at-status .at-st-meta .at-sub, html body .at-status .at-st-meta b { line-height: 14px !important; }
html body .at-status > .at-bar { margin-top: 8px !important; height: 5px !important; }
html body .at-req-in { align-items: flex-start !important; }
html body .at-req-av { margin-top: 0 !important; width: 36px !important; height: 36px !important; }
html body .at-req-tx { gap: 0 !important; }
html body .at-req-tx b { padding-top: 0 !important; line-height: 20px !important; }
html body .at-req-tx small { margin-top: 4px !important; line-height: 14px !important; }
html body .at-req-code { margin-top: 4px !important; line-height: 15px !important; }
html body .at-title { padding-top: 0 !important; line-height: 20px !important; }
html body .at-row td.at-task .at-tags { margin-top: 6px !important; }

/* requester + status lines: equal optical gaps (cap height to baseline), any font */
@supports (text-box: trim-both cap alphabetic) {
  html body .at-req-tx b, html body .at-req-tx small, html body .at-req-code,
  html body .at-status .at-st-meta .at-sub, html body .at-status .at-st-meta b {
    text-box: trim-both cap alphabetic !important; line-height: 1.35 !important;
  }
  html body .at-req-tx { display: flex !important; flex-direction: column !important; gap: 9px !important; padding-top: 6px; }
  html body .at-req-tx small, html body .at-req-code { margin-top: 0 !important; }
  /* trimmed lines keep their ellipsis but must not clip the glyphs: give the clip box room, cancel it in layout */
  html body .at-req-tx b, html body .at-req-tx small, html body .at-req-code,
  html body .at-status .at-st-meta .at-sub, html body .at-status .at-st-meta b {
    padding-top: 4px !important; padding-bottom: 4px !important; margin-top: -4px !important; margin-bottom: -4px !important;
  }
  html body .at-status .at-st-top { height: auto; }
  html body .at-status .at-st-meta { height: auto !important; margin-top: 9px !important; align-items: flex-end !important; line-height: 1 !important; }
  html body .at-status > .at-bar { margin-top: 9px !important; }
}

/* quotation: first number + count of the rest (all numbers in the tooltip) */
html body .at-quote { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
html body .at-quote-more { font-style: normal; margin-left: 5px; padding-left: 5px; border-left: 1px solid #FBD38D; color: #DD6B20; font-weight: 700; }
/* owner / files / date: room for two attachment chips, date and actions on one right edge */
html body .at-table:not(.af-table) th:nth-child(6) { width: 136px !important; }
html body .at-table:not(.af-table) th:nth-child(7) { width: 128px !important; }
html body .at-table:not(.af-table) th:nth-child(8) { width: 92px !important; }
html body .at-table td.at-files { white-space: nowrap; text-align: center; }
html body .at-table td.at-files .at-file { margin: 0 2px !important; vertical-align: top; }
html body .at-owner { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
html body .at-table td.at-end { text-align: right; }
html body .at-end .at-actions { justify-content: flex-end; }

/* date column: actions on top, date underneath */
html body .at-end.is-swapped .at-actions { display: inline-flex !important; margin-top: -3px !important; }
html body .at-end.is-swapped .at-date { display: block; margin-top: 10px !important; padding-top: 0 !important; }
`; var sc = document.getElementById('fxScaleCss'); if (sc) document.head.insertBefore(st, sc); else document.head.appendChild(st); })();

  /* ---------- Timeline view ---------- */
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function renderTimeline(container, items) {
    var groups = {}, order = [];
    items.forEach(function (it) {
      var d = new Date(it.completionDate || it.requestDate || it.createdAt);
      var key = isNaN(d) ? 'zz' : d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
      if (!groups[key]) { groups[key] = []; order.push(key); }
      groups[key].push(it);
    });
    order.sort().reverse();
    var cats = []; try { cats = categories; } catch (e) {}
    var html = '<div class="at-wrap atl">';
    if (!items.length) html += '<div class="at-empty"><b>No tasks match your filters</b><span>Try another search or reset the filters.</span></div>';
    order.forEach(function (key) {
      var label = key === 'zz' ? 'No date' : MONTHS[parseInt(key.slice(5), 10) - 1] + ' ' + key.slice(0, 4);
      html += '<section class="atl-group"><header class="atl-head"><h4>' + label + '</h4><span>' + groups[key].length + ' tasks</span></header><div class="atl-list">';
      groups[key].forEach(function (it) {
        var s = st(it), id = js(it.id);
        var cat = (cats || []).find(function (c) { return c.id === it.categoryId; }) || { name: 'General', color: '#A0AEC0' };
        var note = clean(it.note && it.note !== '-' ? it.note : ''), desc = clean(it.description || '');
        var quote = clean(it.quotation || ''); if (quote === '-') quote = '';
        var meta = [];
        meta.push('<span>' + fmtDate(it.completionDate || it.requestDate) + '</span>');
        if (it.requestName) meta.push('<span>Requested by <b>' + esc(up(it.requestName)) + '</b></span>');
        if (it.assignee) meta.push('<span>Owner <b>' + esc(up(it.assignee)) + '</b></span>');
        html += '<article class="atl-item is-' + s + '"><span class="atl-dot"></span><div class="atl-card">' +
          '<div class="atl-top"><button type="button" class="atl-title" onclick="viewAchievementDetail(\'' + id + '\')">' + esc(up(it.title || '-')) + '</button>' +
            '<span class="at-pill is-' + s + '">' + LABEL[s] + '</span></div>' +
          '<div class="at-tags">' + (it.code ? '<span class="at-code">' + esc(up(it.code)) + '</span>' : '') +
            (quote ? '<span class="at-quote">Q: ' + esc(up(quote)) + '</span>' : '') +
            '<span class="at-cat"><i style="background:' + esc(cat.color || '#A0AEC0') + '"></i>' + esc(clean(up(cat.name))) + '</span></div>' +
          (desc ? '<p class="atl-desc">' + esc(up(desc)) + '</p>' : '') +
          (note ? '<p class="atl-note">' + esc(up(note)) + '</p>' : '') +
          '<div class="atl-foot"><div class="atl-meta">' + meta.join('<i></i>') + '</div>' +
            '<span class="at-actions"><button type="button" class="at-icon" onclick="openAchievementModal(\'' + id + '\')" title="Edit">' + ICON.edit + '</button>' +
            '<button type="button" class="at-icon is-danger" onclick="deleteAchievement(\'' + id + '\')" title="Delete">' + ICON.del + '</button></span></div>' +
          '</div></article>';
      });
      html += '</div></section>';
    });
    container.innerHTML = html + '</div>';
  }
  var orig = window.renderTableView;
  if (typeof orig === 'function') {
    window.renderTableView = function (container, items) {
      var priv = false, mode = 'compact';
      try { priv = isPrivateProjectWorkspace(currentWorkspaceId); } catch (e) {}
      try { mode = tableMode; } catch (e) {}
      if (priv) return orig.apply(this, arguments);
      if (mode !== 'compact') renderFull(container, items || []); else render(container, items || []);
    };
    try { if (typeof currentView !== 'undefined' && currentView === 'table') renderContent(); } catch (e) {}
  }
  var origTl = window.renderTimelineView;
  if (typeof origTl === 'function') {
    window.renderTimelineView = function (container, items) {
      var priv = false; try { priv = isPrivateProjectWorkspace(currentWorkspaceId); } catch (e) {}
      renderTimeline(container, items || []);
    };
    try { if (typeof currentView !== 'undefined' && currentView === 'timeline') renderContent(); } catch (e) {}
  }
})();
