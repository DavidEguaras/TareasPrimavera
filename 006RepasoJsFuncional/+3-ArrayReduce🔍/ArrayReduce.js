//funcion reducer
//const reducer = (acumulador, valorActual) => nuevoAcumulador;

// const reducido = [1, 2].reduce((acc, el) => acc + el, 0)
// console.log(reducido);


const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//acc seria accumulator
//el seria element
const numerosReducido = numeros.reduce((accumulator, element)=> accumulator + element, 0)
console.log(numerosReducido);

const mascotas = [
    {nombre: 'Coco', edad: 6, raza: 'perro'},
    {nombre: 'Baldur', edad: 3, raza: 'perro'},
    {nombre: 'Gatuki', edad: 1, raza: 'gato'},
    {nombre: 'Messi', edad: 38, raza: 'pulga'},
];

//indexamos el array de mascotas
const indexedMascotas = mascotas.reduce ((accumulator, element) => ({
    ...accumulator,
    [element.nombre]:element,
}), {})
console.log(indexedMascotas['Baldur']);


const anidado = [1, [2, 3], 4, [5]];
// [1, 2, 3, 4, 5]

const plano = anidado.reduce((accumulator, element) => accumulator.concat(element), []);
console.log(plano);
