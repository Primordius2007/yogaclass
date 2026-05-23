/* ============================================
   YOGA WITH SHUCHITA — Interactive Scripts
   Parallax, Scroll Reveal, Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Scroll Effect ---
    const navbar = document.getElementById('main-nav');
    const heroSection = document.getElementById('hero');

    function updateNavbar() {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth Scroll for nav links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Parallax Scrolling ---
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    const parallaxContent = document.querySelectorAll('[data-parallax-speed]');

    function updateParallax() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        parallaxElements.forEach(el => {
            const parent = el.parentElement;
            const rect = parent.getBoundingClientRect();

            // Only apply parallax when element is in view
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const translateY = (scrollProgress - 0.5) * 100; // Smooth parallax range
                el.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
        });

        parallaxContent.forEach(el => {
            const rect = el.getBoundingClientRect();
            const speed = parseFloat(el.dataset.parallaxSpeed) || 0.2;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const translateY = (scrollProgress - 0.5) * 60 * speed;
                el.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
        });
    }

    // --- Scroll Reveal Animation ---
    function setupRevealElements() {
        const revealableElements = [
            '.section-header',
            '.about-visual',
            '.about-content',
            '.highlight',
            '.curriculum-card',
            '.schedule-card-main',
            '.cert-badge-area',
            '.cert-details',
            '.bodhi-info',
            '.contact-card',
            '.philosophy-quote',
            '.cta-title',
            '.cta-text'
        ];

        revealableElements.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('reveal');
                if (index > 0 && index < 5) {
                    el.classList.add(`reveal-delay-${index}`);
                }
            });
        });
    }

    function checkReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = windowHeight * 0.88;

            if (revealTop < revealPoint) {
                el.classList.add('visible');
            }
        });
    }

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- Throttled Scroll Handler ---
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavbar();
                updateParallax();
                checkReveal();
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    }

    // --- Counter Animation for Stats ---
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const finalText = el.textContent;
                    const finalNum = parseInt(finalText);

                    if (!isNaN(finalNum) && !el.dataset.animated) {
                        el.dataset.animated = 'true';
                        let current = 0;
                        const increment = finalNum / 40;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= finalNum) {
                                el.textContent = finalText; // Restore original text (e.g., "500+")
                                clearInterval(timer);
                            } else {
                                el.textContent = Math.floor(current);
                            }
                        }, 30);
                    }
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => observer.observe(el));
    }

    // --- Hover Tilt Effect on Cards ---
    function setupCardTilt() {
        const cards = document.querySelectorAll('.curriculum-card, .contact-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -3;
                const rotateY = (x - centerX) / centerX * 3;

                card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) perspective(800px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // --- Dynamic Gradient Background on Mouse Move (Hero) ---
    function setupHeroInteraction() {
        const hero = document.getElementById('hero');
        const gradientOverlay = document.querySelector('.hero-gradient-overlay');

        if (hero && gradientOverlay) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                gradientOverlay.style.background = `
                    radial-gradient(ellipse at ${x}% ${y}%, rgba(255, 184, 108, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at ${100 - x}% ${100 - y}%, rgba(59, 181, 165, 0.1) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 50%, rgba(199, 125, 186, 0.06) 0%, transparent 50%)
                `;
            });
        }
    }

    // --- Initialize Everything ---
    setupRevealElements();
    updateNavbar();
    checkReveal();
    animateCounters();
    setupCardTilt();
    setupHeroInteraction();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        checkReveal();
    });

    // Initial parallax position
    updateParallax();
});
