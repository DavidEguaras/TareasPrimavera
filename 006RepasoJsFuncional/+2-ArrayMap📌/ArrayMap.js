//funcion de suma no practica utilizada por motivos didacticos (usar reduce)
const suma = (ns) => {
    let acumulado = 0;
    for(i = 0; i < ns.length; i++){
        acumulado += ns[i];
    }

    return acumulado;
}

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];


//aplicamos una multiplicacion de * 2 a cada elemento del array
const multiplicados = numeros.map(x => x * 2);
console.log(multiplicados);

//Ejemplo de una operacion mas compleja
const parejas = numeros.map(x => [x, x])
console.log(parejas);


const mascotas = [
    {nombre: 'Coco', edad: 6, raza: 'perro'},
    {nombre: 'Baldur', edad: 3, raza: 'perro'},
    {nombre: 'Gatuki', edad: 1, raza: 'gato'},
    {nombre: 'Messi', edad: 38, raza: 'pulga'},
]


const edades = mascotas.map(x => x.edad);
console.log(edades);
const sumaEdades = suma(edades);
console.log(sumaEdades/edades.length);

