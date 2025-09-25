// --- ELEMENTOS DEL DOM ---
const menuOracionesDiv = document.getElementById('menu-oraciones');
const areaPracticaDiv = document.getElementById('area-practica');
const prayerTitleH2 = document.getElementById('prayer-title');
const prayerDisplay = document.getElementById('prayer-display');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const statusDiv = document.getElementById('status');

// =================================================================
// PASO 1: CENTRALIZAR TODAS LAS ORACIONES AQUÍ
// =================================================================
const oraciones = [
    {
        titulo: "Padre Nuestro",
        texto: "Padre nuestro que estás en el cielo santificado sea tu Nombre venga a nosotros tu Reino hágase tu voluntad en la tierra como en el cielo Danos hoy nuestro pan de cada día perdona nuestras ofensas como también nosotros perdonamos a los que nos ofenden no nos dejes caer en la tentación y líbranos del mal Amén"
    },
    {
        titulo: "Ave María",
        texto: "Dios te salve María llena eres de gracia el Señor es contigo bendita tú eres entre todas las mujeres y bendito es el fruto de tu vientre Jesús Santa María Madre de Dios ruega por nosotros pecadores ahora y en la hora de nuestra muerte Amén"
    },
    // --- AQUÍ PUEDES AGREGAR LAS OTRAS 21 ORACIONES ---
    // {
    //     titulo: "Gloria",
    //     texto: "Gloria al Padre y al Hijo y al Espíritu Santo como era en el principio ahora y siempre por los siglos de los siglos Amén"
    // }
];

// Variable para guardar las palabras de la oración seleccionada
let oracionCorrectaPalabras = [];

// --- CONFIGURACIÓN DE SPEECH RECOGNITION (sin cambios) ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
// ... (El resto del código de Speech Recognition es el mismo)

// =================================================================
// PASO 2: FUNCIONES PARA MANEJAR LA LÓGICA
// =================================================================

// Función que crea los botones del menú dinámicamente
function crearMenu() {
    oraciones.forEach((oracion, index) => {
        const boton = document.createElement('button');
        boton.textContent = oracion.titulo;
        boton.className = 'oracion-btn';
        boton.addEventListener('click', () => {
            prepararPractica(index);
        });
        menuOracionesDiv.appendChild(boton);
    });
}

// Función que prepara el área de práctica para la oración elegida
function prepararPractica(index) {
    const oracionSeleccionada = oraciones[index];
    
    // 1. Configurar las variables para la validación
    prayerTitleH2.textContent = oracionSeleccionada.titulo;
    oracionCorrectaPalabras = oracionSeleccionada.texto.toLowerCase().split(' ');
    
    // 2. Limpiar el estado anterior
    prayerDisplay.innerHTML = '';
    statusDiv.textContent = 'Presiona el botón para comenzar.';
    
    // 3. Mostrar el área de práctica y ocultar el menú
    menuOracionesDiv.style.display = 'none';
    areaPracticaDiv.style.display = 'block';
}

// Función para volver al menú
function volverAlMenu() {
    // Detener el reconocimiento si está activo
    if (isListening) {
        recognition.stop();
        isListening = false;
        startBtn.textContent = '🎙️ Empezar a Rezar';
    }
    
    // Ocultar el área de práctica y mostrar el menú
    areaPracticaDiv.style.display = 'none';
    menuOracionesDiv.style.display = 'block';
}

// --- INICIALIZACIÓN Y EVENTOS ---

// Crear el menú cuando la página cargue
window.onload = crearMenu;

// Evento para el botón de volver
backBtn.addEventListener('click', volverAlMenu);

// --- CÓDIGO DE SPEECH RECOGNITION (Idéntico al anterior) ---
// (Pega aquí el resto de tu código JS: la configuración de 'recognition',
// la variable 'isListening', el evento 'recognition.onresult' y el 
// evento 'startBtn.addEventListener'.)

let isListening = false; // Asegúrate de tener esta variable

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        prayerDisplay.innerHTML = '';
        let transcriptCompleto = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcriptCompleto += event.results[i][0].transcript;
        }
        const palabrasHabladas = transcriptCompleto.trim().toLowerCase().split(' ');
        palabrasHabladas.forEach((palabraHablada, index) => {
            if (palabraHablada === '') return;
            const palabraSpan = document.createElement('span');
            palabraSpan.textContent = palabraHablada + ' ';
            if (oracionCorrectaPalabras[index] && palabraHablada === oracionCorrectaPalabras[index]) {
                palabraSpan.classList.add('correct');
            } else {
                palabraSpan.classList.add('incorrect');
            }
            prayerDisplay.appendChild(palabraSpan);
        });
    };
    
    startBtn.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
            startBtn.textContent = '🎙️ Empezar de Nuevo';
            statusDiv.textContent = "Práctica detenida. ¡Buen trabajo!";
            isListening = false;
        } else {
            prayerDisplay.innerHTML = ''; 
            recognition.start();
            startBtn.textContent = '🛑 Detener';
            statusDiv.textContent = "Habla ahora...";
            isListening = true;
        }
    });
} else {
    // Manejo de error si el navegador no es compatible
    areaPracticaDiv.innerHTML = "<h2>Lo siento, tu navegador no soporta esta función.</h2>";
}
