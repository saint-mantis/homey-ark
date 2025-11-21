// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'none';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

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

// Active Navigation on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Service Filter Buttons
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Add animation to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
            }, 10);
        });
    });
});

// Testimonials Carousel
const testimonialsGrid = document.querySelector('.testimonials-grid');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let testimonialIndex = 0;
let autoSlideInterval;

function getVisibleTestimonials() {
    if (window.innerWidth <= 568) return 1;
    if (window.innerWidth <= 968) return 2;
    return 3;
}

function getScrollAmount() {
    const testimonialItem = document.querySelector('.testimonial-item');
    if (!testimonialItem) return 0;
    const itemWidth = testimonialItem.offsetWidth;
    const gap = 32; // 2rem gap
    return itemWidth + gap;
}

function scrollTestimonials(direction) {
    const scrollAmount = getScrollAmount();
    const visibleItems = getVisibleTestimonials();
    const totalItems = document.querySelectorAll('.testimonial-item').length;
    const maxIndex = totalItems - visibleItems;

    if (direction === 'next') {
        testimonialIndex++;
        if (testimonialIndex > maxIndex) {
            testimonialIndex = 0;
        }
    } else {
        testimonialIndex--;
        if (testimonialIndex < 0) {
            testimonialIndex = maxIndex;
        }
    }

    testimonialsGrid.scrollTo({
        left: testimonialIndex * scrollAmount,
        behavior: 'smooth'
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        scrollTestimonials('next');
    }, 5000); // Auto-slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

if (prevBtn && nextBtn && testimonialsGrid) {
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        scrollTestimonials('prev');
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        scrollTestimonials('next');
        startAutoSlide();
    });

    // Pause auto-slide on hover
    testimonialsGrid.addEventListener('mouseenter', stopAutoSlide);
    testimonialsGrid.addEventListener('mouseleave', startAutoSlide);

    // Start auto-slide
    startAutoSlide();

    // Reset on window resize
    window.addEventListener('resize', () => {
        testimonialIndex = 0;
        testimonialsGrid.scrollTo({ left: 0, behavior: 'smooth' });
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .team-card, .blog-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    if (email) {
        // Show success message
        alert('Thank you for subscribing! We will keep you updated.');
        newsletterForm.querySelector('input').value = '';
    }
});

// Contact Form Submission to Google Sheets
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formMessage = contactForm.querySelector('.form-message');
        
        // Show loader
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;
        formMessage.style.display = 'none';
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message'),
            timestamp: new Date().toLocaleString()
        };
        
        try {
            // Replace this URL with your Google Apps Script Web App URL
            const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
            
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            // Show success message
            formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset();
            
        } catch (error) {
            console.error('Error:', error);
            // Show error message
            formMessage.textContent = 'Oops! Something went wrong. Please try again or contact us directly.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // Hide loader
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Counter Animation for Stats (if you want to add stats section later)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add fade-in animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll indicator
let scrollTimeout;
window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll-position', 
        `${(window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
    );
    
    // Add class to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Search button functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    // You can implement search modal here
    alert('Search functionality coming soon!');
});

// Watch Video button functionality
const watchVideoBtn = document.querySelector('.btn-secondary');
if (watchVideoBtn) {
    watchVideoBtn.addEventListener('click', () => {
        // You can implement video modal here
        alert('Video player coming soon!');
    });
}

// Call Us Today button functionality
const callBtn = document.querySelector('.btn-primary');
if (callBtn && callBtn.textContent.includes('Call')) {
    callBtn.addEventListener('click', () => {
        window.location.href = 'tel:+1234567890';
    });
}

console.log('Homey Ark website loaded successfully! 🏠✨');
