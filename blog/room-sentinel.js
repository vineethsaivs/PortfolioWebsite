/* ============================================================================
   room-sentinel.js. All article interactivity, vanilla ES, no bundler.
   One IIFE. A single lazy AudioContext is created on the first user gesture
   (autoplay policy). Every init returns early if its root element is absent,
   and every animation has a reduced-motion "jump to final state" branch.
   Each audio payoff has a visual + text twin so muted / reduced-motion / JS-off
   readers lose nothing.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* --------------------------------------------------------------------------
     Shared lazy audio engine (piezo-ish square tones, no audio files)
     ------------------------------------------------------------------------ */
  var audioCtx = null;
  var muted = false;

  function getAudioCtx() {
    if (muted) return null;
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { audioCtx = new AC(); } catch (e) { return null; }
    }
    if (audioCtx.state === 'suspended' && audioCtx.resume) audioCtx.resume();
    return audioCtx;
  }

  // One tone with a sharp attack + decay, scheduled at now + atSec.
  function tone(freq, dur, atSec, peak) {
    var ctx = getAudioCtx();
    if (!ctx) return;
    var t0 = ctx.currentTime + (atSec || 0);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, t0);
    var p = peak || 0.16;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(p, t0 + 0.006);   // sharp attack
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur); // decay
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  /* --------------------------------------------------------------------------
     1. Beep Console
     ------------------------------------------------------------------------ */
  function initBeepConsole() {
    var root = document.querySelector('[data-beep-console]');
    if (!root) return;

    var btn = root.querySelector('[data-beep-btn]');
    var canvas = root.querySelector('[data-beep-scope]');
    var label = root.querySelector('[data-beep-label]');
    var sub = root.querySelector('[data-beep-sub]');
    var status = root.querySelector('[data-beep-status]');
    var ringNodes = root.querySelectorAll('.ring-node');
    var chips = root.querySelectorAll('[data-chip]');
    var muteBtn = root.querySelector('[data-mute]');
    var muteLabel = root.querySelector('[data-mute-label]');
    var powerOff = root.querySelector('[data-poweroff]');
    var ctx2d = canvas && canvas.getContext ? canvas.getContext('2d') : null;

    var state = 'off';
    var voiceToken = 0;

    /* ---- visual twins ---- */
    function setLabel(main, small) {
      if (label) label.textContent = main;
      if (sub && small != null) sub.textContent = small;
      if (status) status.textContent = main;
    }
    function lightRing(s) {
      for (var i = 0; i < ringNodes.length; i++) {
        ringNodes[i].classList.toggle('lit', ringNodes[i].getAttribute('data-state') === s);
      }
      if (btn) {
        btn.setAttribute('aria-label',
          'Sentinel button, current state ' + s + '. Tap to cycle, press and hold to turn off.');
      }
    }

    /* ---- scope canvas ---- */
    var scopeAmp = 0, scopeRAF = null, sustainUntil = 0;
    function renderScope(amp) {
      if (!ctx2d) return;
      var w = canvas.width, h = canvas.height, mid = h / 2;
      ctx2d.clearRect(0, 0, w, h);
      ctx2d.lineWidth = 2;
      ctx2d.strokeStyle = '#e50914';
      ctx2d.beginPath();
      var cycles = 9, A = amp * (h * 0.36);
      for (var x = 0; x <= w; x++) {
        var phase = Math.floor((x / w) * cycles * 2) % 2;
        var y = mid + (phase ? -A : A);
        if (x === 0) ctx2d.moveTo(x, y); else ctx2d.lineTo(x, y);
      }
      ctx2d.stroke();
    }
    function scopeLoop() {
      var now = (window.performance && performance.now) ? performance.now() : Date.now();
      if (now < sustainUntil) scopeAmp = 0.6 + Math.random() * 0.25;
      else scopeAmp *= 0.9;
      renderScope(scopeAmp);
      if (now < sustainUntil || scopeAmp > 0.03) scopeRAF = requestAnimationFrame(scopeLoop);
      else { scopeRAF = null; renderScope(0); }
    }
    function beepScope() {
      if (!ctx2d) return;
      if (reduceMotion) { renderScope(1); setTimeout(function () { renderScope(0); }, 140); return; }
      scopeAmp = 1;
      if (!scopeRAF) scopeRAF = requestAnimationFrame(scopeLoop);
    }
    function droneScope(ms) {
      if (!ctx2d) return;
      if (reduceMotion) { renderScope(0.8); setTimeout(function () { renderScope(0); }, ms); return; }
      sustainUntil = ((window.performance && performance.now) ? performance.now() : Date.now()) + ms;
      if (!scopeRAF) scopeRAF = requestAnimationFrame(scopeLoop);
    }

    /* ---- cue: play a pattern of beeps + draw each ---- */
    function cue(pattern) {
      var offset = 0;
      for (var i = 0; i < pattern.length; i++) {
        var p = pattern[i];
        tone(p.freq, p.dur, offset / 1000, p.peak);
        setTimeout(beepScope, offset);
        offset += (p.dur + (p.gap == null ? 0.09 : p.gap)) * 1000;
      }
    }

    function playDrone() {
      var ctx = getAudioCtx();
      if (ctx) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'square';
        o.frequency.setValueAtTime(150, ctx.currentTime);
        o.frequency.linearRampToValueAtTime(300, ctx.currentTime + 1.2);
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.03);
        g.gain.setValueAtTime(0.22, ctx.currentTime + 1.0);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.25);
        o.connect(g); g.connect(ctx.destination);
        o.start(); o.stop(ctx.currentTime + 1.3);
      }
      droneScope(1200);
    }

    /* ---- state machine ---- */
    function enter(s) {
      state = s;
      voiceToken++;
      var myToken = voiceToken;
      lightRing(s);
      if (s === 'presence') {
        setLabel('WATCH. Camera on', '1 beep means watching');
        cue([{ freq: 2400, dur: 0.08 }]);
      } else if (s === 'voice') {
        setLabel('VOICE. Loading models', 'wait for the speak-now beep');
        cue([{ freq: 2400, dur: 0.08 }, { freq: 2400, dur: 0.08 }]);
        setTimeout(function () {
          if (state === 'voice' && myToken === voiceToken) {
            setLabel('SPEAK NOW', 'ask your one question');
            cue([{ freq: 2750, dur: 0.13 }]);
          }
        }, 1600);
      } else { // off
        setLabel('OFF. Silent and idle', 'tap to start watching');
        cue([{ freq: 1800, dur: 0.5 }]);
      }
    }
    function advance() {
      if (state === 'off') enter('presence');
      else if (state === 'presence') enter('voice');
      else enter('off');
    }
    function killOff() {
      voiceToken++;
      state = 'off';
      lightRing('off');
      setLabel('OFF. Silent and idle', 'held to off, one long beep');
      cue([{ freq: 1800, dur: 0.5 }]);
    }

    /* ---- button: tap to advance, long-press to kill ---- */
    var lpTimer = null, suppressClick = false;
    if (btn) {
      btn.addEventListener('pointerdown', function (e) {
        suppressClick = false;
        try { btn.setPointerCapture(e.pointerId); } catch (_) {}
        lpTimer = setTimeout(function () { suppressClick = true; killOff(); }, 600);
      });
      var endPress = function () { if (lpTimer) { clearTimeout(lpTimer); lpTimer = null; } };
      btn.addEventListener('pointerup', endPress);
      btn.addEventListener('pointercancel', endPress);
      btn.addEventListener('pointerleave', endPress);
      btn.addEventListener('contextmenu', function (e) { e.preventDefault(); });
      // click covers mouse + keyboard (Enter/Space); suppressed after a long-press
      btn.addEventListener('click', function () {
        if (suppressClick) { suppressClick = false; return; }
        advance();
      });
    }
    if (powerOff) powerOff.addEventListener('click', function () { if (state !== 'off') killOff(); });

    /* ---- chips ---- */
    for (var c = 0; c < chips.length; c++) {
      (function (chip) {
        chip.addEventListener('click', function () {
          var kind = chip.getAttribute('data-chip');
          if (kind === 'watching') { setLabel('1 beep. Watching', 'the camera is on'); cue([{ freq: 2400, dur: 0.08 }]); }
          else if (kind === 'voice') { setLabel('2 beeps. Voice', 'getting ready for a question'); cue([{ freq: 2400, dur: 0.08 }, { freq: 2400, dur: 0.08 }]); }
          else if (kind === 'ready') { setLabel('3 beeps. Ready', 'booted and listening'); cue([{ freq: 2400, dur: 0.07, gap: 0.07 }, { freq: 2400, dur: 0.07, gap: 0.07 }, { freq: 2400, dur: 0.07 }]); }
          else if (kind === 'speak-now') { setLabel('Speak now', 'the green light'); cue([{ freq: 2750, dur: 0.13 }]); }
          else if (kind === 'float-trap') { setLabel('FLOAT TRAP. The line blaring', 'the sound you must never allow'); playDrone(); }
        });
      })(chips[c]);
    }

    /* ---- mute ---- */
    if (muteBtn) {
      muteBtn.addEventListener('click', function () {
        muted = !muted;
        muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
        var icon = muteBtn.querySelector('i');
        if (icon) icon.className = muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        if (muteLabel) muteLabel.textContent = muted ? 'Sound off' : 'Sound on';
      });
    }

    // Draw a flat baseline at rest
    renderScope(0);
  }

  /* --------------------------------------------------------------------------
     2. Architecture diagram (one lane's red dot animates at a time)
     ------------------------------------------------------------------------ */
  function initArchitectureDiagram() {
    var root = document.querySelector('[data-arch-diagram]');
    if (!root) return;
    var flows = root.querySelectorAll('.arch-flow');
    if (!flows.length) return;
    if (reduceMotion) { return; } // CSS reduced-motion sets stroke-dasharray:none -> a solid static line per lane

    var active = 0, offset = 0, raf = null, running = false, lastSwitch = 0;
    function frame(now) {
      if (!running) { raf = null; return; }
      offset -= 2.2;
      for (var i = 0; i < flows.length; i++) {
        flows[i].style.opacity = (i === active) ? '1' : '0';
        if (i === active) flows[i].style.strokeDashoffset = offset;
      }
      if (now - lastSwitch > 2600) { active = (active + 1) % flows.length; lastSwitch = now; }
      raf = requestAnimationFrame(frame);
    }
    if (!('IntersectionObserver' in window)) {
      running = true; lastSwitch = 0; raf = requestAnimationFrame(frame); return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        running = e.isIntersecting;
        if (running && !raf) {
          lastSwitch = (window.performance && performance.now) ? performance.now() : 0;
          raf = requestAnimationFrame(frame);
        } else if (!running && raf) { cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0.12 });
    io.observe(root);
  }

  /* --------------------------------------------------------------------------
     3. Debounce ribbon (scroll-scrubbed, read-only)
     ------------------------------------------------------------------------ */
  function initDebounceRibbon() {
    var root = document.querySelector('[data-debounce-ribbon]');
    if (!root) return;
    var dots = [].slice.call(root.querySelectorAll('.ribbon-dot'));
    var tag = root.querySelector('.appeared-tag');
    if (!dots.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var r = root.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var p = clamp((vh - r.top) / (vh * 0.65 + r.height), 0, 1);
      var filled = Math.round(p * dots.length);
      for (var i = 0; i < dots.length; i++) dots[i].classList.toggle('filled', i < filled);
      if (tag) tag.classList.toggle('lit', filled >= dots.length);
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* --------------------------------------------------------------------------
     4. Meltdown / CPU saturation card (fires once on entry; replay button)
     ------------------------------------------------------------------------ */
  function initMeltdownCard() {
    var root = document.querySelector('[data-meltdown-card]');
    if (!root) return;
    var fills = root.querySelectorAll('.core-fill');
    var pcts = root.querySelectorAll('[data-pct]');
    var adb = root.querySelector('[data-adb]');
    var replay = root.querySelector('[data-replay]');
    var ADB = 'adb: device not found';
    var played = false;

    function setFinal() {
      root.classList.add('is-dead');
      for (var i = 0; i < fills.length; i++) fills[i].style.width = '100%';
      for (var j = 0; j < pcts.length; j++) pcts[j].textContent = '100%';
      if (adb) adb.textContent = ADB;
    }
    function typeAdb() {
      if (!adb) return;
      adb.textContent = '';
      var i = 0;
      (function step() {
        adb.textContent = ADB.slice(0, i++);
        if (i <= ADB.length) setTimeout(step, 40);
      })();
    }
    function run() {
      if (reduceMotion) { setFinal(); return; }
      root.classList.remove('is-dead');
      for (var i = 0; i < fills.length; i++) fills[i].style.width = '0%';
      for (var j = 0; j < pcts.length; j++) pcts[j].textContent = '0%';
      if (adb) adb.textContent = '';
      var start = (window.performance && performance.now) ? performance.now() : Date.now();
      var dur = 1600;
      function frame(now) {
        var t = clamp((now - start) / dur, 0, 1);
        var base = Math.min(100, t * 130);
        for (var k = 0; k < fills.length; k++) {
          var jit = (t < 0.94) ? (Math.random() * 8 - 4) : 0;
          fills[k].style.width = clamp(base + jit, 0, 100) + '%';
        }
        for (var m = 0; m < pcts.length; m++) pcts[m].textContent = Math.round(Math.min(100, base)) + '%';
        if (t >= 1) {
          root.classList.add('is-dead');
          for (var a = 0; a < fills.length; a++) fills[a].style.width = '100%';
          for (var b = 0; b < pcts.length; b++) pcts[b].textContent = '100%';
          typeAdb();
        } else requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !played) { played = true; run(); io.unobserve(root); }
        });
      }, { threshold: 0.4 });
      io.observe(root);
    } else { setFinal(); }
    if (replay) replay.addEventListener('click', run);
  }

  /* --------------------------------------------------------------------------
     5. Stat counters (count up on entry)
     ------------------------------------------------------------------------ */
  function initStatsCounters() {
    var root = document.querySelector('[data-stats]');
    if (!root) return;
    var nums = [].slice.call(root.querySelectorAll('.stat-num[data-count-to]'));
    if (!nums.length) return;
    var done = false;
    function run() {
      nums.forEach(function (el) {
        var raw = el.getAttribute('data-count-to');
        var target = parseFloat(raw);
        var dec = raw.indexOf('.') >= 0 ? 2 : 0;
        if (reduceMotion) { el.textContent = target.toFixed(dec); return; }
        var start = (window.performance && performance.now) ? performance.now() : Date.now();
        var dur = 900;
        el.textContent = (0).toFixed(dec);
        function frame(now) {
          var t = clamp((now - start) / dur, 0, 1);
          var e = 1 - Math.pow(1 - t, 3);
          el.textContent = (target * e).toFixed(dec);
          if (t < 1) requestAnimationFrame(frame);
          else el.textContent = target.toFixed(dec);
        }
        requestAnimationFrame(frame);
      });
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && !done) { done = true; run(); io.unobserve(root); } });
      }, { threshold: 0.4 });
      io.observe(root);
    } else { run(); }
  }

  /* --------------------------------------------------------------------------
     6. Reading progress bar + TOC scroll-spy
     ------------------------------------------------------------------------ */
  function initProgressAndTOC() {
    var bar = document.getElementById('read-progress');
    var sections = [].slice.call(document.querySelectorAll('[data-toc-section]'));
    var links = [].slice.call(document.querySelectorAll('[data-toc-link]'));
    function linkFor(id) {
      for (var i = 0; i < links.length; i++) if (links[i].getAttribute('href') === '#' + id) return links[i];
      return null;
    }
    var ticking = false;
    function update() {
      ticking = false;
      if (bar) {
        var sh = document.documentElement.scrollHeight - window.innerHeight;
        var p = sh > 0 ? (window.scrollY || window.pageYOffset) / sh : 0;
        bar.style.width = (clamp(p, 0, 1) * 100) + '%';
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    if (sections.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            var l = linkFor(e.target.id);
            if (l) {
              for (var i = 0; i < links.length; i++) { links[i].classList.remove('active'); links[i].removeAttribute('aria-current'); }
              l.classList.add('active'); l.setAttribute('aria-current', 'location');
              if (l.scrollIntoView && window.innerWidth < 1200) { /* keep active chip visible on mobile */
                try { l.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (_) {}
              }
            }
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(function (s) { io.observe(s); });
    }
  }

  /* --------------------------------------------------------------------------
     7. Scroll reveal (+ hero wave sweep, + code copy buttons)
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
    if (els.length) {
      if (reduceMotion || !('IntersectionObserver' in window)) {
        els.forEach(function (e) { e.classList.add('revealed'); });
      } else {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
        }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
        els.forEach(function (e) { io.observe(e); });
      }
    }

    // hero beep-waveform sweep (one play-sweep)
    var waves = document.querySelectorAll('[data-wave-sweep] path');
    for (var i = 0; i < waves.length; i++) {
      (function (path) {
        var len;
        try { len = path.getTotalLength(); } catch (e) { return; }
        if (reduceMotion) { path.style.strokeDasharray = 'none'; return; }
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        // trigger after paint
        requestAnimationFrame(function () {
          path.style.transition = 'stroke-dashoffset 1.1s ease';
          path.style.strokeDashoffset = '0';
        });
      })(waves[i]);
    }

    // code copy buttons
    var copies = document.querySelectorAll('[data-copy]');
    for (var c = 0; c < copies.length; c++) {
      (function (btnEl) {
        btnEl.addEventListener('click', function () {
          var block = btnEl.closest('.codeblock');
          var code = block ? block.querySelector('code') : null;
          if (!code) return;
          var text = code.textContent;
          var done = function () { var old = btnEl.textContent; btnEl.textContent = 'Copied'; setTimeout(function () { btnEl.textContent = old; }, 1400); };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, function () {});
          } else {
            try {
              var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
              ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done();
            } catch (e) {}
          }
        });
      })(copies[c]);
    }
  }

  /* --------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function boot() {
    initBeepConsole();
    initArchitectureDiagram();
    initDebounceRibbon();
    initMeltdownCard();
    initStatsCounters();
    initProgressAndTOC();
    initScrollReveal();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
