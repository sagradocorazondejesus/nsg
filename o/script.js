'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // LÓGICA DEL MENÚ LATERAL
    // ===============================================
    const btnMenu = document.getElementById('btn-menu');
    const btnCerrarMenu = document.getElementById('btn-cerrar-menu');
    const menuLateral = document.getElementById('menu-lateral');
    const overlay = document.getElementById('overlay');

    function abrirMenu() {
        menuLateral.classList.add('abierto');
        overlay.classList.add('activo');
    }

    function cerrarMenu() {
        menuLateral.classList.remove('abierto');
        overlay.classList.remove('activo');
    }

    btnMenu.addEventListener('click', abrirMenu);
    btnCerrarMenu.addEventListener('click', cerrarMenu);
    overlay.addEventListener('click', cerrarMenu);


    // =================================================================
    // 1. CATÁLOGO CENTRAL DE ORACIONES
    // =================================================================
    const todasLasOraciones = {
        senalDeLaCruz: { titulo: "Señal de la Santa Cruz", texto: "Por la señal de la Santa Cruz,\nde nuestros enemigos,\nlíbranos, Señor,\nDios nuestro.\nEn el nombre del Padre\ny del Hijo\ny del Espíritu Santo.\nAmén." },
        padreNuestro: { titulo: "Padre Nuestro", texto: "Padre nuestro,\nque estás en el cielo,\nsantificado sea tu Nombre;\nvenga a nosotros tu reino;\nhágase tu voluntad\nen la tierra como en el cielo.\nDanos hoy nuestro pan de cada día;\nperdona nuestras ofensas,\ncomo también nosotros\nperdonamos a los que nos ofenden;\nno nos dejes caer en la tentación,\ny líbranos del mal.\nAmén." },
        angelDeLaGuarda: { titulo: "Ángel de la Guarda", texto: "Ángel de mi Guarda,\nmi dulce compañía,\nno me desampares,\nni de noche ni de día,\nno me dejes solo,\npues sin ti me perdería.\namen" },
        aveMaria: { titulo: "Ave María", texto: "Dios te salve, María,\nllena eres de gracia;\nel Señor es contigo.\nBendita Tú eres\n entre todas las mujeres,\ny bendito es el fruto\nde tu vientre, Jesús.\nSanta María, Madre de Dios,\nruega por nosotros, pecadores,\nahora y en la hora de nuestra muerte.\nAmén." },
        gloriaAlPadre: { titulo: "Gloria al Padre", texto: "Gloria al Padre, y al Hijo,\ny al Espíritu Santo.\nComo era en el principio,\nahora y siempre,\npor los siglos de los siglos.\nAmén." },
        credoN: { titulo: "Credo Niceno - Constantinopolitano", texto: "Creo en un solo Dios,\nPadre Todopoderoso,\nCreador del cielo y de la tierra,\nde todo lo visible y lo invisible.\n Creo en un solo Señor, Jesucristo,\nHijo único de Dios, nacido del Padre\nantes de todos los siglos:\nDios de Dios, Luz de Luz,\nDios verdadero de Dios verdadero,\nengendrado, no creado,\nde la misma naturaleza del Padre,\npor quien todo fue hecho;\nque por nosotros los hombres\ny por nuestra salvación bajó del cielo,\ny por obra del Espíritu Santo\nse encarnó de María, la Virgen,\ny se hizo hombre; y por nuestra causa\nfue crucificado\nen tiempos de Poncio Pilato;\npadeció y fue sepultado,\ny resucitó al tercer día,\nsegún las Escrituras,\ny subió al cielo, y está sentado\na la derecha del Padre;\ny de nuevo vendrá con gloria\npara juzgar a vivos y muertos,\ny su reino no tendrá fin.\nCreo en el Espíritu Santo,\nSeñor y dador de vida,\nque procede del Padre y del Hijo,\nque con el Padre y el Hijo\nrecibe una misma adoración y gloria,\ny que habló por los profetas.\nCreo en la Iglesia, que es una,\nsanta, católica y apostólica.\nConfieso que hay un solo Bautismo\npara el perdón de los pecados.\nEspero la resurrección de los muertos\ny la vida del mundo futuro.\nAmén." },
        yoConfieso: { titulo: "Yo Confieso", texto: "Yo confieso ante Dios Todo poderoso,\ny ante ustedes hermanos,\nque he pecado mucho de pensamiento,\npalabra, obra y omisión.\nPor mi culpa, por mi culpa,\npor mi gran culpa.\nPor eso ruego a Santa María\nsiempre Virgen, a los ángeles,\na los santos y a ustedes hermanos,\nque intercedan por mí ante Dios,\nNuestro Señor.\nAmén."},
        actodeContriccion: { titulo: "Acto de contriccion", texto: "Señor mío, Jesucristo, Dios y hombre verdadero,\ncreador y redentor mío, por ser tu quien eres,\nBondad infinita, y por que te amo sobre todas las cosas,\nme pesa de todo corazón haberte ofendido.\nAyudado de tu divina gracia propongo firmemente\nnunca mas pecar, confesarme\ny cumplir la penitencia que me fuera impuesta\npara el perdón de mis pecados.\nAmén."},
        actodeContriccionCorto: { titulo: "Acto de contriccion (corto)", texto: "Dios mio, me arrepiento\nde todo corazón de haberte ofendido,\n porque eres infinitamente bueno;\ndame tu santa gracia\npara no ofenderte mas\nAmén."},
        losDiezMandamientos: { titulo: "Los diez mandamientos", texto: "1. Amarás a Dios sobre todas las cosas.\n2. No jurarás el nombre\nde Dios en vano.\n3. Santificarás las fiestas.\n4. Honrarás a tu padre y a tu madre.\n5. No matarás.\n6. No cometerás actos impuros.\n7. No robarás.\n8. No dirás falso testimonio\nni mentirás.\n9. No consentirás pensamientos\nni deseos impuros.\n10. No codiciarás los bienes ajenos."},
        losSieteSacramentos: {titulo: "Los siete sacramentos", texto: "1. Bautismo.\n2. Confirmación.\n3. Eucaristía.\n4. Reconciliación\n5. Unción de Enfermos.\n6. Orden Sacerdotal\n7. Matrimonio."},
        lasTresVirtudesTeologales: {titulo: "Las tres virtudes teologales", texto: "1. Fe.\n2. Esperanza.\n3. Caridad (Amor)"},
        salbeRegina: {titulo: "Salve Reina", texto: "Dios te salve,\nReina y Madre de misericordia,\nvida, dulzura y esperanza nuestra;\nDios te salve.\nA ti llamamos los desterrados\nhijos de Eva;\na ti suspiramos, gimiendo\ny llorando en este valle delágrimas.\n¡Ea, pues Señora, abogada nuestra,\nvuelve a nosotros esos tus ojos misericordiosos,\ny después de este destierro\nmuéstranos a Jesús,\nFruto bendito de tu vientre.\n¡Oh clemente, oh piadosa,\noh dulce Virgen María!\nRuega por nosotros\nSanta Madre de Dios,\npara que seamos dignos\nde alcanzar las divinas gracias\ny promesas de nuestro Señor Jesucristo.\nAmén."},
        bajoTuAmparo: {titulo: "Bajo tu amparo", texto: "Bajo tu amparo nos acogemos,\nSanta Madre de Dios;\nno desprecies las suplicas\nque te hacemos\nen nuestras necesidades;\nantes bien, libranos\nde todos los peligros,\n¡Oh Virgen gloriosa y bendita!\nRuega por nosotros\nSanta Madre de Dios.\nPara que seamos dignos\nde alcanzar las divinas gracias\ny promesas de nuestro Señor Jesucristo.\nAmen."},
        losCincoMSMI: {titulo: "Los cinco mandamientos de\nla Santa Madre Iglesia", texto: "1. Oír misa entera los domingos\ny fiestas de guardar.\n\n2. Confesar los pecados mortales\nal menos una vez al año,\ny en peligro de muerte,\ny si se ha de comulgar.\n\n3. Comulgar al menos\npor pascua de resurrección.\n\n4. Ayunar y abstenerse de comer carne\ncuando lo manda la Santa Madre Iglesia.\n\n5. Ayudar a la Iglesia en sus necesidades." },
        lasCuatroVC: {titulo: "Las cuatro virtudes\ncardinales", texto:"1. Prudencia.\n2. Justicia.\n3. Fortaleza.\n4. Templanza."},
        almadeCristo: {titulo: "Alma de Cristo", texto: "Alma de Cristo, santifícame.\nCuerpo de Cristo, sálvame.\nSangre de Cristo, embriágame.\nAgua del costado de Cristo, lávame.\nPasión de Cristo, confórtame.\n¡Oh, buen Jesús! óyeme.\nDentro de tus llagas, escóndeme.\nNo permitas que me separe de Ti.\nDel maligno enemigo, defiéndeme.\nEn la hora de mi muerte, llámame.\nY mándame ir a Ti,\npara que con tus santos y angeles\nte alabe, por los siglos de los siglos.\nAmén."},
        losCincoppubc: {titulo: "Los cinco pasos para una\nbuena confesion", texto:"1. Examen de conciencia.\n2. Dolor de los pecados.\n3. Propósito de enmienda.\n4. Decir los pecados al sacerdote.\n5. Cumplir la penitencia."},
        losSietePC: {titulo: "Los siete pecados capitales", texto: "1. Soberbia.\n2. Avaricia.\n3. Lujuria.\n4. Ira.\n5. Gula.\n6. Envidia.\n7. Pereza."},
        comunionespiritual: {titulo: "Comunion Espiritual", texto: "Jesús mío,\ncreo firmemente que estas\nen el santísimo sacramente del altar,\nte amo sobre todas las cosas\n y deseo tenerte en mi alma.\nYa que ahora no puedo recibirte sacramentalmente,\nven a lo menos espiritualmente a mi corazón.\nComo si ya hubieses venido,\nte abrazo y me uno todo a ti:\nno permitas que yo me separe de ti.\nAmén."}
    };

    // =================================================================
    // 2. LISTA DE ORACIONES POR LIBRO
    // =================================================================
    const oracionesPorLibro = {
        "libro1": { icono: '🌱', tema: 'tema-verde', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda'] },
        "libro2": { icono: '🐑', tema: 'tema-amarillo', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria'] },
        "libro3":  { icono: '🙏', tema: 'tema-rojo', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria', 'gloriaAlPadre'] },
        "libro4":  { icono: '✨', tema: 'tema-naranja', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria', 'gloriaAlPadre', 'credoN', 'yoConfieso', 'actodeContriccionCorto', 'losDiezMandamientos', 'losSieteSacramentos', 'lasTresVirtudesTeologales'] },
        "libro5":  { icono: '📖', tema: 'tema-morado', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria', 'gloriaAlPadre', 'credoN', 'yoConfieso', 'actodeContriccionCorto', 'losDiezMandamientos', 'losSieteSacramentos', 'lasTresVirtudesTeologales', 'salbeRegina', 'bajoTuAmparo', 'losCincoMSMI', 'lasCuatroVC'] },
        "libro6":  { icono: '🌾', tema: 'tema-granate', oraciones: ['senalDeLaCruz', 'padreNuestro', 'angelDeLaGuarda', 'aveMaria', 'gloriaAlPadre', 'credoN', 'yoConfieso', 'actodeContriccionCorto', 'losDiezMandamientos', 'losSieteSacramentos', 'lasTresVirtudesTeologales', 'salbeRegina', 'bajoTuAmparo', 'losCincoMSMI', 'lasCuatroVC', 'almadeCristo', 'losCincoppubc', 'losSietePC', 'comunionespiritual'] },
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
        if (locucionActual && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            if (locucionActual.text === textoParaLeer) {
                locucionActual = null;
                return;
            }
        }
        locucionActual = new SpeechSynthesisUtterance(textoParaLeer);
        locucionActual.lang = 'es-MX';
        locucionActual.rate = 0.9;

        locucionActual.onstart = () => {
            document.querySelectorAll('.oracion-card p.hablando').forEach(el => el.classList.remove('hablando'));
            parrafoElemento.classList.add('hablando');
        };

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
                barraProgreso.innerHTML = `<h3>¡Felicidades! ✨ ¡Has completado todas las oraciones!</h3>`;
            } else {
                barraProgreso.innerHTML = `<p>Progreso: <strong>${completadas} / ${totalOraciones}</strong> oraciones</p>`;
            }
        }

        if (listaIdsOraciones.length > 0) {
            listaIdsOraciones.forEach(idOracion => {
                const oracion = todasLasOraciones[idOracion];
                if (oracion) {
                    // --- CÓDIGO MODIFICADO PARA CREAR LA TARJETA ---
                    const divOracion = document.createElement('div');
                    divOracion.className = 'oracion-card'; 

                    divOracion.innerHTML = `
                        <div class="oracion-header">
                            <div class="perfil-img-container">
                                <img src="./img/virgen-de-guadalupe.jpg" alt="Nuestra Señora de Guadalupe" class="perfil-img">
                            </div>
                            <h3 class="oracion-titulo">${oracion.titulo}</h3>
                        </div>
                        <div class="oracion-cuerpo">
                            <p>${oracion.texto}</p>
                        </div>
                    `;

                    const btnEscuchar = document.createElement('button');
                    btnEscuchar.className = 'btn-escuchar';
                    btnEscuchar.textContent = '🔊';
                    btnEscuchar.setAttribute('aria-label', `Escuchar oración: ${oracion.titulo}`);
                    
                    const parrafoTexto = divOracion.querySelector('.oracion-cuerpo p');

                    btnEscuchar.addEventListener('click', (e) => {
                        e.stopPropagation();
                        leerTexto(`${oracion.titulo}. ${oracion.texto}`, parrafoTexto);
                    });
                    
                    divOracion.querySelector('.oracion-header').appendChild(btnEscuchar);
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






