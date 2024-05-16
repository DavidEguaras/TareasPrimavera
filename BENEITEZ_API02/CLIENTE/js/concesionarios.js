document.addEventListener('DOMContentLoaded', cargarConcesionarios);

async function cargarConcesionarios() {
    try {
        const response = await fetch(url + "/concesionarios/");
        const concesionarios = await response.json();
        
        const cuerpoTabla = document.getElementById('cuerpoTablaConcesionarios');
        cuerpoTabla.innerHTML = '';

        for (const concesionario of concesionarios) {
            const fila = `
                <tr>
                    <td>${concesionario.id}</td>
                    <td>${concesionario.nombre}</td>
                    <td>${concesionario.marcaID}</td>
                    <td><button onclick="eliminarConcesionario(${concesionario.id})">Eliminar</button></td>
                </tr>`;
            cuerpoTabla.innerHTML += fila;
        }
    } catch (error) {
        console.error('Error al cargar los concesionarios:', error);
    }
}

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



document.getElementById("concesionarioForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreConcesionario = document.getElementById("nombreConcesionarioInput").value;
    const marcaID = document.getElementById("marcaIDInput").value;

    const concesionarioData = {
        nombreConcesionario: nombreConcesionario,
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


