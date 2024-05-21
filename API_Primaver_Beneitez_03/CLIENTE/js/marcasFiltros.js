document.addEventListener('DOMContentLoaded', cargarMarcas);

//Cargamos la tabla marcas
function cargarMarcas() {
    fetch(url + "/marcas")
        .then(response => response.json())
        .then(marcas => {
            mostrarMarcas(marcas);

            // Ejemplo de uso de las funciones de filtro
            console.log('Slice:', sliceMarcas(marcas, 0, 3));
            console.log('Reverse:', reverseMarcas(marcas));
            console.log('Sort:', sortMarcas(marcas));
            console.log('Find:', findMarca(marcas, 'Marca1'));
            console.log('Filter:', filterMarcasPorCantidad(marcas, 10));
            console.log('Map:', mapMarcas(marcas));
            console.log('Reduce:', reduceMarcas(marcas));
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

// Funciones de filtro
function sliceMarcas(marcas, inicio, fin) {
    return marcas.slice(inicio, fin);
}

function reverseMarcas(marcas) {
    return [...marcas].reverse();  // Usar [...marcas] para no modificar el array original
}

function sortMarcas(marcas) {
    return [...marcas].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

function findMarca(marcas, nombre) {
    return marcas.find(marca => marca.nombre === nombre);
}

function filterMarcasPorCantidad(marcas, cantidadMinima) {
    return marcas.filter(marca => marca.cantidad >= cantidadMinima);
}

function mapMarcas(marcas) {
    return marcas.map(marca => `${marca.nombre} (Cantidad: ${marca.cantidad})`);
}

function reduceMarcas(marcas) {
    return marcas.reduce((total, marca) => total + marca.cantidad, 0);
}

//elimnamos la marca que tenga como id el pasado como parametro
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

//cargamos el formulario para editar una marca por su id
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

//Funciones de validación
function validarNombre(nombre) {
    return nombre.trim() !== '';
}

function validarCantidad(cantidad) {
    return !isNaN(cantidad) && cantidad > 0;
}

//Evento de manejar el submit de edicion de una marca
document.getElementById("editarMarcaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const idMarca = document.getElementById("idMarcaEdit").value;
    const nombreMarca = document.getElementById("nombreMarcaEdit").value;
    const cantidad = document.getElementById("cantidadEdit").value;

    if (!validarNombre(nombreMarca)) {
        alert("El nombre de la marca no puede estar vacío.");
        return;
    }

    if (!validarCantidad(cantidad)) {
        alert("La cantidad debe ser un número positivo.");
        return;
    }

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

//evento de manejar el submit del POST de una marca
document.getElementById("marcaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreMarca = document.getElementById("nombreMarcaInput").value;
    const cantidad = document.getElementById("cantidadInput").value;

    if (!validarNombre(nombreMarca)) {
        alert("El nombre de la marca no puede estar vacío.");
        return;
    }

    if (!validarCantidad(cantidad)) {
        alert("La cantidad debe ser un número positivo.");
        return;
    }

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
