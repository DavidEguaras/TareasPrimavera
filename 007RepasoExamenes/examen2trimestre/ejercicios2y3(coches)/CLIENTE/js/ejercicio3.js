const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url = `http://${dirIP_api}:${PUERTO_EXPRESS}`;

document.addEventListener('DOMContentLoaded', cargarMarcas);

function cargarMarcas(){
    const filtroNombre = document.getElementById('filtroNombre').value;
    const urlConFiltro = url + "/marcas?nombre=" + encodeURIComponent(filtroNombre);

    fetch(urlConFiltro)
        .then(response => response.json())
        .then(marcas => {
            const tablaMarcas = document.getElementById('tablaMarcas');
            tablaMarcas.innerHTML = '';

            const filasTabla = marcas.map(marca => `
                <tr>
                    <td>${marca.id}</td>
                    <td>${marca.nombre}</td>
                    <td>${marca.cantidad}</td>
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
            cargarMarcas();
            document.getElementById('avisoMarcaEliminada').innerHTML = `
                <h3>Marca Eliminada Con exito</h3>
            `;
        }else{
            console.error('Error al eliminar la marca');
        }
    })
    .catch(error => console.error('Error al eliminar la marca', error));
}