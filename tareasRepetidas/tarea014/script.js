document.addEventListener("DOMContentLoaded", function() {
    // Obtener todas las celdas de la tabla
    var celdas = document.querySelectorAll("#tabla01 td");

    // Agregar un event listener a cada celda
    celdas.forEach(function(celda) {
        celda.addEventListener("dblclick", function() {
            if(this.style.backgroundColor == "blue"){
                this.style.backgroundColor = "white";
            } else {
                this.style.backgroundColor = "blue";
            }
        });
    });
});
