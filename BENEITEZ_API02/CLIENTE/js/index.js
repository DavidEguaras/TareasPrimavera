const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;

//En este fichero se encuentran las peticiones get de todas las tablas, para una mayor facilidad
// a la hora de filtrar y mostrar el contenido al usuario

//----------------------------------------MARCAS----------------------------------------
function getMarcas() {
    fetch(url + '/marcas')
        .then(datosCrudos => {
            if (!datosCrudos.ok) {
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            return datosCrudos.json();
        })
        .then(datosObjeto => {
            console.log(datosObjeto); 
            const listaMarcas = datosObjeto.map(marca => `
                <li style="display: flex; justify-content: space-between; padding: 5px 0;">
                    <span style="flex: 1; font-weight: bold;">ID:</span> 
                    <span style="flex: 1; margin-left: 10px;">${marca.id}</span>
                    <span style="flex: 1; font-weight: bold;">Nombre:</span> 
                    <span style="flex: 2; margin-left: 10px;">${marca.nombre}</span>
                    <span style="flex: 1; font-weight: bold;">Cantidad:</span> 
                    <span style="flex: 1; margin-left: 10px;">${marca.cantidad}</span>
                </li>
                <a>___________________________________________________________________________________________________________________________________________________________________________________</a>
            `).join('');
    

            //agregamos la lista al DOM
            document.getElementById('todasLasMarcas').innerHTML = listaMarcas;
        })
    .catch(error => console.log(error));
}

async function getNombreMarcaByID(idMarca) {
    try {
        const response = await fetch(url + '/marcas/' + idMarca);
        if (!response.ok) {
            throw `Cuidado: ${response.status}: ${response.statusText}`;
        }
        const datosObjeto = await response.json();
        return datosObjeto.nombre;
    } catch (error) {
        console.log(error);
    }
}
//----------------------------------------!MARCAS----------------------------------------



//----------------------------------------CONCESIONARIOS----------------------------------------
function getConcesionarios() {
    fetch(url + '/concesionarios')
        .then(datosCrudos => {
            if (!datosCrudos.ok) {
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            return datosCrudos.json();
        })
        .then(datosObjeto => {
            const listaConcesionarios = datosObjeto.map(concesionario => `
                <li style="display: flex; justify-content: space-between; padding: 5px 0; margin-right: 70px;">
                    <span style="font-weight: bold;">ID:</span> 
                    <span>${concesionario.id}</span>
                    <span style="font-weight: bold; margin-left: 5px;">Nombre:</span> 
                    <span>${concesionario.nombre}</span>
                    <span style="font-weight: bold; margin-left: 5px; margin-right:10px">Marca ID:</span> 
                    <span>${concesionario.marcaID}</span>
                </li>
                <a>___________________________________________________________________________________________________________________________________________________________________________________</a>
            `).join('');
            //agregamos la lista al DOM
            document.getElementById('todosLosConcesionarios').innerHTML = listaConcesionarios;
        })
        .catch(error => console.log(error));
}

async function getNombreConcesionarioByID(idConcesionario) {
    try {
        const response = await fetch(url + '/concesionarios/' + idConcesionario);
        if (!response.ok) {
            throw `Cuidado: ${response.status}: ${response.statusText}`;
        }
        const datosObjeto = await response.json();
        return datosObjeto.nombre;
    } catch (error) {
        console.log(error);
    }
}
//----------------------------------------!CONCESIONARIOS----------------------------------------



//----------------------------------------VENTAS----------------------------------------
async function getVentas(){
    try {
        const response = await fetch(url + '/ventas');
        if (!response.ok) {
            throw `Cuidado: ${response.status}: ${response.statusText}`;
        }
        const ventas = await response.json();

        const listaVentas = [];
        for (const venta of ventas) {
            const nombreMarca = await getNombreMarcaByID(venta.marcaID);
            const nombreConcesionario = await getNombreConcesionarioByID(venta.concesionariosID);
            const itemVenta = `
            <li style="display: flex; justify-content: space-between; padding: 5px; margin-right:100px;">
                <span style="font-weight: bold;">ID:</span> 
                <span>${venta.id}</span>
                <span style="font-weight: bold; margin-left: 10px;">Cantidad:</span> 
                <span>${venta.cantidad_vendida}</span>
                <span style="font-weight: bold; margin-left: 10px;">Marca:</span> 
                <span>${nombreMarca}</span>
                <span style="font-weight: bold; margin-left: 10px;">Concesionario:</span> 
                <span>${nombreConcesionario}</span>
            </li>
            <a>___________________________________________________________________________________________________________________________________________________________________________________</a>
        `;

            listaVentas.push(itemVenta);
        }
        
        // Agregamos la lista al DOM
        document.getElementById('todasLasVentas').innerHTML = listaVentas.join('');
    } catch(error) {
        console.log(error);
    }
}
//----------------------------------------!VENTAS----------------------------------------