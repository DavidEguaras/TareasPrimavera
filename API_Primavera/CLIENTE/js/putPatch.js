//--------------------------------------------PETICIONES PUT------------------------------------------------

const { response } = require("express");

// Listener para comprobar la existencia del ID del coche
document.getElementById('checkIdPut').addEventListener('click', (event) => {
    event.preventDefault();

    const idCoche = document.getElementById('idCochePUT').value;

    // Verificar si el ID del coche existe
    fetch(url + '/coches/' + idCoche)
    .then(response => {
        if (!response.ok) {
            document.getElementById('camposActualizacionPUT').style.display = 'none';
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        // Si el ID del coche existe, mostrar los campos adicionales para la actualización
        document.getElementById('nuevoNombrePUT').value = datosObjeto.nombre;
        document.getElementById('cantidadPUT').value = datosObjeto.cantidad;
        document.getElementById('camposActualizacionPUT').style.display = 'block';
        document.getElementById('checkIdPut').style.display = 'none';
    })
    .catch(error => {
        console.error(error);
        alert('No existe ningun coche con ese ID');
    });
});
// Listener para enviar el formulario de actualización del coche
document.getElementById('submitPutCoche').addEventListener('click', (event) => {
    event.preventDefault();

    const idCoche = document.getElementById('idCochePUT').value;
    const nuevoNombre = document.getElementById('nuevoNombrePUT').value;
    const cantidad = document.getElementById('cantidadPUT').value;

    // Realizar la solicitud PUT
    const datosBody = {
        nuevoNombre: nuevoNombre,
        cantidad: cantidad
    };

    fetch(url + '/coches/' + idCoche, {
        method: 'PUT',
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
        const nuevoCocheHTML = `<li>${datosObjeto.nuevoNombre} - ${datosObjeto.cantidad}</li>`;
        document.getElementById('nuevoCochePUT').innerHTML += nuevoCocheHTML;

        console.log("Datos objeto recibidos:", datosObjeto);
    })
    .catch(error => {
        console.error(error);
        alert('Hubo un error al actualizar el coche con PUT');
    });
});
//--------------------------------------------!PETICIONES PUT------------------------------------------------


//--------------------------------------------PETICIONES PATCH------------------------------------------------

// Listener para comprobar la existencia del ID del coche
document.getElementById('checkIdPatch').addEventListener('click', (event) => {
    event.preventDefault();

    const idCoche = document.getElementById('idCochePatch').value;

    //verificar si el ID del coche existe
    fetch(url + '/coches' + idCoche)
    .then(response => {
        if(!response.ok){
            document.getElementById('camposActualizacionPatch').style.display = 'none';
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        document.getElementById('nuevoNombrePatch').value = datosObjeto.nombre;
        document.getElementById('cantidadPatch').value = datosObjeto.cantidad;
        document.getElementById('camposActualizacionPatch').style.display = 'block';
        document.getElementById('checkIdPatch').style.display = 'none'
    })
    .catch(error => {
        console.error(error);
        alert('No existe ningun coche con ese ID');
    })

});


document.getElementById('submitPatchCoche').addEventListener('submit', (event) => {
    event.preventDefault();

    const idCoche = document.getElementById('idCochePatch').value;
    const nuevoNombre = document.getElementById('nuevoNombrePatch').value;
    const cantidad = document.getElementById('cantidadPatch').value;

    const datosBody = {
        nuevoNombre : nuevoNombre,
        cantidad : cantidad
    }

    fetch(url + '/coches' + idCoche, {
        method: 'PATCH',
        body: JSON.stringify(datosBody),
        headers: {
            'Content-Type': 'application/json'
        }

    })
    .then(response => {
        if(!response.ok){
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json()
    })
    .then(datosObjeto => {
        const nuevoCocheHTML = `<li>${datosObjeto.nuevoNombre} - ${datosObjeto.cantidad}</li>`;

        document.getElementById('nuevoCochePATCH').innerHTML += nuevoCocheHTML;
        console.log("Datos objeto recibidos:", datosObjeto);
    })
    .catch(error => {
        console.error(error);
        alert('Hubo un error al actualizar el coche con PATCH');
    });
})
//--------------------------------------------!PETICIONES PATCH------------------------------------------------


