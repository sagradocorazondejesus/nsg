// Misterios por día
const misteriosPorDia = {
  0: 'Gloriosos',   // Domingo
  1: 'Gozosos',     // Lunes
  2: 'Dolorosos',   // Martes
  3: 'Gloriosos',   // Miércoles
  4: 'Luminosos',   // Jueves
  5: 'Dolorosos',   // Viernes
  6: 'Gozosos'      // Sábado
};

// Misterios y títulos
const misterios = {
  Gozosos: [
    "La Anunciación del Ángel a María",
    "La Visitación de María a su prima Isabel",
    "El Nacimiento del niño Dios",
    "La Presentación de Jesús en el templo",
    "El Niño perdido y hallado en el templo"
  ],
  Dolorosos: [
    "La oración de Jesús en el huerto",
    "La flagelación de nuestro Señor Jesucristo",
    "La coronación de espinas",
    "Jesús con la cruz a cuestas",
    "La crucifixión y muerte de nuestro Señor Jeuscristo"
  ],
  Gloriosos: [
    "La Resurrección del Señor",
    "La Ascensión del Señor al cielo",
    "La venida del Espíritu Santo",
    "La Asunción de la Virgen María",
    "La Coronación de María como Reina del cielo"
  ],
  Luminosos: [
    "El Bautismo de Jesús en el Jordán",
    "Las bodas de Caná",
    "El anuncio del Reino de Dios",
    "La Transfiguración",
    "La Institución de la Eucaristía"
  ]
};

// Oración común
const oraciones = `
Padre Nuestro...

Ave María (x10)...

Gloria al Padre, al Hijo y al Espíritu Santo,
como era en el principio, ahora y siempre,
por los siglos de los siglos. Amén.

María madre de gracia y madre de misericordia,
en la vida y en la muerte ampáranos gran Señora.

Sagrado Corazón de Jesús, en vos confío.
`;

// Día actual
const hoy = new Date().getDay();
const tipo = misteriosPorDia[hoy];
const lista = misterios[tipo];

document.getElementById('titulo-dia').textContent = `Hoy se rezan los Misterios ${tipo}`;

// === INTRODUCCIÓN ===
document.getElementById('introduccion').innerHTML = `
  <div class="post">
    <div class="perfil">
      <img src="images/guadalupe.png" alt="Virgen de Guadalupe">
      <span class="misterio">Comenzamos<br>con el Santo Rosario:</span>
    </div>
    <div class="contenido">
      <p class="oracion">
En el nombre del Padre, del Hijo y del Espíritu Santo. Amén.<br>
Dios mío, me arrepiento de todo corazón de haberte ofendido, por que eres infinitamente bueno.
Dame tu santa gracia para no ofenderte más. Amén.<br>
Padre Nuestro...<br>
Ave María.
      </p>
    </div>
  </div>
`;

// === MISTERIOS ===
const contenedor = document.getElementById('contenedor-posts');
lista.forEach((titulo, index) => {
  const post = document.createElement('div');
  post.className = 'post';
  post.innerHTML = `
    <div class="perfil">
      <img src="images/guadalupe.png" alt="Virgen de Guadalupe">
      <span class="misterio">${ordinal(index + 1)} Misterio ${tipo}</span>
    </div>
    <div class="contenido">
      <p class="titulo">${titulo}</p>
      <p class="oracion">${oraciones}</p>
    </div>
  `;
  contenedor.appendChild(post);
});

// === ORACIÓN POR EL PAPA ===
document.getElementById('intencion-papa').innerHTML = `
  <div class="post">
    <div class="perfil">
      <img src="images/guadalupe.png" alt="Virgen de Guadalupe">
      <span class="misterio">Oración por el Santo Padre</span>
    </div>
    <div class="contenido">
      <p class="oracion">
Recemos un Padre Nuestro por las intenciones del Santo Padre el Papa León XIV:<br><br>
Padre Nuestro...
      </p>
    </div>
  </div>
`;

// === ORACIONES FINALES ===
document.getElementById('oraciones-finales').innerHTML = `
  <div class="post">
    <div class="perfil">
      <img src="images/guadalupe.png" alt="Virgen de Guadalupe">
      <span class="misterio">Oraciones Finales</span>
    </div>
    <div class="contenido">
      <p class="oracion">
Dios te salve María Santísima, Hija de
Dios Padre, Virgen purísima, en tus
manos encomendamos nuestra fe para
que la ilumines, llena eres de gracia el Señor es con tigo bendita eres entre todas las mujeres y bendito es el fruto de tu vientre Jesus<br>
Dios te salve María Sanísima, Madre de
Dios Hijo, Virgen purísima, en tus manos
encomendamos nuestra esperanza para
que la alientes, llena eres de gracia el Señor es con tigo bendita eres entre todas las mujeres y bendito es el fruto de tu vientre Jesus<br>
Dios te salve María Sanísima, Esposa de
Dios Espíritu Santo, Virgen purísima, en
tus manos encomendamos nuestra caridad
para que la inflames, llena eres de gracia el Señor es con tigo bendita eres entre todas las mujeres y bendito es el fruto de tu vientre Jesus<br>
Dios te salve María Sanísima, Virgen
purísima, Templo y Sagrario de la
Sanasima Trinidad, Virgen concebida sin
pecado original.<br>
Dios te salve, Reina y Madre de misericordia,
vida, dulzura y esperanza nuestra. Dios te
salve. A tí clamamos los desterrados hijos de
Eva, a tí suspiramos, gimiendo y llorando en
este valle de lágrimas. Ea, pues, Señora
Abogada Nuestra, vuelve a nosotros esos tus
ojos misericordiosos, y después de este
destíerro, muéstranos a Jesús, fruto bendito de
tu vientre. Oh, clemente, oh piadosa, oh dulce
Virgen María. Ruega por nosotros, Santa
Madre de Dios, para que seamos dignos de
alcanzar las divinas gracias y promesas de
Nuestro Señor Jesucristo. Amén.
      </p>
    </div>
  </div>
`;

// === LETANÍAS ===
document.getElementById('letanias').innerHTML = `
  <div class="post">
    <div class="perfil">
      <img src="images/guadalupe.png" alt="Virgen de Guadalupe">
      <span class="misterio">Letanías Lauretanas</span>
    </div>
    <div class="contenido">
      <p class="oracion">
      
Señor, ten piedad de nosotros.
       Todos: Señor ten piedad de nosotros<br>
Cristo, ten piedad de nosotros.
       Todos: Cristo ten piedad de nosotros<br>
Señor, ten piedad de nosotros.
       Todos: Señor ten piedad de nosotros<br>
Jesucristo, óyenos.
       Todos: Jesucristo, óyenos.
Jesucristo, escúchanos.
       Todos: Jesucristo, escuchanos
Dios Padre celestial, 
       Todos: ten piedad de nosotros.<br>
Dios Hijo, Redentor del mundo, 
       Todos: ten piedad de nosotros.<br>
Dios Espíritu Santo, 
       Todos: ten piedad de nosotros.<br>
Trinidad Santa, un solo Dios, ten piedad de nosotros.<br><br>
Santa María, ruega por nosotros.<br>
Santa Madre de Dios, ruega por nosotros.<br>
Santa Virgen de las vírgenes, ruega por nosotros.<br>
...<br>
Reina del Santo Rosario, ruega por nosotros.<br><br>
Cordero de Dios que quitas el pecado del mundo, perdónanos Señor.<br>
Cordero de Dios que quitas el pecado del mundo, escúchanos Señor.<br>
Cordero de Dios que quitas el pecado del mundo, ten piedad de nosotros.<br><br>
Ruega por nosotros, Santa Madre de Dios,<br>
Para que seamos dignos de alcanzar las promesas de Cristo. Amén.
      </p>
    </div>
  </div>
`;

// Utilidad: ordinal
function ordinal(n) {
  const nombres = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto"];
  return nombres[n - 1] || `${n}°`;
}
