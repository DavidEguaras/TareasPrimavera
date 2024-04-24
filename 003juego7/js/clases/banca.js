import { Jugador } from "./jugador.js";



export class Banca extends Jugador {
    constructor(nombre = "La Banca") {
        super(nombre);
    }

    //Antes de recibir una carta, la banca calculara su puntuacion, 
    //si esta es menor o igual que 5.5, la banca no cogera carta
    recibirCarta(carta) {
        if (this.calcularPuntuacion() <= 5.5) {
            this.mano.push(carta);
        }
    }

    imprimirManoBanca(){
        let result = [];
        for (let i = 0; i < this.mano.length; i++) {
            result.push(`<li>La banca tiene ${i + 1} carta(s)</li>`);
        }
        return result;
    }
    
}
