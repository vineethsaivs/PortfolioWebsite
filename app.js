// Section router. Every nav item is a real link; the URL hash picks the section,
// so keyboard, Back and shared links work without extra code. A hash can also name
// an element inside a section (#research-projects, #blogs, #favourite-sports).
(() => {
    const sections = document.querySelectorAll('.container');
    const links = document.querySelectorAll('.control');
    const homeTitle = document.title;
    let universe;

    const loadUniverse = () => {
        // Three.js is only downloaded by visitors who open the universe.
        universe ||= import('./js/passions-universe.js').catch((err) => {
            console.error(err);
            const box = document.getElementById('universe-loading');
            box.classList.add('failed');
            box.querySelector('p').textContent =
                "The 3D scene didn't load. Check your connection and reload the page. The essays are under Off hours.";
        });
    };

    const route = (fromUser) => {
        const el = document.getElementById(location.hash.slice(1)) || document.getElementById('home');
        const section = el.closest('.container');
        if (!section) return; // e.g. #main from the skip link

        document.getElementById('dive').close(); // Back button while an essay is open
        sections.forEach((s) => s.classList.toggle('active', s === section));
        links.forEach((a) => {
            const on = a.dataset.id === section.id;
            a.classList.toggle('active-btn', on);
            if (on) a.setAttribute('aria-current', 'page');
            else a.removeAttribute('aria-current');
        });

        const label = document.querySelector(`.control[data-id="${section.id}"]`)?.textContent.trim();
        document.title = section.id === 'home' ? homeTitle : `${label} | Vineeth Sai`;

        if (fromUser) section.focus({ preventScroll: true });
        if (el === section) window.scrollTo(0, 0);
        else el.scrollIntoView();
        if (section.id === 'my-universe') loadUniverse();
    };

    window.addEventListener('hashchange', () => route(true));
    route(false);

    document.querySelector('.skip-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.container.active').focus();
    });

    // Contact: copy the address, or hand the message to the visitor's email app.
    const EMAIL = 'vineethsai4444@gmail.com';
    const copyStatus = document.getElementById('copy-status');
    document.getElementById('copy-email').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            copyStatus.textContent = 'Copied.';
        } catch {
            copyStatus.textContent = "Couldn't copy. Select the address and copy it.";
        }
    });

    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // native validation has already passed
        const name = form.elements.name.value.trim();
        const topic = form.elements.topic.value;
        const subject = topic ? `${topic}, from ${name}` : `Hello from ${name}`;
        const body = `${form.elements.message.value.trim()}\n\n${name}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        document.getElementById('formStatus').textContent =
            `Draft opened in your email app. Nothing opened? Write to ${EMAIL}.`;
    });

    // Local time in San Francisco, so a visitor knows when a reply is likely.
    const sfTime = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' });
    const showTime = () => { document.getElementById('local-time').textContent = `${sfTime.format(new Date())} Pacific`; };
    showTime();
    setInterval(showTime, 20000);

    // Magnetic hero buttons: a small pull toward the cursor, precise pointers only.
    if (window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
        const pull = (d) => Math.max(-7, Math.min(7, d * 0.25));
        document.querySelectorAll('[data-magnetic]').forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const r = el.getBoundingClientRect();
                el.style.transform = `translate(${pull(e.clientX - r.left - r.width / 2)}px, ${pull(e.clientY - r.top - r.height / 2)}px)`;
            });
            el.addEventListener('mouseleave', () => { el.style.transform = ''; });
        });
    }
})();
