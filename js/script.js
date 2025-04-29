// C.H.I. Solutions Website JavaScript
// Main script file for the BPO company website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking a link
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            // Check required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                // For this demo, we'll just show a success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. One of our representatives will contact you shortly.</p>
                    </div>
                `;
            } else {
                // Show error message
                const errorMessage = contactForm.querySelector('.form-error');
                if (!errorMessage) {
                    const formNote = contactForm.querySelector('.form-note');
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'form-error';
                    errorDiv.innerHTML = 'Please fill in all required fields correctly.';
                    formNote.parentNode.insertBefore(errorDiv, formNote);
                }
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMessage = contactForm.querySelector('.form-error');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
        });
    }
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .testimonial, .advantage-card, .value-card, .team-member');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function checkAnimations() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    // Run on scroll and on page load
    window.addEventListener('scroll', checkAnimations);
    checkAnimations();
    
    // Testimonial slider (simple version)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Hide all testimonials except the first one
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }
        
        // Create navigation dots
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-dots';
        
        for (let i = 0; i < testimonials.length; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.appendChild(dotsContainer);
        
        // Add click event to dots
        document.querySelectorAll('.testimonial-dots .dot').forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                showTestimonial(index);
            });
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Show selected testimonial
        testimonials[index].style.display = 'block';
        
        // Update active dot
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }
});
