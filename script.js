/* ═══════════════════════════════════════════════════════════════
   RAMISETTI KARTHIKEYA — PORTFOLIO v2  ·  script.js
   Typing, scroll reveal, counters, skill bars, nav, cursor glow
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────── TYPING EFFECT ─────────────────────── */
    const typedEl  = document.getElementById('typedText');
    const phrases  = [
        'IoT & Embedded Systems',
        'Biomedical Signal Processing',
        'Industrial Automation',
        'Brain-Computer Interfaces',
        'Sensor Networks & MQTT',
        'fNIRS Neuroscience Research'
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false;
    const TYPE_SPEED = 65, DELETE_SPEED = 35, PAUSE = 1800;

    function typeLoop() {
        const current = phrases[phraseIdx];
        if (!deleting) {
            typedEl.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                deleting = true;
                return setTimeout(typeLoop, PAUSE);
            }
        } else {
            typedEl.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
        }
        setTimeout(typeLoop, deleting ? DELETE_SPEED : TYPE_SPEED);
    }
    if (typedEl) typeLoop();

    /* ─────────────────────── NAVBAR SCROLL ─────────────────────── */
    const navbar = document.getElementById('navbar');
    function handleNavScroll() {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    /* ─────────────────────── MOBILE NAV TOGGLE ─────────────────── */
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ─────────────────────── SIDE NAV DOTS ─────────────────────── */
    const sideDots = document.querySelectorAll('.side-dot');
    const sections = [];
    sideDots.forEach(dot => {
        const href = dot.getAttribute('href');
        if (href) {
            const sec = document.querySelector(href);
            if (sec) sections.push({ el: sec, dot });
        }
    });

    function updateSideDots() {
        const scrollY = window.scrollY + window.innerHeight / 3;
        let activeIdx = 0;
        sections.forEach((s, i) => {
            if (scrollY >= s.el.offsetTop) activeIdx = i;
        });
        sideDots.forEach(d => d.classList.remove('active'));
        if (sections[activeIdx]) sections[activeIdx].dot.classList.add('active');
    }
    window.addEventListener('scroll', updateSideDots, { passive: true });
    updateSideDots();

    /* ─────────────────────── SMOOTH SCROLL ─────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* ─────────────────────── CURSOR GLOW ─────────────────────── */
    const glow = document.getElementById('cursorGlow');
    if (glow && window.innerWidth > 768) {
        let mx = 0, my = 0, gx = 0, gy = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        (function glowTick() {
            gx += (mx - gx) * 0.12;
            gy += (my - gy) * 0.12;
            glow.style.left = gx + 'px';
            glow.style.top  = gy + 'px';
            requestAnimationFrame(glowTick);
        })();
    }

    /* ─────────────────────── SCROLL REVEAL (UNIQUE PER SECTION) ── */
    const revealEls = [];

    // Each section gets a DIFFERENT entrance animation
    const sectionRevealMap = {
        'about':     { selectors: ['.section-label','.section-heading','.terminal-window','.about-content','.about-tags span'], type: 'reveal-left' },
        'services':  { selectors: ['.section-label','.section-heading','.service-card'], type: 'reveal-zoom' },
        'experience':{ selectors: ['.section-label','.section-heading','.exp-subtitle','.timeline-item'], type: 'reveal-flip' },
        'projects':  { selectors: ['.section-label','.section-heading','.bento-card'], type: 'reveal-rotate' },
        'skills':    { selectors: ['.section-label','.section-heading','.skill-group'], type: 'reveal-right' },
        'education': { selectors: ['.section-label','.section-heading','.edu-degree','.cert-item'], type: 'reveal-down' },
        'contact':   { selectors: ['.section-label','.section-heading','.contact-subtitle','.contact-tile','.contact-form-box'], type: 'reveal-glow' }
    };

    // Also animate hero stats with default slide-up
    document.querySelectorAll('.hero-stats-bar').forEach(el => {
        el.classList.add('reveal', 'reveal-up');
        revealEls.push(el);
    });

    // Apply per-section reveal types
    Object.entries(sectionRevealMap).forEach(([sectionId, config]) => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        config.selectors.forEach(sel => {
            section.querySelectorAll(sel).forEach(el => {
                el.classList.add('reveal', config.type);
                revealEls.push(el);
            });
        });
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // stagger children of the same parent a bit
                    const siblings = revealEls.filter(
                        e => e.parentElement === entry.target.parentElement && e.classList.contains('reveal') && !e.classList.contains('visible')
                    );
                    const idx = siblings.indexOf(entry.target);
                    const delay = Math.max(0, idx) * 80;
                    setTimeout(() => entry.target.classList.add('visible'), delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => revealObserver.observe(el));

    /* ─────────────────────── COUNTER ANIMATION ─────────────────── */
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                if (isNaN(target)) return;
                counterObserver.unobserve(el);

                const duration = 1600; // ms
                const start = performance.now();
                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    // ease-out cubic
                    const ease = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(target * ease);
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
        },
        { threshold: 0.5 }
    );
    counters.forEach(c => counterObserver.observe(c));

    /* ─────────────────────── SKILL BAR ANIMATION ─────────────────── */
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const bar = entry.target;
                const w = bar.getAttribute('data-width');
                if (w) bar.style.width = w + '%';
                skillObserver.unobserve(bar);
            });
        },
        { threshold: 0.3 }
    );
    skillBars.forEach(b => skillObserver.observe(b));

    /* ─────────────────────── CARD TILT EFFECT ─────────────────────── */
    if (window.innerWidth > 1024) {
        const tiltCards = document.querySelectorAll(
            '.service-card, .tl-card, .bento-card, .cert-item, .contact-tile'
        );
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rotateX = ((y - cy) / cy) * -4;
                const rotateY = ((x - cx) / cx) * 4;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /* ─────────────────────── PARALLAX ORB MOVEMENT ─────────────────── */
    const orbs = document.querySelectorAll('.hero-orb');
    if (orbs.length && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            orbs.forEach((orb, i) => {
                const speed = 0.04 + i * 0.02;
                orb.style.transform = `translateY(${y * speed}px)`;
            });
        }, { passive: true });
    }

    /* ─────────────────────── CONTACT FORM HANDLER ─────────────────── */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const origHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #00d4aa, #6c63ff)';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = origHTML;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        });
    }

    /* ─────────────────────── SERVICE CARD ICON COLOR ─────────────────── */
    document.querySelectorAll('.service-card').forEach(card => {
        const color = card.getAttribute('data-color');
        if (color) {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.setProperty('--icon-color', color);
                icon.style.color = color;
                icon.style.background = `${color}1a`; // 10% opacity hex
            }
        }
    });

    /* ─────────────────────── PAGE LOAD — REMOVE REVEAL FROM HERO ─────── */
    // Hero elements have their own CSS animation, don't double-animate
    document.querySelectorAll('.hero .reveal').forEach(el => {
        el.classList.remove('reveal');
    });

});
