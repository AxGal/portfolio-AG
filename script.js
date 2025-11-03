/* ========================================
   SMOOTH SCROLLING - Navigation ancres
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Fermer le menu burger sur mobile après clic
            const navToggle = document.getElementById('nav-toggle');
            if (navToggle && navToggle.checked) {
                navToggle.checked = false;
            }
        }
    });
});

/* ========================================
   SCROLL ANIMATIONS - Intersection Observer
   ======================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ========================================
   FORM SUBMISSION
   ======================================== */

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        this.reset();
    });
}

/* ========================================
   ACTIVE NAVIGATION LINK - Scroll detection
   ======================================== */

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ========================================
   CAROUSEL - Gestion des projets
   ======================================== */

function initCarousel() {
    const projectsGrid = document.getElementById('projectsGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!projectsGrid || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let projectsPerView = 3;
    const totalProjects = projectsGrid.children.length;

    function updateCarousel() {
        const cardWidth = 376; // pixels
        const gap = 32; // 2rem = 32px (1rem = 16px)
        const offset = -currentIndex * (cardWidth + gap);
        projectsGrid.style.transform = `translateX(${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalProjects - projectsPerView;
        }
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalProjects - projectsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    function handleResize() {
        if (window.innerWidth <= 768) {
            projectsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            projectsPerView = 2;
        } else {
            projectsPerView = 3;
        }
        currentIndex = 0;
        updateCarousel();
    }

    window.addEventListener('resize', handleResize);
    handleResize();
}

// Initialiser le carrousel au chargement
document.addEventListener('DOMContentLoaded', initCarousel);

/* ========================================
   TABS FUNCTIONALITY - Navigation tabs
   ======================================== */

document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // Remove active class from all panes and buttons
        document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        document.querySelectorAll('.tab-pane')[index].classList.add('active');
        btn.classList.add('active');
    });
});

/* ========================================
   ACCORDION FUNCTIONALITY
   ======================================== */

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        header.parentElement.classList.toggle('active');
    });
});

// Alternative accordion function for onclick handlers
function toggleAccordion(headerElement) {
    headerElement.parentElement.classList.toggle('active');
}