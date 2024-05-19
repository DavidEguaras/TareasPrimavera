//--------------------------------------------PETICIONES DELETE------------------------------------------------
document.getElementById('DeleteCocheByID').addEventListener('submit', (event) => {
    event.preventDefault();

    const idCoche = document.getElementById('idCocheDELETE').value;

    fetch(url + '/coches/' + idCoche, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        console.log("Coche eliminado con éxito:", datosObjeto);
        document.getElementById('cocheEliminado').innerHTML += `<li>Coche con id: ${datosObjeto.id} - ELIMINADO</li>`;
    })
    .catch(error => console.error(error));
});


//--------------------------------------------!PETICIONES DELETE------------------------------------------------
