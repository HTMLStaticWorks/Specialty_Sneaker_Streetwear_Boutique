/* 
    Face Painting & Glitter Tattoo Entertainment - Main JS
    Features: Dark Mode, RTL, Floating Particles, Scroll Reveals
*/

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFloatingParticles();
    initDarkMode();
    initRTL();
    initScrollAnimations();
    initPasswordToggles();
    initBackToTop();
});

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar-custom');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'glass-effect');
        } else {
            navbar.classList.remove('scrolled', 'glass-effect');
        }
    });

    // Mobile Menu Close on Link Click
    const navLinks = document.querySelectorAll('.nav-link');
    const menuCollapse = document.querySelector('.navbar-collapse');
    if (menuCollapse) {
        const bsCollapse = new bootstrap.Collapse(menuCollapse, { toggle: false });
        navLinks.forEach(l => {
            l.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    bsCollapse.hide();
                }
            });
        });
    }
}

// Floating Glitter Particles
function initFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 40;
    const colors = ['#ff5500', '#c9a84c', '#ff8800', '#ffffff', '#555555'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;

        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.filter = 'blur(1px)';

        // Random drift animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;

        particle.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 0.2 },
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg)`, opacity: 0.6 },
            { transform: 'translate(0, 0) rotate(720deg)', opacity: 0.2 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: 'linear'
        });

        container.appendChild(particle);
    }
}

// Dark Mode Toggle
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;

    const currentMode = localStorage.getItem('theme');
    if (currentMode === 'dark') {
        document.body.classList.add('dark-mode');
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', mode);
    });
}

// RTL Toggle
function initRTL() {
    const toggle = document.getElementById('rtlToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const isRTL = document.documentElement.dir === 'rtl';
        document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
        document.documentElement.lang = isRTL ? 'en' : 'ar';
        // Reload page or update text alignments if needed
    });
}

// Scroll Reveal Animations
function initScrollAnimations() {
    const observers = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-glow').forEach(el => observers.observe(el));
}


// Gallery Filtering
window.filterGallery = (category) => {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.classList.add('animate-reveal');
        } else {
            item.style.display = 'none';
        }
    });
};

// Login/Signup Password Visibility Toggle
function initPasswordToggles() {
    const toggles = document.querySelectorAll('[data-toggle-password]');
    if (!toggles.length) return;

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetSelector = toggle.getAttribute('data-toggle-password');
            const input = document.querySelector(targetSelector);
            if (!input) return;

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            toggle.innerHTML = isPassword ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
            toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });
    });
}

// Back-to-Top Button (excluded on auth pages)
function initBackToTop() {
    if (document.body.classList.contains('login-page') || document.body.classList.contains('signup-page')) return;

    let button = document.getElementById('backToTop');
    if (!button) {
        button = document.createElement('button');
        button.id = 'backToTop';
        button.className = 'back-to-top';
        button.type = 'button';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = '<i class="bi bi-arrow-up"></i>';
        document.body.appendChild(button);
    }

    const toggleVisibility = () => {
        if (window.scrollY > 260) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
