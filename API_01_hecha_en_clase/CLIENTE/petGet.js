 const dirIP_api = '127.0.0.1'; // O asignar el valor que necesitas
 const PUERTO_EXPRESS = 3000; // O asignar el valor que necesitas
document.getElementById('b1').addEventListener('click', realizaSolicitud_1);
document.getElementById('b3').addEventListener('click', realizaSolicitud_3);

function pintar(datos, lugar){
    lugar.innerHtml=''
    datos.forEach(ciudad => {
        const nuevoElementoLi= document.createElement('LI');
        nuevoElementoLi.textContent=ciudad.nombre;
        nuevoElementoLi.style.cursor='pointer';
        nuevoElementoLi.addEventListener('click', function(){
            nuevoElementoLi.textContent=ciudad.nombre+": "+ ciudad.cantidad;
        });
        lugar.appendChild(nuevoElementoLi);

    })
}


function realizaSolicitud_1(){
    console.log('peticion 1');
    // peticion
    const peticion = new XMLHttpRequest();
    const url='http://127.0.0.1:3000/ciudades'
    peticion.open('GET', url, true);
    peticion.onreadystatechange = function(){
        if (peticion.readyState==4){ // hemos recibido
            if(peticion.status==200){
                let datos= JSON.parse(peticion.responseText) // JSON a array objetos
                console.log("Datos recibidos", datos);
            } else {
                console.error("mala suerte: códido de error", peticion.status);
            }
        }

    }
    peticion.send();
}

function realizaSolicitud_3(){
    const peticion=new XMLHttpRequest();
    const url=`http://127.0.0.1:3000/ciudades`; // SE RECIBE UN ARRAY DE OBJETOS CIUDAD
    peticion.open('GET', url);
    peticion.addEventListener('load', function(){
        if (peticion.status===200){
            console.log(peticion.readyState);
            const datos=JSON.parse(peticion.responseText);
            const lugar=document.getElementById('listaCiudades');
            pintar(datos, lugar);
        } else {
            //console.log('mal');
            muestraError(peticion);
        }
    });

    peticion.send();


    function muestraError(peticion) {
        console.log("EEEEE");
        console.log(peticion.status);
      if (peticion.status) {
          console.log("Error "+peticion.status+" ("+peticion.statusText+") en la petición");
      } else {
          console.log("Ocurrió un error o se abortó la conexión");
      }
    }
    peticion.addEventListener('error', muestraError);
    peticion.addEventListener('abort', muestraError);
    peticion.addEventListener('timeout', muestraError);
}