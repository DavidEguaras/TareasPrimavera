const dirIP_api= '127.0.0.1';
const PUERTO_EXPRESS = 3000;
const url=`http://${dirIP_api}:${PUERTO_EXPRESS}`;



//----------------------------------------MARCAS----------------------------------------

//----------------------------------------!MARCAS----------------------------------------



//----------------------------------------CONCESIONARIOS----------------------------------------

//----------------------------------------!CONCESIONARIOS----------------------------------------



//----------------------------------------VENTAS----------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const marcaSelect = document.getElementById("marcaSelect");
    const concesionarioSelect = document.getElementById("concesionarioSelect");

    // Al cargar la página, obtener y mostrar las opciones de marca
    fetch("/marcas")
        .then(response => response.json())
        .then(data => {
            data.forEach(marca => {
                marcaSelect.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`;
            });
        })
        .catch(error => console.error("Error al obtener las marcas:", error));

    // Cuando se selecciona una marca, cargar y mostrar opciones de concesionario
    marcaSelect.addEventListener("change", function() {
        const marcaID = this.value;
        fetch(`/concesionarios/marca/${marcaID}`)
            .then(response => response.json())
            .then(data => {
                concesionarioSelect.innerHTML = ""; // Limpiar opciones anteriores
                data.forEach(concesionario => {
                    concesionarioSelect.innerHTML += `<option value="${concesionario.id}">${concesionario.nombre}</option>`;
                });
                // Habilitar el campo de concesionario después de seleccionar la marca
                concesionarioSelect.disabled = false;
            })
            .catch(error => console.error("Error al obtener los concesionarios:", error));
    });

    // Manejar envío del formulario
    document.getElementById("ventaForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío por defecto del formulario
        const formData = new FormData(this); // Obtener datos del formulario
        fetch("/ventas", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Venta registrada con éxito!");
                // Limpiar el formulario después de registrar la venta
                document.getElementById("ventaForm").reset();
            } else {
                throw new Error("Error al registrar la venta");
            }
        })
        .catch(error => alert("Error al registrar la venta. Por favor, inténtalo de nuevo."));
    });
});
//----------------------------------------!VENTAS----------------------------------------