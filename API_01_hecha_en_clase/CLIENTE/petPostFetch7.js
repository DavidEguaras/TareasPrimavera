// POST con la API Fetch() controlando los errores
//const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;

document.getElementById('addCiudad').addEventListener('submit', (event)=>{
    event.preventDefault();
    const datosBody={
        nuevoNombre: document.getElementById('nuevoNombre').value,
        habitantes: document.getElementById('habitantes').value
    }

    fetch(url+'/ciudades/add', {
        method: 'POST',
        body: JSON.stringify(datosBody), // oPUT O PATCH o DELETE ...
        headers:{
            'Content-Type': 'application/json'
        }
    }) .then(datosCrudos=>{
            if(!datosCrudos.ok){
                // lanzamos un excepción (error) que intercepta el catch()
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`
            }
            console.log(datosCrudos);
            return datosCrudos.json();
        })
        .then(datosObjeto=>{
            console.log(datosObjeto);
            // aquí pintamos los datos. Habrá casos que será muy extenso.
            document.getElementById('p1').innerHTML = "Ciudad añadida:" +datosObjeto.nuevoNombre+":  "+datosObjeto.habitantes;
        })
        .catch(error=>console.log(error));
});