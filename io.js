    // Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const toggle = item.querySelector('.faq-toggle');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
        const isOpen = answer.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.faq-answer').classList.remove('active');
                otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
            }
        });
        
        // Toggle current item
        if (!isOpen) {
            answer.classList.add('active');
            toggle.innerHTML = '<i class="fas fa-minus"></i>';
        } else {
            answer.classList.remove('active');
            toggle.innerHTML = '<i class="fas fa-plus"></i>';
        }
    });
});

// Testimonial Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const sliderControls = document.querySelectorAll('.slider-btn');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.style.opacity = '0.5';
        card.style.transform = 'scale(0.95)';
    });
    
    // Show current testimonial
    testimonialCards[index].style.opacity = '1';
    testimonialCards[index].style.transform = 'scale(1)';
    
    // Update slider controls
    sliderControls.forEach((control, i) => {
        control.classList.toggle('active', i === index);
    });
    
    // Scroll to current testimonial
    testimonialCards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
}

// Initialize testimonial slider
if (testimonialCards.length > 0) {
    showTestimonial(0);
    
    // Add click events to slider controls
    sliderControls.forEach((control, index) => {
        control.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(index);
        });
    });
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .process-step, .solution-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

// Initialize counters when in view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat h3, .team-stat h3');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe stat sections
document.querySelectorAll('.vr-stats, .team-stats').forEach(el => {
    counterObserver.observe(el);
});

// VR scene animation
const vrScene = document.querySelector('.vr-scene');
if (vrScene) {
    function animateVRScene() {
        const objects = vrScene.querySelectorAll('.vr-object');
        objects.forEach((obj, index) => {
            obj.style.animationDelay = `${index * 2}s`;
        });
    }
    animateVRScene();
}

// AI Orb animation enhancement
const aiOrb = document.querySelector('.ai-orb');
if (aiOrb) {
    let mouseX = 0;
    let mouseY = 0;
    let orbX = 0;
    let orbY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });
    
    function updateOrbPosition() {
        orbX += (mouseX * 20 - orbX) * 0.05;
        orbY += (mouseY * 20 - orbY) * 0.05;
        
        aiOrb.style.transform = `translate(${orbX}px, ${orbY}px)`;
        
        requestAnimationFrame(updateOrbPosition);
    }
    
    updateOrbPosition();
}

// Progress bar animation
const progressBars = document.querySelectorAll('.progress-fill, .bar-fill');
progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    
    setTimeout(() => {
        bar.style.transition = 'width 1.5s ease';
        bar.style.width = width;
    }, 500);
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    document.querySelectorAll('.service-card, .process-step, .solution-card').forEach((el, i) => {
        el.classList.add('animate-in');
        el.style.animationDelay = `${i * 0.1}s`;
    });
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Theme toggle (optional dark mode)
// Theme toggle (Dark/Light mode)
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Toggle dark mode');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary, linear-gradient(90deg, #6366f1, #0ea5e9));
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
    box-shadow: var(--shadow-lg, 0 4px 20px rgba(0,0,0,0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
`;

document.body.appendChild(themeToggle);

// Use class toggling for dark mode, let CSS handle the theme
function setThemeIcon() {
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Load theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
setThemeIcon();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    setThemeIcon();
});
