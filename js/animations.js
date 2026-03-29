/**
 * Animations — scroll reveal, typing effect, card tilt, counter animation
 */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll Reveal (section-aware) ── */
  function revealElements(container) {
    const elements = container.querySelectorAll('[data-reveal]:not(.revealed)');
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, i * 100);
    });
  }

  // Observe .active class changes on sections
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        const target = m.target;
        if (target.classList.contains('active')) {
          // Small delay to let CSS transition start
          setTimeout(() => revealElements(target), 150);
        }
      }
    });
  });

  // Observe all containers
  document.querySelectorAll('.container').forEach((section) => {
    observer.observe(section, { attributes: true, attributeFilter: ['class'] });
  });

  // Reveal already-active section on load
  const activeSection = document.querySelector('.container.active, header.active');
  if (activeSection) {
    setTimeout(() => revealElements(activeSection), 300);
  }

  /* ── Skills Accordion ── */
  document.querySelectorAll('.skill-category .category-title').forEach((title) => {
    title.addEventListener('click', () => {
      const category = title.parentElement;
      category.classList.toggle('open');
    });
  });

  /* ── Typing Effect ── */
  const typingEl = document.querySelector('.typing-text');
  if (typingEl && !prefersReduced) {
    const roles = [
      'AI Engineer @ AT&T',
      'ML/AI Research Engineer',
      'Astrophysics Enthusiast',
      'Sports Fan',
      'Philosophy Buff',
      'Tech Explorer',
      'Lifelong Learner'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const current = roles[roleIndex];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // pause before next word
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 600);
  } else if (typingEl && prefersReduced) {
    // Static text for reduced motion
    typingEl.textContent = 'AI Engineer @ AT&T';
    const cursor = document.querySelector('.typing-cursor');
    if (cursor) cursor.style.display = 'none';
  }

  /* ── Card Tilt Micro-interaction ── */
  if (!prefersReduced) {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const isHovering =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isHovering) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const rotateY = ((e.clientX - centerX) / rect.width) * 6;
          const rotateX = ((centerY - e.clientY) / rect.height) * 6;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
      });
    });

    document.addEventListener('mouseleave', () => {
      document.querySelectorAll('.glass-card').forEach((card) => {
        card.style.transform = '';
      });
    });

    // Reset tilt on mouse leave per card
    document.addEventListener('mouseout', (e) => {
      if (e.target.classList && e.target.classList.contains('glass-card')) {
        e.target.style.transform = '';
      }
    });
  }

  /* ── Counter Animation ── */
  function animateCounters(container) {
    const counters = container.querySelectorAll('.counter');
    counters.forEach((el) => {
      const target = Number(el.dataset.target || el.textContent.replace(/\D/g, '') || 0);
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const start = performance.now();

      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(eased * target);
        el.textContent = value + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }

  // Run counters when about section becomes active
  const aboutObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.target.classList.contains('active') && m.target.id === 'about') {
        animateCounters(m.target);
      }
    });
  });

  const aboutSection = document.querySelector('#about.container, section#about');
  if (aboutSection) {
    aboutObserver.observe(aboutSection, { attributes: true, attributeFilter: ['class'] });
  }

  // Also trigger if already active
  const activeAbout = document.querySelector('.container.active #about, section.active');
  if (activeAbout) {
    const aboutContainer = activeAbout.querySelector('.about-container') || activeAbout;
    animateCounters(aboutContainer);
  }
})();
