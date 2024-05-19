// peticion GET con JSON soulción con promesas
// const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
// const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas


function getCiudad(idCiudad){
    return new Promise((resolve, reject)=>{
        const peticion=new XMLHttpRequest();
        const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;
        peticion.open('GET', url+ '/ciudades/' + idCiudad);
        peticion.send();
        peticion.addEventListener('load', function(){
            if(peticion.status===200){
                console.log(JSON.parse(peticion.responseText));
                resolve(JSON.parse(peticion.responseText)); //en datos tenemos un objeto
            } else {
                reject("Error: "+ peticion.status + ": "+ peticion.statusText);
            }
        });
    
        // Manejar el evento error en caso de problemas de red
        peticion.addEventListener('error', function () {
        console.error('Error de red al realizar la solicitud');
        });
    })
}

document.getElementById('getCiudad').addEventListener('submit', (event)=>{
    event.preventDefault();
    const idCiudad= document.getElementById('id-ciudad').value;
    getCiudad(idCiudad)
        // pintamos los datos en la página, o presentamos el error
        .then(datos=>document.getElementById('p1').innerHTML=datos.nombre + ": "+datos.cantidad)
        .catch(textoError=>console.error("jojojo: "+textoError));
});

