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

    // // Toggle light/dark mode with a single event listener
    // document.querySelector(".theme-btn").addEventListener("click", () => {
    //     console.log('Theme button clicked!');
    //     document.body.classList.toggle("light-mode");
    // });

// ---- Theme cycler (Dark -> Light -> Red) ----
const THEME_KEY = "site-theme";
const THEMES = ["dark", "light-mode", "red-mode"]; // class names on <body>
const btn = document.querySelector(".theme-btn");

// init
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved && THEMES.includes(saved)) {
    applyTheme(saved);
  } else {
    applyTheme("dark"); // default
  }
})();

btn.addEventListener("click", () => {
  const current = getCurrentTheme();
  const idx = THEMES.indexOf(current);
  const next = THEMES[(idx + 1) % THEMES.length];
  applyTheme(next, true);
});

function getCurrentTheme() {
  // body has either no class (dark) or one of the theme classes
  if (document.body.classList.contains("light-mode")) return "light-mode";
  if (document.body.classList.contains("red-mode")) return "red-mode";
  return "dark";
}

function applyTheme(name, persist = false) {
  document.body.classList.remove("light-mode", "red-mode");
  if (name !== "dark") document.body.classList.add(name);
  if (persist) localStorage.setItem(THEME_KEY, name);
}




    // Modal handling
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalProfessor = document.getElementById('modal-professor');
    const closeBtn = document.querySelector('.close');

    // Function to open modal with content
    const openModal = (title, description, professor) => {
        modal.style.display = 'flex'; // Change to flex to center content
        modalTitle.innerText = title;
        modalDescription.innerText = description;
        modalProfessor.innerText = `Professor: ${professor}`;
    };

    // Attach click event listeners to each blog post in the #research-projects section
    const blogs = document.querySelectorAll('#research-projects .blog');
    blogs.forEach(blog => {
        blog.addEventListener('click', () => {
            const title = blog.getAttribute('data-title');
            const description = blog.getAttribute('data-description');
            const professor = blog.getAttribute('data-professor');
            openModal(title, description, professor);
        });
    });

    // Close modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });


    
    // document.querySelector(".theme-btn").addEventListener("click", () => {
    //     console.log('Theme button clicked!');
    //     document.body.classList.toggle("red-mode");
    // });    


    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
