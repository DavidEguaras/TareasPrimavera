document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const formAlumno = document.getElementById("formAlumno")

    // Función para cargar alumnos que coincidan con la búsqueda
    function buscarAlumnos(){
        const matriculaInput = searchInput.value
        fetch(`http://192.168.7.100:3000/alumnos/${matriculaInput}`)
        .then(response => response.json())
        .then(alumno => {
            const form = document.getElementById('formAlumno');
            form.innerHTML= '';
                form.innerHTML = `<div>
                <label for="grupo">Grupo de clase en el curso Actual:</label>
                <select id="grupo" value="${alumno.grupo}">
                    <option value="SMR1">SMR1</option>
                    <option value="SMR2">SMR2</option>
                    <option value="ASIR1">ASIR1</option>
                    <option value="ASIR2">ASIR2</option>
                    <option value="DAM1">DAM1</option>
                    <option value="DAM2">DAM2</option>
                    <option value="DAW1">DAW1</option>
                    <option value="DAW2">DAW2</option>           
                </select>
                </div>
                <div>
                    <label for="dni">DNI:</label>
                    <input type="text" id="dni" value="${alumno.dni}">
                    <span class="error" id="dniError"></span>
                </div>
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" value="${alumno.nombre}">
                </div>
                <div>
                    <label for="apellidos">Apellidos:</label>
                    <input type="text" id="apellidos" value="${alumno.apellidos}">
                </div>
                <div>
                    <label for="codigoAlumno">Codigo alumno:</label>
                    <input type="text" id="codigoAlumno" value="${alumno.codigo}">
                </div>
                <div>
                    <label for="fechaNacimiento">Fecha de nacimiento:</label>
                    <input type="date" id="fechaNacimiento">
                    <span class="error" id="fechaNacimientoError" value="${pasarFormatoFecha(alumno.fecha_nac)}"></span>
                </div>
                <div>
                    <label for="email">E-mail:</label>
                    <input type="email" id="email" value="${alumno.email}">
                </div>
                <div>
                    <label for="username">Nombre de usuario:</label>
                    <input type="text" id="username" value="${alumno.usuario}">
                </div>
                <div>
                    <label for="password">Contraseña:</label>
                    <input type="text" id="password" value="${alumno.contrasena}">
                </div>
                <button type="submit" id="submitButton">Guardar Alumno</button>`;
        })
        .catch(error => console.error("Error al buscar alumnos:", error));
    }
    // Event listener para el botón de búsqueda
    searchButton.addEventListener("click", buscarAlumnos);

    function pasarFormatoFecha(fechaGET){
        // La fechaGET debería estar en el formato "AAAA-MM-DD"
        const partesFecha = fechaGET.split('-'); // Dividir la fecha en año, mes y día
        const dia = partesFecha[2];
        const mes = partesFecha[1];
        const año = partesFecha[0];

        // Formatear la fecha en "DD/MM/AAAA"
        const fechaFormateada = `${dia}/${mes}/${año}`;
        return fechaFormateada;
    }

});
