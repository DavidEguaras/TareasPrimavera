// solución callback
function renderCiudad(datos){
    console.log(datos);
    // aquí pintamos los datos. Habrá casos que será muy extenso.
    document.getElementById('p1').innerHTML = datos.nombre+":  "+datos.cantidad;
}

function getCiudad(idCiudad, funcion_callback){
    const peticion=new XMLHttpRequest();
    const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;
    peticion.open('GET', url+ '/ciudades/' + idCiudad);
    peticion.send();
    peticion.addEventListener('load', function(){
        if(peticion.status===200){
            const datos= JSON.parse(peticion.responseText); //en datos tenemos un objeto
            console.log(datos);
            funcion_callback(datos);
        } else {
            console.error("Error: "+ peticion.status + ": "+ peticion.statusText);
        }
    });
}

document.getElementById('getCiudad').addEventListener('submit', (event)=>{
    console.log("asdf");
    event.preventDefault();
    const idCiudad= document.getElementById('id-ciudad').value;
    datos=getCiudad(idCiudad, renderCiudad);
});