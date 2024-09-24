// (function () {
//     [...document.querySelectorAll(".control")].forEach(button => {
//         button.addEventListener("click", function() {
//             document.querySelector(".active-btn").classList.remove("active-btn");
//             this.classList.add("active-btn");
//             document.querySelector(".active").classList.remove("active");
//             document.getElementById(button.dataset.id).classList.add("active");
//         })
//     });
//     document.querySelector(".theme-btn").addEventListener("click", () => {
//         document.body.classList.toggle("light-mode");
//     })
// })();



// document.addEventListener('DOMContentLoaded', () => {
//     // Activate navigation controls
//     [...document.querySelectorAll(".control")].forEach(button => {
//         button.addEventListener("click", function() {
//             document.querySelector(".active-btn").classList.remove("active-btn");
//             this.classList.add("active-btn");
//             document.querySelector(".active").classList.remove("active");
//             document.getElementById(button.dataset.id).classList.add("active");
//         });
//     });

//     // Toggle light/dark mode
//     document.querySelector(".theme-btn").addEventListener("click", () => {
//         document.body.classList.toggle("light-mode");
//     });

//     // Modal handling
//     const modal = document.getElementById('modal');
//     const modalTitle = document.getElementById('modal-title');
//     const modalDescription = document.getElementById('modal-description');
//     const modalProfessor = document.getElementById('modal-professor');
//     const closeBtn = document.querySelector('.close');

//     // Function to open modal with content
//     const openModal = (title, description, professor) => {
//         modal.style.display = 'flex'; // Change to flex to center content
//         modalTitle.innerText = title;
//         modalDescription.innerText = description;
//         modalProfessor.innerText = `Professor: ${professor}`;
//     };

//     // Attach click event listeners to each blog post
//     const blogs = document.querySelectorAll('.blog');
//     blogs.forEach(blog => {
//         blog.addEventListener('click', () => {
//             const title = blog.getAttribute('data-title');
//             const description = blog.getAttribute('data-description');
//             const professor = blog.getAttribute('data-professor');
//             openModal(title, description, professor);
//         });
//     });

//     // Close modal when the close button is clicked
//     closeBtn.addEventListener('click', () => {
//         modal.style.display = 'none';
//     });

//     // Close modal when clicking outside the modal content
//     window.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             modal.style.display = 'none';
//         }
//     });
// });


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

    // Toggle light/dark mode
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        console.log('Theme button clicked!'); // Add this for debugging
        document.body.classList.toggle("light-mode");
    });


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

    // Attach click event listeners to each blog post only inside the #research-projects section
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

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
