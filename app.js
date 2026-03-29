document.addEventListener('DOMContentLoaded', () => {
    // Activate navigation controls
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

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

            const ENDPOINT = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
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
                setStatus('Something went wrong. Please email me directly.', false);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send';
            }
        });
    }
});
