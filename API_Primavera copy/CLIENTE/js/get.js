//--------------------------------------------MARCAS------------------------------------------------
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
//--------------------------------------------!MARCAS------------------------------------------------



//--------------------------------------------CONCESIONARIOS------------------------------------------------
// Evento para obtener un concesionario por su ID
document.getElementById('getConcesionarioByIDForm').addEventListener('submit', (event) =>{
    event.preventDefault();

    const idConcesionario = document.getElementById('idConcesionarioGET').value;

    fetch(url+'/concesionarios/'+ idConcesionario)
        .then(datosCrudos=>{
            if(!datosCrudos.ok){
                throw `Cuidado: ${datosCrudos.status}: ${datosCrudos.statusText}`;
            }
            return datosCrudos.json();
        })
        .then(datosObjeto=>{
            document.getElementById('concesionarioID').innerHTML = `<li>${datosObjeto.nombre} - ${datosObjeto.direccion}</li>`;
        })
        .catch(error=>console.log(error));
});
//--------------------------------------------!CONCESIONARIOS------------------------------------------------
