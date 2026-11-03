/* ==========================================================================
   ACHIEVEMENT RECORD — Dashboard statistics, Purity UI (Chakra) layout
   Reads the app's own data (achievements, categories, currentWorkspaceId) and
   calls the app's existing filter / detail functions, so every click does the
   same thing the old dashboard did. Previous detailed insights remain behind
   "View detailed insights".
   ========================================================================== */
(function () {
  'use strict';

  var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  var MONTHS_TH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var state = { year: null, legacy: false, side: 'category', moreReq: false };
  try { state.legacy = localStorage.getItem('fx_show_legacy_insights') === '1'; } catch (e) {}

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function jsArg(s) { return esc(String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")); }
  function up(s) { try { return typeof uppercaseEnglish === 'function' ? uppercaseEnglish(s) : String(s).toUpperCase(); } catch (e) { return String(s).toUpperCase(); } }
  function stripEmoji(s) {
    return String(s || '').replace(/[☀-➿⬀-⯿️‍]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDC00-\uDEFF]/g, '').trim();
  }
  function statusOf(it) {
    var s = it.status || 'wait';
    if (s === 'done') return 'done';
    if (s === 'in_progress') return 'in_progress';
    if (s === 'cancel' || s === 'cancle') return 'cancel';
    return 'wait';
  }
  function dateOf(v) { if (!v) return null; var d = new Date(v); return isNaN(d.getTime()) ? null : d; }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function fmtDate(d) { return d ? (d.getDate() + ' ' + MONTHS_TH[d.getMonth()] + ' ' + d.getFullYear()) : '-'; }
  function initials(name) {
    var clean = stripEmoji(name).replace(/\(.*?\)/g, '').trim();
    var parts = clean.split(/[\s./&+,-]+/).filter(function (w) { return /[A-Za-z0-9฀-๿]/.test(w); });
    if (!parts.length) return '–';
    var a = parts[0].charAt(0), b = parts.length > 1 ? parts[1].charAt(0) : (parts[0].charAt(1) || '');
    return (a + b).toUpperCase();
  }
  var TINTS = ['#4FD1C5', '#4299E1', '#9F7AEA', '#F6AD55', '#68D391', '#ED64A6', '#2D3748'];
  function tint(name) { var h = 0, s = String(name || ''); for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return TINTS[h % TINTS.length]; }
  function getItems() { try { return getWorkspaceAchievements(); } catch (e) { return []; } }
  function getCats() { try { return Array.isArray(categories) && categories.length ? categories : DEFAULT_CATEGORIES; } catch (e) { return []; } }
  function counts(items) {
    var c = { total: items.length, done: 0, in_progress: 0, wait: 0, cancel: 0 };
    items.forEach(function (it) { c[statusOf(it)]++; });
    return c;
  }
  function group(items, keyFn) {
    var map = {};
    items.forEach(function (it) {
      var k = keyFn(it); if (!k) return;
      if (!map[k.key]) map[k.key] = { key: k.key, name: k.name, total: 0, done: 0, in_progress: 0, wait: 0, cancel: 0, people: {} };
      var g = map[k.key]; g.total++; g[statusOf(it)]++;
      var rq = String(it.requestName || '').trim(); if (rq && rq !== '-') g.people[up(rq)] = (g.people[up(rq)] || 0) + 1;
    });
    return Object.keys(map).map(function (k) { return map[k]; });
  }
  function fieldKey(raw) {
    var v = up(String(raw || '').trim());
    if (!v || v === '-') return { key: '__UNSPECIFIED__', name: 'Unspecified' };
    return { key: v, name: v };
  }
  function monthly(items, year, field, pred) {
    var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    items.forEach(function (it) {
      if (pred && !pred(it)) return;
      var d = field === 'completed' ? dateOf(it.completionDate) : (dateOf(it.requestDate) || dateOf(it.completionDate));
      if (d && d.getFullYear() === year) arr[d.getMonth()]++;
    });
    return arr;
  }
  function inMonth(d, y, m) { return d && d.getFullYear() === y && d.getMonth() === m; }
  var DAY = 86400000;
  function inLastDays(d, from, to) { if (!d) return false; var age = (Date.now() - d.getTime()) / DAY; return age >= from && age < to; }

  /* ---------- icons (Ionicons-style, 24px grid) ---------- */
  var I = {
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" fill="currentColor"/><path d="M14 3v5h5" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/>',
    check: '<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M8 12.4l2.6 2.6L16.2 9.4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    bolt: '<path d="M13.5 2L5 13.5h6L10 22l9-12h-6.2z" fill="currentColor"/>',
    clock: '<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M12 7.5V12l3 2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    x: '<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M9 9l6 6M15 9l-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    arrow: '<path d="M5 12h13M13 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    caret: '<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    flag: '<path d="M5 21V4h11l-2 4 2 4H5" fill="currentColor"/>',
    checkO: '<path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    clockO: '<circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 7.6V12l3 2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    xO: '<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>'
  };
  function icon(name, size) { return '<svg width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" aria-hidden="true">' + I[name] + '</svg>'; }
  var STATUS_META = {
    done: { label: 'Done', icon: 'check', box: 'checkO', color: '#48BB78' },
    in_progress: { label: 'In progress', icon: 'bolt', box: 'bolt', color: '#4299E1' },
    wait: { label: 'Pending', icon: 'clock', box: 'clockO', color: '#F6AD55' },
    cancel: { label: 'Cancelled', icon: 'x', box: 'xO', color: '#A0AEC0' }
  };

  /* ---------- 1. stat cards ---------- */
  function statCards(items, c) {
    var newThis = 0, newPrev = 0, doneThis = 0;
    items.forEach(function (it) {
      var rd = dateOf(it.requestDate), cd = dateOf(it.completionDate);
      if (inLastDays(rd, -1, 30)) newThis++;
      if (inLastDays(rd, 30, 60)) newPrev++;
      if (statusOf(it) === 'done' && inLastDays(cd, -1, 30)) doneThis++;
    });
    var active = c.total - c.cancel;
    var cards = [
      { label: 'Total tasks', value: c.total, delta: '+' + newThis, good: true, note: 'new in 30 days', icon: 'doc', click: "filterByStatusPill('all')" },
      { label: 'Done', value: c.done, delta: '+' + doneThis, good: true, note: 'closed in 30 days', icon: 'checkO', click: "filterByStatusPill('done')" },
      { label: 'In progress', value: c.in_progress, delta: pct(c.in_progress, c.in_progress + c.wait) + '%', good: true, note: 'of open tasks', icon: 'bolt', click: "filterByStatusPill('in_progress')" },
      { label: 'Pending', value: c.wait, delta: (newThis - newPrev >= 0 ? '+' : '') + (newThis - newPrev), good: newThis - newPrev <= 0, note: 'vs prior 30 days', icon: 'clockO', click: "filterByStatusPill('wait')" }
    ];
    return '<div class="pu-stats">' + cards.map(function (k) {
      return '<button type="button" class="pu-card pu-stat" onclick="' + k.click + '" title="Click to filter the task list">' +
        '<span class="pu-stat-text"><span class="pu-stat-label">' + k.label + '</span>' +
        '<span class="pu-stat-value">' + k.value + '</span>' +
        '<span class="pu-stat-meta"><em class="' + (k.good ? 'up' : 'down') + '">' + esc(k.delta) + '</em> ' + k.note + '</span></span>' +
        '<span class="pu-icon-box">' + icon(k.icon, 22) + '</span></button>';
    }).join('') + '</div>';
  }

  /* ---------- 2. completion + latest ---------- */
  function bigCards(items, c, ws) {
    var active = c.total - c.cancel, rate = pct(c.done, active);
    var latest = items.filter(function (it) { return statusOf(it) === 'done'; })
      .sort(function (a, b) { return (dateOf(b.completionDate || b.updatedAt) || 0) - (dateOf(a.completionDate || a.updatedAt) || 0); })[0];
    var order = ['done', 'in_progress', 'wait', 'cancel'];
    var seg = order.map(function (k) {
      var w = c.total ? (c[k] / c.total * 100) : 0;
      return w ? '<span class="pu-seg-' + k + '" style="width:' + w + '%" title="' + STATUS_META[k].label + ': ' + c[k] + '"></span>' : '';
    }).join('');
    var cols = order.map(function (k) {
      return '<button type="button" class="pu-lg" onclick="filterByStatusPill(\'' + k + '\')" title="Filter: ' + STATUS_META[k].label + '">' +
        '<span class="pu-lg-top"><i class="pu-dot pu-seg-' + k + '"></i>' + STATUS_META[k].label + '</span>' +
        '<span class="pu-lg-val"><b>' + c[k] + '</b><small>' + pct(c[k], c.total) + '%</small></span></button>';
    }).join('');
    var left = '<div class="pu-card pu-completion">' +
      '<div class="pu-card-head"><div><h3 class="pu-title">Completion</h3><p class="pu-sub">Excludes cancelled tasks</p></div>' +
      '<button type="button" class="pu-text-link" onclick="desktopNavigateTo(\'tasks\')">View records ' + icon('arrow', 14) + '</button></div>' +
      '<div class="pu-comp-hero"><span class="pu-comp-num">' + rate + '<small>%</small></span>' +
      '<span class="pu-comp-cap"><b>' + c.done + '</b> of ' + active + ' tasks done</span></div>' +
      '<div class="pu-stack" aria-hidden="true">' + seg + '</div>' +
      '<div class="pu-lg-row">' + cols + '</div></div>';
    var recent = items.filter(function (it) { return statusOf(it) === 'done'; })
      .sort(function (a, b) { return (dateOf(b.completionDate || b.updatedAt) || 0) - (dateOf(a.completionDate || a.updatedAt) || 0); }).slice(0, 4);
    var list = recent.map(function (it) {
      var d = dateOf(it.completionDate || it.updatedAt);
      var meta = [up(String(it.department || '').trim()), fmtDate(d)].filter(function (x) { return x && x !== '-'; }).join(' · ');
      return '<button type="button" class="pu-rc-row" onclick="viewAchievementDetail(\'' + jsArg(it.id) + '\')" title="View task details">' +
        '<span class="pu-rc-ico">' + icon('checkO', 14) + '</span>' +
        '<span class="pu-rc-text"><b>' + esc(stripEmoji(up(it.title || '-'))) + '</b><small>' + esc(meta) + '</small></span>' +
        '<span class="pu-rc-go">' + icon('arrow', 14) + '</span></button>';
    }).join('');
    var right = '<div class="pu-card pu-recent">' +
      '<div class="pu-card-head"><div><h3 class="pu-title">Recently completed</h3><p class="pu-sub">Latest ' + recent.length + ' finished tasks</p></div>' +
      '<button type="button" class="pu-text-link" onclick="filterByStatusPill(\'done\')">View all ' + icon('arrow', 14) + '</button></div>' +
      '<div class="pu-rc-list">' + (list || '<p class="pu-dim">No completed tasks yet</p>') + '</div></div>';
    return '<div class="pu-row pu-row-big">' + left + right + '</div>';
  }

  /* ---------- 3. analytics ---------- */
  function yearsOf(items) {
    var ys = {}; items.forEach(function (it) { var d = dateOf(it.requestDate) || dateOf(it.completionDate); if (d) ys[d.getFullYear()] = 1; });
    var l = Object.keys(ys).map(Number).sort(); return l.length ? l : [new Date().getFullYear()];
  }
  function niceTop(max) {
    var step = max <= 5 ? 1 : max <= 10 ? 2 : max <= 25 ? 5 : max <= 50 ? 10 : Math.ceil(max / 5 / 10) * 10;
    return { top: Math.max(step, Math.ceil(max / step) * step), step: step };
  }
  function activeUsersCard(items, c) {
    var y = state.year, req = monthly(items, y, 'requested');
    var a30 = 0, b30 = 0;
    items.forEach(function (it) { var d = dateOf(it.requestDate); if (inLastDays(d, -1, 30)) a30++; else if (inLastDays(d, 30, 60)) b30++; });
    var diff = a30 - b30, total = req.reduce(function (a, b) { return a + b; }, 0);
    var t = niceTop(Math.max.apply(null, req.concat([1])));
    var ticks = []; for (var v = t.top; v >= 0; v -= t.step) ticks.push(v);
    var maxN = Math.max.apply(null, req), nowY = new Date().getFullYear(), nowM = (y === nowY) ? new Date().getMonth() : -1;
    var top = Math.max(1, maxN) * 1.18;
    var bars = req.map(function (n, i) {
      var h = n / top * 100, cls = 'pu-wbar' + (n === maxN && n > 0 ? ' is-peak' : '') + (i === nowM ? ' is-now' : '') + (n === 0 ? ' is-zero' : '');
      return '<div class="' + cls + '" title="' + MONTHS[i] + ' ' + y + ': ' + n + ' tasks">' +
        '<div class="pu-wbar-track"><span class="pu-wbar-fill" style="height:' + h + '%"></span>' +
        '<span class="pu-wbar-val" style="bottom:calc(' + h + '% + 6px)">' + n + '</span></div>' +
        '<em>' + MONTHS[i].charAt(0) + MONTHS[i].slice(1, 3).toLowerCase() + '</em></div>';
    }).join('');
    var peakIdx = req.indexOf(maxN);
    return '<div class="pu-card pu-active">' +
      '<div class="pu-card-head"><div><h3 class="pu-title">Monthly requests</h3>' +
      '<p class="pu-sub"><b class="' + (diff >= 0 ? 'up' : 'down') + '">' + (diff >= 0 ? '+' : '') + diff + '</b> vs previous 30 days</p></div>' +
      '<span class="pu-pill">' + total + ' in ' + y + '</span></div>' +
      '<div class="pu-dark-chart pu-dark-chart-v"><div class="pu-wbars">' + bars + '</div>' +
      '<div class="pu-dark-foot"><span>Peak <b>' + (maxN > 0 ? MONTHS[peakIdx].charAt(0) + MONTHS[peakIdx].slice(1, 3).toLowerCase() + ' · ' + maxN : '–') + '</b></span>' +
      '<span>Avg <b>' + (Math.round(total / 12 * 10) / 10) + '</b> / month</span></div></div></div>';
  }
  function smoothPath(pts) {
    var d = 'M' + pts[0][0] + ',' + pts[0][1];
    for (var i = 1; i < pts.length; i++) {
      var p0 = pts[i - 1], p1 = pts[i], cx = (p0[0] + p1[0]) / 2;
      d += ' C' + cx + ',' + p0[1] + ' ' + cx + ',' + p1[1] + ' ' + p1[0] + ',' + p1[1];
    }
    return d;
  }
  function overviewCard(items) {
    var y = state.year, years = yearsOf(items);
    var req = monthly(items, y, 'requested'), done = monthly(items, y, 'completed', function (it) { return statusOf(it) === 'done'; });
    var totalDone = done.reduce(function (a, b) { return a + b; }, 0);
    var t = niceTop(Math.max.apply(null, req.concat(done, [1])));
    var W = 600, H = 220, padT = 8;
    function pts(arr) { return arr.map(function (v, i) { return [i * (W / 11), padT + (H - padT) * (1 - v / t.top)]; }); }
    var pr = pts(req), pd = pts(done);
    var lr = smoothPath(pr), ld = smoothPath(pd);
    var grid = ''; var ticks = [];
    for (var v = t.top; v >= 0; v -= t.step) { var yy = padT + (H - padT) * (1 - v / t.top); grid += '<line x1="0" x2="' + W + '" y1="' + yy + '" y2="' + yy + '"/>'; ticks.push(v); }
    var opts = years.map(function (yr) { return '<option value="' + yr + '"' + (yr === y ? ' selected' : '') + '>' + yr + '</option>'; }).join('');
    return '<div class="pu-card pu-overview">' +
      '<div class="pu-card-head"><div><h3 class="pu-title">Monthly overview</h3><p class="pu-sub"><b class="up">+' + totalDone + '</b> completed in ' + y + '</p></div>' +
      '<div class="pu-legend"><span><i class="teal"></i>Requested</span><span><i class="ink"></i>Done</span>' +
      '<label class="pu-select"><select onchange="fxDashSet(\'year\', this.value)" aria-label="Choose year">' + opts + '</select>' + icon('caret', 12) + '</label></div></div>' +
      '<div class="pu-line-wrap"><div class="pu-line-axis">' + ticks.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' +
      '<div class="pu-line-plot"><svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-label="Monthly requested and completed tasks">' +
      '<defs><linearGradient id="puTeal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--primary,#4FD1C5)" stop-opacity=".55"/><stop offset="1" style="stop-color:var(--primary,#4FD1C5)" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="puInk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2D3748" stop-opacity=".22"/><stop offset="1" stop-color="#2D3748" stop-opacity="0"/></linearGradient></defs>' +
      '<g class="pu-grid">' + grid + '</g>' +
      '<path d="' + ld + ' L' + W + ',' + H + ' L0,' + H + 'Z" fill="url(#puInk)"/>' +
      '<path d="' + lr + ' L' + W + ',' + H + ' L0,' + H + 'Z" fill="url(#puTeal)"/>' +
      '<path d="' + ld + '" fill="none" stroke="#2D3748" stroke-width="2.5" vector-effect="non-scaling-stroke"/>' +
      '<path d="' + lr + '" fill="none" style="stroke:var(--primary,#4FD1C5)" stroke-width="2.5" vector-effect="non-scaling-stroke"/>' +
      '</svg><div class="pu-hit">' + req.map(function (n, i) { return '<span title="' + MONTHS[i] + ' ' + y + ' · requested ' + n + ' · done ' + done[i] + '"></span>'; }).join('') + '</div>' +
      '<div class="pu-line-x">' + MONTHS.map(function (mm) { return '<span>' + mm.charAt(0) + mm.slice(1).toLowerCase() + '</span>'; }).join('') + '</div></div></div></div>';
  }

  /* ---------- 4. departments table + timeline ---------- */
  function deptTable(items) {
    var doneThisMonth = items.filter(function (it) { return statusOf(it) === 'done' && inLastDays(dateOf(it.completionDate), -1, 30); }).length;
    var list = group(items, function (it) { var k = fieldKey(it.department); return k; })
      .sort(function (a, b) { return (a.key === '__UNSPECIFIED__') - (b.key === '__UNSPECIFIED__') || b.total - a.total; }).slice(0, 7);
    var rows = list.map(function (g) {
      var active = g.total - g.cancel, p = pct(g.done, active), col = tint(g.name);
      var people = Object.keys(g.people).sort(function (a, b) { return g.people[b] - g.people[a]; });
      var av = people.slice(0, 4).map(function (n) { return '<span class="pu-av" style="background:' + tint(n) + '" title="' + esc(n) + '">' + esc(initials(n)) + '</span>'; }).join('') +
        (people.length > 4 ? '<span class="pu-av more">+' + (people.length - 4) + '</span>' : '');
      return '<tr onclick="filterFromInsightsField(\'department\',\'' + jsArg(g.key) + '\',\'DEPARTMENT: ' + jsArg(g.name) + '\')" title="Click to filter this department">' +
        '<td><span class="pu-co"><span class="pu-co-ico" style="color:' + col + ';background:' + col + '1F">' + esc(initials(g.name)) + '</span>' + esc(g.name) + '</span></td>' +
        '<td><span class="pu-avs">' + (av || '<span class="pu-dim">-</span>') + '</span></td>' +
        '<td class="pu-num">' + g.total + ' tasks</td>' +
        '<td><span class="pu-comp"><b>' + p + '%</b><span class="pu-comp-bar"><span style="width:' + p + '%"></span></span></span></td></tr>';
    }).join('');
    return '<div class="pu-card pu-projects"><div class="pu-card-head"><div><h3 class="pu-title">Requesting departments</h3>' +
      '<p class="pu-sub"><span class="pu-ok">' + icon('check', 15) + '</span><b>' + doneThisMonth + ' completed</b> in the last 30 days</p></div></div>' +
      '<div class="pu-table-wrap"><table class="pu-table"><thead><tr><th>Department</th><th>Requester</th><th>Tasks</th><th>Completion</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
  }
  function timelineCard(items) {
    var list = items.slice().sort(function (a, b) {
      return (dateOf(b.updatedAt) || dateOf(b.completionDate) || dateOf(b.requestDate) || 0) - (dateOf(a.updatedAt) || dateOf(a.completionDate) || dateOf(a.requestDate) || 0);
    }).slice(0, 6);
    var newThis = items.filter(function (it) { return inLastDays(dateOf(it.requestDate), -1, 30); }).length;
    var body = list.map(function (it) {
      var s = statusOf(it), meta = STATUS_META[s];
      var d = dateOf(it.updatedAt) || dateOf(it.completionDate) || dateOf(it.requestDate);
      var time = d ? (fmtDate(d) + (it.updatedAt ? ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') : '')) : '-';
      return '<button type="button" class="pu-tl-item" onclick="viewAchievementDetail(\'' + jsArg(it.id) + '\')" title="View task details">' +
        '<span class="pu-tl-dot" style="color:' + meta.color + '">' + icon(meta.icon, 16) + '</span>' +
        '<span class="pu-tl-text"><b>' + esc(stripEmoji(up(it.title || '-'))) + '</b><small>' + meta.label + ' · ' + esc(time) + '</small></span></button>';
    }).join('');
    return '<div class="pu-card pu-timeline"><div class="pu-card-head"><div><h3 class="pu-title">Recent activity</h3>' +
      '<p class="pu-sub"><b class="up">+' + newThis + '</b> new requests in the last 30 days</p></div></div><div class="pu-tl">' + body + '</div></div>';
  }

  /* ---------- 5. requesters table + category / factory ---------- */
  function requesterTable(items, avgRate) {
    var list = group(items, function (it) {
      var raw = String(it.requestName || '').trim(); if (!raw || raw === '-') return null;
      var n = up(raw); return { key: n, name: n };
    });
    var deptOf = {};
    items.forEach(function (it) { var n = up(String(it.requestName || '').trim()); if (n && it.department && !deptOf[n]) deptOf[n] = up(it.department); });
    list.sort(function (a, b) { return b.total - a.total || b.done - a.done; });
    var shown = state.moreReq ? list : list.slice(0, 6);
    var rows = shown.map(function (g) {
      var active = g.total - g.cancel, rate = active ? g.done / active : 0, open = g.in_progress + g.wait;
      return '<tr onclick="filterByRequester(\'' + jsArg(g.name) + '\')" title="Click to filter tasks of ' + esc(g.name) + '">' +
        '<td><span class="pu-author"><span class="pu-av lg" style="background:' + tint(g.name) + '">' + esc(initials(g.name)) + '</span><span><b>' + esc(g.name) + '</b><small>' + esc(deptOf[g.name] || '-') + '</small></span></span></td>' +
        '<td><b>' + g.total + ' tasks</b><small>done ' + g.done + ' · open ' + open + '</small></td>' +
        '<td><span class="pu-badge ' + (open ? 'on' : 'off') + '">' + (open ? 'Open tasks' : 'All closed') + '</span></td>' +
        '<td class="pu-num">' + pct(g.done, active) + '% <span class="pu-arrow ' + (rate >= avgRate ? 'up' : 'down') + '">' + (rate >= avgRate ? '▲' : '▼') + '</span></td></tr>';
    }).join('');
    var more = list.length > 6 ? '<button type="button" class="pu-more" onclick="fxDashSet(\'moreReq\',' + (!state.moreReq) + ')">' + (state.moreReq ? 'Show less' : 'View all ' + list.length + ' people') + '</button>' : '';
    return '<div class="pu-card pu-authors"><div class="pu-card-head"><div><h3 class="pu-title">Top requesters</h3><p class="pu-sub">Sorted by requests · ▲ ▼ vs average completion</p></div></div>' +
      '<div class="pu-table-wrap"><table class="pu-table"><thead><tr><th>Requester</th><th>Tasks</th><th>Status</th><th>% done</th></tr></thead><tbody>' + rows + '</tbody></table></div>' + more + '</div>';
  }
  function sideCard(items) {
    var total = items.length, rows;
    if (state.side === 'factory') {
      rows = group(items, function (it) { return fieldKey(it.factory); })
        .sort(function (a, b) { return (a.key === '__UNSPECIFIED__') - (b.key === '__UNSPECIFIED__') || b.total - a.total; })
        .map(function (g) {
          var col = tint(g.name);
          return { name: g.name, n: g.total, color: col, click: "filterFromInsightsField('factory','" + jsArg(g.key) + "','FACTORY: " + jsArg(g.name) + "')" };
        });
    } else {
      rows = getCats().map(function (cat) {
        var n = items.filter(function (it) { return it.categoryId === cat.id; }).length;
        return { name: stripEmoji(up(cat.name)), n: n, color: cat.color || '#4FD1C5', click: "fxDashFilterCategory('" + jsArg(cat.id) + "')" };
      }).filter(function (r) { return r.n > 0; }).sort(function (a, b) { return b.n - a.n; });
    }
    var body = rows.map(function (r) {
      var share = pct(r.n, total);
      return '<button type="button" class="pu-share" onclick="' + r.click + '"><span class="pu-co-ico" style="color:' + r.color + ';background:' + r.color + '1F">' + esc(initials(r.name)) + '</span>' +
        '<span class="pu-share-main"><span class="pu-share-top"><b>' + esc(r.name) + '</b><span>' + r.n + ' tasks · ' + share + '%</span></span>' +
        '<span class="pu-comp-bar"><span style="width:' + Math.max(share, 2) + '%;background:' + r.color + '"></span></span></span></button>';
    }).join('') || '<p class="pu-dim">No data yet</p>';
    return '<div class="pu-card pu-side"><div class="pu-card-head"><div><h3 class="pu-title">Task share</h3><p class="pu-sub">' + total + ' tasks on this page</p></div>' +
      '<div class="pu-seg"><button type="button" class="' + (state.side === 'category' ? 'on' : '') + '" onclick="fxDashSet(\'side\',\'category\')">Category</button>' +
      '<button type="button" class="' + (state.side === 'factory' ? 'on' : '') + '" onclick="fxDashSet(\'side\',\'factory\')">Factory</button></div></div>' +
      '<div class="pu-share-list">' + body + '</div></div>';
  }

  /* ---------- render ---------- */
  function render() {
    var main = document.querySelector('main.container');
    if (!main) return;
    var host = document.getElementById('fxDashboard');
    if (!host) {
      host = document.createElement('section');
      host.id = 'fxDashboard'; host.className = 'pu';
      host.setAttribute('aria-label', 'Overview statistics');
      main.insertBefore(host, document.querySelector('.analytics-section') || document.getElementById('controlsBar'));
    }
    var items = getItems(), c = counts(items), ws = {};
    try { ws = getWorkspaceById(currentWorkspaceId) || {}; } catch (e) {}
    var years = yearsOf(items), nowY = new Date().getFullYear();
    if (!state.year || years.indexOf(state.year) === -1) state.year = years.indexOf(nowY) !== -1 ? nowY : years[years.length - 1];
    var activeN = c.total - c.cancel, avgRate = activeN ? c.done / activeN : 0;

    host.innerHTML =
      '<div class="pu-head"><div><h2>Overview</h2><p>' + esc(stripEmoji(up(ws.name || ''))) + ' · ' + items.length + ' tasks · updated ' + esc(fmtDate(new Date())) + '</p></div>' +
      '<button type="button" class="pu-text-link" onclick="fxDashToggleLegacy()">' + (state.legacy ? 'Hide detailed insights' : 'View detailed insights') + ' ' + icon('arrow', 14) + '</button></div>' +
      (items.length
        ? statCards(items, c) + bigCards(items, c, ws) +
          '<div class="pu-row pu-row-analytics">' + activeUsersCard(items, c) + overviewCard(items) + '</div>' +
          '<div class="pu-row pu-row-content">' + deptTable(items) + timelineCard(items) + '</div>' +
          '<div class="pu-row pu-row-content">' + requesterTable(items, avgRate) + sideCard(items) + '</div>'
        : '<div class="pu-card pu-empty"><h3 class="pu-title">No tasks on this page yet</h3><p class="pu-sub">Add your first task to see statistics</p><button type="button" class="pu-btn" onclick="openAchievementModal()">Add task</button></div>');
    document.body.classList.toggle('fx-show-legacy', !!state.legacy);
  }

  function scrollToList() {
    if (window.innerWidth <= 768) { try { switchMobileNavTab('tasks'); } catch (e) {} return; }
    var bar = document.getElementById('controlsBar'); if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.fxDashSet = function (k, v) { if (k === 'year') v = Number(v); state[k] = v; render(); };
  window.fxDashToggleLegacy = function () {
    state.legacy = !state.legacy;
    try { localStorage.setItem('fx_show_legacy_insights', state.legacy ? '1' : '0'); } catch (e) {}
    render();
    if (state.legacy) {
      try { renderCharts(); renderEngineeringInsightsDashboard(); renderRequesterRanking(); } catch (e) {}
      var a = document.querySelector('.analytics-section'); if (a) a.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  window.fxDashFilterCategory = function (id) {
    try {
      currentCategoryFilter = (currentCategoryFilter === id) ? 'all' : id;
      var sel = document.getElementById('categoryFilter'); if (sel) sel.value = currentCategoryFilter;
      if (typeof updateResetFilterButtonVisibility === 'function') updateResetFilterButtonVisibility();
      renderContent();
      if (typeof showToast === 'function') showToast(currentCategoryFilter === 'all' ? 'Category filter cleared' : 'Category filter applied');
    } catch (e) {}
    scrollToList();
  };

  function wrap(name, after) {
    var orig = window[name];
    if (typeof orig !== 'function' || orig.__fxWrapped) return;
    var w = function () { var r = orig.apply(this, arguments); try { after.apply(this, arguments); } catch (e) { console.warn('fxDashboard', e); } return r; };
    w.__fxWrapped = true; window[name] = w;
  }
  function fixBrand() {
    ['topStripWorkspaceSub', 'murataHeroTitle'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), n;
      while ((n = walker.nextNode())) if (n.nodeValue.indexOf('ACHIEVEMENT RECORD') !== -1) n.nodeValue = n.nodeValue.replace(/ACHIEVEMENT RECORD/g, 'ACRE');
    });
  }

  /* ---------- account menu ---------- */
  function buildAccountMenu() {
    var head = document.querySelector('#authUserDropdown .auth-dropdown-header');
    if (!head) return;
    var u = null; try { u = currentUser; } catch (e) {}
    var name = u ? up(u.name || '') : 'GUEST';
    var role = u ? up(u.role || 'MEMBER') : 'PUBLIC VIEW';
    var id = u ? (u.empId || String(u.id || '').replace('usr_', '') || '-') : '-';
    var co = u ? stripEmoji(up(u.company || 'ORBRAY')) : '-';
    var ac = document.getElementById('fxAcct');
    if (!ac) { ac = document.createElement('div'); ac.id = 'fxAcct'; ac.className = 'fx-acct'; head.insertBefore(ac, head.firstChild); }
    ac.innerHTML = '<div class="fx-acct-top"><span class="fx-acct-av">' + esc(initials(name)) + '</span>' +
      '<span class="fx-acct-id"><b>' + esc(name) + '</b><span class="fx-acct-role' + (role === 'ADMIN' ? ' is-admin' : '') + '">' + esc(role) + '</span></span></div>' +
      '<dl class="fx-acct-meta"><dt>EMPLOYEE ID</dt><dd>' + esc(id) + '</dd><dt>COMPANY</dt><dd>' + esc(co) + '</dd><dt>PIN</dt><dd>•••••</dd></dl>';
  }
  function init() {
    wrap('updateWorkspaceBrandingUI', fixBrand);
    wrap('updateAuthHeaderUI', buildAccountMenu);
    buildAccountMenu();
    fixBrand();
    wrap('renderStats', render);
    wrap('switchMobileNavTab', function (tab) { document.body.setAttribute('data-fx-tab', tab === 'analytics' ? 'dashboard' : (tab || 'dashboard')); });
    if (window.innerWidth <= 768 && !document.body.hasAttribute('data-fx-tab')) document.body.setAttribute('data-fx-tab', 'dashboard');
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
  else setTimeout(init, 0);
})();
