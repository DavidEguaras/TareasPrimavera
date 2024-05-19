// Event listener para cargar la tabla de marcas cuando se carga el documento
document.addEventListener('DOMContentLoaded', cargarMarcas);

// Funcion asincronica para cargar y mostrar marcas desde el servidor
async function cargarMarcas() {
    try {
        const datosCrudos = await fetch(url + "/marcas");  // Solicita datos de marcas al servidor
        const marcas = await datosCrudos.json();  // Convierte la respuesta a JSON

        const cuerpoTabla = document.getElementById('cuerpoTablaMarcas');
        cuerpoTabla.innerHTML = '';  // Limpia la tabla antes de agregar nuevos datos

        for (const marca of marcas) {  // Itera sobre cada marca y crea una fila en la tabla HTML
            const fila = `
                <tr>
                    <td>${marca.id}</td>
                    <td>${marca.nombre}</td>
                    <td>${marca.cantidad}</td>
                    <td>
                        <button onclick="cargarFormularioEdicionMarca(${marca.id})">Editar</button>
                        <button onclick="eliminarMarca(${marca.id})">Eliminar</button>
                    </td>
                </tr>`;
            cuerpoTabla.innerHTML += fila;  // Agrega la fila a la tabla
        }
        
    } catch (error) {
        console.error('Error al cargar las marcas:', error);  // Maneja posibles errores en la carga de datos
    }
}

// Funcion para eliminar una marca especifica
async function eliminarMarca(idMarca) {
    try {
        const response = await fetch(url + "/marcas/" + idMarca, {
            method: 'DELETE'  // Metodo HTTP DELETE para eliminar la marca
        });
        if (response.ok) {
            cargarMarcas();  // Recarga la lista de marcas si la eliminacion fue exitosa
            alert("Marca eliminada con exito!");
        } else {
            console.error('Error al eliminar la marca:', response.statusText);
            alert("Error al eliminar la marca. Por favor, intentalo de nuevo.");
        }
    } catch (error) {
        console.error('Error al eliminar la marca:', error);
        alert("Error al eliminar la marca. Por favor, intentalo de nuevo.");
    }
}

// Funcion para cargar datos de una marca en el formulario de edicion
async function cargarFormularioEdicionMarca(idMarca) {
    try {
        const response = await fetch(url + "/marcas/" + idMarca);
        const marca = await response.json();

        document.getElementById("nombreMarcaEdit").value = marca.nombre;
        document.getElementById("cantidadEdit").value = marca.cantidad;
        document.getElementById("idMarcaEdit").value = marca.id;
        
        document.getElementById("editarMarca").style.display = "block";  // Muestra el formulario de edicion
    } catch (error) {
        console.error('Error al cargar la marca para editar:', error);
    }
}

// Maneja el evento de envio del formulario de edicion de marcas
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
        method: "PUT",  // Metodo HTTP PUT para actualizar la marca
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(marcaData)
    })
    .then(response => {
        if (response.ok) {
            alert("Marca actualizada con exito!");
            cargarMarcas();  // Recarga las marcas despues de actualizar
            document.getElementById("editarMarca").style.display = "none";  // Oculta el formulario de edicion
        } else {
            throw new Error("Error al actualizar la marca");
        }
    })
    .catch(error => {
        console.error("Error al actualizar la marca:", error);
        alert("Error al actualizar la marca. Por favor, intentalo de nuevo.");
    });
});
