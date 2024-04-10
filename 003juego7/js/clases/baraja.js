import { Carta } from "./carta.js";

export class Baraja{
    static palos = ["oros", "copas", "espadas", "bastos"];
    static numeros = ['as', 2, 3, 4, 5, 6, 7, 'sota', 'caballo', 'rey']
    constructor(){
        this.cartas = [];
        //por cada palo, se crean todos sus numeros
        this.cartas = Baraja.palos.flatMap(function(palo){
            return Baraja.numeros.map(function(numero, index){
                if(index > 6){
                    return new Carta(numero, palo, 0.5);
                }else{
                    return new Carta(numero, palo, index + 1);
                }
                
            });
        });
    }
    barajar(){
        this.cartas.sort(() => Math.random() - 0.5);
    }

    sacarCarta(){
        return this.cartas.shift();
    }
}