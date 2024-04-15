import { Juego } from "./clases/juego.js";

// El juego no se inicia hasta que el jugador no introduzca su nombre
function iniciarJuego(nombreJugador) {
    const pedirCartaBtn = document.getElementById("pedirCartaButton");
    const plantarseBtn = document.getElementById("plantarseButton");
    const subseccionBanca = document.getElementById("subseccionBanca");
    const subseccionJugador = document.getElementById("subseccionJugador");
    const balanceTotalDineroJugador = document.getElementById("balanceTotalDineroJugador");
    const dineroApostado = document.getElementById("dineroApostado");
    //aqui se muestra si el jugador ha ganado la partida o no una vez que el juego finalice
    const mensajeFinPartida = document.getElementById("mensajeFinPartida")

    // Creamos una instancia del juego
    const juego = new Juego(10, nombreJugador);


    function actualizarInterfaz() {
        //info de la banca
        subseccionBanca.innerHTML = `
            <h2>BANCA</h2>
            <p>Numero de cartas de la banca: ${juego.banca.mano.length}</p>
        `;
        console.log(juego.banca.mano.map(carta => carta.nombre + ' de ' + carta.palo));

        //info del jugador
        subseccionJugador.innerHTML = `
            <p>Tus cartas: ${juego.jugador.mano.map(carta => carta.nombre + ' de ' + carta.palo).join(', ')}</p>
            <p>Tu puntuacion: ${juego.jugador.calcularPuntuacion()}</p>
        `;

        //informacion general de la partida
        balanceTotalDineroJugador.textContent = juego.jugador.balance;
        dineroApostado.textContent = juego.apuesta;
        cartasRepartidasTotales.textContent = juego.baraja.cartas.length - 1;
    }

    pedirCartaBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            //Por cada vez que el jugador pide una carta, la banca pedira otra si su puntuacion es menor o igual que 5
            juego.jugador.recibirCarta(juego.baraja.sacarCarta());
            juego.banca.recibirCarta(juego.baraja.sacarCarta());
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
document.getElementById("formNombre").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreJugador = document.getElementById("nombreJugadorInput").value;
    document.getElementById("nombreJugadorHeader").textContent = nombreJugador;
    iniciarJuego(nombreJugador);
});

