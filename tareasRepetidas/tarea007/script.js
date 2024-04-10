function dibujar() {
    const numeroFilas = document.getElementById("filas").value;
    const caracterLineas = document.getElementById("caracterLineas").value;
    const caracterRelleno = document.getElementById("caracterRelleno").value;
    const color = document.getElementById("color").value;

    // Caja para mostrar el rombo hueco
    const romboHuecoCaja = document.getElementById("romboHueco");
    const romboRellenoCaja = document.getElementById("romboRelleno");
    const cuadradoRellenoCaja = document.getElementById("cuadradoRelleno");
    const cuadradoHuecoCaja = document.getElementById("cuadradoHueco");

    romboHuecoCaja.innerHTML = "";
    romboRellenoCaja.innerHTML = "";
    cuadradoHuecoCaja.innerHTML = "";
    cuadradoRellenoCaja.innerHTML = "";

    console.log("Filas: ", numeroFilas);
    console.log("caracterLineas: ", caracterLineas);
    console.log("caracterRelleno: ", caracterRelleno);
    console.log("Color: ", color);

    // Comprobaciones

//RomboHueco========================================================
    if (numeroFilas % 2 === 0) {
        alert("El numero de filas debe de ser impar")
        return;
    }

    const mitad = Math.floor(numeroFilas / 2);

    // Construimos la mitad superior del rombo
    for (let fila = 0; fila < mitad + 1; fila++) {
        let contenidoLinea = '';

        // Agregamos espacios antes del primer caracter de la linea
        for (let espacios = mitad - fila; espacios > 0; espacios--) {
            contenidoLinea += '&nbsp;&nbsp;';
        }

        // Agregamos el primer caracter de la linea
        contenidoLinea += caracterLineas;

        // Si no es la primera o ultima fila, agregamos los caracteres de relleno y el ultimo caracter de la línea
        if (fila !== 0 && fila !== mitad + 1) {
            for (let caracterRellenoIndex = 0; caracterRellenoIndex < fila * 2 - 1; caracterRellenoIndex++) {
                contenidoLinea += '&nbsp;&nbsp;';
            }
            contenidoLinea += caracterLineas;
        }

        // Agregamos la linea al contenedor
        romboHuecoCaja.innerHTML += contenidoLinea + '<br>';
    }

    // Construimos la mitad inferior del rombo
    for (let fila = mitad - 1; fila >= 0; fila--) {
        let contenidoLinea = '';

        // Agregamos espacios antes del primer caracter de la linea
        for (let espacios = mitad - fila; espacios > 0; espacios--) {
            contenidoLinea += '&nbsp;&nbsp;';
        }

        // Agregamos el primer caracter de la linea
        contenidoLinea += caracterLineas;

        // Si no es la primera o ultima fila, agregamos los caracteres de relleno y el ultimo caracter de la linea
        if (fila !== 0 && fila !== mitad) {
            for (let caracterRellenoIndex = 0; caracterRellenoIndex < fila * 2 - 1; caracterRellenoIndex++) {
                contenidoLinea += '&nbsp;&nbsp;';
            }
            contenidoLinea += caracterLineas;
        }
        romboHuecoCaja.innerHTML += contenidoLinea + '<br>';
    }
    romboHuecoCaja.style.color = color;


//ROMBO RELLENO=======================================================

    // Construimos la mitad superior del rombo relleno
    for (let fila = 0; fila < mitad + 1; fila++) {
        let contenidoLinea = '';

        // Agregamos espacios antes del primer caracter de la linea
        for (let espacios = mitad - fila; espacios > 0; espacios--) {
            contenidoLinea += '&nbsp;&nbsp;';
        }

        // Agregamos el primer caracter de la linea
        contenidoLinea += caracterLineas;

        // Si no es la primera o ultima fila, agregamos los caracteres de relleno y el último caracter de la línea
        if (fila !== 0 && fila !== mitad + 1) {
            for (let caracterRellenoIndex = 0; caracterRellenoIndex < fila * 2 - 1; caracterRellenoIndex++) {
                contenidoLinea += caracterRelleno;
            }
            contenidoLinea += caracterLineas;
        }

        // Agregamos la linea al contenedor
        romboRellenoCaja.innerHTML += contenidoLinea + '<br>';
    }

    // Construimos la mitad inferior del rombo
    for (let fila = mitad - 1; fila >= 0; fila--) {
        let contenidoLinea = '';

        // Agregar espacios antes del primer caracter de la linea
        for (let espacios = mitad - fila; espacios > 0; espacios--) {
            contenidoLinea += '&nbsp;&nbsp;';
        }

        // Agregar el primer caracter de la linea
        contenidoLinea += caracterLineas;

        // Si no es la primera o ultima fila, agregamos los caracteres de relleno y el ultimo caracter de la linea
        if (fila !== 0 && fila !== mitad) {
            for (let caracterRellenoIndex = 0; caracterRellenoIndex < fila * 2 - 1; caracterRellenoIndex++) {
                contenidoLinea += caracterRelleno;
            }
            contenidoLinea += caracterLineas;
        }
        romboRellenoCaja.innerHTML += contenidoLinea + '<br>';
    }
    romboRellenoCaja.style.color = color;



//CUADRADO HUECO===============================================
    for (let fila = 0; fila < numeroFilas; fila++) {
        let contenidoLinea = '';
        //Si es la primera o la ultima fila, toda la linea son caracteres de linea
        if (fila === 0 || fila === numeroFilas - 1) {
            //tantos como la altura del cuadrado
            for (let caracterLineasIndex = 0; caracterLineasIndex < numeroFilas; caracterLineasIndex++) {
                contenidoLinea += caracterLineas + '&nbsp;';
            }
        //Si no, comprobamos si es el primer o ultimo caracter de la linea, si lo es lo ponemos, sino rellenamos
        } else {
            for (let caracterRellenoIndex = 0; caracterRellenoIndex < numeroFilas; caracterRellenoIndex++) {
                if (caracterRellenoIndex === 0 || caracterRellenoIndex === numeroFilas - 1) {
                    contenidoLinea += caracterLineas;
                } else {
                    contenidoLinea += '&nbsp;&nbsp;';
                }
            }
        }
        cuadradoHuecoCaja.innerHTML += contenidoLinea + '</br>';
    }
    cuadradoHuecoCaja.style.color = color;


//CUADRADO RELLENO===============================================
    for (let fila = 0; fila < numeroFilas; fila++) {
        let contenidoLinea = '';
        //Si es la primera o la ultima fila, toda la linea son caracteres de linea
        if (fila === 0 || fila === numeroFilas - 1) {
            //tantos como la altura del cuadrado
            for (let caracterLineasIndex = 0; caracterLineasIndex < numeroFilas; caracterLineasIndex++) {
                contenidoLinea += caracterLineas + '&nbsp;&nbsp;&nbsp;&nbsp;';
            }
        //Si no, comprobamos si es el primer o ultimo caracter de la linea, si lo es lo ponemos, sino rellenamos
        } else {
            for (let caracterRellenoIndex = 0; caracterRellenoIndex < numeroFilas; caracterRellenoIndex++) {
                if (caracterRellenoIndex === 0 || caracterRellenoIndex === numeroFilas - 1) {
                    contenidoLinea += caracterLineas;
                } else {
                    contenidoLinea += caracterRelleno + '&nbsp;&nbsp;&nbsp;&nbsp;';
                }
            }
        }
        cuadradoRellenoCaja.innerHTML += contenidoLinea + '<br>';
    }
    cuadradoRellenoCaja.style.color = color;
}

