// Theme toggle for the blog pages. Light is the default (set in <head>); the choice is remembered.
(function () {
  var root = document.documentElement, meta = document.querySelector('meta[name="theme-color"]');
  function sync() { if (meta) meta.setAttribute('content', root.dataset.theme === 'light' ? '#fcfcfb' : '#0a0a0a'); }
  sync();
  var b = document.querySelector('.tb-theme'); if (!b) return;
  b.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    sync();
  });
})();
