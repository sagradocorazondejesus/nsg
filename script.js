'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // 1. CATÁLOGO CENTRAL DE ORACIONES
    // =================================================================
    const todasLasOraciones = {
        senalDeLaCruz: { titulo: "Señal de la Santa Cruz", texto: "Por la señal de la Santa Cruz,\nde nuestros enemigos,\nlíbranos, Señor,\nDios nuestro.\nEn el nombre del Padre\ny del Hijo\ny del Espíritu Santo.\nAmén." },
        padreNuestro: { titulo: "Padre Nuestro", texto: "Padre nuestro,\nque estás en el cielo,\nsantificado sea tu Nombre;\nvenga a nosotros tu reino;\nhágase tu voluntad\nen la tierra como en el cielo.\nDanos hoy nuestro pan de cada día;\nperdona nuestras ofensas,\ncomo también nosotros\nperdonamos a los que nos ofenden;\nno nos dejes caer en la tentación,\ny líbranos del mal.\nAmén." },
        angelDeLaGuarda: { titulo: "Ángel de la Guarda", texto: "Ángel de mi Guarda,\nmi dulce compañía,\nno me desampares,\nni de noche ni de día.\nNo me dejes solo,\npues sin ti me perdería.\namen" },
        aveMaria: { titulo: "Ave María", texto: "Dios te salve, María,\nllena eres de gracia;\nel Señor es contigo.\nBendita eres Tú\n entre todas las mujeres,\ny bendito es el fruto\nde tu vientre, Jesús.\nSanta María,Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora de nuestra muerte.\nAmén." },
        gloriaAlPadre: { titulo: "Gloria al Padre", texto: "Gloria al Padre y al Hijo\ny al Espíritu Santo.\nComo era en el principio,\nahora y siempre,\npor los siglos de los siglos.\nAmén." },
        credoN: { titulo: "Credo Niceno - Constantinopolitano", texto: "Creo en un solo Dios,\nPadre Todopoderoso,\nCreador del cielo y de la tierra,\nde todo lo visible y lo invisible.\n Creo en un solo Señor, Jesucristo,\nHijo único de Dios, nacido del Padre\nantes de todos los siglos:\nDios de Dios, Luz de Luz,\nDios verdadero de Dios verdadero,\nengendrado, no creado,\nde la misma naturaleza del Padre,\npor quien todo fue hecho;\nque por nosotros los hombres\ny por nuestra salvación bajó del cielo,\ny por obra del Espíritu Santo\nse encarnó de María, la Virgen,\ny se hizo hombre; y por nuestra causa\nfue crucificado\nen tiempos de Poncio Pilato;\npadeció y fue sepultado,\ny resucitó al tercer día,\nsegún las Escrituras,\ny subió al cielo, y está sentado\na la derecha del Padre;\ny de nuevo vendrá con gloria\npara juzgar a vivos y muertos,\ny su reino no tendrá fin.\nCreo en el Espíritu Santo,\nSeñor y dador de vida,\nque procede del Padre y del Hijo,\nque con el Padre y el Hijo\nrecibe una misma adoración y gloria,\ny que habló por los profetas.\nCreo en la Iglesia, que es una,\nsanta, católica y apostólica.\nConfieso que hay un solo Bautismo\npara el perdón de los pecados.\nEspero la resurrección de los muertos\ny la vida del mundo futuro.\nAmén." },
        yoConfieso: { titulo: "Yo Confieso", texto: "Yo confieso ante Dios Todo poderoso,\ny ante ustedes hermanos,\nque he pecado mucho de pensamiento,\npalabra, obra y omisión.\nPor mi culpa, por mi culpa,\npor mi gran culpa.\nPor eso ruego a Santa María\nsiempre Virgen, a los ángeles,\na los santos y a ustedes hermanos,\nque intercedan por mí ante Dios,\nNuestro Señor.\nAmén."}
    
    
    };

    // =================================================================
    // 2. LISTA DE ORACIONES POR LIBRO
    // =================================================================
    const oracionesPorLibro = {
        "libro1": { icono: '🌱', tema: 'tema-verde', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda'] },
        "libro2": { icono: '🐑', tema: 'tema-amarillo', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria'] },
        "libro3":  { icono: '🙏', tema: 'tema-rojo', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria', 'gloriaAlPadre'] },
        "libro4":  { icono: '✨', tema: 'tema-naranja', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria', 'gloriaAlPadre', 'credoN', 'yoConfieso'] },
        "libro5":  { icono: '📖', tema: 'tema-morado', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria', 'gloriaAlPadre', 'credoN'] },
        "libro6":  { icono: '🌾', tema: 'tema-granate', oraciones: [] },
        "libro8":  { icono: '⚓', tema: 'tema-indigo', oraciones: [] },
        "libro9":  { icono: '🔥', tema: 'tema-azul-marino', oraciones: [] },
        "libro10": { icono: '🕊️', tema: 'tema-dorado', oraciones: [] }
    };

    // =================================================================
    // 3. LÓGICA DE LA PÁGINA
    // =================================================================
    const menuLibros = document.getElementById('menu-libros');
    const contenedorOraciones = document.getElementById('contenedor-oraciones');
    const barraProgreso = document.getElementById('barra-progreso');
    let botonActivo = null;
    let locucionActual = null;

    function leerTexto(textoParaLeer, parrafoElemento) {
        if (locucionActual) {
            window.speechSynthesis.cancel();
        }
        locucionActual = new SpeechSynthesisUtterance(textoParaLeer);
        locucionActual.lang = 'es-MX';
        locucionActual.rate = 0.9;

        locucionActual.onstart = () => {
            document.querySelectorAll('.oracion p.hablando').forEach(el => el.classList.remove('hablando'));
            parrafoElemento.classList.add('hablando');
        };

        // Ya no hay evento onboundary

        locucionActual.onend = () => {
            parrafoElemento.classList.remove('hablando');
            locucionActual = null;
        };
        
        locucionActual.onerror = () => {
             parrafoElemento.classList.remove('hablando');
             locucionActual = null;
        };

        window.speechSynthesis.speak(locucionActual);
    }

    function mostrarOraciones(idLibro) {
        const infoLibro = oracionesPorLibro[idLibro];
        const listaIdsOraciones = infoLibro?.oraciones || [];
        contenedorOraciones.innerHTML = '';
        let completadas = 0;
        const totalOraciones = listaIdsOraciones.length;

        function actualizarProgreso() {
            if (totalOraciones === 0) {
                barraProgreso.innerHTML = ""; return;
            }
            if (completadas === totalOraciones) {
                barraProgreso.innerHTML = `<h3>¡Felicidades! ✨ ¡Has completado todas!</h3>`;
            } else {
                barraProgreso.innerHTML = `<p>Progreso: <strong>${completadas} / ${totalOraciones}</strong> oraciones</p>`;
            }
        }

        if (listaIdsOraciones.length > 0) {
            listaIdsOraciones.forEach(idOracion => {
                const oracion = todasLasOraciones[idOracion];
                if (oracion) {
                    const divOracion = document.createElement('div');
                    divOracion.className = 'oracion';
                    const titulo = document.createElement('h3');
                    titulo.textContent = oracion.titulo;
                    const texto = document.createElement('p');
                    
                    // Se revierte al método simple de poner el texto
                    texto.textContent = oracion.texto;

                    const btnEscuchar = document.createElement('button');
                    btnEscuchar.className = 'btn-escuchar';
                    btnEscuchar.textContent = '🔊';
                    btnEscuchar.setAttribute('aria-label', `Escuchar oración: ${oracion.titulo}`);
                    btnEscuchar.addEventListener('click', (e) => {
                        e.stopPropagation();
                        leerTexto(`${oracion.titulo}. ${oracion.texto}`, texto);
                    });
                    
                    divOracion.appendChild(titulo);
                    divOracion.appendChild(texto);
                    divOracion.appendChild(btnEscuchar);
                    contenedorOraciones.appendChild(divOracion);
                    
                    hacerOracionDeslizable(divOracion, () => {
                        completadas++;
                        actualizarProgreso();
                    });
                }
            });
        } else {
            contenedorOraciones.innerHTML = '<p class="placeholder">No hay oraciones para este libro todavía.</p>';
        }
        actualizarProgreso();
    }

    function hacerOracionDeslizable(elementoOracion, onCompletado) {
        let isDragging = false, startX, currentX = 0;
        function onDragStart(e) { isDragging = true; startX = e.pageX || e.touches[0].pageX; elementoOracion.classList.add('arrastrando'); elementoOracion.style.transition = 'none'; }
        function onDragMove(e) { if (!isDragging) return; e.preventDefault(); currentX = (e.pageX || e.touches[0].pageX) - startX; elementoOracion.style.transform = `translateX(${currentX}px)`;}
        function onDragEnd() {
            if (!isDragging) return; isDragging = false; elementoOracion.classList.remove('arrastrando'); elementoOracion.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            const umbral = elementoOracion.offsetWidth * 0.4;
            if (Math.abs(currentX) > umbral) {
                elementoOracion.classList.add('desapareciendo');
                setTimeout(() => { elementoOracion.remove(); if (onCompletado) onCompletado(); }, 300);
            } else { elementoOracion.style.transform = 'translateX(0)'; }
        }
        elementoOracion.addEventListener('mousedown', onDragStart); document.addEventListener('mousemove', onDragMove); document.addEventListener('mouseup', onDragEnd);
        elementoOracion.addEventListener('touchstart', onDragStart, { passive: true }); document.addEventListener('touchmove', onDragMove); document.addEventListener('touchend', onDragEnd);
    }
    
    const libros = [1, 2, 3, 4, 5, 6, 8, 9, 10];
    libros.forEach(num => {
        const idLibro = `libro${num}`;
        const infoLibro = oracionesPorLibro[idLibro];
        if (!infoLibro) return;
        const boton = document.createElement('button');
        boton.className = 'btn-libro';
        boton.textContent = `${infoLibro.icono} Libro ${num}`;
        boton.dataset.libro = idLibro;
        boton.addEventListener('click', () => {
            if (locucionActual) { window.speechSynthesis.cancel(); }
            if (botonActivo) { botonActivo.classList.remove('activo'); }
            boton.classList.add('activo'); botonActivo = boton;
            document.body.className = infoLibro.tema || '';
            mostrarOraciones(idLibro);
        });
        menuLibros.appendChild(boton);
    });
});
