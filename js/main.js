// ============================================
// MAIN.JS - Funcionalidades principales
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧠 Yerem Acero Neurofeedback - Website Loaded');
    
    // Inicializar funcionalidades
    initSmoothScroll();
    initMobileMenu();
    initStickyHeader();
});

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
// MOBILE MENU (se completará en Sprint 2)
// ============================================
function initMobileMenu() {
    // TODO: Implementar en Sprint 2
}

// ============================================
// STICKY HEADER (se completará en Sprint 2)
// ============================================
function initStickyHeader() {
    // TODO: Implementar en Sprint 2
}
