let FECHA_DE_NACIMIENTO = ""; // "2024-08-16";  //tiene que ser un día más para calcular bien.
let subtitulo = "" // "Nació el Jueves 15 a las 16:15hs"


document.addEventListener("DOMContentLoaded", function() {
  actualizar_variables_de_fechas();
  dibujar_tabla();
  evaluar_animacion_de_nacimiento();

  setInterval(() => {
    actualizar_variables_de_fechas();
    dibujar_tabla();
    evaluar_animacion_de_nacimiento();
  }, 60*60*1000);

});

function generar_confetti() {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 150),
    particleCount: randomInRange(50, 200),
    origin: { y: 0.75 }
  });
}

function formatear_fecha(fecha) {
  var options = { month: 'short', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', options);
}

// retorna una lista de números de días a partir
// de la semana.
function dias_de_la_semana(semana) {
  return [1, 2, 3, 4, 5, 6, 7].map(n => n+semana*7);
}

function obtener_clase_para_el_dia(dia, dias) {
  if (dia<dias) {
    return "done";
  } else {
    if (dia==Math.ceil(dias)) {
      return "hoy";
    } else {
      return "wait";
    }
  }
}

function dibujar_tabla() {
  console.log("iniciando el dibujado...");
  const UN_DIA = 1000 * 60 * 60 * 24;

  // fecha de gestación y fecha actual.
  const comienzo = new Date(2026, 5, 7)
  let hoy = null

  if (FECHA_DE_NACIMIENTO) {
    hoy = new Date(FECHA_DE_NACIMIENTO);
  } else {
    hoy = new Date();
  }
  

  // diferencia entre fechas, milisegundos, días y semanas.
  const diff_en_ms = new Date(hoy) - new Date(comienzo)
  const dias = diff_en_ms / (UN_DIA);
  const semana_actual = parseInt(dias/7);

  // semanas de 0 a 39...
  const semanas = [...Array(40).keys()];

  let data = semanas.map(semana => {
      return {
        semana: semana,
        fecha: new Date(comienzo.getTime() + UN_DIA * semana*7),
        clase: (semana == semana_actual)?"actual": "",
        dias: dias_de_la_semana(semana).map(dia => {
          return {
            clase: obtener_clase_para_el_dia(dia, dias),
          }
        })
      }
    }
  );

  // Dibuja el contenido en la página:
  const tabla = document.querySelector("#tabla tbody");
  tabla.innerHTML = "";


  let tr = document.createElement("tr")

    tr.innerHTML = `
      <td class="semana"></td>
      <td class="dias">
        <span class="dia-de-la-semana">M</span>
        <span class="dia-de-la-semana">J</span>
        <span class="dia-de-la-semana">V</span>
        <span class="dia-de-la-semana">S</span>
        <span class="dia-de-la-semana">D</span>
        <span class="dia-de-la-semana">L</span>
        <span class="dia-de-la-semana">M</span>
      </td>
      <td>
      </td>
    `;

    tabla.appendChild(tr);


  data = data.reverse();


  data.map(semana => {
    let tr = document.createElement("tr")

    let dias = semana.dias.map(dia => {

      if (dia.clase === "hoy") {
        return `<div class="today"><img src='corazon.png'></div>`
      } else {
        return `<span class="${dia.clase}"></span>`;
      }

      return `<span class="${dia.clase}"></span>`;
    });

    tr.innerHTML = `
      <td class="semana ${semana.clase}">Semana ${semana.semana+1}</td>
      <td class="dias">
        ${dias.join("")}
      </td>
      <td>
        ${formatear_fecha(semana.fecha)}
      </td>
    `;

    tabla.appendChild(tr);
  });
}

function evaluar_animacion_de_nacimiento() {
  if (FECHA_DE_NACIMIENTO) {
    document.getElementById("osito").classList.add("amacar");
    document.getElementById("titulo").innerText = "¡ Ya nació !";
    document.getElementById("subtitulo").innerText = subtitulo;
    document.getElementById("titulo").classList.add("animar-colores");

    setInterval(() => {
      if (!document.hidden){
        generar_confetti();
      }
    }, 1000);
  } else {
    document.getElementById("subtitulo").innerText = subtitulo;
  }

}

function actualizar_variables_de_fechas() {
  if (window.location.href.includes("fecha")) {
    FECHA_DE_NACIMIENTO = window.location.href.split("fecha=")[1];
  }
}
