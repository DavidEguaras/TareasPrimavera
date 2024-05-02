// spulción con la API Fetch()
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;

document.getElementById('getCiudad').addEventListener('submit', (event)=>{
    event.preventDefault();
    const idCiudad= document.getElementById('id-ciudad').value;
    fetch(url+'/ciudades/'+ idCiudad)
        .then(datosCrudos=>{
            console.log(datosCrudos);
            return datosCrudos.json();
        })
        .then(datosObjeto=>{
            console.log(datosObjeto);
        // aquí pintamos los datos. Habrá casos que será muy extenso.
        document.getElementById('p1').innerHTML = datosObjeto.nombre+":  "+datosObjeto.cantidad;
        })
        .catch(error=>console.log(error));
});