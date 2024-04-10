import { Jugador } from "./jugador.js";

export class Banca extends Jugador{
    constructor(nombre){
        super(nombre, mano);
    }

    recibirCarta(){
        super.recibirCarta();
    }

    calcularPuntuacion(){
        super.calcularPuntuacion();
    }
}