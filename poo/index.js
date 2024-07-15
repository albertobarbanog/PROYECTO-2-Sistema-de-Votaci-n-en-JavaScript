// VERSION POO, A.B

class Encuesta {
  constructor(pregunta, opciones) {
    this.pregunta = pregunta;
    this.opciones = opciones;
    this.resultados = {};

    // Inicializar con opciones y cero votos
    opciones.forEach((opcion) => {
      this.resultados[opcion] = 0;
    });
  }

  registrarVoto(opcion) {
    if (this.opciones.includes(opcion)) {
      this.resultados[opcion]++;
      return true; // Voto registrado correctamente
    } else {
      console.log("Opción inválida.");
      return false; // Voto no registrado
    }
  }

  mostrarResultados() {
    let resultadosTexto = `Resultados de la encuesta "${this.pregunta}":\n`;
    for (let opcion in this.resultados) {
      resultadosTexto += `${opcion}: ${this.resultados[opcion]} voto(s)\n`;
    }
    return resultadosTexto;
  }
}

// Función para registrar el voto
function registrarVoto(pregunta, opcionSeleccionada) {
  const encuesta = encuestas.find((e) => e.pregunta === pregunta);

  if (!encuesta) {
    alert("Error: No se encontró la encuesta especificada.");
    return;
  }

  if (encuesta.registrarVoto(opcionSeleccionada)) {
    alert("Voto registrado correctamente.");
    actualizarListaEncuestas(); // Actualizar la lista para reflejar el nuevo voto
  } else {
    alert(
      `Error: "${opcionSeleccionada}" no es una opción válida para esta encuesta.`
    );
  }
}

// Mostrar los resultados
function mostrarResultados(pregunta) {
  const encuesta = encuestas.find((e) => e.pregunta === pregunta);
  const resultados = encuesta.mostrarResultados();
  alert(resultados);
}

// Agregar una nueva encuesta
function agregarNuevaEncuesta(event) {
  event.preventDefault();

  const pregunta = document.getElementById("pregunta").value.trim();
  const opcionesInput = document.getElementById("opciones").value.trim();

  if (!pregunta) {
    alert("Error: Por favor, ingresa una pregunta para la encuesta.");
    return;
  }

  if (!opcionesInput) {
    alert("Error: Por favor, ingresa opciones para la encuesta.");
    return;
  }

  const opciones = opcionesInput
    .split(",")
    .map((opcion) => opcion.trim())
    .filter((opcion) => opcion !== "");

  if (opciones.length < 2) {
    alert(
      "Error: Debes ingresar al menos dos opciones válidas separadas por comas."
    );
    return;
  }

  if (encuestas.some((e) => e.pregunta === pregunta)) {
    alert("Error: Ya existe una encuesta con esa pregunta.");
    return;
  }

  const nuevaEncuesta = new Encuesta(pregunta, opciones);
  encuestas.push(nuevaEncuesta);
  actualizarListaEncuestas();
  alert(`Nueva encuesta "${pregunta}" agregada exitosamente.`);
  document.getElementById("form-nueva-encuesta").reset();
}

// Actualizar la lista de encuestas en el HTML
function actualizarListaEncuestas() {
  const encuestasElement = document.getElementById("encuestas");
  encuestasElement.innerHTML = "";

  encuestas.forEach((encuesta) => {
    const encuestaDiv = document.createElement("div");
    encuestaDiv.innerHTML = `
      <h2>${encuesta.pregunta}</h2>
      <form id="form-${encuesta.pregunta.replace(/\s+/g, "-").toLowerCase()}">
        ${encuesta.opciones
          .map(
            (opcion) => `
          <input type="radio" id="${opcion}-${encuesta.pregunta}" name="voto" value="${opcion}">
          <label for="${opcion}-${encuesta.pregunta}">${opcion}</label><br>
        `
          )
          .join("")}
        <button type="submit">Votar</button>
      </form>
      <button onclick="mostrarResultados('${
        encuesta.pregunta
      }')">Mostrar Resultados</button>
    `;

    encuestasElement.appendChild(encuestaDiv);

    // Agregar evento de envío
    document
      .getElementById(
        `form-${encuesta.pregunta.replace(/\s+/g, "-").toLowerCase()}`
      )
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const opcionSeleccionada = this.voto.value;
        if (opcionSeleccionada) {
          registrarVoto(encuesta.pregunta, opcionSeleccionada);
        } else {
          alert("Por favor, selecciona una opción antes de votar.");
        }
      });
  });
}

// Asociar el evento submit
document
  .getElementById("form-nueva-encuesta")
  .addEventListener("submit", agregarNuevaEncuesta);

// Ejemplo
let encuestas = [
  new Encuesta("Encuesta 1", ["JavaScript", "Python", "Java"]),
  new Encuesta("Encuesta 2", ["C++", "Ruby", "PHP"]),
  new Encuesta("Encuesta 3", ["C#", "Swift", "Kotlin"]),
  new Encuesta("Encuesta 4", ["Rust", "Go", "TypeScript"]),
  new Encuesta("Encuesta 5", ["Scala", "Perl", "Haskell"]),
  new Encuesta("Encuesta 6", ["Dart", "Lua", "Elixir"]),
  new Encuesta("Encuesta 7", ["Clojure", "F#", "Scheme"]),
  new Encuesta("Encuesta 8", ["VB.NET", "Objective-C", "Assembly"]),
];

// Actualizar la lista de encuestas inicialmente
actualizarListaEncuestas();
