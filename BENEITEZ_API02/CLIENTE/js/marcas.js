document.addEventListener('DOMContentLoaded', cargarMarcas);

async function cargarMarcas() {
    try {
        const datosCrudos = await fetch(url + "/marcas");
        const marcas = await datosCrudos.json();
        
        const cuerpoTabla = document.getElementById('cuerpoTablaMarcas');
        cuerpoTabla.innerHTML = '';

        for (const marca of marcas) {
            const fila = `
                <tr>
                    <td>${marca.id}</td>
                    <td>${marca.nombre}</td>
                    <td>${marca.cantidad}</td>
                    <td><button onclick="eliminarMarca(${marca.id})">Eliminar</button></td>
                </tr>`;
            cuerpoTabla.innerHTML += fila;
        }
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
}




async function eliminarMarca(idMarca) {
    try {
        const response = await fetch(url + "/marcas/" + idMarca, {
            method: 'DELETE'
        });
        if (response.ok) {
            cargarMarcas();
            alert("Marca eliminada con éxito!");
        } else {
            console.error('Error al eliminar la marca:', response.statusText);
            alert("Error al eliminar la marca. Por favor, inténtalo de nuevo.");
        }
    } catch (error) {
        console.error('Error al eliminar la marca:', error);
        alert("Error al eliminar la marca. Por favor, inténtalo de nuevo.");
    }
}



//Aqui se maneja una SOLICITUD POST al server
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
    .then(datosCrudos => {
        if (datosCrudos.ok) {
            return datosCrudos.json();
        } else {
            throw new Error("Error al registrar la marca");
        }
    })
    .then(datosObjeto => {
        document.getElementById('nuevaMarcaPost').innerHTML = `
                <li>Marca con ID: ${datosObjeto.id} <br>
                ${datosObjeto.nombre} unidades vendidas 
                de la MARCA: ${datosObjeto.cantidad}
            `;
        cargarMarcas();
        document.getElementById("marcaForm").reset();
    })
    .catch(error => {
        console.error("Error al registrar la marca:", error);
        alert("Error al registrar la marca. Por favor, inténtalo de nuevo.");
    });

});