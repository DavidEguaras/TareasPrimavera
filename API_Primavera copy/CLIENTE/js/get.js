// Evento para obtener una marca por su ID
document.getElementById('getMarcaByIDForm').addEventListener('submit', (event) =>{
    event.preventDefault();

    const idMarca = document.getElementById('idMarcaGET').value;

    fetch(url+'/marcas/'+ idMarca)
        .then(datosCrudos=>{
            if(!datosCrudos.ok){
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            console.log(datosCrudos);
            return datosCrudos.json();
        })
        .then(datosObjeto=>{
            document.getElementById('marcaID').innerHTML += datosObjeto.nombre+" - "+datosObjeto.cantidad;
            console.log(datosObjeto);
        })
        .catch(error=>console.log(error));
});
