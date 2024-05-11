const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;



//--------------------------------------------PETICIONES GET------------------------------------------------
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
//--------------------------------------------!PETICIONES GET------------------------------------------------
