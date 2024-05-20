import {Jugador} from "./jugador.js";


export class Juego{
    constructor(nombreJugador1, nombreJugador2){
        this.jugador1 = new Jugador(nombreJugador1);
        this.jugador2 = new Jugador(nombreJugador2);
        this.finalizado = false;
        this.fichaJugador1 = 'X';
        this.fichaJugador2 = 'O';

    }

    comprobarTresEnRaya(){
        
    }
}