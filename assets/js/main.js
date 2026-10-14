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
    initQuickFilters();
    initLaunchCountdowns();
    initSpotlightTabs();
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


// Gallery & Release Calendar Filtering
function initQuickFilters() {
    const filterContainer = document.querySelector('.quick-filters-card');
    if (!filterContainer) return;
    runQuickFilters();
}

window.runQuickFilters = () => {
    const brandEl = document.getElementById('filterBrand');
    const luxuryEl = document.getElementById('filterLuxury');
    const categoryEl = document.getElementById('filterCategory');
    const sizeEl = document.getElementById('filterSize');
    const priceEl = document.getElementById('filterPrice');
    const statusEl = document.getElementById('filterStatus');

    const brandVal = brandEl ? brandEl.value : 'all';
    const luxuryVal = luxuryEl ? luxuryEl.value : 'all';
    const categoryVal = categoryEl ? categoryEl.value : 'all';
    const sizeVal = sizeEl ? sizeEl.value : 'all';
    const priceVal = priceEl ? priceEl.value : 'all';
    const statusVal = statusEl ? statusEl.value : 'all';

    const items = document.querySelectorAll('.gallery-item');
    let visibleCount = 0;

    items.forEach(item => {
        // 1. Brand match
        const itemBrand = (item.dataset.brand || item.dataset.category || '').toLowerCase();
        let matchBrand = (brandVal === 'all') || itemBrand.includes(brandVal.toLowerCase());

        // 2. Luxury Label match
        const itemLuxury = (item.dataset.luxuryLabel || '').toLowerCase();
        let matchLuxury = (luxuryVal === 'all') || (itemLuxury === luxuryVal.toLowerCase());

        // 3. Category match
        const itemCategory = (item.dataset.category || '').toLowerCase();
        let matchCategory = (categoryVal === 'all') || (itemCategory === categoryVal.toLowerCase());

        // 4. Size match
        const rawSizes = (item.dataset.sizes || '').toLowerCase();
        const itemSizes = rawSizes ? rawSizes.split(',').map(s => s.trim()) : [];
        let matchSize = false;
        if (sizeVal === 'all') {
            matchSize = true;
        } else if (sizeVal === 'us-6-7.5') {
            const range = ['5', '5.5', '6', '6.5', '7', '7.5'];
            matchSize = range.some(s => itemSizes.includes(s));
        } else if (sizeVal === 'us-8-9.5') {
            const range = ['8', '8.5', '9', '9.5'];
            matchSize = range.some(s => itemSizes.includes(s));
        } else if (sizeVal === 'us-10-11.5') {
            const range = ['10', '10.5', '11', '11.5'];
            matchSize = range.some(s => itemSizes.includes(s));
        } else if (sizeVal === 'us-12-14') {
            const range = ['12', '12.5', '13', '13.5', '14'];
            matchSize = range.some(s => itemSizes.includes(s));
        } else {
            matchSize = itemSizes.includes(sizeVal.toLowerCase());
        }

        // 5. Price match
        const itemPrice = parseFloat(item.dataset.price || '0');
        let matchPrice = false;
        if (priceVal === 'all') {
            matchPrice = true;
        } else if (priceVal === 'under-150') {
            matchPrice = itemPrice > 0 && itemPrice < 150;
        } else if (priceVal === '150-200') {
            matchPrice = itemPrice >= 150 && itemPrice <= 200;
        } else if (priceVal === '200-250') {
            matchPrice = itemPrice >= 200 && itemPrice <= 250;
        } else if (priceVal === 'above-250') {
            matchPrice = itemPrice > 250;
        }

        // 6. Release Status match
        const itemStatus = (item.dataset.releaseStatus || '').toLowerCase();
        let matchStatus = false;
        if (statusVal === 'all') {
            matchStatus = true;
        } else if (statusVal === 'raffle-open') {
            matchStatus = itemStatus.includes('raffle');
        } else {
            matchStatus = itemStatus.includes(statusVal.toLowerCase());
        }

        if (matchBrand && matchLuxury && matchCategory && matchSize && matchPrice && matchStatus) {
            item.style.display = '';
            item.classList.remove('d-none');
            visibleCount++;
        } else {
            item.style.display = 'none';
            item.classList.add('d-none');
        }
    });

    // Update Counter Badge
    const countBadge = document.getElementById('quickFilterCount');
    if (countBadge) {
        countBadge.textContent = `${visibleCount} Drop${visibleCount === 1 ? '' : 's'} Available`;
    }

    // Update Empty State
    const noDropsCard = document.getElementById('noDropsFoundCard');
    if (noDropsCard) {
        if (visibleCount === 0) {
            noDropsCard.classList.remove('d-none');
        } else {
            noDropsCard.classList.add('d-none');
        }
    }

    // Render Active Filter Badges
    window.renderActiveFilterTags();
};

window.applyQuickPill = (type, btn, val) => {
    document.querySelectorAll('.btn-quick-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (type === 'all') {
        window.resetAllQuickFilters(false);
        return;
    }

    // Reset dropdowns then apply specific pill filter
    const fields = ['filterBrand', 'filterLuxury', 'filterCategory', 'filterSize', 'filterPrice', 'filterStatus'];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = 'all';
    });

    if (type === 'brand') {
        const sel = document.getElementById('filterBrand');
        if (sel) sel.value = val;
    } else if (type === 'luxury') {
        const sel = document.getElementById('filterLuxury');
        if (sel) sel.value = val;
    } else if (type === 'category') {
        const sel = document.getElementById('filterCategory');
        if (sel) sel.value = val;
    } else if (type === 'status') {
        const sel = document.getElementById('filterStatus');
        if (sel) sel.value = val;
    } else if (type === 'price') {
        const sel = document.getElementById('filterPrice');
        if (sel) sel.value = val;
    }

    window.runQuickFilters();
};

window.resetAllQuickFilters = (setAllPillActive = true) => {
    const fields = ['filterBrand', 'filterLuxury', 'filterCategory', 'filterSize', 'filterPrice', 'filterStatus'];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = 'all';
    });

    if (setAllPillActive) {
        document.querySelectorAll('.btn-quick-pill').forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.btn-quick-pill[data-filter-type="all"]');
        if (allBtn) allBtn.classList.add('active');
    }

    window.runQuickFilters();
};

window.renderActiveFilterTags = () => {
    const container = document.getElementById('activeFilterBadgesContainer');
    const wrap = document.getElementById('activeFilterTags');
    if (!container || !wrap) return;

    container.innerHTML = '';
    const filters = [
        { id: 'filterBrand', label: 'Brand' },
        { id: 'filterLuxury', label: 'Luxury' },
        { id: 'filterCategory', label: 'Category' },
        { id: 'filterSize', label: 'Size' },
        { id: 'filterPrice', label: 'Price' },
        { id: 'filterStatus', label: 'Status' }
    ];

    let activeCount = 0;
    filters.forEach(f => {
        const el = document.getElementById(f.id);
        if (el && el.value !== 'all') {
            activeCount++;
            const text = el.options[el.selectedIndex]?.text || el.value;
            const chip = document.createElement('span');
            chip.className = 'active-filter-chip';
            chip.innerHTML = `${f.label}: <strong>${text}</strong> <button type="button" aria-label="Remove filter" onclick="clearSingleFilter('${f.id}')">&times;</button>`;
            container.appendChild(chip);
        }
    });

    if (activeCount > 0) {
        wrap.classList.remove('d-none');
        wrap.classList.add('d-flex');
    } else {
        wrap.classList.remove('d-flex');
        wrap.classList.add('d-none');
    }
};

window.clearSingleFilter = (selectId) => {
    const el = document.getElementById(selectId);
    if (el) {
        el.value = 'all';
        const fields = ['filterBrand', 'filterLuxury', 'filterCategory', 'filterSize', 'filterPrice', 'filterStatus'];
        const allCleared = fields.every(id => {
            const item = document.getElementById(id);
            return !item || item.value === 'all';
        });
        if (allCleared) {
            document.querySelectorAll('.btn-quick-pill').forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.btn-quick-pill[data-filter-type="all"]');
            if (allBtn) allBtn.classList.add('active');
        }
        window.runQuickFilters();
    }
};

// Legacy/Compatibility Gallery Filtering
window.filterGallery = (category, btn) => {
    if (btn) {
        document.querySelectorAll('.btn-outline-premium').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    const brandSel = document.getElementById('filterBrand');
    if (brandSel) {
        if (category === 'all') {
            window.resetAllQuickFilters();
        } else if (category === 'jordan' || category === 'adidas' || category === 'nb' || category === 'streetwear') {
            const mappedBrand = category === 'nb' ? 'new-balance' : (category === 'streetwear' ? 'supreme' : category);
            window.applyQuickPill('brand', null, mappedBrand);
        }
        return;
    }
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

// ============================================================
// Shop Page: Launch Countdowns & Spotlight Filters
// ============================================================
function initLaunchCountdowns() {
    const countdownEls = document.querySelectorAll('[data-countdown]');
    if (!countdownEls.length) return;

    function update() {
        const now = new Date().getTime();
        countdownEls.forEach(el => {
            const targetDateStr = el.getAttribute('data-countdown');
            if (!targetDateStr) return;
            const target = new Date(targetDateStr).getTime();
            let diff = target - now;

            // If time passed, roll into upcoming cycle for visual demo
            if (diff <= 0) {
                diff = Math.abs(diff) % (4 * 86400000) + 86400000;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const dEl = el.querySelector('.days');
            const hEl = el.querySelector('.hours');
            const mEl = el.querySelector('.minutes');
            const sEl = el.querySelector('.seconds');

            if (dEl) dEl.textContent = String(days).padStart(2, '0');
            if (hEl) hEl.textContent = String(hours).padStart(2, '0');
            if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
            if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
        });
    }

    update();
    setInterval(update, 1000);
}

function initSpotlightTabs() {
    const tabButtons = document.querySelectorAll('.spotlight-tab-btn');
    if (!tabButtons.length) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-spotlight-filter') || 'all';
            const cards = document.querySelectorAll('.spotlight-item');

            cards.forEach(card => {
                const type = (card.getAttribute('data-release-type') || '').toLowerCase(); // upcoming or newly-released
                const cat = (card.getAttribute('data-item-type') || '').toLowerCase(); // sneaker or apparel

                let show = false;
                if (filter === 'all') {
                    show = true;
                } else if (filter === 'upcoming') {
                    show = (type === 'upcoming');
                } else if (filter === 'newly-released') {
                    show = (type === 'newly-released');
                } else if (filter === 'sneakers') {
                    show = (cat === 'sneakers');
                } else if (filter === 'apparel') {
                    show = (cat === 'apparel');
                }

                if (show) {
                    card.style.display = '';
                    card.classList.remove('d-none');
                } else {
                    card.style.display = 'none';
                    card.classList.add('d-none');
                }
            });
        });
    });
}

window.prepareNotification = (productName) => {
    const titleInput = document.getElementById('notifProductName');
    if (titleInput) titleInput.value = productName || 'GRAILS Exclusive Drop';
    const textSpan = document.getElementById('notifModalProductName');
    if (textSpan) textSpan.textContent = productName || 'Selected Release';
};

window.handleNotifySubmit = (e) => {
    if (e) e.preventDefault();
    const alertBox = document.getElementById('notifSuccessAlert');
    const form = document.getElementById('dropNotifyForm');
    if (alertBox && form) {
        form.classList.add('d-none');
        alertBox.classList.remove('d-none');
        setTimeout(() => {
            const modalEl = document.getElementById('getNotifiedModal');
            if (modalEl && window.bootstrap) {
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
            setTimeout(() => {
                form.reset();
                form.classList.remove('d-none');
                alertBox.classList.add('d-none');
            }, 600);
        }, 2200);
    }
};

