document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL ANIMATIONS (Intersection Observer) ---
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        // Select all elements to animate
        const elements = document.querySelectorAll('.scroll-reveal, .reveal-text');
        elements.forEach(el => observer.observe(el));
    }

    // Initialize immediately
    initScrollAnimations();

    // --- 2. SMOOTH SCROLLING FOR NAV ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});

