/* decisions-or-tokens.js. Reading progress, TOC scroll-spy, reveal, and the best-of-17 simulator.
   Vanilla ES, one IIFE. Every part has a reduced-motion or no-JS fallback: the page reads fully without it. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function progressAndToc() {
    var bar = document.getElementById('read-progress');
    var sections = [].slice.call(document.querySelectorAll('[data-toc-section]'));
    var links = [].slice.call(document.querySelectorAll('[data-toc-link]'));
    var ticking = false;
    function update() {
      ticking = false;
      if (!bar) return;
      var sh = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (clamp(sh > 0 ? (window.scrollY || 0) / sh : 0, 0, 1) * 100) + '%';
    }
    function on() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on, { passive: true });
    update();
    if (!sections.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) {
          var on = l.getAttribute('href') === '#' + e.target.id;
          l.classList.toggle('active', on);
          if (on) { l.setAttribute('aria-current', 'location'); if (window.innerWidth < 1200 && l.scrollIntoView) { try { l.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (_) {} } }
          else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  function reveal() {
    var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('revealed'); }); }
    else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
      }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
      els.forEach(function (e) { io.observe(e); });
    }
    [].slice.call(document.querySelectorAll('[data-wave-sweep] path')).forEach(function (p) {
      var len; try { len = p.getTotalLength(); } catch (_) { return; }
      if (reduce) return;
      p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
      requestAnimationFrame(function () { p.style.transition = 'stroke-dashoffset 1.1s ease'; p.style.strokeDashoffset = '0'; });
    });
  }

  /* Best of 17 simulator. Mean 34.59 and SD 3.39 are the paper's own numbers for the 17 valid draws. */
  function simulator() {
    var root = document.querySelector('[data-sim]');
    if (!root) return;
    var MEAN = 34.59, SD = 3.39, N = 17, TARGET = 40.98, NS = 'http://www.w3.org/2000/svg';
    var dots = root.querySelector('.sim-dots'), hist = root.querySelector('.sim-hist');
    var read = root.querySelector('[data-sim-best]'), foot = root.querySelector('[data-sim-foot]');
    var btn = root.querySelector('[data-sim-roll]');
    function gauss() { var u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function season() { var a = []; for (var i = 0; i < N; i++) a.push(MEAN + SD * gauss()); return a; }
    function el(t, at, txt) { var e = document.createElementNS(NS, t); for (var k in at) e.setAttribute(k, at[k]); if (txt != null) e.textContent = txt; return e; }
    var LO = 24, HI = 46;

    function drawDots(a) {
      var W = 720, H = 220, L = 44, R = 14, T = 14, B = 26, pw = W - L - R, ph = H - T - B;
      var Y = function (v) { return T + ph - (v - LO) / (HI - LO) * ph; };
      var X = function (i) { return L + (i + 0.5) / N * pw; };
      dots.textContent = '';
      [25, 30, 35, 40, 45].forEach(function (v) {
        dots.appendChild(el('line', { x1: L, x2: W - R, y1: Y(v), y2: Y(v), class: 'c-grid' }));
        dots.appendChild(el('text', { x: L - 8, y: Y(v) + 4, class: 'c-tick', 'text-anchor': 'end' }, v));
      });
      dots.appendChild(el('line', { x1: L, x2: W - R, y1: Y(TARGET), y2: Y(TARGET), class: 'c-target' }));
      dots.appendChild(el('text', { x: W - R - 2, y: Y(TARGET) - 6, class: 'c-note', 'text-anchor': 'end' }, 'my best: 40.98'));
      var mx = Math.max.apply(null, a), mi = a.indexOf(mx);
      a.forEach(function (v, i) {
        if (i === mi) dots.appendChild(el('circle', { cx: X(i), cy: Y(v), r: 11, class: 'c-ring' }));
        dots.appendChild(el('circle', { cx: X(i), cy: Y(v), r: 4.5, class: 'c-dot-a' }));
      });
      dots.appendChild(el('text', { x: L + pw / 2, y: H - 4, class: 'c-tick', 'text-anchor': 'middle' }, 'day 1 to day 17'));
      read.textContent = 'Best of 17: ' + mx.toFixed(2) + (mx >= TARGET ? '. That beats my 40.98.' : '. Mine was 40.98.');
    }

    var bests = null;
    function drawHist() {
      if (!bests) { bests = []; for (var k = 0; k < 5000; k++) bests.push(Math.max.apply(null, season())); }
      var W = 720, H = 216, L = 44, R = 14, T = 12, B = 44, pw = W - L - R, ph = H - T - B;
      var lo = 34, hi = 48, bw = 0.5, nb = Math.round((hi - lo) / bw), c = new Array(nb).fill(0);
      bests.forEach(function (b) { var i = Math.floor((b - lo) / bw); if (i >= 0 && i < nb) c[i]++; });
      var mxc = Math.max.apply(null, c);
      var X = function (v) { return L + (v - lo) / (hi - lo) * pw; };
      hist.textContent = '';
      hist.appendChild(el('line', { x1: L, x2: W - R, y1: T + ph, y2: T + ph, class: 'c-axis' }));
      c.forEach(function (n, i) {
        var h = n / mxc * ph, x = X(lo + i * bw);
        hist.appendChild(el('rect', { x: x + 1, y: T + ph - h, width: pw / nb - 2, height: h, rx: 3, class: (lo + i * bw >= TARGET - 0.001) ? 'c-bar-b' : 'c-bar-n' }));
      });
      [36, 38, 40, 42, 44, 46].forEach(function (v) { hist.appendChild(el('text', { x: X(v), y: H - 24, class: 'c-tick', 'text-anchor': 'middle' }, v)); });
      hist.appendChild(el('text', { x: L + pw / 2, y: H - 4, class: 'c-tick', 'text-anchor': 'middle' }, 'best draw of 17, over 5,000 simulated seasons'));
      hist.appendChild(el('line', { x1: X(TARGET), x2: X(TARGET), y1: T, y2: T + ph, class: 'c-target' }));
      var s = bests.slice().sort(function (a, b) { return a - b; });
      var med = s[Math.floor(s.length / 2)], p = bests.filter(function (b) { return b >= TARGET; }).length / bests.length;
      foot.textContent = 'Across 5,000 simulated seasons the typical best draw is ' + med.toFixed(1) + '. A best of 40.98 or more shows up in about ' + Math.round(p * 100) + '% of them (red bars), with no improvement at all.';
    }

    var cur = season();
    drawDots(cur); drawHist();
    read.textContent = 'Press the button to draw 17 more days.';
    btn.addEventListener('click', function () { cur = season(); drawDots(cur); });
  }

  progressAndToc(); reveal(); simulator();
})();
