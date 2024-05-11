const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;



//--------------------------------------------MARCAS------------------------------------------------
// Función para obtener todas las marcas
function getMarcas() {
    fetch(url+'/marcas')
        .then(datosCrudos => {
            if (!datosCrudos.ok) {
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            return datosCrudos.json();
        })
        .then(datosObjeto => {
            const listaMarcas = datosObjeto.map(marca => `<li>ID: ${marca.id} - ${marca.nombre} - ${marca.cantidad}</li>`).join('');
            document.getElementById('todosLasMarcas').innerHTML = listaMarcas;
        })
        .catch(error => console.log(error));
}
//--------------------------------------------!MARCAS------------------------------------------------






//--------------------------------------------CONCESIONARIOS------------------------------------------------
// Evento para obtener todos los concesionarios
function getConcesionarios() {
    fetch(url + '/concesionarios')
        .then(datosCrudos => {
            if (!datosCrudos.ok) {
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            return datosCrudos.json();
        })
        .then(datosObjeto => {
            const listaConcesionarios = datosObjeto.map(concesionario => `<li>ID: ${concesionario.id} - ${concesionario.nombre} - ${concesionario.direccion}</li>`).join('');
            document.getElementById('todosLosConcesionarios').innerHTML = listaConcesionarios;
        })
        .catch(error => console.log(error));
}

//--------------------------------------------!CONCESIONARIOS------------------------------------------------
