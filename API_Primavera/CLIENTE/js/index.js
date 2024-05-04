const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;



//--------------------------------------------PETICIONES GET------------------------------------------------
//Funcion para obtener todos los coches
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
            document.getElementById('todosLosCoches').innerHTML += listaCoches;
            console.log(datosObjeto);
        })
        .catch(error=>console.log(error));
}

//Evento para obtener un coche o coches por su id
document.getElementById('getCocheByIDForm').addEventListener('submit', (event) =>{
    event.preventDefault();

    const idCoche = document.getElementById('idCocheGET').value;

    fetch(url+'/coches/'+ idCoche)
        .then(datosCrudos=>{
            if(!datosCrudos.ok){
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            console.log(datosCrudos);
            return datosCrudos.json();
        })
        .then(datosObjeto=>{
            document.getElementById('cocheID').innerHTML += datosObjeto.nombre+" - "+datosObjeto.cantidad;
            console.log(datosObjeto);
        })
        .catch(error=>console.log(error));
})
//--------------------------------------------!PETICIONES GET------------------------------------------------




//--------------------------------------------PETICIONES POST------------------------------------------------
//Evento para agregar un coche al registro
document.getElementById('postCocheForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const datosBody = {
        nombreCoche: document.getElementById('nombreCochePOST').value,
        cantidad: document.getElementById('cantidadPOST').value
    };

    fetch(url + '/coches', {
        method: 'POST',
        body: JSON.stringify(datosBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        // Procesa los datos de la respuesta aquí
        document.getElementById('nuevoCochePOST').innerHTML = `<li>${datosObjeto.nombreCoche} - ${datosObjeto.cantidad}</li>`;
        console.log(datosObjeto);
    })
    .catch(error => console.error(error));
});
//--------------------------------------------!PETICIONES POST------------------------------------------------




//--------------------------------------------PETICIONES PUT------------------------------------------------
document.getElementById('putCocheForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const idCoche = document.getElementById('idCochePUT').value;;
    const datosBody = {
        nuevoNombre: document.getElementById('nuevoNombrePUT').value,
        cantidad: document.getElementById('cantidadPUT').value
    };

    fetch(url + '/coches/' + idCoche, {
        method: 'PUT',
        body: JSON.stringify(datosBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        const nuevoCocheHTML = `<li>${datosObjeto.nuevoNombre} - ${datosObjeto.cantidad}</li>`;
        document.getElementById('nuevoCochePUT').innerHTML += nuevoCocheHTML;

        console.log("Datos objeto recibidos:", datosObjeto);
    })
    .catch(error => console.error(error));
});
//--------------------------------------------!PETICIONES PUT------------------------------------------------



//--------------------------------------------PETICIONES PATCH------------------------------------------------
document.getElementById('patchCocheForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const idCoche = document.getElementById('idCochePATCH').value;;
    const datosBody = {
        nuevoNombre: document.getElementById('nuevoNombrePATCH').value,
        cantidad: document.getElementById('cantidadPATCH').value
    };

    fetch(url + '/coches/' + idCoche, {
        method: 'PATCH',
        body: JSON.stringify(datosBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Cuidado: ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(datosObjeto => {
        const nuevoCocheHTML = `<li>${datosObjeto.nuevoNombre} ${datosObjeto.cantidad}</li>`;
        document.getElementById('nuevoCochePATCH').innerHTML += nuevoCocheHTML;
        
        console.log("Datos objeto recibidos:", datosObjeto);
    })
    .catch(error => console.error(error));
});
//--------------------------------------------!PETICIONES PATCH------------------------------------------------



//--------------------------------------------PETICIONES DELETE------------------------------------------------

//--------------------------------------------!PETICIONES DELETE------------------------------------------------
