/* ==========================================================================
   ACRE — profile photos
   Lets a logged-in user upload, change or remove their own profile photo.
   Photos are resized in the browser to a 160×160 JPEG (~10 KB), kept in
   localStorage and, when Firebase is connected, shared through
   Firestore document settings/profile_photos so every device sees them.
   ========================================================================== */
(function () {
  'use strict';
  var KEY = 'acre_profile_photos_v1';
  var SIZE = 160;
  var photos = {};
  try { photos = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { photos = {}; }

  function me() { try { return currentUser || null; } catch (e) { return null; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(photos)); } catch (e) {} }
  function toast(m) { try { showToast(m); } catch (e) {} }
  function initials(name) {
    var p = String(name || '').replace(/\(.*?\)/g, '').trim().split(/[\s./-]+/).filter(Boolean);
    if (!p.length) return '–';
    return ((p[0].charAt(0) || '') + (p[1] ? p[1].charAt(0) : (p[0].charAt(1) || ''))).toUpperCase();
  }
  window.acreGetPhoto = function (userId) { return photos[userId] || null; };

  /* ---------- cloud ---------- */
  function db() { try { return firebaseDb || null; } catch (e) { return null; } }
  var subscribed = false;
  function subscribe() {
    var d = db();
    if (!d || subscribed) return;
    subscribed = true;
    try {
      d.collection('settings').doc('profile_photos').onSnapshot(function (snap) {
        if (!snap || !snap.exists) return;
        var remote = (snap.data() || {}).photos || {};
        photos = remote; save(); paint();
      }, function () {});
    } catch (e) { subscribed = false; }
  }
  setInterval(subscribe, 3000);
  function pushCloud(userId, dataUrl) {
    var d = db();
    if (!d) return;
    try {
      var upd = {}; upd['photos.' + userId] = dataUrl === null ? firebase.firestore.FieldValue.delete() : dataUrl;
      var ref = d.collection('settings').doc('profile_photos');
      ref.update(upd).catch(function () {
        var body = { photos: {} }; if (dataUrl) body.photos[userId] = dataUrl;
        return ref.set(body, { merge: true });
      });
    } catch (e) {}
  }

  /* ---------- image processing ---------- */
  function resize(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !/^image\//.test(file.type)) { reject(new Error('type')); return; }
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var s = Math.min(img.width, img.height), sx = (img.width - s) / 2, sy = (img.height - s) / 2;
        var c = document.createElement('canvas'); c.width = c.height = SIZE;
        var ctx = c.getContext('2d'); ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, SIZE, SIZE);
        ctx.drawImage(img, sx, sy, s, s, 0, 0, SIZE, SIZE);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL('image/jpeg', 0.86));
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('load')); };
      img.src = url;
    });
  }

  function setPhoto(dataUrl) {
    var u = me(); if (!u) return;
    if (dataUrl) photos[u.id] = dataUrl; else delete photos[u.id];
    save(); pushCloud(u.id, dataUrl || null); paint();
  }

  /* ---------- painting ---------- */
  function avatarHtml(u, cls) {
    var p = u && photos[u.id];
    return p ? '<img class="' + cls + '" src="' + p + '" alt="">' : '';
  }
  function paint() {
    var u = me(), p = u ? photos[u.id] : null;
    // account menu avatar
    var av = document.querySelector('#fxAcct .fx-acct-av');
    if (av) {
      if (p) { av.innerHTML = '<img src="' + p + '" alt="">'; av.classList.add('has-photo'); }
      else { av.textContent = initials(u ? u.name : 'GUEST'); av.classList.remove('has-photo'); }
    }
    // sidebar button
    var btn = document.getElementById('btnHeaderAuth');
    if (btn) {
      btn.classList.toggle('fx-has-photo', !!p);
      if (p) btn.style.setProperty('--fx-photo', 'url("' + p + '")'); else btn.style.removeProperty('--fx-photo');
    }
    // mobile header button
    var mob = document.getElementById('mobileAuthBtn');
    if (mob) {
      var img = mob.querySelector('img.fx-mob-photo');
      if (p) { if (!img) { img = document.createElement('img'); img.className = 'fx-mob-photo'; img.alt = ''; mob.appendChild(img); } img.src = p; mob.classList.add('fx-has-photo'); }
      else { if (img) img.remove(); mob.classList.remove('fx-has-photo'); }
    }
    paintModal();
  }

  /* ---------- profile modal ---------- */
  function ensureModalUi() {
    var holder = document.getElementById('userProfileAvatar');
    if (!holder || document.getElementById('fxPhotoBox')) return;
    var row = holder.parentElement;
    var box = document.createElement('div');
    box.id = 'fxPhotoBox'; box.className = 'fx-photo-box';
    box.innerHTML =
      '<button type="button" class="fx-photo-av" id="fxPhotoAv" title="Change profile photo" aria-label="Change profile photo"></button>' +
      '<div class="fx-photo-info"><b id="fxPhotoName"></b><span id="fxPhotoRole" class="fx-acct-role"></span>' +
      '<div class="fx-photo-actions"><button type="button" class="btn btn-outline btn-sm" id="fxPhotoPick">Upload photo</button>' +
      '<button type="button" class="fx-photo-remove" id="fxPhotoRemove">Remove</button></div>' +
      '<small>JPG or PNG · cropped to a square</small></div>' +
      '<input type="file" id="fxPhotoInput" accept="image/*" hidden>';
    row.parentElement.insertBefore(box, row);
    row.style.display = 'none';
    var input = box.querySelector('#fxPhotoInput');
    box.querySelector('#fxPhotoAv').onclick = function () { input.click(); };
    box.querySelector('#fxPhotoPick').onclick = function () { input.click(); };
    box.querySelector('#fxPhotoRemove').onclick = function () { setPhoto(null); toast('Profile photo removed'); };
    input.onchange = function () {
      var f = input.files && input.files[0]; input.value = '';
      if (!f) return;
      resize(f).then(function (d) { setPhoto(d); toast('Profile photo updated'); })
        .catch(function () { toast('Choose an image file (JPG or PNG)'); });
    };
    // drag & drop onto the avatar
    var av = box.querySelector('#fxPhotoAv');
    av.addEventListener('dragover', function (e) { e.preventDefault(); av.classList.add('is-drop'); });
    av.addEventListener('dragleave', function () { av.classList.remove('is-drop'); });
    av.addEventListener('drop', function (e) {
      e.preventDefault(); av.classList.remove('is-drop');
      var f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) resize(f).then(function (d) { setPhoto(d); toast('Profile photo updated'); }).catch(function () { toast('Choose an image file (JPG or PNG)'); });
    });
  }
  function paintModal() {
    var box = document.getElementById('fxPhotoBox'); if (!box) return;
    var u = me(), p = u ? photos[u.id] : null;
    var av = box.querySelector('#fxPhotoAv');
    av.innerHTML = (p ? '<img src="' + p + '" alt="">' : '<span>' + initials(u ? u.name : '') + '</span>') +
      '<i class="fx-photo-cam" aria-hidden="true"></i>';
    box.querySelector('#fxPhotoName').textContent = u ? String(u.name || '').toUpperCase() : '';
    var r = box.querySelector('#fxPhotoRole'); r.textContent = u ? String(u.role || '').toUpperCase() : ''; r.classList.toggle('is-admin', !!u && u.role === 'ADMIN');
    box.querySelector('#fxPhotoRemove').style.display = p ? '' : 'none';
    box.querySelector('#fxPhotoPick').textContent = p ? 'Change photo' : 'Upload photo';
  }

  function wrap(name, after) {
    var orig = window[name];
    if (typeof orig !== 'function') return;
    window[name] = function () { var r = orig.apply(this, arguments); try { after(); } catch (e) {} return r; };
  }
  function init() {
    wrap('updateAuthHeaderUI', paint);
    wrap('openUserProfileModal', function () { ensureModalUi(); paint(); });
    wrap('handleAuthHeaderClick', paint);
    ensureModalUi();
    paint();
    subscribe();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 30); });
  else setTimeout(init, 30);
})();
