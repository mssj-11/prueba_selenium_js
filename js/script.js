/* --------------------------------------------
   Progress Scroll Bar
-------------------------------------------- */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});

/* --------------------------------------------
   SLIDER
-------------------------------------------- */
// Inicialización del slider
function inicializarSlider() {
  const slider = document.querySelector('.slider');
  const slides = Array.from(document.querySelectorAll('.slide')); // Todos los slides
  const totalSlides = slides.length; // Total de slides
  let currentIndex = 0; // Índice del slide actual

  // Función para actualizar la posición del slider
  const updateSliderPosition = () => {
    const offset = -currentIndex * 100;  // Calcula el desplazamiento en porcentaje
    slider.style.transform = `translateX(${offset}%)`;  // Aplica el desplazamiento
  };

  // Función para ir al siguiente slide
  const goToNextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;  // Avanza al siguiente slide (circular)
    updateSliderPosition();
  };

  // Función para ir al slide anterior
  const goToPreviousSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;  // Retrocede al anterior (circular)
    updateSliderPosition();
  };

  // Eventos de los botones next y prev
  document.querySelector('.next').addEventListener('click', goToNextSlide);
  document.querySelector('.prev').addEventListener('click', goToPreviousSlide);

  // Inicializar el slider mostrando el primer slide
  updateSliderPosition();
}

/* --------------------------------------------
   DB
-------------------------------------------- */
// Función para cargar los datos del archivo JSON
async function cargarDatosJSON() {
  try {
    const response = await fetch('js/db.json'); // Cargar el archivo JSON
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    const data = await response.json();
    generarTabla(data.jugadores);  // Pasamos los jugadores para la tabla
    generarSlides(data.jugadores);  // Pasamos los jugadores para el slider
  } catch (error) {
    console.error('Hubo un problema con la carga del archivo JSON:', error);
  }
}

/* --------------------------------------------
   Tablas
-------------------------------------------- */
// Función para generar las filas de la tabla
function generarTabla(jugadores) {
  const tabla = document.querySelector('#tabla-jugadores tbody');  // Seleccionamos el cuerpo de la tabla por su id

  // Limpiamos las filas existentes, excepto la cabecera
  tabla.innerHTML = '';  // Limpiar el cuerpo de la tabla

  // Recorremos el array de jugadores y generamos las filas
  jugadores.forEach(jugador => {
    const fila = document.createElement('tr');  // Creamos una nueva fila

    // Creamos las celdas de la fila
    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = jugador.nombre;

    const celdaPosicion = document.createElement('td');
    celdaPosicion.textContent = jugador.posicion;

    const celdaNumero = document.createElement('td');
    celdaNumero.textContent = jugador.numero;

    // Agregamos las celdas a la fila
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPosicion);
    fila.appendChild(celdaNumero);

    // Finalmente, agregamos la fila a la tabla
    tabla.appendChild(fila);
  });
}

/* --------------------------------------------
   Tarjetas
-------------------------------------------- */
// Función para generar las tarjetas Slider
function generarSlides(jugadores) {
  const slider = document.querySelector('.slider');  // Seleccionamos el contenedor de los slides

  // Limpiamos el contenido previo de los slides
  slider.innerHTML = '';

  // Recorremos el arreglo de jugadores
  jugadores.forEach(jugador => {
    // Usamos una plantilla literal con los datos de cada jugador
    const slideHTML = `
      <div class="slide">
        <img src="${jugador.imgSrc}" title="${jugador.nombre}" alt="${jugador.alt}" />
        <div class="info-overlay">
          <p class="number-j">${jugador.numero}</p>
          <h4 class="slide-caption">${jugador.nombre}</h4>
          <p>${jugador.posicion}</p>
          <hr>
          <div class="player-info">
            <div class="info-column">
              <strong>Partidos</strong>
              <p>${jugador.partidos}</p>
            </div>
            <div class="info-column">
              <strong>Goles</strong>
              <p>${jugador.goles}</p>
            </div>
            <div class="info-column">
              <strong>Asistencias</strong>
              <p>${jugador.asistencias}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Insertamos el HTML generado en el contenedor del slider
    slider.innerHTML += slideHTML;
  });

  // Llamamos a la función para iniciar el slider
  inicializarSlider();
}

// Ejecutamos la función para cargar los datos del archivo JSON cuando el DOM se haya cargado
document.addEventListener('DOMContentLoaded', cargarDatosJSON);