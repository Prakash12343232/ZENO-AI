document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP ANIMATIONS ---
    const elements = document.querySelectorAll('.scroll-reveal, .reveal-text');

    // CONFIG: Define the observer
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal the element
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stop watching this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // INITIALIZE: Hide elements first, then observe
    elements.forEach(el => {
        // Force hidden state via JS (so CSS can stay visible/safe)
        el.style.opacity = '0'; 
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        
        // Start watching
        observer.observe(el);
    });

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
