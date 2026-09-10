
// Estado de la aplicación
let numeroSecreto = generarNumeroAleatorio();
let intentos = 0;
let juegoTerminado = false;
const historial = [];

// Elementos del DOM
const inputNumero = document.getElementById('numero');
const botonAdivinar = document.getElementById('adivinar');
const mensaje = document.getElementById('mensaje');
const intentosCount = document.getElementById('intentosCount');
const ultimoIntento = document.getElementById('ultimoIntento');
const historialLista = document.getElementById('historialLista');
const botonReiniciar = document.getElementById('reiniciar');

// Generador de número aleatorio entre 1 y 100
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 100) + 1;
}

// Actualizar el historial visual de intentos
function actualizarHistorial(numero, tipo) {
  if (historial.length === 0) {
    historialLista.innerHTML = '';
  }

  historial.push({ numero, tipo });

  const tag = document.createElement('span');
  tag.className = `tag ${tipo}`;
  tag.textContent = `${numero} (${tipo === 'mayor' ? '⬇️ muy alto' : tipo === 'menor' ? '⬆️ muy bajo' : '🎯 correcto'})`;
  historialLista.appendChild(tag);
}

// Lógica de validación y procesamiento de la jugada
function procesarJugada() {
  if (juegoTerminado) return;

  const numeroJugador = parseInt(inputNumero.value, 10);

  // Validación del rango de entrada
  if (isNaN(numeroJugador) || numeroJugador < 1 || numeroJugador > 100) {
    mensaje.className = 'feedback-msg error';
    mensaje.textContent = '⚠️ Ingresa un número válido entre 1 y 100.';
    inputNumero.focus();
    return;
  }

  intentos++;
  intentosCount.textContent = intentos;
  ultimoIntento.textContent = numeroJugador;

  if (numeroJugador === numeroSecreto) {
    // Victoria
    juegoTerminado = true;
    mensaje.className = 'feedback-msg ganador';
    mensaje.textContent = `🎉 ¡Felicidades! ¡Adivinaste el número secreto (${numeroSecreto}) en ${intentos} intentos!`;
    actualizarHistorial(numeroJugador, 'acierto');
    finalizarJuego();
  } else if (numeroJugador < numeroSecreto) {
    // Pista: es más alto
    mensaje.className = 'feedback-msg bajo';
    mensaje.textContent = `⬆️ El número secreto es más alto que ${numeroJugador}.`;
    actualizarHistorial(numeroJugador, 'menor');
  } else {
    // Pista: es más bajo
    mensaje.className = 'feedback-msg alto';
    mensaje.textContent = `⬇️ El número secreto es más bajo que ${numeroJugador}.`;
    actualizarHistorial(numeroJugador, 'mayor');
  }

  inputNumero.value = '';
  inputNumero.focus();
}

// Finalización y activación del botón de reinicio
function finalizarJuego() {
  inputNumero.disabled = true;
  botonAdivinar.disabled = true;
  botonReiniciar.classList.remove('hidden');
}

// Reiniciar la partida
function reiniciarPartida() {
  numeroSecreto = generarNumeroAleatorio();
  intentos = 0;
  juegoTerminado = false;
  historial.length = 0;

  intentosCount.textContent = '0';
  ultimoIntento.textContent = '-';
  mensaje.className = 'feedback-msg';
  mensaje.textContent = '';
  historialLista.innerHTML = '<span class="empty-history">Aún no hay intentos registrados</span>';

  inputNumero.disabled = false;
  botonAdivinar.disabled = false;
  botonReiniciar.classList.add('hidden');
  inputNumero.value = '';
  inputNumero.focus();
}

// Event Listeners
botonAdivinar.addEventListener('click', procesarJugada);

inputNumero.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    procesarJugada();
  }
});

botonReiniciar.addEventListener('click', reiniciarPartida);