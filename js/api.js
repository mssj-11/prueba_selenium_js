/* --------------------------------------------
   PARTIDOS POR LIGA
-------------------------------------------- */

const fromDate = new Date().toISOString().split("T")[0];
const fromDateObj = new Date(fromDate);
// Incrementa el mes de la fecha y dia
fromDateObj.setMonth(fromDateObj.getMonth() + 1);
fromDateObj.setMonth(fromDateObj.getMonth() + 1); // siguiente mes
fromDateObj.setDate(0); // Último día del mes previo
// Formatea la fecha a 'YYYY-MM-DD'
const toDate = fromDateObj.toISOString().split("T")[0];
console.log(toDate);

// Obtener el elemento select
const leagueSelect = document.getElementById("leagueSelect");
leagueSelect.addEventListener("change", () => {
  leagueId = parseInt(leagueSelect.value);
  console.log("leagueId actualizado:", leagueId);
  getFootballData();
});

// Inicialización del leagueId en el onload
window.onload = function () {
  updateLeagueId();
};

const teamId = 97;
let leagueId = 302;
const apiKey = "1b146cb96b4fb6a8d5f1e9150a577e5da65a7269425e4829a5e787ae54cc08a5";
const urlBase = `https://apiv3.apifootball.com/?action=get_events&from=${fromDate}&to=${toDate}&league_id=`;
//const urlBase = `https://apiv3.apifootball.com/?action=get_events&from=${fromDate}&to=${toDate}&league_id=${leagueId}&team_id=${teamId}&APIkey=${apiKey}`;//${numberMatches}

function getFootballData() {
  const url = `${urlBase}${leagueId}&team_id=${teamId}&APIkey=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      //console.log("Datos recibidos: ", data);
      if (data.length > 0) {
        console.log("Proximos partidos del Barcelona: ", data);
        renderMatches(data);
      }
    })
    .catch((error) => {
      console.log("Error al consumir la API: ", error);
    });
}

function renderMatches(matches) {
  const container = document.getElementById("matches-container");
  container.innerHTML = "";

  matches.forEach((match) => {
    const homeTeam = match.match_hometeam_name;
    const logoTeam = match.team_home_badge;
    const awayTeam = match.match_awayteam_name;
    const logoAwayTeam = match.team_away_badge;
    const matchDate = new Date(match.match_date);
    const matchTime = match.match_time;
    const matchStadium = match.match_stadium;

    // Formatear la fecha
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formattedDate = matchDate.toLocaleDateString("es-ES", options);

    // Crads
    const card = document.createElement("div");
    card.className = "card";

    // Body card
    card.innerHTML = `
            <!-- Parte superior: Fecha -->
            <div class="card-date">
                <p>${formattedDate}</p>
            </div>

            <!-- Parte inferior: columnas -->
            <div class="card-body">
                <div class="card-column">
                    <img src="${logoTeam}" alt="${homeTeam}" />
                </div>
                <div class="card-column">
                    <p><strong>Liga:</strong> ${match.league_name}</p>
                    <p><strong>Hora:</strong> ${matchTime}</p>
                    <strong class="ha-teams">${homeTeam} vs ${awayTeam}</strong>
                    <p><strong>Estadio:</strong> ${matchStadium}</p>
                </div>
                <div class="card-column">
                    <img src="${logoAwayTeam}" alt="${awayTeam}" />
                </div>
            </div>
        `;
    container.appendChild(card);
  });
}


/* --------------------------------------------
   PROXIMOS PARTIDOS
-------------------------------------------- */
// Función para obtener los 5 próximos partidos en orden de fecha
function getUpcomingMatches() {
  const allMatches = []; // Aquí guardaremos todos los partidos

  // Llamar a la API
  fetch(
    `https://apiv3.apifootball.com/?action=get_events&from=${fromDate}&to=${toDate}&team_id=${teamId}&APIkey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Verifica que se están recibiendo los datos correctamente
      // Ordenar los partidos por fecha
      data.sort((a, b) => new Date(a.match_date) - new Date(b.match_date));

      // Limitar a los primeros 5 partidos
      const upcomingMatches = data.slice(0, 6);

      // Renders the slider with the top 5 matches
      renderSliderMatches(upcomingMatches);
    })
    .catch((error) => {
      console.error("Error al obtener los partidos:", error);
    });
}

// Función para renderizar los partidos en el slider
function renderSliderMatches(matches) {
  const slider = document.querySelector(".slider-partidos");
  slider.innerHTML = ""; // Limpiar el slider antes de agregar los nuevos partidos

  console.log("Matches para el slider:", matches); // Asegúrate de que hay partidos a mostrar

  if (matches.length === 0) {
    slider.innerHTML = "<p>No hay partidos próximos.</p>";
  }

  matches.forEach((match) => {
    const leagueName = match.league_name;
    const homeTeam = match.match_hometeam_name;
    const logoTeam = match.team_home_badge;
    const awayTeam = match.match_awayteam_name;
    const logoAwayTeam = match.team_away_badge;
    const matchDate = new Date(match.match_date);
    const matchTime = match.match_time;
    const matchStadium = match.match_stadium;

    // Formatear la fecha
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formattedDate = matchDate.toLocaleDateString("es-ES", options);

    // Crear tarjeta para cada partido
    const card = document.createElement("div");
    card.className = "card";

    // Contenido de la tarjeta
    card.innerHTML = `
            <div class="card-date">
                <p>${formattedDate}</p>
            </div>
            <div class="card-body">
                <div class="card-column">
                    <img src="${logoTeam}" alt="${homeTeam}" />
                </div>
                <div class="card-column">
                    <p><strong>Liga:</strong> ${leagueName}</p>
                    <p><strong>Hora:</strong> ${matchTime}</p>
                    <strong class="ha-teams">${homeTeam} vs ${awayTeam}</strong>
                    <p><strong>Estadio:</strong> ${matchStadium}</p>
                </div>
                <div class="card-column">
                    <img src="${logoAwayTeam}" alt="${awayTeam}" />
                </div>
            </div>
        `;
    slider.appendChild(card);
  });

  // Mostrar el slider
  showSlider();
}

// Función para mostrar el slider y controlar los botones de navegación
function showSlider() {
  const slider = document.querySelector(".slider-partidos");
  const prevButton = document.getElementById("slider-prev");
  const nextButton = document.getElementById("slider-next");
  let offset = 0; // Offset para el slider

  // Control de los botones de navegación
  nextButton.addEventListener("click", () => {
    if (offset < slider.children.length - 1) {
      offset++;
      slider.style.transform = `translateX(-${offset * 390}px)`;
    }
  });

  prevButton.addEventListener("click", () => {
    if (offset > 0) {
      offset--;
      slider.style.transform = `translateX(-${offset * 390}px)`;
    }
  });
}

window.onload = function () {
  // Asigna el valor de leagueId desde el select al cargar la página
  leagueId = parseInt(leagueSelect.value);
  console.log("leagueId inicial:", leagueId);

  // Llama a la función para obtener los próximos partidos
  getUpcomingMatches();
};