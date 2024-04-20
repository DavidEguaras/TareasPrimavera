import { Juego } from "./clases/juego.js";


// El juego no se inicia hasta que el jugador no introduzca su nombre
function iniciarJuego(nombreJugador, apuesta) {
    const pedirCartaBtn = document.getElementById("pedirCartaButton");
    const plantarseBtn = document.getElementById("plantarseButton");
    const subseccionBanca = document.getElementById("subseccionBanca");
    const subseccionJugador = document.getElementById("subseccionJugador");
    const balanceTotalDineroJugador = document.getElementById("balanceTotalDineroJugador");
    const dineroApostado = document.getElementById("dineroApostado");
    const mensajeFinPartida = document.getElementById("mensajeFinPartida");
    const cartasRepartidasTotales = document.getElementById("cartasRepartidasTotales");

    // Creamos una instancia del juego
    const juego = new Juego(apuesta, nombreJugador);
    juego.iniciarJuego();


   function actualizarInterfaz() {
    // Info de la banca
    subseccionBanca.innerHTML = `
        <h2>BANCA</h2>
        <ul>
            ${juego.banca.imprimirManoBanca().join('')}
        </ul>
    `;
    console.log(juego.banca.imprimirMano());

    // Info del jugador
    subseccionJugador.innerHTML = `
        <h2>JUGADOR</h2>
        <ul>
            ${juego.jugador.imprimirMano().join('')}
        </ul>
        <p>Tu puntuacion: ${juego.jugador.calcularPuntuacion()}</p>
    `;

    // Informacion general de la partida
    balanceTotalDineroJugador.textContent = juego.jugador.balance;
    dineroApostado.textContent = juego.apuesta;
    cartasRepartidasTotales.textContent = 40 - juego.baraja.cartas.length;
}


    pedirCartaBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            //Por cada vez que el jugador pide una carta, la banca pedira otra si su puntuacion es menor o igual que 5
            juego.repartirCartas();
            actualizarInterfaz();
            //Si el jugador se pasa de 7,5, la partida termina automaticamente
            if (juego.jugador.calcularPuntuacion() > 7.5) {
                mensajeFinPartida.innerText = juego.finalizar();
                actualizarInterfaz();
            }
        }
    });


    plantarseBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            mensajeFinPartida.innerText = juego.finalizar();
            actualizarInterfaz();
        }
    });
}

//se lo pedi a chatgpt porque no sabia como manejar bien el inicio del juego y el evento
// Manejador de evento para enviar el nombre del jugador
document.getElementById("formNombreApuesta").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreJugador = document.getElementById("nombreJugadorInput").value;
    const apuesta = document.getElementById("apuesta").value;
    document.getElementById("nombreJugadorHeader").textContent = nombreJugador;
    iniciarJuego(nombreJugador, apuesta);
});

