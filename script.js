document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. COUNTDOWN LOGIC ---
    const timerElement = document.getElementById('countdown');
    const preloader = document.getElementById('preloader');
    const mainInterface = document.getElementById('main-interface');
    
    // Set target to tonight's midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    // DEBUG: Uncomment to test 5 second timer
    // midnight.setTime(now.getTime() + 5000);

    function updateTimer() {
        const currentTime = new Date();
        const diff = midnight - currentTime;

        if (diff <= 0) {
            launchSite();
            return;
        }

        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        timerElement.innerText = 
            `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;

        requestAnimationFrame(updateTimer);
    }

    function launchSite() {
        // Transition effect
        timerElement.innerText = "00:00:00";
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.classList.add('hidden');
            preloader.classList.remove('active');
            
            mainInterface.classList.remove('hidden');
            // Allow DOM render before fading in
            setTimeout(() => {
                mainInterface.classList.add('active');
                initScrollAnimations(); // Start animations only after launch
            }, 50);
        }, 1000);
    }

    // Start Timer
    updateTimer();


    // --- 2. SCROLL ANIMATIONS (Intersection Observer) ---
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

    // --- 3. SMOOTH SCROLLING FOR NAV ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});