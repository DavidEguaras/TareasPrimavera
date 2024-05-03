const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;



//--------------------PETICIONES GET------------------------

function getCoches(){
    fetch(url+'/coches')
        .then(datosCrudos => {
            if(!datosCrudos.ok){
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            console.log(datosCrudos);
            return datosCrudos.json();
        })
        /*Hacemos una lista con todos los coches y sus cantidades
        y se lo pasamos a la ul con id 'todosLosCoches'*/
        .then(datosObjeto => {
            const listaCoches = datosObjeto.map(coche => `<li>${coche.nombre} - ${coche.cantidad}</li>`).join('');
            document.getElementById('todosLosCoches').innerHTML = listaCoches;
            console.log(datosObjeto);
        })
        .catch(error=>console.log(error));
}

//--------------------PETICIONES GET------------------------

