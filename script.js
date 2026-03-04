/* ═══════════════════════════════════════════════════════════════
   RAMISETTI KARTHIKEYA — PORTFOLIO SCRIPTS
   Animations, Interactivity, and Dynamic Effects
   ═══════════════════════════════════════════════════════════════ */

// ── Typing Effect ──────────────────────────────────────────────
const typedPhrases = [
    "IoT & Embedded Systems",
    "Biomedical Signal Processing",
    "Industrial Automation",
    "Brain-Computer Interfaces",
    "Sensor Networks & MQTT",
    "fNIRS Neuroscience Research"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typedText');

function typeEffect() {
    const currentPhrase = typedPhrases[phraseIndex];
    
    if (isDeleting) {
        charIndex--;
        typedElement.textContent = currentPhrase.substring(0, charIndex);
    } else {
        charIndex++;
        typedElement.textContent = currentPhrase.substring(0, charIndex);
    }
    
    let speed = isDeleting ? 30 : 60;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typedPhrases.length;
        speed = 400;
    }
    
    setTimeout(typeEffect, speed);
}

// Start typing after page load
setTimeout(typeEffect, 1200);

// ── Navbar Scroll Effect ───────────────────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ── Active Nav Link ────────────────────────────────────────────
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ── Mobile Navigation ──────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav when clicking a link
navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ── Scroll Reveal Animation ────────────────────────────────────
const revealElements = document.querySelectorAll(
    '.timeline-item, .project-card, .skill-category, .edu-card, .cert-card, ' +
    '.about-grid, .contact-wrapper, .about-highlights .highlight-card, .section-header'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ── Counter Animation ──────────────────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, 0, target, 1500);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * eased);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ── Skill Bar Animation ────────────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            setTimeout(() => {
                entry.target.style.width = width + '%';
            }, 200);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── Particle Effect ────────────────────────────────────────────
const particlesContainer = document.getElementById('particles');

function createParticles() {
    const count = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (50 + Math.random() * 50) + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        
        // Random colors
        const colors = ['#6c63ff', '#00d4aa', '#ff6b6b', '#FFD700'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ── Smooth Scroll for Anchor Links ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ── Contact Form Handler ───────────────────────────────────────
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)';
        
        this.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
});

// ── Parallax effect on hero ────────────────────────────────────
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        const opacity = 1 - (scrolled / (window.innerHeight * 0.7));
        const translateY = scrolled * 0.3;
        heroContent.style.opacity = Math.max(opacity, 0);
        heroContent.style.transform = `translateY(${translateY}px)`;
    }
});

// ── Card Tilt Effect (Desktop only) ───────────────────────────
if (window.innerWidth > 1024) {
    const tiltCards = document.querySelectorAll('.project-card, .skill-category');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ── Easter Egg: Konami Code ────────────────────────────────────
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        document.body.style.transition = '0.5s';
        document.documentElement.style.setProperty('--accent-primary', '#FFD700');
        document.documentElement.style.setProperty('--accent-secondary', '#FF6B6B');
        setTimeout(() => {
            document.documentElement.style.setProperty('--accent-primary', '#6c63ff');
            document.documentElement.style.setProperty('--accent-secondary', '#00d4aa');
        }, 5000);
    }
});

// ── Console Easter Egg ─────────────────────────────────────────
console.log(
    '%c👋 Hey there, fellow developer!',
    'color: #6c63ff; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cLooking at the source? I appreciate the curiosity!\n' +
    'Feel free to reach out: ramesettikarthikeya@gmail.com',
    'color: #00d4aa; font-size: 14px;'
);
