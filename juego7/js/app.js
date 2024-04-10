import { Banca } from "./clases/banca.js";
import { Baraja } from "./clases/baraja.js";
import { Jugador } from "./clases/jugador.js";





//PRUEBAS
let barajaPrueba = new Baraja();
console.log(barajaPrueba.cartas);
barajaPrueba.barajar();
console.log(barajaPrueba);

let jugadorPrueba = new Jugador('David');

jugadorPrueba.recibirCarta(barajaPrueba.sacarCarta());
jugadorPrueba.recibirCarta(barajaPrueba.sacarCarta());
let puntuacionPrueba = jugadorPrueba.calcularPuntuacion();
console.log(puntuacionPrueba);

console.log(jugadorPrueba.mano);
console.log(barajaPrueba);