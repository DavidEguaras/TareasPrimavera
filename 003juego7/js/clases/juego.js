import { Jugador } from "./jugador.js";
import { Baraja } from "./baraja.js";
import { Banca } from "./banca.js";


export class Juego{
    constructor(apuesta){
        this.apuesta =  apuesta
        this.baraja = Baraja();
        this.jugador = Jugador();
        this.banca = Banca();
    }

    iniciarJuego(){
        
    }

    repartirCartas(){

    }

}