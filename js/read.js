// A "read": the visitor reached the end of the post and had it on screen for a minute.
// Sent once per page load as the GoatCounter event read/<post>. It is an estimate.
(() => {
  const end = document.querySelector('.article-footer');
  if (!end) return;
  let seconds = 0;
  let reachedEnd = false;
  new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) reachedEnd = true;
  }).observe(end);
  const timer = setInterval(() => {
    if (!document.hidden) seconds += 1;
    // goatcounter is missing when an ad blocker stops it
    if (seconds < 60 || !reachedEnd || !window.goatcounter?.count) return;
    clearInterval(timer);
    const post = location.pathname.split('/').pop().replace('.html', '');
    window.goatcounter.count({ path: `read/${post}`, title: `Read: ${document.title}`, event: true });
  }, 1000);
})();
