document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initial check
    handleScrollAnimation();

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Contador Animado
function animateCounter(element, target, duration = 2000) {
    let startTime = null;
    const startValue = 0;
    
    function updateCounter(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
        
        element.textContent = currentValue.toLocaleString('pt-BR');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('pt-BR') + '+';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer para ativar contador quando visível
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observar todos os contadores quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});