/* ===================================
   GLOBAL JS — Shared across all pages
   =================================== */

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll shadow on navbar
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Scroll-based animations
    const animateElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(el => observer.observe(el));

    // Lightbox
    setupLightbox();

    // Staggered card animations
    const cards = document.querySelectorAll('.nav-card, .pdf-card, .cert-card, .collage-item');
    cards.forEach((card, i) => {
        card.style.animationDelay = `${i * 0.08}s`;
    });

    // Cyber Sidebar Functionality
    const heroSidebar = document.getElementById('heroSidebar');
    const sidebarContent = document.getElementById('sidebarContent');
    
    if (heroSidebar && sidebarContent) {
        // Spotlight glow effect
        heroSidebar.addEventListener('mousemove', (e) => {
            const rect = heroSidebar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            heroSidebar.style.setProperty('--mouse-x', `${x}px`);
            heroSidebar.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Scroll tracker
        sidebarContent.addEventListener('scroll', () => {
            const maxScroll = sidebarContent.scrollHeight - sidebarContent.clientHeight;
            const scrollProgress = maxScroll > 0 ? (sidebarContent.scrollTop / maxScroll) : 0;
            heroSidebar.style.setProperty('--scroll-progress', scrollProgress);
        });
        
        // Reveal elements inside the sidebar when scrolling
        const cyberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { root: sidebarContent, threshold: 0.1 });
        
        const cyberReveals = document.querySelectorAll('.cyber-reveal');
        cyberReveals.forEach(el => cyberObserver.observe(el));
    }

    // Global Tech Card Glow Effect
    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
});

// Lightbox functionality
function setupLightbox() {
    // Create lightbox element if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <img src="" alt="Preview">
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Add click to all gallery images
    document.querySelectorAll('.masonry-item img, .collage-item img, .work-gallery-item img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightbox.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}
