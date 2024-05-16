// Cargar las ventas al cargar la página
document.addEventListener('DOMContentLoaded', cargarVentas);

async function cargarVentas() {
    try {
        const response = await fetch(`${url}/ventas`);
        const ventas = await response.json();
        
        const cuerpoTabla = document.getElementById('cuerpoTabla');
        cuerpoTabla.innerHTML = '';

        for (const venta of ventas) {
            //Llamamos a las funciones asicronas de index.js con un await
            const nombreMarca = await getNombreMarcaByID(venta.marcaID);
            const nombreConcesionario = await getNombreConcesionarioByID(venta.concesionariosID);
            const fila = `
                <tr>
                    <td>${venta.id}</td>
                    <td>${nombreMarca}</td>
                    <td>${nombreConcesionario}</td>
                    <td>${venta.cantidad_vendida}</td>
                    <td><button onclick="eliminarVenta(${venta.id})">Eliminar</button></td>
                </tr>`;
            cuerpoTabla.innerHTML += fila;
        }
    } catch (error) {
        console.error('Error al cargar las ventas:', error);
    }
}

async function eliminarVenta(idVenta) {
    try {
        const response = await fetch(`${url}/ventas/${idVenta}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            cargarVentas();
        } else {
            console.error('Error al eliminar la venta:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
    }
}



document.addEventListener("DOMContentLoaded", function() {
    const marcaSelect = document.getElementById("marcaSelect");
    const concesionarioSelect = document.getElementById("concesionarioSelect");
    const cantidadInput = document.getElementById("cantidadInput");

    fetch(url + "/marcas")
        .then(response => response.json())
        .then(data => {
            data.forEach(marca => {
                marcaSelect.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`;
            });

            // Simular un cambio de selección para cargar automáticamente los concesionarios
            marcaSelect.dispatchEvent(new Event("change"));
        })
        .catch(error => console.error("Error al obtener las marcas:", error));

    // Cuando se selecciona una marca, cargar y mostrar opciones de concesionario
    marcaSelect.addEventListener("change", function() {
        const marcaID = this.value;
        fetch(url + '/concesionarios/marca/' + marcaID)
            .then(response => response.json())
            .then(data => {
                concesionarioSelect.innerHTML = "";
                data.forEach(concesionario => {
                    concesionarioSelect.innerHTML += `<option value="${concesionario.id}">${concesionario.nombre}</option>`;
                });

                concesionarioSelect.disabled = false;

                //Sirve para seleccionar automaticamente el primer concesionario de esa marca
                if (data.length > 0) {
                    concesionarioSelect.selectedIndex = 0;
                }
            })
        .catch(error => console.error("Error al obtener los concesionarios:", error));
    });

    
    //AQUI SE MANEJA EL POST DE UNA VENTA
    document.getElementById("ventaForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const ventaData = {
            marcaID: marcaSelect.value,//en el html tenemos establecido que el value de cada opcion de marca del select es igual a su ID
            concesionariosID: concesionarioSelect.value,
            cantidad_vendida: cantidadInput.value
        };

        fetch(url + "/ventas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(ventaData) 
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al registrar la venta");
            }
        })
        .then(async datosObjeto => {
            //Una vez que tenemos los datos llamamos a la funcion asincrona para obtener el nombre la marca al hacer una venta (a partir del marcaID)
            const nombreMarca = await getNombreMarcaByID(marcaSelect.value);
            document.getElementById('nuevaVentaPOST').innerHTML = `
                <li>VENTA con ID: ${datosObjeto.id} <br>
                ${cantidadInput.value} unidades vendidas 
                de la MARCA: ${nombreMarca}
            `;
            alert("Venta registrada con éxito!");
            cargarVentas();
            document.getElementById("ventaForm").reset();
        })
        .catch(error => {
            console.error("Error al registrar la venta:", error);
            alert("Error al registrar la venta. Por favor, inténtalo de nuevo.");
        });
    });
});




