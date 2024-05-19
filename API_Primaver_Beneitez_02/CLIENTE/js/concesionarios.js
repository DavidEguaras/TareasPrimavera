//Al cargar el documento llamamos a la funcion que carga los registros
document.addEventListener('DOMContentLoaded', cargarConcesionarios);

//Cargamos los registros de la tabla concesionarios
async function cargarConcesionarios() {
    try {
        const response = await fetch(url + "/concesionarios/");
        const concesionarios = await response.json();
        
        const cuerpoTabla = document.getElementById('cuerpoTablaConcesionarios');
        cuerpoTabla.innerHTML = '';

        for (const concesionario of concesionarios) {
            //En cada fila, aparte de las columnas de la tabla, agregamos los botones de ELIMINAR Y EDITAR
            const fila = `
                <tr>
                    <td>${concesionario.id}</td>
                    <td>${concesionario.nombre}</td>
                    <td>${concesionario.marcaID}</td>
                    <td>
                        <button onclick="cargarFormularioEdicionConcesionario(${concesionario.id})">Editar</button>
                        <button onclick="eliminarConcesionario(${concesionario.id})">Eliminar</button>
                    </td>
                </tr>`;
            cuerpoTabla.innerHTML += fila;
        }
    } catch (error) {
        console.error('Error al cargar los concesionarios:', error);
    }
}

//Carga el formulario para editar un registro a partir del id
async function cargarFormularioEdicionConcesionario(idConcesionario) {
    try {
        const response = await fetch(`${url}/concesionarios/${idConcesionario}`);
        const concesionario = await response.json();

        document.getElementById("nombreConcesionarioEdit").value = concesionario.nombre;
        document.getElementById("marcaIDEdit").value = concesionario.marcaID;
        document.getElementById("idConcesionarioEdit").value = concesionario.id;
        
        document.getElementById("editarConcesionario").style.display = "block";
    } catch (error) {
        console.error('Error al cargar el concesionario para editar:', error);
    }
}


//Evento de submit (PUT) de editar el registro
document.getElementById("editarConcesionarioForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const idConcesionario = document.getElementById("idConcesionarioEdit").value;
    const nombreConcesionario = document.getElementById("nombreConcesionarioEdit").value;
    const marcaID = document.getElementById("marcaIDEdit").value;

    const concesionarioData = {
        nombre: nombreConcesionario,
        marcaID: marcaID
    };

    fetch(`${url}/concesionarios/${idConcesionario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(concesionarioData)
    })
    .then(response => {
        if (response.ok) {
            alert("Concesionario actualizado con éxito!");
            cargarConcesionarios();
            document.getElementById("editarConcesionario").style.display = "none";
        } else {
            throw new Error("Error al actualizar el concesionario");
        }
    })
    .catch(error => {
        console.error("Error al actualizar el concesionario:", error);
        alert("Error al actualizar el concesionario. Por favor, inténtalo de nuevo.");
    });
});



//Funcion que se encarga de elimnar un concesionario, esta funcion es llamada desde la tabla de cargarConcesionarios
async function eliminarConcesionario(idConcesionario) {
    try {
        const response = await fetch(url + "/concesionarios/" + idConcesionario, {
            method: 'DELETE'
        });
        if (response.ok) {
            cargarConcesionarios();
            alert("Concesionario eliminado con éxito!");
        } else {
            console.error('Error al eliminar el concesionario:', response.statusText);
            alert("Error al eliminar el concesionario. Por favor, inténtalo de nuevo.");
        }
    } catch (error) {
        console.error('Error al eliminar el concesionario:', error);
        alert("Error al eliminar el concesionario. Por favor, inténtalo de nuevo.");
    }
}


//Evento que se encarga de manejar la peticion POST de concesionarios
document.getElementById("concesionarioForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreConcesionario = document.getElementById("nombreConcesionarioInput").value;
    const marcaID = document.getElementById("marcaIDInput").value;

    const concesionarioData = {
        nombre: nombreConcesionario,
        marcaID: marcaID
    };

    fetch(url + "/concesionarios/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(concesionarioData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error al registrar el concesionario");
        }
    })
    .then(data => {
        alert("Concesionario registrado con éxito!");
        cargarConcesionarios();
        document.getElementById("concesionarioForm").reset();
    })
    .catch(error => {
        console.error("Error al registrar el concesionario:", error);
        alert("Error al registrar el concesionario. Por favor, inténtalo de nuevo.");
    });
});
