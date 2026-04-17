/**
 * Starfield , twinkling canvas stars with cursor parallax + glow tracking
 */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  const STAR_COUNT = isMobile ? 50 : 150;

  let width, height, mouseX = 0, mouseY = 0;
  let stars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        alpha: 0,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.5 + 0.5
      });
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    // Subtle gradient wash , gives depth instead of flat black
    var grd = ctx.createRadialGradient(width * 0.3, height * 0.2, 0, width * 0.3, height * 0.2, width * 0.7);
    grd.addColorStop(0, 'rgba(229, 9, 20, 0.015)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    var grd2 = ctx.createRadialGradient(width * 0.8, height * 0.8, 0, width * 0.8, height * 0.8, width * 0.5);
    grd2.addColorStop(0, 'rgba(255, 255, 255, 0.008)');
    grd2.addColorStop(1, 'transparent');
    ctx.fillStyle = grd2;
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const parallaxEnabled = !prefersReduced && !isMobile;

    for (const star of stars) {
      // Twinkle
      if (!prefersReduced) {
        star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3;
        star.alpha = Math.max(0.05, Math.min(1, star.alpha));
      } else {
        star.alpha = star.baseAlpha;
      }

      // Parallax offset
      let drawX = star.x;
      let drawY = star.y;
      if (parallaxEnabled) {
        const offX = (mouseX - centerX) * 0.015 * star.depth;
        const offY = (mouseY - centerY) * 0.015 * star.depth;
        drawX += offX;
        drawY += offY;
      }

      // Draw
      ctx.beginPath();
      ctx.arc(drawX, drawY, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226, 232, 240, ${star.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  // Mouse tracking for parallax + cursor glow CSS vars
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
  });

  // Resize
  window.addEventListener('resize', () => {
    resize();
    createStars();
  });

  // Init
  resize();
  createStars();
  requestAnimationFrame(draw);
})();
