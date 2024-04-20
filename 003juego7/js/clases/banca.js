import { jugador } from "./jugador.js";



export class Banca extends Jugador {
    constructor() {
        super('Banca');
    }

    //Antes de recibir una carta, la banca calculara su puntuacion, 
    //si esta es menor o igual que 5.5, la banca no cogera carta
    recibirCarta(carta) {
        if (this.calcularPuntuacion() <= 5.5) {
            this.mano.push(carta);
        }
    }

    imprimirManoBanca(){
        return this.mano.map(carta => `<li>La banca tiene${this.mano.length} cartas</li>`);
    }
}
