
// peticion POST con XMLHttpRequest
const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas

document.getElementById('addCiudad').addEventListener('submit', (event)=>{
    event.preventDefault();
    const nuevaCiudad= {
        nuevoNombre: document.getElementById('nuevoNombre').value,
        habitantes: document.getElementById('habitantes').value,
    }
    console.log(nuevaCiudad);
    const peticion=new XMLHttpRequest();
    const url=`http://${dirIP_api}:${PUERTO_EXPRESS}/ciudades/add`;
    peticion.open('POST', url);
    peticion.setRequestHeader('Content-type', 'application/json');  // Siempre tiene que estar esta línea si se envían datos
    peticion.send(JSON.stringify(nuevaCiudad)); //convertimos objeto a texto JSON
    peticion.addEventListener('load', function(){
        console.log(peticion.responseText);
    });
       // Manejar el evento error en caso de problemas de red
       peticion.addEventListener('error', function () {
       console.error('Error de red al realizar la solicitud');
    })
});