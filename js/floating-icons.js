/**
 * Floating Icons , subtle drifting symbols representing personal interests
 * Renders emoji glyphs at very low opacity, drifting slowly across the viewport
 */
(function () {
  const canvas = document.getElementById('floating-icons');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  // Icons representing interests: space, AI, philosophy, sports, tech
  const GLYPHS = [
    '\u2728',   // sparkles (cosmos)
    '\u269B',   // atom (science)
    '\u26BD',   // football
    '\u{1F3CF}', // cricket bat
    '\u{1F3BE}', // tennis
    '\u{1F3C0}', // basketball
    '\u{1F3CE}', // racing car (F1)
    '\u{1F52D}', // telescope
    '\u{1F680}', // rocket
    '\u{1F9E0}', // brain (AI)
    '\u{1F4D6}', // book (philosophy)
    '\u{1F30C}', // milky way
    '\u{1F916}', // robot (ML)
    '\u2B50',   // star
  ];

  const ICON_COUNT = isMobile ? 10 : 22;
  let width, height;
  let icons = [];
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createIcons() {
    icons = [];
    for (let i = 0; i < ICON_COUNT; i++) {
      icons.push({
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + 10,            // 10-24px
        baseAlpha: Math.random() * 0.04 + 0.02,   // 0.02-0.06 , very subtle
        alpha: 0,
        driftX: (Math.random() - 0.5) * 0.15,     // slow horizontal drift
        driftY: -(Math.random() * 0.12 + 0.04),   // gentle upward float
        rotSpeed: (Math.random() - 0.5) * 0.003,
        rotation: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.008 + 0.003,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);

    for (const icon of icons) {
      // Pulse alpha
      if (!prefersReduced) {
        icon.alpha = icon.baseAlpha + Math.sin(time * icon.pulseSpeed + icon.pulseOffset) * 0.015;
        icon.alpha = Math.max(0.01, Math.min(0.08, icon.alpha));
      } else {
        icon.alpha = icon.baseAlpha;
      }

      // Drift position
      if (!prefersReduced) {
        icon.x += icon.driftX;
        icon.y += icon.driftY;
        icon.rotation += icon.rotSpeed;

        // Wrap around edges
        if (icon.y < -30) icon.y = height + 30;
        if (icon.x < -30) icon.x = width + 30;
        if (icon.x > width + 30) icon.x = -30;
      }

      // Draw
      ctx.save();
      ctx.translate(icon.x, icon.y);
      ctx.rotate(icon.rotation);
      ctx.globalAlpha = icon.alpha;
      ctx.font = `${icon.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Slight red tint glow effect behind each icon
      if (!prefersReduced && !isMobile) {
        ctx.shadowColor = 'rgba(229, 9, 20, 0.12)';
        ctx.shadowBlur = 15;
      }

      ctx.fillText(icon.glyph, 0, 0);
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  // Resize
  window.addEventListener('resize', () => {
    resize();
    createIcons();
  });

  // Init
  resize();
  createIcons();
  requestAnimationFrame(draw);
})();
