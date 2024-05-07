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