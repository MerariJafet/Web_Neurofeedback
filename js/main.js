// ============================================
// MAIN.JS - Funcionalidades principales
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧠 Yerem Acero Neurofeedback - Website Loaded');
    
    // Inicializar funcionalidades
    initSmoothScroll();
    initMobileMenu();
    initStickyHeader();
    initActiveNavLink();
});

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Cerrar menú mobile si está abierto
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
                
                // Calcular offset del header
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 80;
                
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (mobileMenu && menuIcon) {
        mobileMenu.classList.toggle('hidden');
        
        // Cambiar ícono de hamburguesa a X
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    }
}

// ============================================
// STICKY HEADER
// ============================================
function initStickyHeader() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
                header.classList.remove('shadow-md');
            } else {
                header.classList.add('shadow-md');
                header.classList.remove('shadow-lg');
            }
        });
    }
}

// ============================================
// ACTIVE NAV LINK
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-accent', 'border-b-2', 'border-accent');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-accent', 'border-b-2', 'border-accent');
            }
        });
    });
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal(programId) {
    const modal = document.getElementById(`modal-${programId}`);
    const overlay = document.getElementById('modalOverlay');
    
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('modalOverlay');
    
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    document.body.classList.remove('modal-open');
}

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// FAQ ACCORDION
// ============================================

function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const wasActive = faqItem.classList.contains('active');
    
    // Cerrar todos los FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Si no estaba activo, abrirlo
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}
