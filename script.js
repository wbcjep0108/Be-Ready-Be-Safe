/* ============================================
   READY SAFE - Disaster Preparedness Hub
   Enhanced JavaScript with 2-Column Layout
   Animations and Smooth Scrolling
   ============================================ */

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }

            const offset = 80;
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            updateActiveLink();
        }
    });
});

// ============================================
// ACTIVE LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (current) {
        const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // FADE IN ANIMATION
            if (element.classList.contains('scroll-fade-in')) {
                element.style.opacity = '0';
                element.offsetHeight;
                element.style.animation = 'fadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                
                if (element.style.animationDelay) {
                    element.style.animationDelay = element.style.animationDelay;
                }
            }
            
            // FADE IN FROM RIGHT
            if (element.classList.contains('scroll-fade-right')) {
                element.style.opacity = '0';
                element.style.transform = 'translateX(50px)';
                element.offsetHeight;
                element.style.animation = 'fadeInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                
                if (element.style.animationDelay) {
                    element.style.animationDelay = element.style.animationDelay;
                }
            }
            
            // SLIDE IN FROM LEFT
            if (element.classList.contains('scroll-slide-left')) {
                element.style.opacity = '0';
                element.style.transform = 'translateX(-50px)';
                element.offsetHeight;
                element.style.animation = 'slideInLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                
                if (element.style.animationDelay) {
                    element.style.animationDelay = element.style.animationDelay;
                }
            }
            
            // SLIDE UP ANIMATION
            if (element.classList.contains('scroll-slide-up')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.offsetHeight;
                element.style.animation = 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                
                if (element.style.animationDelay) {
                    element.style.animationDelay = element.style.animationDelay;
                }
            }
            
            // BOUNCE IN ANIMATION
            if (element.classList.contains('scroll-bounce-in')) {
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                element.offsetHeight;
                element.style.animation = 'bounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                
                if (element.style.animationDelay) {
                    element.style.animationDelay = element.style.animationDelay;
                }
            }

            animationObserver.unobserve(element);
        }
    });
}, observerOptions);

// Observe all scroll animation elements
document.querySelectorAll('.scroll-fade-in, .scroll-fade-right, .scroll-slide-left, .scroll-slide-up, .scroll-bounce-in').forEach(element => {
    animationObserver.observe(element);
});

// ============================================
// MOBILE HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navLinksMenu = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinksMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

document.addEventListener('click', (e) => {
    if (navLinksMenu && !navLinksMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navLinksMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksMenu.classList.contains('active')) {
        navLinksMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// ENHANCED SCROLL PERFORMANCE
// ============================================

let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ============================================
// PARALLAX EFFECT - HERO SECTION
// ============================================

const heroElements = document.querySelectorAll('.hero-section img');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    heroElements.forEach((element, index) => {
        if (element.classList.contains('clouds') || element.classList.contains('cloud')) {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrollY * speed}px)`;
        }
    });
}, { passive: true });

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.querySelectorAll('.scroll-fade-in, .scroll-fade-right, .scroll-slide-left, .scroll-slide-up, .scroll-bounce-in').forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (element.classList.contains('scroll-fade-in')) {
                element.style.animation = `fadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s forwards`;
            } else if (element.classList.contains('scroll-fade-right')) {
                element.style.animation = `fadeInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s forwards`;
            } else if (element.classList.contains('scroll-slide-left')) {
                element.style.animation = `slideInLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s forwards`;
            } else if (element.classList.contains('scroll-slide-up')) {
                element.style.animation = `slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s forwards`;
            } else if (element.classList.contains('scroll-bounce-in')) {
                element.style.animation = `bounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s forwards`;
            }
        }
    });
});

// ============================================
// ACCESSIBILITY - REDUCE MOTION
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    document.querySelectorAll('[style*="animation"]').forEach(element => {
        element.style.animation = 'none';
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});

// ============================================
// CONSOLE LOGGING (Development Helper)
// ============================================

console.log('Ready Safe - Disaster Preparedness Hub loaded successfully!');
console.log('Navigation active link updates:', sections.length, 'sections detected');
console.log('2-Column layout with enhanced animations enabled');