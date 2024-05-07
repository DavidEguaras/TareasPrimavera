const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;



//--------------------------------------------PETICIONES GET------------------------------------------------
//Funcion para obtener todos los coches
function getCoches() {
    fetch(url+'/coches')
        .then(datosCrudos => {
            if (!datosCrudos.ok) {
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            return datosCrudos.json();
        })
        .then(datosObjeto => {
            const listaCoches = datosObjeto.map(coche => `<li>ID: ${coche.id} - ${coche.nombre} - ${coche.cantidad}</li>`).join('');
            document.getElementById('todosLosCoches').innerHTML = listaCoches;
        })
        .catch(error => console.log(error));
}
//--------------------------------------------!PETICIONES GET------------------------------------------------