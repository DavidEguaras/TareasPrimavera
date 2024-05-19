const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const mascotas = [
    {nombre: 'Coco', edad: 6, tipo: 'perro'},
    {nombre: 'Baldur', edad: 3, tipo: 'perro'},
    {nombre: 'Gatuki', edad: 1, tipo: 'gato'},
    {nombre: 'Messi', edad: 38, tipo: 'pulga'},
]

//Ejemplo Numeros
const numerosFiltrados = numeros.filter(x => x < 5);
console.log(numeros);
console.log(numerosFiltrados);

//Ejemplo Mascotas

//Evaluamos la propiedad de tipo del elemento, comparandola con el string 'perro', si coinciden, se nos devuelve el elemento 
const perros = mascotas.filter(x => x.tipo == 'perro');

const pulgas = mascotas.filter(x => x.tipo == 'pulga');
//Nos damos cuenta de que devuelve el objeto completo
console.log(perros);
console.log(pulgas);