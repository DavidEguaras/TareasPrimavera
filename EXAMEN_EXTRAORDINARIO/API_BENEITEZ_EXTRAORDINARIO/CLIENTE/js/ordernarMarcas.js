
function compararMarcaID( objeto1, objeto2) {
    if ( objeto1.id < objeto2.id ){
      return -1;
    }
    if (objeto1.id > objeto2.id){
      return 1;
    }
    return 0;
  }
  
function compararNombreMarca(objeto1, objeto2) {
    if ( objeto1.nombre < objeto2.nombre ){
      return -1;
    }
    if (objeto1.nombre > objeto2.nombre){
      return 1;
    }
    return 0;
}


function compararStockMarcaAsc(objeto1, objeto2) {
    if ( objeto1.cantidad < objeto2.cantidad ){
      return -1;
    }
    if (objeto1.cantidad > objeto2.cantidad){
      return 1;
    }
    return 0;
}

function compararStockMarcaDesc(objeto1, objeto2) {
    if ( objeto1.cantidad < objeto2.cantidad ){
      return 1;
    }
    if (objeto1.cantidad > objeto2.cantidad){
      return -1;
    }
    return 0;
}

function ordenarPorID(){
    fetch(url + "/marcas")
    .then(response => response.json())
    .then(marcas => {
        const cuerpoTabla = document.getElementById('cuerpoTablaMarcas');
        cuerpoTabla.innerHTML = '';
        //AQUI ORDENAMOS LA TABLA
        marcas.sort(compararMarcaID);   
        const filas = marcas.map(marca => `
            <tr>
                <td>${marca.id}</td>
                <td>${marca.nombre}</td>
                <td>${marca.cantidad}</td>
                <td>
                    <button onclick="cargarFormularioEdicionMarca(${marca.id})">Editar</button>
                    <button onclick="eliminarMarca(${marca.id})">Eliminar</button>
                </td>
            </tr>
        `).join('');

        cuerpoTabla.innerHTML = filas;
    })
    .catch(error => console.error('Error al cargar las marcas:', error));
}

function ordernarPorNombre(){
    fetch(url + "/marcas")
    .then(response => response.json())
    .then(marcas => {
        const cuerpoTabla = document.getElementById('cuerpoTablaMarcas');
        cuerpoTabla.innerHTML = '';
        //AQUI ORDENAMOS LA TABLA
        marcas.sort(compararNombreMarca);   
        const filas = marcas.map(marca => `
            <tr>
                <td>${marca.id}</td>
                <td>${marca.nombre}</td>
                <td>${marca.cantidad}</td>
                <td>
                    <button onclick="cargarFormularioEdicionMarca(${marca.id})">Editar</button>
                    <button onclick="eliminarMarca(${marca.id})">Eliminar</button>
                </td>
            </tr>
        `).join('');

        cuerpoTabla.innerHTML = filas;
    })
    .catch(error => console.error('Error al cargar las marcas:', error));
}

function ordernarStockDesc(){
    fetch(url + "/marcas")
    .then(response => response.json())
    .then(marcas => {
        const cuerpoTabla = document.getElementById('cuerpoTablaMarcas');
        cuerpoTabla.innerHTML = '';
        //AQUI ORDENAMOS LA TABLA
        marcas.sort(compararStockMarcaAsc);   
        const filas = marcas.map(marca => `
            <tr>
                <td>${marca.id}</td>
                <td>${marca.nombre}</td>
                <td>${marca.cantidad}</td>
                <td>
                    <button onclick="cargarFormularioEdicionMarca(${marca.id})">Editar</button>
                    <button onclick="eliminarMarca(${marca.id})">Eliminar</button>
                </td>
            </tr>
        `).join('');

        cuerpoTabla.innerHTML = filas;
    })
    .catch(error => console.error('Error al cargar las marcas:', error));
}

function ordernarStockAsc(){
    fetch(url + "/marcas")
    .then(response => response.json())
    .then(marcas => {
        const cuerpoTabla = document.getElementById('cuerpoTablaMarcas');
        cuerpoTabla.innerHTML = '';
        //AQUI ORDENAMOS LA TABLA
        marcas.sort(compararStockMarcaDesc);   
        const filas = marcas.map(marca => `
            <tr>
                <td>${marca.id}</td>
                <td>${marca.nombre}</td>
                <td>${marca.cantidad}</td>
                <td>
                    <button onclick="cargarFormularioEdicionMarca(${marca.id})">Editar</button>
                    <button onclick="eliminarMarca(${marca.id})">Eliminar</button>
                </td>
            </tr>
        `).join('');

        cuerpoTabla.innerHTML = filas;
    })
    .catch(error => console.error('Error al cargar las marcas:', error));
}



