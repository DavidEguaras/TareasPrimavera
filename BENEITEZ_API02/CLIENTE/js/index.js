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
            const listaMarcas = datosObjeto.map(marca => `<li>ID: ${marca.id} - ${marca.nombre} - ${marca.cantidad}</li>`).join('');
            //agregamos la lista al DOM
            document.getElementById('todasLasMarcas').innerHTML = listaMarcas;
        })
        .catch(error => console.log(error));
}

async function getNombreMarcaByID(idMarca){
    fetch(url +'/marcas/' + idMarca)
        .then(datosCrudos => {
            if(!datosCrudos.ok){
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }   
            return datosCrudos.json()
        })
        .then(datosObjeto => {
            return datosObjeto.nombre;
        })
        .catch(error=>console.log(error));
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
            const listaConcesionarios = datosObjeto.map(concesionario => `<li>ID: ${concesionario.id} - ${concesionario.nombre} - Marca ID: ${concesionario.marcaID}</li>`).join('');
            //agregamos la lista al DOM
            document.getElementById('todosLosConcesionarios').innerHTML = listaConcesionarios;
        })
        .catch(error => console.log(error));
}

async function getNombreConcesionarioByID(idConcesionario){
    fetch(url +'/concesionarios/' + idConcesionario)
        .then(datosCrudos => {
            if(!datosCrudos.ok){
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }   
            return datosCrudos.json()
        })
        .then(datosObjeto => {
            return datosObjeto.nombre;
        })
        .catch(error=>console.log(error));
}
//----------------------------------------!CONCESIONARIOS----------------------------------------



//----------------------------------------VENTAS----------------------------------------
async function getVentas(){
    fetch(url + '/ventas')
        .then(datosCrudos => {
            if (!datosCrudos.ok){
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            return datosCrudos.json();
        })
        .then(datosObjeto => {
            const listaVentas = datosObjeto.map(async venta => `<li>ID de la Venta: ${venta.id}. Con un total de:${venta.cantidad_vendida}
            coche(s) de Marca: ${await getNombreMarcaByID(venta.marcaID)} en el concesionario: ${await getNombreConcesionarioByID(venta.concesionariosID)}</li>`).join('');
            //agregamos la lista al DOM
            document.getElementById('todasLasVentas').innerHTML = listaVentas;
            console.log(datosObjeto);
        })
        .catch(error => console.log(error));
}
//----------------------------------------!VENTAS----------------------------------------