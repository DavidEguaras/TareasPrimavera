import { Carta } from "./carta.js";

export class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.mano = [];
        this.balance = 0;
    }

    recibirCarta(cartaRecibida){
        this.mano.push(cartaRecibida);
    }

    calcularPuntuacion(){
        let puntuacion = 0;
        this.mano.forEach(carta => {
            puntuacion += carta.valor
        });
        return puntuacion;
    }

    incrementarBalance(incremento){
        this.balance += incremento;
    }

    decrementarBalance(incremento){
        this.balance =- incremento;
    }

    reiniciarMano() {
        this.mano = [];
    }
}