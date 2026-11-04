/* ==========================================================================
   ACHIEVEMENT RECORD — Dashboard statistics, Purity UI (Chakra) layout
   Reads the app's own data (achievements, categories, currentWorkspaceId) and
   calls the app's existing filter / detail functions, so every click does the
   same thing the old dashboard did. Previous detailed insights remain behind
   "View detailed insights".
   ========================================================================== */
(function () {
  'use strict';

  var MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
    wait: { label: 'Pending', icon: 'clock', box: 'clockO', color: '#E53E3E' },
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
      '<span class="pu-comp-cap"><b>' + c.done + '<em> / ' + active + '</em></b><small>Tasks completed</small></span></div>' +
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
      '</div>' +
      '<div class="pu-dark-chart pu-dark-chart-v"><div class="pu-wbars">' + bars + '</div>' +
      '<div class="pu-dark-foot">' + '<div class="pu-fs"><span>Total ' + y + '</span><b>' + total + '</b></div>' + '<div class="pu-fs"><span>Top month</span><b>' + (maxN > 0 ? ['January','February','March','April','May','June','July','August','September','October','November','December'][peakIdx] : '–') + '</b></div>' +
      '<div class="pu-fs"><span>Average</span><b>' + (Math.round(total / 12 * 10) / 10) + ' <small>/ month</small></b></div></div></div></div>';
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
      '<div class="pu-head"><div><h2>Overview</h2><p>' + items.length + ' tasks · updated ' + esc(fmtDate(new Date())) + '</p></div>' +
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
  function injectCss() {
    if (document.getElementById('fxDashCriticalCss')) return;
    var st = document.createElement('style'); st.id = 'fxDashCriticalCss';
    st.textContent = `
/* ==========================================================================
   LAYER 5 — header & dashboard balance pass
   ========================================================================== */
/* page title: name only, actions pinned right */
html body .murata-hero-title span { display: none !important; }
@media (min-width: 769px) {
  html body .murata-hero-card, html body .murata-hero-content { width: 100% !important; max-width: none !important; }
  html body .murata-hero-content { grid-template-columns: minmax(0, 1fr) auto !important; }
  html body .murata-hero-actions { justify-self: end !important; }
}
@media (max-width: 1240px) and (min-width: 769px) {
  html body .murata-hero-content { grid-template-areas: "title actions" "desc actions" !important; }
  html body .murata-hero-actions { margin-top: 0 !important; }
}

/* top strip: status dot + simulator as icons */
html body .system-top-status-text { display: none !important; }
html body .status-indicator-dot { width: 8px !important; height: 8px !important; box-shadow: 0 0 0 3px rgba(72,187,120,.18) !important; }
html body .system-top-strip-right { gap: 10px !important; }
html body .system-top-sim-btn { width: 32px !important; height: 32px !important; padding: 0 !important; justify-content: center !important; border-radius: 10px !important; }
html body .system-top-sim-btn span { display: none !important; }
html body .system-top-sim-btn svg { width: 15px !important; height: 15px !important; }

/* need-help card: compact */
@media (min-width: 1100px) {
  html body .header-actions::after { padding: 14px 16px !important; font-size: 12px !important; line-height: 1.5 !important; }
}

/* row 2: completion + latest */
.pu-row-big { grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); align-items: stretch; }
.pu-completion { display: flex; flex-direction: column; padding: 22px 24px; }
.pu-completion .pu-card-head { margin-bottom: 14px; }
.pu-comp-body { flex: 1; display: grid; grid-template-columns: minmax(150px, .8fr) minmax(0, 1.4fr); gap: 32px; align-items: center; }
.pu-comp-main { display: flex; flex-direction: column; gap: 6px; }
.pu-comp-num { font-size: 56px; line-height: 1; font-weight: 700; letter-spacing: -.03em; color: #2D3748; font-variant-numeric: tabular-nums; }
.pu-comp-num small { font-size: 26px; font-weight: 700; color: #A0AEC0; margin-left: 2px; letter-spacing: 0; }
.pu-comp-cap { font-size: 13px; font-weight: 700; color: #A0AEC0; }
.pu-st-list { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; }
.pu .pu-st-row { display: grid; grid-template-columns: 10px minmax(0,1fr) auto 40px; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 10px; background: #F8F9FA; }
.pu .pu-st-row:hover { background: color-mix(in srgb, var(--primary) 8%, #fff); }
.pu-dot { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
.pu-st-name { font-size: 12.5px; font-weight: 700; color: #718096; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pu-st-row b { font-size: 15px; color: #2D3748; font-variant-numeric: tabular-nums; }
.pu-st-pct { font-size: 11.5px; font-weight: 700; color: #A0AEC0; text-align: right; }
.pu-stack { display: flex; height: 10px; border-radius: 99px; overflow: hidden; background: #EDF2F7; margin-top: 22px; gap: 2px; }
.pu-stack span { display: block; height: 100%; }
.pu-seg-done { background: #48BB78; }
.pu-seg-in_progress { background: var(--primary); }
.pu-seg-wait { background: #E53E3E; }
.pu-seg-cancel { background: #CBD5E0; }

.pu-dark-feature { padding: 24px; justify-content: flex-start; }
.pu-dark-feature h3 { font-size: 17px !important; margin: 4px 0 8px !important; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pu-dark-feature p { -webkit-line-clamp: 2 !important; font-size: 13.5px !important; color: rgba(255,255,255,.72) !important; }
.pu-feature-foot { position: relative; margin-top: auto; padding-top: 18px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.pu-feature-foot .pu-link { margin: 0; padding: 0; }
.pu-chip-light { font-size: 11.5px; font-weight: 700; color: #fff; background: rgba(255,255,255,.14); border-radius: 8px; padding: 4px 10px; }

/* row 3: both cards share the same header + chart layout */
.pu-row-analytics { grid-template-columns: minmax(0, 1fr) minmax(0, 1.55fr); align-items: stretch; }
.pu-active, .pu-overview { display: flex; flex-direction: column; padding: 22px 24px; }
.pu-active .pu-card-head, .pu-overview .pu-card-head { margin-bottom: 16px; min-height: 48px; }
.pu-active .pu-title, .pu-active .pu-sub { padding: 0 !important; }
.pu-pill { flex: none; font-size: 12px; font-weight: 700; color: #718096; background: #F8F9FA; border-radius: 10px; padding: 6px 10px; }
.pu-dark-chart { flex: 1; height: auto !important; min-height: 230px; margin: 0 !important; padding: 20px 18px 14px 14px !important; }
.pu-dark-axis { padding-bottom: 22px; }
.pu-wbar { flex-direction: column; justify-content: flex-end; align-items: center; gap: 8px; position: relative; }
.pu-wbar span { flex: none; }
.pu-wbar em { font-style: normal; font-size: 9.5px; font-weight: 700; color: rgba(255,255,255,.55); line-height: 14px; }
.pu-wbars { align-items: stretch !important; }
.pu-wbar { height: 100% !important; }
.pu-wbar > span { max-height: calc(100% - 22px); }
.pu-overview .pu-line-wrap { min-height: 230px; }

@media (max-width: 1400px) { .pu-row-analytics { grid-template-columns: 1fr; } }
@media (max-width: 1100px) {
  .pu-row-big { grid-template-columns: 1fr; }
  .pu-comp-body { grid-template-columns: 1fr; gap: 18px; }
}
@media (max-width: 768px) {
  .pu-st-list { grid-template-columns: 1fr; }
  .pu-comp-num { font-size: 44px; }
  .pu-completion, .pu-active, .pu-overview { padding: 16px; }
}
.pu .pu-st-row { grid-template-columns: 10px minmax(0,1fr) auto 30px; gap: 8px; padding: 9px 10px; }
@media (max-width: 1400px) and (min-width: 1151px) { .pu-stats { grid-template-columns: repeat(4, minmax(0,1fr)) !important; } }
@media (max-width: 1500px) {
  .pu-st-list { grid-template-columns: 1fr; gap: 6px; }
  .pu .pu-st-row { padding: 7px 10px; }
}

/* recently completed list (replaces dark feature card) */
.pu-recent { display: flex; flex-direction: column; padding: 22px 24px; }
.pu-recent .pu-card-head { margin-bottom: 10px; }
.pu-rc-list { display: flex; flex-direction: column; flex: 1; justify-content: space-between; }
.pu .pu-rc-row { display: grid; grid-template-columns: 30px minmax(0,1fr) 16px; align-items: center; gap: 12px; padding: 10px 8px; margin: 0 -8px; border-radius: 12px; }
.pu .pu-rc-row + .pu-rc-row { border-top: 1px solid #EDF2F7; border-radius: 0; }
.pu .pu-rc-row:hover { background: #FAFBFC; border-radius: 12px; }
.pu-rc-ico { width: 30px; height: 30px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; background: #E9F7EF; color: #2F855A; }
.pu-rc-text { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pu-rc-text b { font-size: 13.5px; font-weight: 700; color: #2D3748; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pu-rc-text small { font-size: 12px; font-weight: 500; color: #A0AEC0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pu-rc-go { color: #CBD5E0; display: inline-flex; }
.pu .pu-rc-row:hover .pu-rc-go { color: var(--primary); }

/* monthly requests: labelled bars */
.pu-dark-chart-v { flex-direction: column !important; gap: 12px !important; padding: 22px 18px 14px !important; }
.pu-dark-chart-v .pu-wbars { flex: 1; display: grid !important; grid-template-columns: repeat(12, minmax(0,1fr)); gap: 4px; align-items: stretch !important; }
.pu-dark-chart-v .pu-wbar { display: flex !important; flex-direction: column; align-items: center; gap: 8px; height: 100% !important; }
.pu-wbar-track { position: relative; flex: 1; width: 100%; display: flex; justify-content: center; }
.pu-wbar-track::before { content: ""; position: absolute; bottom: 0; top: 0; width: 8px; border-radius: 99px; background: rgba(255,255,255,.06); }
.pu-wbar-fill { position: absolute; bottom: 0; width: 8px; min-height: 4px; border-radius: 99px; background: rgba(255,255,255,.88); transition: height .4s ease; }
.pu-wbar-val { position: absolute; left: 50%; transform: translateX(-50%); font-size: 11px; font-weight: 700; color: #fff; line-height: 1; white-space: nowrap; font-variant-numeric: tabular-nums; }
.pu-wbar.is-zero .pu-wbar-val { color: rgba(255,255,255,.35); }
.pu-wbar.is-peak .pu-wbar-fill { background: color-mix(in srgb, var(--primary) 55%, #fff); box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 35%, transparent); }
.pu-wbar.is-peak .pu-wbar-val { background: #fff; color: var(--pu-ink, #2D3748); padding: 3px 6px; border-radius: 6px; font-size: 11px; }
.pu-wbar.is-now em { color: #fff; }
.pu-wbar.is-now .pu-wbar-track::before { background: rgba(255,255,255,.14); }
.pu-dark-chart-v .pu-wbar em { font-style: normal; font-size: 10px; font-weight: 700; color: rgba(255,255,255,.5); line-height: 14px; }
.pu-dark-foot { display: flex; justify-content: space-between; gap: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,.08); font-size: 12px; font-weight: 500; color: rgba(255,255,255,.6); }
.pu-dark-foot b { color: #fff; font-weight: 700; margin-left: 4px; }
@media (max-width: 768px) {
  .pu-dark-chart-v .pu-wbars { gap: 2px; }
  .pu-wbar-val { font-size: 9.5px; }
  .pu-wbar.is-peak .pu-wbar-val { padding: 2px 4px; font-size: 9.5px; }
  .pu-dark-chart-v .pu-wbar em { font-size: 8.5px; }
  .pu-wbar-fill, .pu-wbar-track::before { width: 6px; }
}
@media (prefers-reduced-motion: reduce) { .pu-wbar-fill { transition: none; } }
.pu-dark-chart-v .pu-wbar .pu-wbar-val { width: auto !important; min-height: 0 !important; height: auto !important; max-height: none !important; background: transparent; border-radius: 0; }
.pu-dark-chart-v .pu-wbar.is-peak .pu-wbar-val { background: #fff !important; border-radius: 6px; color: #2D3748; }
.pu-dark-chart-v .pu-wbar .pu-wbar-fill { max-height: none !important; }

/* ==========================================================================
   Title case is applied by figma-case.js; turn off every CSS uppercase rule
   ========================================================================== */
html body, html body *, html body *::before, html body *::after,
html body input::placeholder, html body textarea::placeholder { text-transform: none !important; }


/* ==========================================================================
   Account menu
   ========================================================================== */
html body .auth-user-dropdown { width: 272px !important; min-width: 0 !important; padding: 8px !important; border-radius: 16px !important; }
html body .auth-dropdown-header { padding: 0 !important; margin: 0 0 6px !important; border: 0 !important; }
html body .auth-dropdown-header > :not(#fxAcct) { display: none !important; }
.fx-acct { padding: 12px 12px 14px; background: #F8F9FA; border-radius: 12px; }
.fx-acct-top { display: flex; align-items: center; gap: 12px; }
.fx-acct-av { width: 40px; height: 40px; border-radius: 12px; flex: none; display: inline-flex; align-items: center; justify-content: center; background: var(--primary); color: #fff; font-size: 14px; font-weight: 700; letter-spacing: .02em; }
.fx-acct-id { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 0; }
.fx-acct-id b { font-size: 14px; font-weight: 700; color: #2D3748; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
.fx-acct-role { font-size: 10px; font-weight: 700; letter-spacing: .06em; color: #718096; background: #E2E8F0; border-radius: 6px; padding: 2px 7px; line-height: 1.4; }
.fx-acct-role.is-admin { color: var(--primary); background: color-mix(in srgb, var(--primary) 12%, #fff); }
.fx-acct-meta { display: grid; grid-template-columns: 92px 1fr; row-gap: 6px; margin: 12px 0 0; padding: 12px 0 0; border-top: 1px solid #E2E8F0; font-size: 12px; }
.fx-acct-meta dt { color: #A0AEC0; font-weight: 700; letter-spacing: .04em; font-size: 10.5px; align-self: center; }
.fx-acct-meta dd { margin: 0; color: #2D3748; font-weight: 700; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

html body .auth-dropdown-item {
  display: flex !important; align-items: center !important; gap: 12px !important; height: 40px; padding: 0 12px !important;
  border-radius: 10px !important; font-size: 12.5px !important; font-weight: 700 !important; color: #2D3748 !important; letter-spacing: .02em !important; cursor: pointer;
}
html body .auth-dropdown-item > span:first-child { display: none !important; }
html body .auth-dropdown-item::before {
  content: ""; width: 16px; height: 16px; flex: none; background: #A0AEC0;
  -webkit-mask: var(--fx-ic) center/contain no-repeat; mask: var(--fx-ic) center/contain no-repeat;
}
html body .auth-dropdown-item:hover { background: #F8F9FA !important; }
html body .auth-dropdown-item:hover::before { background: var(--primary); }
html body .auth-dropdown-item[onclick*="openUserProfileModal"] { --fx-ic: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6'/%3E%3C/svg%3E"); }
html body .auth-dropdown-item[onclick*="openChangePinModal"] { --fx-ic: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='4' y='10' width='16' height='11' rx='2'/%3E%3Cpath d='M8 10V7a4 4 0 0 1 8 0v3'/%3E%3C/svg%3E"); }
html body .auth-dropdown-item[onclick*="openAdminTeamPinsModal"] { --fx-ic: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z'/%3E%3Cpath d='M9 12l2 2 4-4'/%3E%3C/svg%3E"); }
html body .auth-dropdown-item[onclick*="logoutUser"] { --fx-ic: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3'/%3E%3Cpath d='M10 17l-5-5 5-5M5 12h11'/%3E%3C/svg%3E"); }
html body .auth-dropdown-item.text-danger { color: #E53E3E !important; margin-top: 6px; position: relative; }
html body .auth-dropdown-item.text-danger::after { content: ""; position: absolute; left: 12px; right: 12px; top: -4px; height: 1px; background: #EDF2F7; }
html body .auth-dropdown-item.text-danger::before { background: #E53E3E !important; }
html body .auth-dropdown-item.text-danger:hover { background: #FFF5F5 !important; }

/* sidebar account button */
html body .auth-user-role-badge {
  font-size: 9.5px !important; font-weight: 700 !important; letter-spacing: .06em !important; border: 0 !important; border-radius: 6px !important;
  padding: 2px 6px !important; margin-left: 6px; box-shadow: none !important; vertical-align: 1px;
}
html body .auth-user-role-badge.admin { background: color-mix(in srgb, var(--primary) 12%, #fff) !important; color: var(--primary) !important; }
html body .auth-user-role-badge.member { background: #EDF2F7 !important; color: #718096 !important; }
html body #headerAuthText { display: inline-flex; align-items: center; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
html body .auth-dropdown-item, html body .auth-dropdown-item.admin-only-item { border: 0 !important; background: transparent; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; box-shadow: none !important; margin: 0 !important; }
html body .auth-dropdown-item.text-danger { margin-top: 8px !important; }
html body .auth-dropdown-item.admin-only-item::after { content: "ADMIN"; margin-left: auto; font-size: 9.5px; font-weight: 700; letter-spacing: .06em; color: var(--primary); background: color-mix(in srgb, var(--primary) 12%, #fff); border-radius: 6px; padding: 2px 6px; }

/* ==========================================================================
   Profile photo
   ========================================================================== */
.fx-acct-av.has-photo { padding: 0; overflow: hidden; background: #E2E8F0; }
.fx-acct-av img { width: 100%; height: 100%; object-fit: cover; display: block; }
@media (min-width: 1100px) {
  html body .auth-header-btn.fx-has-photo::before {
    -webkit-mask: none !important; mask: none !important; background: var(--fx-photo) center/cover no-repeat !important;
    width: 30px !important; height: 30px !important; border-radius: 10px !important;
  }
}
html body .auth-header-btn.fx-has-photo::before { -webkit-mask: none !important; mask: none !important; background: var(--fx-photo) center/cover no-repeat !important; border-radius: 8px; }
html body #mobileAuthBtn.fx-has-photo { padding: 0 !important; overflow: hidden; }
html body #mobileAuthBtn.fx-has-photo #mobileAuthIcon { display: none !important; }
html body #mobileAuthBtn .fx-mob-photo { width: 100%; height: 100%; object-fit: cover; display: block; }

.fx-photo-box { display: grid; grid-template-columns: 72px minmax(0,1fr); gap: 16px; align-items: center; padding: 14px; margin-bottom: 18px; background: #F8F9FA; border-radius: 14px; }
.fx-photo-av { position: relative; width: 72px; height: 72px; border-radius: 18px; border: 0; padding: 0; cursor: pointer; overflow: hidden;
  background: var(--primary); color: #fff; font-size: 22px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.fx-photo-av img { width: 100%; height: 100%; object-fit: cover; display: block; }
.fx-photo-av.is-drop { box-shadow: 0 0 0 3px var(--primary); }
.fx-photo-cam { position: absolute; inset: auto 0 0 0; height: 24px; background: rgba(0,0,0,.45); opacity: 0; transition: opacity .15s ease; }
.fx-photo-cam::before { content: ""; position: absolute; inset: 0; margin: auto; width: 14px; height: 14px; background: #fff;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'%3E%3Cpath d='M4 8h3l2-3h6l2 3h3v11H4z'/%3E%3Ccircle cx='12' cy='13' r='3.5'/%3E%3C/svg%3E") center/contain no-repeat;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'%3E%3Cpath d='M4 8h3l2-3h6l2 3h3v11H4z'/%3E%3Ccircle cx='12' cy='13' r='3.5'/%3E%3C/svg%3E") center/contain no-repeat; }
.fx-photo-av:hover .fx-photo-cam, .fx-photo-av:focus-visible .fx-photo-cam { opacity: 1; }
.fx-photo-info { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-width: 0; }
.fx-photo-info b { font-size: 15px; font-weight: 700; color: #2D3748; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
.fx-photo-info small { font-size: 11px; color: #A0AEC0; font-weight: 500; }
.fx-photo-actions { display: flex; align-items: center; gap: 10px; margin: 6px 0 2px; }
.fx-photo-actions .btn { height: 30px !important; padding: 0 12px !important; font-size: 11.5px !important; }
.fx-photo-remove { border: 0; background: none; padding: 0; font: inherit; font-size: 11.5px; font-weight: 700; color: #E53E3E; cursor: pointer; letter-spacing: .02em; }
.fx-photo-remove:hover { text-decoration: underline; }

/* ==========================================================================
   Separate pages (≥769px)
   ========================================================================== */
@media (min-width: 769px) {
  html body[data-acre-page="dashboard"] #controlsBar,
  html body[data-acre-page="dashboard"] #viewContainer { display: none !important; }
  html body[data-acre-page="tasks"] #fxDashboard,
  html body[data-acre-page="tasks"] .analytics-section,
  html body[data-acre-page="timeline"] #fxDashboard,
  html body[data-acre-page="timeline"] .analytics-section { display: none !important; }
  html body[data-acre-page="tasks"] .controls-bar,
  html body[data-acre-page="timeline"] .controls-bar { margin-top: 0 !important; }
  html body[data-acre-page] main.container { min-height: calc(100vh - 60px); }
}
html body .data-table tbody tr.row-status-done td, html body .data-table tbody tr.row-status-done { background: #fff !important; }
html body .data-table tbody tr.row-status-done:hover td { background: #FBFCFD !important; }
@media (min-width: 769px) {
  html body[data-acre-page="tasks"] .btn-murata-outline, html body[data-acre-page="timeline"] .btn-murata-outline { display: none !important; }
}

/* ==========================================================================
   Completion card v2
   ========================================================================== */
.pu-completion { justify-content: space-between; gap: 18px; }
.pu-completion .pu-card-head { margin-bottom: 0 !important; }
.pu-comp-hero { display: flex; align-items: baseline; gap: 16px; }
.pu-comp-hero .pu-comp-num { font-size: 60px; }
.pu-comp-hero .pu-comp-cap { font-size: 13px; color: #A0AEC0; font-weight: 700; }
.pu-comp-hero .pu-comp-cap b { color: #2D3748; }
.pu-completion .pu-stack { margin-top: 0; height: 12px; }
.pu-lg-row { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 0; border-top: 1px solid #EDF2F7; padding-top: 14px; }
.pu .pu-lg { display: flex; flex-direction: column; gap: 6px; padding: 4px 14px; border-left: 1px solid #EDF2F7; border-radius: 0; }
.pu .pu-lg:first-child { padding-left: 0; border-left: 0; }
.pu .pu-lg:hover .pu-lg-val b { color: var(--primary); }
.pu-lg-top { display: flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 700; color: #A0AEC0; letter-spacing: .03em; white-space: nowrap; }
.pu-lg-val { display: flex; align-items: baseline; gap: 6px; }
.pu-lg-val b { font-size: 20px; font-weight: 700; color: #2D3748; font-variant-numeric: tabular-nums; }
.pu-lg-val small { font-size: 12px; font-weight: 700; color: #A0AEC0; }
@media (max-width: 768px) { .pu-lg-row { grid-template-columns: 1fr 1fr; row-gap: 14px; } .pu .pu-lg:nth-child(3) { padding-left: 0; border-left: 0; } .pu-comp-hero .pu-comp-num { font-size: 46px; } }

/* ==========================================================================
   Controls bar (Tasks / Timeline)
   ========================================================================== */
@media (min-width: 769px) {
  html body .controls-bar { padding: 16px 18px !important; margin-bottom: 18px !important; }
  html body .controls-row-top { gap: 12px !important; align-items: center !important; }
  html body .search-input { height: 42px !important; }
  html body .view-tabs { flex: none; }
  html body .controls-filters { display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; align-items: center !important; justify-content: space-between !important; gap: 10px 16px !important; padding-top: 14px !important; }
  html body .filters-row-main, html body .filters-row-sub { display: contents !important; }
  html body .filters-left-group { display: flex !important; align-items: center !important; gap: 8px !important; flex-wrap: wrap; }
  html body .filter-label, html body .filter-sublabel { display: none !important; }
  html body .filters-left-group > svg, html body .time-filter-wrapper > svg { display: none !important; }
  html body .filter-select { height: 36px !important; min-width: 150px; border-radius: 10px !important; font-size: 12px !important; font-weight: 700 !important; }
  html body .time-filter-wrapper { display: flex !important; align-items: center; margin-left: auto; }
  html body .filter-chip-group { background: #F8F9FA; border-radius: 10px; padding: 3px; gap: 2px !important; }
  html body .filter-chip { height: 30px !important; border-radius: 8px !important; font-size: 11.5px !important; padding: 0 12px !important; }
  html body .filter-chip.active { background: #fff !important; color: #2D3748 !important; box-shadow: 0 1px 3px rgba(0,0,0,.08) !important; }
  html body .btn-reset-filters { height: 36px !important; border-radius: 10px !important; font-size: 11.5px !important; }
  html body .filter-count-badge { display: none !important; }
}

/* ==========================================================================
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
.pu-pill { font-size: 12px !important; padding: 7px 12px !important; color: #718096 !important; }
.pu-pill b { color: #2D3748; font-size: 13px; margin-right: 2px; }
.pu-dark-foot { font-size: 12.5px !important; padding-top: 14px !important; }
.pu-dark-foot b { font-size: 13px; }
.pu-dark-foot { display: grid !important; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 0 !important; padding-top: 14px !important; }
.pu-fs { display: flex; flex-direction: column; gap: 4px; padding: 0 12px; border-left: 1px solid rgba(255,255,255,.1); min-width: 0; }
.pu-fs:first-child { padding-left: 0; border-left: 0; }
.pu-fs span { font-size: 10.5px; font-weight: 700; letter-spacing: .05em; color: rgba(255,255,255,.55); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pu-fs b { font-size: 15px !important; font-weight: 700; color: #fff; margin: 0 !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pu-fs b small { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.6); margin-left: 2px; }
@media (max-width: 768px) { .pu-fs { padding: 0 8px; } .pu-fs b { font-size: 13px !important; } .pu-fs span { font-size: 9.5px; } }
.pu-fs span { white-space: normal !important; overflow: visible !important; line-height: 1.3; }
.pu-fs b { white-space: nowrap !important; overflow: visible !important; line-height: 1.2; font-size: 18px !important; }
.pu-fs b small { display: inline; margin: 0 0 0 2px !important; font-size: 13px; color: rgba(255,255,255,.6); }

/* ==========================================================================
   Alignment pass: everything outside cards lines up with card content (24px)
   ========================================================================== */
@media (min-width: 769px) {
  html body .system-top-strip-left { display: none !important; }
  html body .system-top-strip { height: 48px !important; }
  html body .system-top-strip-inner { justify-content: flex-end !important; padding: 0 24px !important; }
  .pu-head { padding: 0 24px; margin-top: 4px; }
  .pu-head .pu-text-link { margin-right: -12px; }
}
.pu .pu-stat { padding-left: 24px !important; padding-right: 20px !important; }
@media (min-width: 769px) { html body .system-top-strip-inner { padding: 0 !important; } html body .system-top-strip .container { padding-right: 32px !important; } }
@media (min-width: 769px) { html body .controls-bar { padding: 18px 24px !important; } }
.at-bar-top { padding: 14px 24px !important; }
.at-table th:first-child, .at-table td:first-child { padding-left: 16px !important; }
.at-table th:last-child, .at-table td:last-child { padding-right: 24px !important; }

/* ==========================================================================
   Pass: calmer footer stats + minimal table
   ========================================================================== */
.pu-fs span { font-size: 9.5px !important; letter-spacing: .06em !important; }
.pu-fs b { font-size: 14px !important; font-weight: 700 !important; }
.pu-fs b small { font-size: 11px !important; font-weight: 600 !important; }
.pu-dark-foot { padding-top: 12px !important; }

.at-bar-top { padding: 12px 24px !important; }
.at-summary { font-size: 11px !important; gap: 6px !important; }
.at-summary > b { font-size: 14px !important; }
.at-sum-chip { font-size: 10px !important; padding: 2px 7px !important; font-weight: 600 !important; }
.at-mode button { font-size: 10px !important; height: 26px !important; }
.at-table th { font-size: 9.5px !important; padding: 10px 12px !important; letter-spacing: .07em !important; }
.at-table td { padding: 12px 12px !important; font-size: 11.5px !important; }
.at-no { font-size: 11px; font-weight: 600 !important; }
.at-title { font-size: 12px !important; font-weight: 600 !important; line-height: 1.4 !important; -webkit-line-clamp: 1 !important; }
.at-tags { margin-top: 4px !important; gap: 8px !important; }
.at-code { font-size: 9.5px !important; padding: 1px 6px !important; font-weight: 600 !important; }
.at-cat { font-size: 9.5px !important; font-weight: 600 !important; }
.at-pill { font-size: 9px !important; padding: 3px 7px !important; border-radius: 6px !important; letter-spacing: .05em !important; }
.at-sub { font-size: 9px !important; margin-top: 5px !important; font-weight: 600 !important; color: #A0AEC0 !important; }
.at-prog { margin-top: 4px !important; }
.at-bar { height: 4px !important; max-width: 80px !important; }
.at-prog b { font-size: 10px !important; font-weight: 600 !important; color: #718096 !important; }
.at-req b { font-size: 11.5px !important; font-weight: 600 !important; -webkit-line-clamp: 1 !important; }
.at-req small { font-size: 10px !important; -webkit-line-clamp: 1 !important; margin-top: 2px !important; }
.at-note-main { font-size: 11px !important; font-weight: 600 !important; color: #2D3748 !important; }
.at-note small { font-size: 10px !important; -webkit-line-clamp: 1 !important; margin-top: 2px !important; }
.at-av { width: 22px !important; height: 22px !important; font-size: 8.5px !important; border-radius: 7px !important; margin-right: 6px !important; }
.at-owner-name { font-size: 11px !important; font-weight: 600 !important; }
.at-file { height: 22px !important; font-size: 9.5px !important; padding: 0 6px !important; font-weight: 600 !important; }
.at-file svg { width: 12px; height: 12px; }
.at-date { font-size: 10.5px !important; font-weight: 600 !important; color: #A0AEC0 !important; }
.at-actions { margin-top: 4px !important; }
.at-icon { width: 24px !important; height: 24px !important; border-radius: 7px !important; }
.at-icon svg { width: 12px; height: 12px; }
.at-table th:nth-child(2) { width: 27% !important; } .at-table th:nth-child(3) { width: 130px !important; }
.at-title { -webkit-line-clamp: 2 !important; }
.at-req b { -webkit-line-clamp: 2 !important; white-space: normal !important; display: -webkit-box !important; -webkit-box-orient: vertical; overflow: hidden; }
.at-req small { white-space: normal !important; }

/* initials badges stay in capitals */
html body .pu-co-ico, html body .pu-av, html body .fxd-thumb, html body .fxd-avatar, html body .fx-acct-av, html body .at-av, html body .fx-photo-av span, html body .pu-thumb { text-transform: uppercase !important; }

/* Task names are shown exactly as entered: all capitals */
html body .at-title, html body .pu-rc-text b, html body .pu-tl-text b, html body .card-title, html body .ios-card-title,
html body #detailTitle, html body #actionSheetTitle, html body .sticky-col-task > div:first-child,
html body .pu-dark-feature h3, html body .fx-task-name,
html body .at-title *, html body .pu-rc-text b *, html body .pu-tl-text b *, html body .card-title *, html body .ios-card-title *, html body #detailTitle *, html body #actionSheetTitle *, html body .sticky-col-task > div:first-child *, html body .pu-dark-feature h3 *, html body .fx-task-name * { text-transform: uppercase !important; }

/* Completion hero: number + stacked caption */
html body .pu-comp-hero { display: flex !important; align-items: center !important; gap: 18px !important; margin: 4px 0 18px !important; }
html body .pu-comp-hero .pu-comp-num { font-size: 52px !important; line-height: .95 !important; font-weight: 700 !important; letter-spacing: -.035em !important; color: #2D3748 !important; display: inline-flex; align-items: flex-start; }
html body .pu-comp-hero .pu-comp-num small { font-size: 22px !important; line-height: 1 !important; font-weight: 700 !important; color: var(--primary) !important; margin: 6px 0 0 3px !important; letter-spacing: 0 !important; }
html body .pu-comp-hero .pu-comp-cap { display: flex !important; flex-direction: column !important; gap: 3px !important; padding-left: 18px !important; border-left: 1px solid #E2E8F0 !important; }
html body .pu-comp-hero .pu-comp-cap b { font-size: 18px !important; line-height: 1.1 !important; font-weight: 700 !important; color: #2D3748 !important; font-variant-numeric: tabular-nums; }
html body .pu-comp-hero .pu-comp-cap b em { font-style: normal !important; color: #A0AEC0 !important; font-weight: 600 !important; }
html body .pu-comp-hero .pu-comp-cap small { font-size: 12px !important; font-weight: 500 !important; color: #A0AEC0 !important; }
@media (max-width: 768px) { html body .pu-comp-hero .pu-comp-num { font-size: 44px !important; } }

/* Department and category names: all capitals */
html body .pu-co, html body .pu-co *, html body .pu-share-top b { text-transform: uppercase !important; }

/* lock the page (not only body) while a modal is open, so no empty scrollbar strip shows */
html:has(body.modal-open) { overflow: hidden !important; }
`;
    var sc = document.getElementById('fxScaleCss'); if (sc) document.head.insertBefore(st, sc); else document.head.appendChild(st);
  }
  function init() {
    injectCss();
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
