// VERSION PF

// Función para crear una nueva encuesta
const crearEncuesta = (pregunta, opciones) => ({
  pregunta,
  opciones,
  resultados: new Map(opciones.map((opcion) => [opcion.trim(), 0])),
});

// Función para registrar un voto
const registrarVoto = (pregunta, opcionSeleccionada) => {
  const encuesta = encuestas.find((encuesta) => encuesta.pregunta === pregunta);
  if (encuesta && encuesta.opciones.includes(opcionSeleccionada)) {
    encuesta.resultados.set(
      opcionSeleccionada,
      encuesta.resultados.get(opcionSeleccionada) + 1
    );
    actualizarListaEncuestas();
    alert("Voto registrado correctamente.");
    return true;
  } else {
    alert("Opción inválida.");
    return false;
  }
};

// Mostrar los resultados
const mostrarResultados = (pregunta) => {
  const encuesta = encuestas.find((encuesta) => encuesta.pregunta === pregunta);
  if (encuesta) {
    let resultadosTexto = `Resultados de la encuesta "${encuesta.pregunta}":\n`;
    encuesta.opciones.forEach((opcion) => {
      resultadosTexto += `${opcion}: ${encuesta.resultados.get(
        opcion.trim()
      )} voto(s)\n`;
    });
    alert(resultadosTexto);
  } else {
    alert("Encuesta no encontrada.");
  }
};

// Agregar una nueva encuesta
const agregarNuevaEncuesta = (event) => {
  event.preventDefault();

  const pregunta = document.getElementById("pregunta").value.trim();
  const opciones = document
    .getElementById("opciones")
    .value.split(",")
    .map((opcion) => opcion.trim())
    .filter((opcion) => opcion !== "");

  if (pregunta && opciones.length >= 2) {
    // Verificar si ya existe una encuesta con la misma pregunta
    if (encuestas.some((encuesta) => encuesta.pregunta === pregunta)) {
      alert(
        "Ya existe una encuesta con esta pregunta. Por favor, use una pregunta diferente."
      );
      return;
    }

    const nuevaEncuesta = crearEncuesta(pregunta, opciones);
    encuestas.push(nuevaEncuesta);
    actualizarListaEncuestas();
    alert(`Nueva encuesta "${pregunta}" agregada.`);
    document.getElementById("form-nueva-encuesta").reset();
  } else {
    alert(
      "Por favor, ingresa una pregunta y al menos dos opciones válidas separadas por comas."
    );
  }
};

// Función para actualizar la lista de encuestas en el HTML
const actualizarListaEncuestas = () => {
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
          <input type="radio" id="${opcion}" name="voto" value="${opcion}">
          <label for="${opcion}">${opcion}</label><br>
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
};

// Ejemplo
let encuestas = [
  crearEncuesta("Encuesta 1", ["JavaScript", "Python", "Java"]),
  crearEncuesta("Encuesta 2", ["C++", "Ruby", "PHP"]),
  crearEncuesta("Encuesta 3", ["C#", "Swift", "Kotlin"]),
  crearEncuesta("Encuesta 4", ["Rust", "Go", "TypeScript"]),
  crearEncuesta("Encuesta 5", ["Scala", "Perl", "Haskell"]),
  crearEncuesta("Encuesta 6", ["Dart", "Lua", "Elixir"]),
  crearEncuesta("Encuesta 7", ["Clojure", "F#", "Scheme"]),
  crearEncuesta("Encuesta 8", ["VB.NET", "Objective-C", "Assembly"]),
];

// Actualizar la lista de encuestas inicialmente
actualizarListaEncuestas();

// Asociar evento submit
document
  .getElementById("form-nueva-encuesta")
  .addEventListener("submit", agregarNuevaEncuesta);
