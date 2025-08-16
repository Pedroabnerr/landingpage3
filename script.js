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

// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});
// Botão CTA Flutuante
document.addEventListener('DOMContentLoaded', () => {
    const ctaFloat = document.getElementById('ctaFloat');
    const heroSection = document.querySelector('.hero');

    const handleCTAButton = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const heroRect = heroSection.getBoundingClientRect();
        
        // Verifica se a seção hero está visível na tela
        const heroInView = heroRect.bottom > 0 && heroRect.top < windowHeight;
        
        if (heroInView) {
            // Se a hero estiver visível, esconde o botão
            ctaFloat.classList.remove('show');
        } else if (scrollPosition > windowHeight * 0.5) {
            // Se passou da hero e rolou mais de 50% da primeira tela, mostra o botão
            ctaFloat.classList.add('show');
        }
    };

    // Verifica no scroll
    window.addEventListener('scroll', handleCTAButton);
    
    // Verifica na primeira carga
    handleCTAButton();
});
// Animação específica para os cards da seção transparência total
document.addEventListener('DOMContentLoaded', () => {
    const transparencySection = document.querySelector('#transparencia-total');
    const originCards = document.querySelectorAll('.origin-point');
    
    const observerOptions = {
        threshold: 0.3, // Ativa quando 30% da seção estiver visível
        rootMargin: '0px 0px -50px 0px' // Margem para ajustar o ponto de ativação
    };
    
    const transparencyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe is-visible nos cards quando a seção aparece
                originCards.forEach(card => {
                    card.classList.add('is-visible');
                });
            }
        });
    }, observerOptions);
    
    // Observa a seção transparência total
    if (transparencySection) {
        transparencyObserver.observe(transparencySection);
    }
});