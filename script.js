// Estado de la aplicación
let sessionActive = false;
let sessionStartTime = null;
let durationInterval = null;
let dataInterval = null;
let canvas = null;
let ctx = null;
let dataPoints = [];
let animationFrame = null;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Referencias a elementos
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Event listeners
    startBtn.addEventListener('click', startSession);
    stopBtn.addEventListener('click', stopSession);
    resetBtn.addEventListener('click', resetSession);
    
    // Inicializar canvas
    canvas = document.getElementById('brainwaveChart');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Ajustar canvas en resize
    window.addEventListener('resize', resizeCanvas);
    
    // Dibujar estado inicial
    drawChart();
}

function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth - 30;
    canvas.height = container.clientHeight - 30;
    drawChart();
}

function startSession() {
    if (sessionActive) return;
    
    sessionActive = true;
    sessionStartTime = Date.now();
    
    // Actualizar UI
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    document.getElementById('status').textContent = 'Activo';
    document.getElementById('status').className = 'value active';
    document.getElementById('feedbackMessage').textContent = 'Sesión iniciada - Monitoreando actividad cerebral...';
    document.getElementById('feedbackMessage').className = 'feedback-message success';
    
    // Iniciar actualización de duración
    updateDuration();
    durationInterval = setInterval(updateDuration, 1000);
    
    // Iniciar generación de datos simulados
    dataInterval = setInterval(generateBrainwaveData, 100);
    
    // Iniciar animación del chart
    animate();
}

function stopSession() {
    if (!sessionActive) return;
    
    sessionActive = false;
    
    // Limpiar intervalos
    if (durationInterval) {
        clearInterval(durationInterval);
        durationInterval = null;
    }
    
    if (dataInterval) {
        clearInterval(dataInterval);
        dataInterval = null;
    }
    
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
    
    // Actualizar UI
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('status').textContent = 'Detenido';
    document.getElementById('status').className = 'value inactive';
    document.getElementById('feedbackMessage').textContent = 'Sesión detenida - Los datos han sido guardados';
    document.getElementById('feedbackMessage').className = 'feedback-message warning';
}

function resetSession() {
    stopSession();
    
    // Reiniciar datos
    dataPoints = [];
    sessionStartTime = null;
    
    // Reiniciar métricas
    updateMetric('alpha', 0);
    updateMetric('beta', 0);
    updateMetric('theta', 0);
    updateMetric('delta', 0);
    
    // Reiniciar UI
    document.getElementById('duration').textContent = '00:00';
    document.getElementById('status').textContent = 'Inactivo';
    document.getElementById('status').className = 'value';
    document.getElementById('feedbackMessage').textContent = 'Sistema reiniciado - Presiona "Iniciar Sesión" para comenzar';
    document.getElementById('feedbackMessage').className = 'feedback-message';
    
    // Limpiar canvas
    drawChart();
}

function updateDuration() {
    if (!sessionStartTime) return;
    
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const durationText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('duration').textContent = durationText;
}

function generateBrainwaveData() {
    if (!sessionActive) return;
    
    const time = Date.now();
    
    // Generar datos simulados para ondas cerebrales
    const alpha = 30 + Math.random() * 40;
    const beta = 20 + Math.random() * 30;
    const theta = 15 + Math.random() * 25;
    const delta = 10 + Math.random() * 20;
    
    // Agregar punto de datos
    dataPoints.push({
        time: time,
        value: Math.sin(time / 200) * 50 + Math.random() * 30
    });
    
    // Mantener solo los últimos 100 puntos
    if (dataPoints.length > 100) {
        dataPoints.shift();
    }
    
    // Actualizar métricas
    updateMetric('alpha', alpha);
    updateMetric('beta', beta);
    updateMetric('theta', theta);
    updateMetric('delta', delta);
    
    // Generar feedback basado en las métricas
    generateFeedback(alpha, beta, theta, delta);
}

function updateMetric(type, value) {
    const roundedValue = Math.round(value);
    document.getElementById(`${type}Value`).textContent = `${roundedValue}%`;
    document.getElementById(`${type}Progress`).style.width = `${roundedValue}%`;
}

function generateFeedback(alpha, beta, theta, delta) {
    let message = '';
    let className = 'feedback-message';
    
    if (alpha > 50) {
        message = '✓ Excelente estado de relajación - Las ondas Alpha están elevadas';
        className += ' success';
    } else if (beta > 40) {
        message = '⚠ Estado de alta concentración - Las ondas Beta están elevadas';
        className += ' warning';
    } else if (theta > 30) {
        message = '💤 Estado de meditación profunda - Las ondas Theta están elevadas';
        className += ' success';
    } else {
        message = '📊 Actividad cerebral normal - Continúa monitoreando';
        className += '';
    }
    
    const feedbackElement = document.getElementById('feedbackMessage');
    if (feedbackElement.textContent !== message) {
        feedbackElement.textContent = message;
        feedbackElement.className = className;
    }
}

function drawChart() {
    if (!ctx) return;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar grid
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    
    // Líneas horizontales
    for (let i = 0; i <= 4; i++) {
        const y = (canvas.height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Líneas verticales
    for (let i = 0; i <= 10; i++) {
        const x = (canvas.width / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Dibujar datos si existen
    if (dataPoints.length > 1) {
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const xStep = canvas.width / (dataPoints.length - 1);
        
        dataPoints.forEach((point, index) => {
            const x = index * xStep;
            const y = canvas.height / 2 + (point.value * canvas.height / 200);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Dibujar puntos
        ctx.fillStyle = '#667eea';
        dataPoints.forEach((point, index) => {
            const x = index * xStep;
            const y = canvas.height / 2 + (point.value * canvas.height / 200);
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    // Dibujar línea central
    ctx.strokeStyle = '#adb5bd';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
}

function animate() {
    if (!sessionActive) return;
    
    drawChart();
    animationFrame = requestAnimationFrame(animate);
}
