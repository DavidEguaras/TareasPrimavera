//--------------------------------------------PETICIONES POST------------------------------------------------
//Evento para agregar un coche al registro
document.getElementById('postCocheForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const datosBody = {
        nombreCoche: document.getElementById('nombreCochePOST').value,
        cantidad: document.getElementById('cantidadPOST').value
    };

    fetch(url + '/coches', {
        method: 'POST',
        body: JSON.stringify(datosBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        // Procesa los datos de la respuesta aquí
        document.getElementById('nuevoCochePOST').innerHTML = `<li>${datosObjeto.nombreCoche} - ${datosObjeto.cantidad}</li>`;
        console.log(datosObjeto);
    })
    .catch(error => console.error(error));
});
//--------------------------------------------!PETICIONES POST------------------------------------------------

