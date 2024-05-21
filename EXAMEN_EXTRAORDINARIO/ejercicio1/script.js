const texto = "Hola, hola!, ¿Como estas? Estoy Bien, bien, bien. ¿Y tu?";

const palabras = extraerPalabras(texto);
console.log('Palabras:', palabras);

const conteoDePalabras = contarPalabras(palabras);
console.log('Conteo de Palabras: ', conteoDePalabras);


// const palabrasOrdenadas = ordenarPalabrasPorFrecuencia(conteoDePalabras);
// console.log('Palabras Ordernadas por frecuencia: ', palabrasOrdenadas);



//Declaracion de las funciones

function extraerPalabras(texto){
    const expresionRegular = /\b\w+\b/g;
    return texto.match(expresionRegular);
}

function contarPalabras(palabras){
    let arrayPalabrasContadas = [];
    for(let i = 0; i < palabras.length; i++){
        const palabraComparadora = palabras[i];
        let contadorPalabrasComparadora = 0;
        if(arrayPalabrasContadas.includes(palabraComparadora)){
            for(let j = 0; j < palabras.length; j++){
                if(palabras[j] === palabraComparadora){
                    contadorPalabrasComparadora++;
                }
            }  
            let vecesPalabra = {palabraComparadora, contadorPalabrasComparadora};
            arrayPalabrasContadas += vecesPalabra
        }
       
    }
    return arrayPalabrasContadas;
}