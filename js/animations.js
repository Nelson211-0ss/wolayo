// Enhanced Scroll Animation Observer for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Main animation observer with improved settings
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay before adding active class for smoother effect
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 50);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .fade-in, .slide-in-bottom, .bounce-in');
    animatedElements.forEach(el => scrollAnimationObserver.observe(el));

    // Add entrance animation to hero elements
    const heroElements = document.querySelectorAll('.hero-animate');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 200 + (index * 150));
    });

    // Scroll to Top Button Functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

