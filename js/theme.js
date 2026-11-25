// One theme for the whole site. Dark is the default; the visitor's choice is remembered.
// An inline script in <head> sets data-theme before first paint; this wires the toggle.
(function () {
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  var button = document.querySelector('.theme-toggle, .tb-theme');

  function stored() {
    try { return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'; }
    catch (e) { return root.dataset.theme; }
  }
  function apply(theme) {
    root.dataset.theme = theme;
    if (meta) meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');
    if (button) button.setAttribute('aria-label', 'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme');
    window.dispatchEvent(new Event('themechange'));
  }

  apply(root.dataset.theme);
  if (button) button.addEventListener('click', function () {
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', next); } catch (e) {}
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return apply(next);
    // The new theme spreads out from the button.
    var r = button.getBoundingClientRect();
    var at = ' at ' + (r.left + r.width / 2) + 'px ' + (r.top + r.height / 2) + 'px)';
    document.startViewTransition(function () { apply(next); }).ready.then(function () {
      root.animate({ clipPath: ['circle(0' + at, 'circle(150vmax' + at] },
        { duration: 650, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' });
    }, function () {});
  });

  // Pick up a choice made on another page (Back button) or in another tab.
  window.addEventListener('pageshow', function (e) { if (e.persisted) apply(stored()); });
  window.addEventListener('storage', function (e) { if (e.key === 'theme') apply(stored()); });
})();
