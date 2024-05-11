// Evento para eliminar una marca por su ID
document.getElementById('DeleteMarcaByID').addEventListener('submit', (event) => {
    event.preventDefault();

    const idMarca = document.getElementById('idMarcaDELETE').value;

    fetch(url + '/marcas/' + idMarca, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        console.log("Marca eliminada con éxito:", datosObjeto);
        document.getElementById('marcaEliminada').innerHTML += `<li>Marca con id: ${datosObjeto.id} - ELIMINADA</li>`;
    })
    .catch(error => console.error(error));
});
