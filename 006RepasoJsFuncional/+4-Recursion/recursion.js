// La recursividad consiste en una funcion que se llama a si misma una y otra vez hasta que se cumple una condicion de salida
//Tambien podemos iterar elementos de un array sin necesidad de utilizar un for o while


// const conteoRegresivo = (a) => {
//     if(a < 0) return
//     console.log(a);
//     return conteoRegresivo(a - 1);
// }

// conteoRegresivo(10);


const llamarApi = async (url, llamados = 0) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);

        return result;
    } catch (e) {
        if (llamados > 5) {
            return '';
        }

        console.log(e);

        return llamarApi(url, llamados + 1);
    }
}

llamarApi('https://jsonplaceholder.typicode.com/users');

