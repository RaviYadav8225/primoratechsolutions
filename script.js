// Hero Slider
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    console.log('Total slides:', heroSlides.length);
    console.log('Showing slide index:', index);
    
    if (heroSlides.length === 0) return;
    
    // Ensure index is within bounds
    if (index >= heroSlides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = heroSlides.length - 1;
    } else {
        currentSlide = index;
    }
    
    console.log('Current slide after bounds check:', currentSlide);
    
    // Remove active class from all slides
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        console.log('Removed active from slide', i);
    });
    
    // Add active class to current slide
    heroSlides[currentSlide].classList.add('active');
    console.log('Added active to slide', currentSlide);
}

function changeSlide(direction) {
    console.log('changeSlide called with direction:', direction);
    showSlide(currentSlide + direction);
    // Reset the auto-advance timer
    clearInterval(slideInterval);
    startSlideshow();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Start slideshow when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing slider');
        showSlide(0);
        startSlideshow();
    });
} else {
    console.log('DOM already loaded, initializing slider');
    showSlide(0);
    startSlideshow();
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scrolling
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

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Testimonial Slider
let currentTestimonialSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonialSlide(index) {
    testimonials.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i]?.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            dots[i]?.classList.add('active');
        }
    });
}

// Auto-advance testimonials every 5 seconds
setInterval(() => {
    currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonials.length;
    showTestimonialSlide(currentTestimonialSlide);
}, 5000);

// Click dots to change slides
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonialSlide = index;
        showTestimonialSlide(currentTestimonialSlide);
    });
});

// Animated Counter for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate stats
            if (entry.target.classList.contains('stat-item')) {
                const number = entry.target.querySelector('h3');
                const targetNumber = parseInt(number.textContent);
                animateCounter(number, targetNumber);
                observer.unobserve(entry.target);
            }
            
            // Animate strength cards (About page)
            if (entry.target.classList.contains('strength-card')) {
                const number = entry.target.querySelector('h3');
                const targetNumber = parseInt(number.textContent);
                animateCounter(number, targetNumber);
                observer.unobserve(entry.target);
            }
            
            // Fade in animations
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .stat-item, .speciality-item, .strength-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Validation (if you add a contact form)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
}

// Quick Callback Form
const quickCallbackForm = document.getElementById('quickCallbackForm');
if (quickCallbackForm) {
    quickCallbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! We will call you back soon.');
        this.reset();
    });
}

// Expert Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('expertModal');
    const modalClose = document.getElementById('modalClose');
    const expertForm = document.getElementById('expertForm');
    
    if (modal) {
        // Show modal after 1 second
        setTimeout(function() {
            modal.classList.add('show');
        }, 1000);
        
        // Close modal when clicking X button
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.classList.remove('show');
            });
        }
        
        // Close modal when clicking outside the content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
        
        // Handle form submission
        if (expertForm) {
            expertForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you! Our expert will contact you soon.');
                modal.classList.remove('show');
                expertForm.reset();
            });
        }
    }
});
