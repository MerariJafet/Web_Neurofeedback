// ============================================
// ANIMATIONS.JS - Animaciones personalizadas
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initBenefitCardsAnimation();
    initProcessCardsAnimation();
});

// ============================================
// ANIMACIÓN DE TARJETAS DE BENEFICIOS
// ============================================
function initBenefitCardsAnimation() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Añadir efecto de pulso al ícono
            const icon = this.querySelector('.benefit-icon-wrapper');
            if (icon) {
                icon.style.animation = 'pulse 0.6s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon-wrapper');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
}

// ============================================
// ANIMACIÓN DE TARJETAS DE PROCESO
// ============================================
function initProcessCardsAnimation() {
    const processCards = document.querySelectorAll('.process-card');
    
    processCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Efecto de brillar en el número
            const number = this.querySelector('.process-number');
            if (number) {
                number.style.animation = 'glow 0.8s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const number = this.querySelector('.process-number');
            if (number) {
                number.style.animation = '';
            }
        });
    });
}

// ============================================
// OBSERVADOR DE INTERSECCIÓN PARA ANIMACIONES
// ============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos cuando el DOM esté listo
window.addEventListener('load', function() {
    const elementsToObserve = document.querySelectorAll('.benefit-card, .process-card');
    elementsToObserve.forEach(el => observer.observe(el));
});
