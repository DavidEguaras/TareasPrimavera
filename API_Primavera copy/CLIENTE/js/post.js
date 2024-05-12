//--------------------------------------------PETICIONES PUT------------------------------------------------
// Listener para el formulario de actualización de marca con PUT
document.getElementById('putMarcaForm').addEventListener('submit', (event) => {
    event.preventDefault();
    checkMarcaIdPut();
});

// Función para manejar la verificación del ID de la marca
const checkMarcaIdPut = () => {
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

// Función para manejar la solicitud de actualización de la marca con PUT
const updateMarcaPut = () => {
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

// Listener para el formulario de actualización de concesionario con PUT
document.getElementById('putConcesionarioForm').addEventListener('submit', (event) => {
    event.preventDefault();
    checkConcesionarioIdPut();
});

// Función para manejar la verificación del ID del concesionario
const checkConcesionarioIdPut = () => {
    const idConcesionario = document.getElementById('concesionarioIDPut').value;
    fetch(url + '/concesionarios/' + idConcesionario)
    .then(response => {
        if (!response.ok) {
            document.getElementById('camposActualizacionPUT').style.display = 'none';
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        document.getElementById('nuevoNombrePUTConcesionario').value = datosObjeto.nombre;
        document.getElementById('concesionarioIDPut').value = datosObjeto.idConcesionario;
        document.getElementById('camposActualizacionPUT').style.display = 'block';
        document.getElementById('checkIdPutConcesionarios').style.display = 'none';
    })
    .catch(error => {
        console.error(error);
        alert('No existe ningún concesionario con ese ID');
    });
};

// Función para manejar la solicitud de actualización del concesionario con PUT
const updateConcesionarioPut = () => {
    const idConcesionario = document.getElementById('concesionarioIDPut').value;
    const nuevoNombre = document.getElementById('nuevoNombrePUTConcesionario').value;
    const datosBody = {
        nuevoNombre: nuevoNombre,
        idConcesionario: idConcesionario
    };
    fetch(url + '/concesionarios/' + idConcesionario, {
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
        const nuevoConcesionarioHTML = `<li>${datosObjeto.nuevoNombre} - ${datosObjeto.marcaID}</li>`;
        document.getElementById('nuevoConcesionarioPUT').innerHTML += nuevoConcesionarioHTML;
        console.log("Datos objeto recibidos:", datosObjeto);
    })
    .catch(error => {
        console.error(error);
        alert('Hubo un error al actualizar el concesionario con PUT');
    });
};

//--------------------------------------------PETICIONES PATCH------------------------------------------------
// Listener para el formulario de actualización de marca con PATCH
document.getElementById('patchMarcaForm').addEventListener('submit', (event) => {
    event.preventDefault();
    checkMarcaIdPatch();
});

// Función para manejar la verificación del ID de la marca para PATCH
const checkMarcaIdPatch = () => {
    const idMarca = document.getElementById('idMarcaPatch').value;
    fetch(url + '/marcas/' + idMarca)
    .then(response => {
        if (!response.ok) {
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

// Función para manejar la solicitud de actualización de la marca con PATCH
const updateMarcaPatch = () => {
    const idMarca = document.getElementById('idMarcaPatch').value;
    const nuevoNombre = document.getElementById('nuevoNombrePatch').value;
    const cantidad = document.getElementById('cantidadPatch').value;
    const datosBody = {
        nuevoNombre: nuevoNombre,
        cantidad: cantidad
    };
    fetch(url + '/marcas/' + idMarca, {
        method: 'PATCH',
        body: JSON.stringify(datosBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
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

// Listener para el formulario de actualización de concesionario con PATCH
document.getElementById('patchConcesionarioForm').addEventListener('submit', (event) => {
    event.preventDefault();
    checkConcesionarioIdPatch();
});

// Función para manejar la verificación del ID del concesionario para PATCH
const checkConcesionarioIdPatch = () => {
    const idConcesionario = document.getElementById('idConcesionarioPatch').value;
    fetch(url + '/concesionarios/' + idConcesionario)
    .then(response => {
        if (!response.ok) {
            document.getElementById('camposActualizacionPatch').style.display = 'none';
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        document.getElementById('nuevoNombrePatchConcesionario').value = datosObjeto.nombre; 
        document.getElementById('concesionarioIDPatch').value = datosObjeto.idConcesionario;
        document.getElementById('camposActualizacionPatch').style.display = 'block';
        document.getElementById('checkConcesionarioIdPatch').style.display = 'none';
    })
    .catch(error => {
        console.error(error);
        alert('No existe ningún concesionario con ese ID');
    });
};

// Función para manejar la solicitud de actualización del concesionario con PATCH
const updateConcesionarioPatch = () => {
    const idConcesionario = document.getElementById('idConcesionarioPatch').value;
    const nuevoNombre = document.getElementById('nuevoNombrePatchConcesionario').value;
    const marcaID = document.getElementById('concesionarioIDPatch').value;
    const datosBody = {
        nuevoNombre: nuevoNombre,
        marcaID: marcaID
    };
    fetch(url + '/concesionarios/' + idConcesionario, {
        method: 'PATCH',
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
        const nuevoConcesionarioHTML = `<li>${datosObjeto.nuevoNombre} - ${datosObjeto.marcaID}</li>`;
        document.getElementById('nuevoConcesionarioPatch').innerHTML += nuevoConcesionarioHTML;
        console.log("Datos objeto recibidos:", datosObjeto);
    })
    .catch(error => {
        console.error(error);
        alert('Hubo un error al actualizar el concesionario con PATCH');
    });
};
//--------------------------------------------!PETICIONES PATCH------------------------------------------------
