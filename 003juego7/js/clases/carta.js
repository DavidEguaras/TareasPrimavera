export class Carta {
    constructor(nombre, palo, valor) {
        this.nombre = nombre;
        this.palo = palo;
        this.valor = valor;
    }

    imprimirCarta() {
        return `${this.nombre} de ${this.palo}`;
    }    
}