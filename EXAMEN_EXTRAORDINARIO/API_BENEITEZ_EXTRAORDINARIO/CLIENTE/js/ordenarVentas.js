
function compararVentasID( objeto1, objeto2) {
    if ( objeto1.id < objeto2.id ){
      return -1;
    }
    if (objeto1.id > objeto2.id){
      return 1;
    }
    return 0;
  }
  
function compararVentasConcesionarioID(objeto1, objeto2) {
    if ( objeto1.VentaID < objeto2.VentaID ){
      return -1;
    }
    if (objeto1.VentaID > objeto2.VentaID){
      return 1;
    }
    return 0;
}



const marcaSelect = document.getElementById("marcaSelect");
const concesionarioSelect = document.getElementById("concesionarioSelect");
const marcaConcesionariosSelect = document.getElementById("marcaConcesionariosSelect");

function cargarVentasConcesionario() {
    fetch(url + "/ventas")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las ventas');
            }
            return response.json();
        })
        .then(ventas => {
            const cuerpoTabla = document.getElementById('cuerpoTablaVentasConcesionarios');
            cuerpoTabla.innerHTML = '';
            ventas.sort(compararVentasID);
            const ventasFiltradas = ventas.filter( venta => venta.concesionarioID = concesionarioSelect.value);
            //hacemos que la funcion sea asincrona para poder realizar las peticiones de getNombreMarcaByID y getNombreConcesionarioByID, que son peticiones asincronas tambien
            ventasFiltradas.forEach(async venta => {
                try {
                    const nombreMarca = await getNombreMarcaByID(venta.marcaID);
                    const nombreConcesionario = await getNombreConcesionarioByID(venta.concesionarioID);
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

function cargarVentasMarcas() {
    fetch(url + "/ventas")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las ventas');
            }
            return response.json();
        })
        .then(ventas => {
            const cuerpoTabla = document.getElementById('cuerpoTablaVentasMarcas');
            cuerpoTabla.innerHTML = '';
            ventas.sort(compararVentasID)
            const ventasFiltradas = ventas.filter(venta => venta.marcaID = marcaSelect.value);
            //hacemos que la funcion sea asincrona para poder realizar las peticiones de getNombreMarcaByID y getNombreConcesionarioByID, que son peticiones asincronas tambien
            ventasFiltradas.forEach(async venta => {
                try {
                    const nombreMarca = await getNombreMarcaByID(venta.marcaID);
                    const nombreConcesionario = await getNombreConcesionarioByID(venta.concesionarioID);
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


async function cargarVentasDeConcesionariosDeMarca() {
    fetch(url + "/ventas")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las ventas');
            }
            return response.json();
        })
        .then(ventas => {
            const cuerpoTabla = document.getElementById('cuerpoTablaMarcaVentasConcesionarios');
            cuerpoTabla.innerHTML = '';
            ventas.sort(compararVentasID)
            
            ventas.forEach(async venta => {
                try {
                    const nombreMarca = await getNombreMarcaByID(venta.marcaID);
                    const nombreConcesionario = await getNombreConcesionarioByID(venta.concesionarioID);
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
        cargarVentasConcesionario();
        cargarVentasMarcas();
        cargarVentasDeConcesionariosDeMarca();
    })
    .catch(error => console.error('Error al eliminar la venta:', error));
}



//Este evento, tambien salta cuando se carga la pagina, se encarga de hacer una peticion de las marcas para rellenar las opciones del formulario post
document.addEventListener("DOMContentLoaded", function() {
    fetch(url + "/marcas")
        .then(response => response.json())
        .then(data => {
            data.forEach(marca => {
                //Aqui asignamos que el marcaSelect.value sea igual a marca.id (option value =), lo que nos servira para referenciar el id facilmente
                marcaSelect.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`;
                marcaConcesionariosSelect.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`;
            });

            // Simular un cambio de seleccion para cargar automaticamente los concesionarios
            marcaSelect.dispatchEvent(new Event("change"));
        })
    .catch(error => console.error("Error al obtener las marcas:", error));

    fetch(url + "/concesionarios")
    .then(response => response.json())
        .then(data => {
            data.forEach(concesionario => {
                concesionarioSelect.innerHTML += `<option value="${concesionario.id}">${concesionario.nombre}</option>`;
            });

            // Simular un cambio de seleccion para cargar automaticamente los concesionarios
            concesionarioSelect.dispatchEvent(new Event("change"));
        })
    .catch(error => console.error("Error al obtener las marcas:", error));
});


concesionarioSelect.addEventListener("change", cargarVentasConcesionario());
marcaSelect.addEventListener("change", cargarVentasMarcas());
marcaConcesionariosSelect.addEventListener("change", cargarVentasDeConcesionariosDeMarca());