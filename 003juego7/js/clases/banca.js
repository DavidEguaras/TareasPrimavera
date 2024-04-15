import { Jugador } from "./jugador.js";

export class Banca {
    constructor() {
        this.nombre = 'Banca';
        this.mano = [];
    }

    recibirCarta(carta) {
        if (this.calcularPuntuacion() <= 5) {
            this.mano.push(carta);
        }
    }

    calcularPuntuacion() {
        let puntuacion = 0;
        this.mano.forEach(carta => {
            puntuacion += carta.valor;
        });
        return puntuacion;
    }

    reiniciarMano() {
        this.mano = [];
    }
}
