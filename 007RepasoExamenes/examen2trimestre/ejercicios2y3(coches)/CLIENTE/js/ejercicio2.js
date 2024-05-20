const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;



//Agregamos un event listener para cargar los registros de la tabla:
document.addEventListener('DOMContentLoaded', cargarMarcas);

//funcion que se encargara de cargar las marcas tanto al cargar la pagina como al eliminar un registro
function cargarMarcas(){
    fetch(url + "/marcas")
        .then(response => response.json())
        .then(marcas => {
            const tablaMarcas = document.getElementById('tablaMarcas');
            tablaMarcas.innerHTML = '';

            const filasTabla = marcas.map(marca => `
                <tr>
                    <td>${marca.id}</td>
                    <td>${marca.nombre}</td>
                    <td>${marca.id}</td>
                    <td>
                        <button onClick ="eliminarMarca(${marca.id})">Eliminar</button>
                    </td>
                </tr>
            `).join('');

            tablaMarcas.innerHTML += filasTabla;
        })
        .catch(error => console.error('Error al cargar las marcas', error));
}

function eliminarMarca(idMarca){
    fetch(url + '/marcas/' + idMarca, {
        method: 'DELETE'
    })
    .then(response => {
        if(response.ok){
            //cargamos la tabla con los registros de marcas para que el usuario vea que la marca que
            //ha elimnado esta ausente en la tabla
            cargarMarcas();
            //Avisamos al usuario que la marca ha sido eliminada correctamente
            document.getElementById('avisoMarcaEliminada').innerHTML = `
                <h3>Marca Eliminada Con exito</h3>
            `;
        }else{
            console.error();
        }
    })
}