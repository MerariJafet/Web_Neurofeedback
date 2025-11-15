// ============================================
// FORM-HANDLER.JS - Manejo de formularios
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Obtener elementos del formulario
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submitText');
    const formMessage = document.getElementById('formMessage');
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        program: formData.get('program'),
        message: formData.get('message')
    };
    
    // Validación básica
    if (!data.name || !data.email || !data.phone || !data.message) {
        showFormMessage('Por favor completa todos los campos requeridos.', 'error');
        return;
    }
    
    // Validar email
    if (!isValidEmail(data.email)) {
        showFormMessage('Por favor ingresa un email válido.', 'error');
        return;
    }
    
    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitText.textContent = 'Enviando...';
    
    // OPCIÓN 1: Envío simulado (para testing)
    // Descomentar esta sección para probar sin backend
    
    setTimeout(() => {
        showFormMessage('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
        e.target.reset();
        submitBtn.disabled = false;
        submitText.textContent = 'Enviar Mensaje';
    }, 1500);
    
    
    // OPCIÓN 2: FormSubmit.co (servicio gratuito sin backend)
    // Reemplaza 'TU_EMAIL_AQUI' con el email real de Yerem
    // Descomenta este bloque cuando quieras usar FormSubmit:
    /*
    const formSubmitURL = 'https://formsubmit.co/yerem.salem.acero@gmail.com';
    
    fetch(formSubmitURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            showFormMessage('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
            e.target.reset();
        } else {
            throw new Error('Error al enviar el formulario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormMessage('Hubo un error al enviar el mensaje. Por favor intenta contactarme por WhatsApp.', 'error');
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitText.textContent = 'Enviar Mensaje';
    });
    */
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.classList.remove('hidden');
        
        if (type === 'success') {
            formMessage.classList.remove('text-red-300');
            formMessage.classList.add('text-green-300');
        } else {
            formMessage.classList.remove('text-green-300');
            formMessage.classList.add('text-red-300');
        }
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
