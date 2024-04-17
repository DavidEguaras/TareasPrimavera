import { Jugador } from "./jugador.js";
import { Baraja } from "./baraja.js";
import { Banca } from "./banca.js";

export class Juego {
    constructor(apuesta, nombreJugador) {
        this.apuesta = apuesta;
        this.jugador = new Jugador(nombreJugador);
        this.baraja = new Baraja();
        this.banca = new Banca("Banca");
        this.finalizado = false;
    }

    iniciarJuego() {
        this.baraja.barajar();
    }

    repartirCartas() {
        this.jugador.recibirCarta(this.baraja.sacarCarta());
        this.banca.recibirCarta(this.baraja.sacarCarta());
    }

    finalizar() {
        // Evitar que el juego se finalice más de una vez
        if (this.finalizado){
            return;
        } 
 
        this.finalizado = true;

        const puntuacionJugador = this.jugador.calcularPuntuacion();
        const puntuacionBanca = this.banca.calcularPuntuacion();

        let mensajeResultado = "";
        //Solo tenemos en cuenta el balance del jugador
        if (puntuacionJugador === 7.5 || (puntuacionBanca > 7.5 && puntuacionJugador <= 7.5)) {
            mensajeResultado = "¡Felicidades! Has ganado.";
            this.jugador.incrementarBalance(this.apuesta);
        } else if (puntuacionBanca === 7.5 || (puntuacionJugador > 7.5 && puntuacionBanca <= 7.5) || puntuacionJugador < puntuacionBanca) {
            mensajeResultado = "¡La banca gana!";
            this.jugador.decrementarBalance(this.apuesta);
        } else if (puntuacionJugador === puntuacionBanca) {
            mensajeResultado = "Empate.";
        } else {
            mensajeResultado = "¡Felicidades! Has ganado.";
            this.jugador.incrementarBalance(this.apuesta);
        }
        this.baraja.barajar();
        return mensajeResultado;
    }
}
