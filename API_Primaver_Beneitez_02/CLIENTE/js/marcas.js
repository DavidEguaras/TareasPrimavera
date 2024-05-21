document.addEventListener('DOMContentLoaded', () => {
    cargarMarcas();
    document.getElementById('searchMarca').addEventListener('input', filtrarMarcas);
});

// Cargamos la tabla marcas
function cargarMarcas() {
    fetch(url + "/marcas")
        .then(response => response.json())
        .then(marcas => {
            mostrarMarcas(marcas);
        })
        .catch(error => console.error('Error al cargar las marcas:', error));
}

function mostrarMarcas(marcas) {
    const cuerpoTabla = document.getElementById('cuerpoTablaMarcas');
    cuerpoTabla.innerHTML = '';

    const filas = marcas.map(marca => `
        <tr>
            <td>${marca.id}</td>
            <td>${marca.nombre}</td>
            <td>${marca.cantidad}</td>
            <td>
                <button onclick="cargarFormularioEdicionMarca(${marca.id})">Editar</button>
                <button onclick="eliminarMarca(${marca.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');

    cuerpoTabla.innerHTML = filas;
}

function filtrarMarcas(event) {
    const filtro = event.target.value.toLowerCase();
    fetch(url + "/marcas")
        .then(response => response.json())
        .then(marcas => {
            const marcasFiltradas = marcas.filter(marca => marca.nombre.toLowerCase().includes(filtro));
            mostrarMarcas(marcasFiltradas);
        })
        .catch(error => console.error('Error al filtrar las marcas:', error));
}

// Eliminar una marca
function eliminarMarca(idMarca) {
    fetch(url + "/marcas/" + idMarca, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            cargarMarcas();
            alert("Marca eliminada con éxito!");
        } else {
            console.error('Error al eliminar la marca:', response.statusText);
            alert("Error al eliminar la marca. Por favor, inténtalo de nuevo.");
        }
    })
    .catch(error => {
        console.error('Error al eliminar la marca:', error);
        alert("Error al eliminar la marca. Por favor, inténtalo de nuevo.");
    });
}

// Cargar formulario de edición
function cargarFormularioEdicionMarca(idMarca) {
    fetch(url + "/marcas/" + idMarca)
        .then(response => response.json())
        .then(marca => {
            document.getElementById("nombreMarcaEdit").value = marca.nombre;
            document.getElementById("cantidadEdit").value = marca.cantidad;
            document.getElementById("idMarcaEdit").value = marca.id;
            
            document.getElementById("editarMarca").style.display = "block";
        })
        .catch(error => console.error('Error al cargar la marca para editar:', error));
}

// Manejar submit de edición
document.getElementById("editarMarcaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const idMarca = document.getElementById("idMarcaEdit").value;
    const nombreMarca = document.getElementById("nombreMarcaEdit").value;
    const cantidad = document.getElementById("cantidadEdit").value;

    const marcaData = {
        nombre: nombreMarca,
        cantidad: cantidad
    };

    fetch(url + "/marcas/" + idMarca, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(marcaData)
    })
    .then(response => {
        if (response.ok) {
            alert("Marca actualizada con éxito!");
            cargarMarcas();
            document.getElementById("editarMarca").style.display = "none";
        } else {
            throw new Error("Error al actualizar la marca");
        }
    })
    .catch(error => {
        console.error("Error al actualizar la marca:", error);
        alert("Error al actualizar la marca. Por favor, inténtalo de nuevo.");
    });
});

// Manejar submit del registro de una marca
document.getElementById("marcaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreMarca = document.getElementById("nombreMarcaInput").value;
    const cantidad = document.getElementById("cantidadInput").value;

    const marcaData = {
        nombre: nombreMarca,
        cantidad: cantidad
    };

    fetch(url + "/marcas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(marcaData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al registrar la marca");
        }
        return response.json();
    })
    .then(data => {
        alert("Marca registrada con éxito!");
        cargarMarcas();
        document.getElementById("marcaForm").reset();
    })
    .catch(error => {
        console.error("Error al registrar la marca:", error);
        alert("Error al registrar la marca. Por favor, inténtalo de nuevo.");
    });
});
