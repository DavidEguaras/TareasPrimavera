document.addEventListener("DOMContentLoaded", function() {
    const arrayOriginalTd = document.getElementById("arrayOriginal");
    const arrayModificado = document.getElementById("arrayModificado");

    const ciudades = [
        'Zaragoza', 'Barcelona',
        'Bilbao', 'Granada',
        'Madrid', 'Alicante',
        'Málaga', 'Valencia',
        'Sevilla', 'Murcia'
    ];

    // Mostrar el array original como una cadena separada por comas
    arrayOriginalTd.innerText = ciudades.join(', '); 

    // Clonar el array original para no modificarlo directamente
    const arrayCiudades = Array.from(ciudades);

    // Funcion para ordenar el array y mostrarlo
    function ordena(array) {
        return array.sort().join(', ');
    }
    
    arrayModificado.innerText = ordena(arrayCiudades); // Mostrar el array ordenado

    // Funcion para desordenar el array y mostrarlo después de un intervalo de tiempo
    function desordena() {
        // Desordenar el array
        const arrayDesordenado = Array.from(ciudades).sort(() => Math.random() - 0.5); 
        // Mostrar el array desordenado
        arrayModificado.innerText = arrayDesordenado.join(', '); 
    }
    
    // Llamar a la funcion desordena después de 2500 milisegundos (2.5 segundos)
    setTimeout(desordena, 2500);
});