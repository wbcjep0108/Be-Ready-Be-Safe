/* ============================================
   READY SAFE - Disaster Preparedness Hub
   Enhanced JavaScript with Smooth Scrolling,
   Animations, and Mobile Menu
   ============================================ */

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
/*
   When users click on navigation links, scroll
   smoothly to the target section with proper
   offset for the fixed header.
*/

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Get the target section ID from the href
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            // Close mobile menu if it's open
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }

            // Calculate scroll position with offset for fixed header
            const offset = 80;
            const targetPosition = target.offsetTop - offset;

            // Smooth scroll to the target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update active link indicator
            updateActiveLink();
        }
    });
});

// ============================================
// ACTIVE LINK HIGHLIGHTING
// ============================================
/*
   As users scroll, this function updates which
   navigation link is highlighted based on the
   current section in view.
*/

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';

    // Check which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // If section is in view, mark it as current
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the current link
    if (current) {
        const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Update active link on scroll event
window.addEventListener('scroll', updateActiveLink);

// Update on page load
window.addEventListener('load', updateActiveLink);

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================
/*
   Uses Intersection Observer API to trigger
   animations when elements enter the viewport.
   This is more performant than listening to
   every scroll event.
*/

const observerOptions = {
    threshold: 0.1,          // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px'  // Trigger slightly before full visibility
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // FADE IN ANIMATION
            if (element.classList.contains('scroll-fade-in')) {
                element.style.opacity = '0';
                element.offsetHeight; // Force reflow
                element.style.animation = 'fadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                
                // Preserve animation delay if set
                if (element.style.animationDelay) {
                    element.style.animationDelay = element.style.animationDelay;
                }
            }
            
            // SLIDE UP ANIMATION
            if (element.classList.contains('scroll-slide-up')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.offsetHeight; // Force reflow
                element.style.animation = 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                
                // Preserve animation delay if set
                if (element.style.animationDelay) {
                    element.style.animationDelay = element.style.animationDelay;
                }
            }
            
            // BOUNCE IN ANIMATION (for sticker images)
            if (element.classList.contains('scroll-bounce-in')) {
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                element.offsetHeight; // Force reflow
                element.style.animation = 'bounceIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                
                // Preserve animation delay if set
                if (element.style.animationDelay) {
                    element.style.animationDelay = element.style.animationDelay;
                }
            }

            // Stop observing after animation completes
            animationObserver.unobserve(element);
        }
    });
}, observerOptions);

// Observe all scroll animation elements
document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-bounce-in').forEach(element => {
    animationObserver.observe(element);
});

// ============================================
// MOBILE HAMBURGER MENU
// ============================================
/*
   Handles opening and closing of the mobile
   navigation menu when the hamburger icon
   is clicked.
*/

const hamburger = document.querySelector('.hamburger');
const navLinksMenu = document.querySelector('.nav-links');

if (hamburger) {
    // Toggle menu open/closed on hamburger click
    hamburger.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when any nav link is clicked
    navLinksMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Close menu when clicking outside of it
document.addEventListener('click', (e) => {
    if (navLinksMenu && !navLinksMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navLinksMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinksMenu.classList.contains('active')) {
        navLinksMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// ENHANCED SCROLL PERFORMANCE
// ============================================
/*
   Uses requestAnimationFrame to optimize
   scroll event performance by throttling
   updates to the browser's refresh rate.
*/

let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    // Only update active link on next animation frame
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
/*
   Creates a subtle parallax effect where
   cloud elements move slower than the scroll,
   creating a depth effect.
*/

const heroElements = document.querySelectorAll('.hero-section img');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    heroElements.forEach((element, index) => {
        // Apply parallax only to cloud elements
        if (element.classList.contains('clouds') || element.classList.contains('cloud')) {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrollY * speed}px)`;
        }
    });
}, { passive: true });

// ============================================
// PAGE LOAD ANIMATION
// ============================================
/*
   Triggers animations for elements that are
   already visible when the page first loads.
   This ensures they animate on page entry.
*/

window.addEventListener('load', () => {
    // Check each scroll animation element
    document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-bounce-in').forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        
        // If element is in viewport on page load, animate it
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (element.classList.contains('scroll-fade-in')) {
                element.style.animation = `fadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s forwards`;
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
/*
   Respects user's motion preference setting.
   If a user has enabled "reduce motion" in
   their system, animations are disabled.
*/

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Disable all animations
    document.querySelectorAll('[style*="animation"]').forEach(element => {
        element.style.animation = 'none';
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
/*
   Allows keyboard users to interact with
   navigation links using Enter or Space key.
   Improves accessibility for keyboard users.
*/

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('keydown', (e) => {
        // Trigger click on Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});



// ============================================
// CONSOLE LOGGING (Development Helper)
// ============================================
/*
   Optional: Remove in production.
   Logs when major functions execute for
   debugging purposes.
*/

console.log('Ready Safe - Disaster Preparedness Hub loaded successfully!');
console.log('Navigation active link updates:', sections.length, 'sections detected');