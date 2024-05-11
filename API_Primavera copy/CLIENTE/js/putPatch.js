//--------------------------------------------PETICIONES PUT------------------------------------------------
// Función para manejar la verificación del ID del marca
const checkMarcaIdPut = (event) => {
    event.preventDefault();

    const idMarca = document.getElementById('idMarcaPUT').value;

    fetch(url + '/marcas/' + idMarca)
    .then(response => {
        if (!response.ok) {
            document.getElementById('camposActualizacionPUT').style.display = 'none';
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        document.getElementById('nuevoNombrePUT').value = datosObjeto.nombre;
        document.getElementById('cantidadPUT').value = datosObjeto.cantidad;
        document.getElementById('camposActualizacionPUT').style.display = 'block';
        document.getElementById('checkIdPut').style.display = 'none';
    })
    .catch(error => {
        console.error(error);
        alert('No existe ninguna marca con ese ID');
    });
};

// Función para manejar la solicitud de actualización del marca con PUT
const updateMarcaPut = (event) => {
    event.preventDefault();

    const idMarca = document.getElementById('idMarcaPUT').value;
    const nuevoNombre = document.getElementById('nuevoNombrePUT').value;
    const cantidad = document.getElementById('cantidadPUT').value;

    const datosBody = {
        nuevoNombre: nuevoNombre,
        cantidad: cantidad
    };

    fetch(url + '/marcas/' + idMarca, {
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
        const nuevaMarcaHTML = `<li>${datosObjeto.nuevoNombre} - ${datosObjeto.cantidad}</li>`;
        document.getElementById('nuevaMarcaPUT').innerHTML += nuevaMarcaHTML;

        console.log("Datos objeto recibidos:", datosObjeto);
    })
    .catch(error => {
        console.error(error);
        alert('Hubo un error al actualizar la marca con PUT');
    });
};
//--------------------------------------------!PETICIONES PUT------------------------------------------------


//--------------------------------------------PETICIONES PATCH------------------------------------------------

// Función para manejar la verificación del ID del marca
const checkMarcaIdPatch = (event) => {
    event.preventDefault();

    const idMarca = document.getElementById('idMarcaPatch').value;

    fetch(url + '/marcas/' + idMarca)
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
        alert('No existe ninguna marca con ese ID');
    });
};

// Función para manejar la solicitud de actualización del marca con PATCH
const updateMarcaPatch = (event) => {
    event.preventDefault();

    const idMarca = document.getElementById('idMarcaPatch').value;
    const nuevoNombre = document.getElementById('nuevoNombrePatch').value;
    const cantidad = document.getElementById('cantidadPatch').value;

    const datosBody = {
        nuevoNombre : nuevoNombre,
        cantidad : cantidad
    }

    fetch(url + '/marcas/' + idMarca, {
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
        const nuevaMarcaHTML = `<li>${datosObjeto.nuevoNombre} - ${datosObjeto.cantidad}</li>`;

        document.getElementById('nuevaMarcaPatch').innerHTML += nuevaMarcaHTML;
        console.log("Datos objeto recibidos:", datosObjeto);
    })
    .catch(error => {
        console.error(error);
        alert('Hubo un error al actualizar la marca con PATCH');
    });
};
//--------------------------------------------!PETICIONES PATCH------------------------------------------------
