document.addEventListener('DOMContentLoaded', () => {
    // ── Section navigation (with shareable #hash deep links) ──
    const activateSection = (id, updateHash = true) => {
        const control = document.querySelector(`.control[data-id="${id}"]`);
        const target = document.getElementById(id);
        if (!control || !target) return false;
        document.querySelector(".active-btn")?.classList.remove("active-btn");
        control.classList.add("active-btn");
        document.querySelector(".active")?.classList.remove("active");
        target.classList.add("active");
        if (updateHash) {
            history.replaceState(null, '', id === 'home' ? location.pathname + location.search : `#${id}`);
        }
        return true;
    };

    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            // Anchor controls (e.g. the Blog link) have no data-id: let them navigate.
            if (!this.dataset.id) return;
            activateSection(this.dataset.id);
        });
    });

    // Open the section named in the URL (e.g. vineethsai.me/#contact)
    const openFromHash = () => {
        const id = location.hash.slice(1);
        if (id) activateSection(id, false);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);

    // ── Modal handling ──
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalProfessor = document.getElementById('modal-professor');
    const closeBtn = document.querySelector('.close');

    const openModal = (title, description, professor) => {
        modal.style.display = 'flex';
        modalTitle.innerText = title;
        modalDescription.innerText = description;
        modalProfessor.innerText = `Professor: ${professor}`;
    };

    const blogs = document.querySelectorAll('#research-projects .blog');
    blogs.forEach(blog => {
        blog.addEventListener('click', () => {
            const title = blog.getAttribute('data-title');
            const description = blog.getAttribute('data-description');
            const professor = blog.getAttribute('data-professor');
            openModal(title, description, professor);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ── Contact form handler ──
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    if (form && submitBtn && status) {
        function setStatus(msg, ok) {
            status.textContent = msg;
            status.style.color = ok ? '#22c55e' : '#e50914';
        }

        // Paste a real Google Apps Script web app URL here to send messages via fetch.
        // While it is empty, the form composes an email draft instead, so no message
        // is ever silently lost.
        const ENDPOINT = '';
        const CONTACT_EMAIL = 'vineethsai4444@gmail.com';

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                setStatus('Please fill all required fields correctly.', false);
                return;
            }
            if (form.website && form.website.value) {
                setStatus('Spam detected.', false);
                return;
            }

            if (!ENDPOINT) {
                const subject = form.subject.value.trim() || `Hello from ${form.name.value.trim()}`;
                const body = `${form.message.value.trim()}\n\n${form.name.value.trim()}\n${form.email.value.trim()}`;
                window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                setStatus('Opening your email app with this message. Just hit send there.', true);
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending\u2026';
            setStatus('', true);

            try {
                const formData = new FormData(form);
                formData.append('source', 'portfolio-contact');
                formData.append('timestamp', new Date().toISOString());
                await fetch(ENDPOINT, { method: 'POST', body: formData, mode: 'no-cors' });
                form.reset();
                setStatus('Thanks! Your message has been sent.', true);
            } catch (err) {
                console.error(err);
                setStatus(`Something went wrong. Please email me directly at ${CONTACT_EMAIL}.`, false);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
});
