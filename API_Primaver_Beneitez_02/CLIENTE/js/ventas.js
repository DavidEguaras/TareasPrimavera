document.addEventListener('DOMContentLoaded', cargarVentas);


//Cargamos la tabla con las ventas
function cargarVentas() {
    fetch(url + "/ventas")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las ventas');
            }
            return response.json();
        })
        .then(ventas => {
            const cuerpoTabla = document.getElementById('cuerpoTabla');
            cuerpoTabla.innerHTML = '';

            //hacemos que la funcion sea asincrona para poder realizar las peticiones de getNombreMarcaByID y getNombreConcesionarioByID, que son peticiones asincronas tambien
            ventas.forEach(async venta => {
                try {
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
                } catch (error) {
                    console.error('Error al obtener nombres:', error);
                }
            });
        })
        .catch(error => console.error('Error al cargar las ventas:', error));
}

//Eliminamos el registro de venta que tenga el id pasado como parametro
function eliminarVenta(idVenta) {
    fetch(url + "/ventas/" + idVenta, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la venta');
        }
        cargarVentas();
    })
    .catch(error => console.error('Error al eliminar la venta:', error));
}



//Este evento, tambien salta cuando se carga la pagina, se encarga de hacer una peticion de las marcas para rellenar las opciones del formulario post
document.addEventListener("DOMContentLoaded", function() {
    const marcaSelect = document.getElementById("marcaSelect");
    const concesionarioSelect = document.getElementById("concesionarioSelect");
    const cantidadInput = document.getElementById("cantidadInput");

    fetch(url + "/marcas")
        .then(response => response.json())
        .then(data => {
            data.forEach(marca => {
                //Aqui asignamos que el marcaSelect.value sea igual a marca.id (option value =), lo que nos servira para referenciar el id facilmente
                marcaSelect.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`;
            });

            // Simular un cambio de seleccion para cargar automaticamente los concesionarios
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




