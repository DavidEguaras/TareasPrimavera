import { Juego } from "./clases/juego.js";

// El juego no se inicia hasta que el jugador no introduzca su nombre
function iniciarJuego(nombreJugador) {
    const pedirCartaBtn = document.getElementById("pedirCartaButton");
    const plantarseBtn = document.getElementById("plantarseButton");
    const subseccionBanca = document.getElementById("subseccionBanca");
    const subseccionJugador = document.getElementById("subseccionJugador");
    const balanceTotalDineroJugador = document.getElementById("balanceTotalDineroJugador");
    const dineroApostado = document.getElementById("dineroApostado");
    const cartasRepartidasTotales = document.getElementById("cartasRepartidasTotales");
    const mensajeFinPartida = document.getElementById("mensajeFinPartida")

    // Creamos una instancia del juego
    const juego = new Juego(10, nombreJugador);

    function actualizarInterfaz() {
        subseccionBanca.innerHTML = `
            <h2>BANCA</h2>
            <p>Numero de cartas de la banca: ${juego.banca.mano.length}</p>
        `;
        console.log(juego.banca.mano.map(carta => carta.nombre + ' de ' + carta.palo));
        subseccionJugador.innerHTML = `
            <p>Tus cartas: ${juego.jugador.mano.map(carta => carta.nombre + ' de ' + carta.palo).join(', ')}</p>
            <p>Tu puntuacion: ${juego.jugador.calcularPuntuacion()}</p>
        `;


        
        balanceTotalDineroJugador.textContent = juego.jugador.balance;

        
        dineroApostado.textContent = juego.apuesta;
        cartasRepartidasTotales.textContent = juego.baraja.cartas.length - 1;
    }

    // Manejador de evento para el botón "Pedir Carta"
    pedirCartaBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            juego.jugador.recibirCarta(juego.baraja.sacarCarta());
            juego.banca.recibirCarta(juego.baraja.sacarCarta());
            actualizarInterfaz();
            if (juego.jugador.calcularPuntuacion() > 7.5) {
                mensajeFinPartida.innerText = juego.finalizar();
                actualizarInterfaz();
            }
        }
    });

    
    plantarseBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            juego.finalizar();
            actualizarInterfaz();
        }
    });
}

// Manejador de evento para enviar el nombre del jugador
document.getElementById("formNombre").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreJugador = document.getElementById("nombreJugadorInput").value;
    document.getElementById("nombreJugadorHeader").textContent = nombreJugador;
    iniciarJuego(nombreJugador); // Llama a la función iniciarJuego con el nombre del jugador
});

