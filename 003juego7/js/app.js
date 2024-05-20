// Importamos la clase Juego desde el archivo
import { Juego } from "./clases/juego.js";
import { Jugador } from "./clases/jugador.js";

let nombreJugador;
let apuesta;
const pantallaJugador = document.getElementById("pantallaJugador");
const divBotones = document.getElementById("divBotones");

iniciarEventos();

function iniciarEventos() {
    const nombreGuardado = localStorage.getItem('nombreJugador');

    if (nombreGuardado) {
        nombreJugador = nombreGuardado;
        document.getElementById("nombreJugadorHeader").textContent = nombreJugador;
        pantallaJugador.innerHTML = `
            <label for="apuestaInput">Introduce la apuesta</label>
            <input type="number" id="apuestaInput" placeholder="Ingresa tu apuesta"><br>
            <button type="button" id="submitApuesta">Introducir Apuesta</button>
        `;
        // Evento para la apuesta, cuando se introduce, se agrega el html de los botones del juego
        document.getElementById("submitApuesta").addEventListener("click", function(event) {
            event.preventDefault();
            apuesta = parseFloat(document.getElementById("apuestaInput").value);
            const nombreJugador = document.getElementById("nombreJugadorHeader").textContent;
            pantallaJugador.innerHTML = "";
            divBotones.innerHTML = `
                <button type="button" id="pedirCartaButton">Pedir Carta</button>
                <button type="button" id="plantarseButton">Plantarse</button>
            `;
            //----------------SE INICIA EL JUEGO!!----------------
            iniciarJuego(nombreJugador, apuesta);
             //----------------SE INICIA EL JUEGO!!----------------
        });
    } else {
        pantallaJugador.innerHTML = `
            <label for="nombreJugadorInput">Introduce el nombre:</label>
            <input type="text" id="nombreJugadorInput" placeholder="Ingrese su nombre"><br>
            <button type="button" id="submitNombre">Aceptar</button>
        `;

        document.getElementById("submitNombre").addEventListener("click", function(event) {
            event.preventDefault();
            nombreJugador = document.getElementById("nombreJugadorInput").value;
            document.getElementById("nombreJugadorHeader").textContent = nombreJugador;
            localStorage.setItem('nombreJugador', nombreJugador); // Guardar el nombre en Local Storage
            pantallaJugador.innerHTML = `
                <label for="apuestaInput">Introduce la apuesta</label>
                <input type="number" id="apuestaInput" placeholder="Ingresa tu apuesta"><br>
                <button type="button" id="submitApuesta">Introducir Apuesta</button>
            `;

            // Evento para la apuesta, cuando se introduce, se agrega el html de los botones del juego
            document.getElementById("submitApuesta").addEventListener("click", function(event) {
                event.preventDefault();
                apuesta = parseFloat(document.getElementById("apuestaInput").value);
                const nombreJugador = document.getElementById("nombreJugadorHeader").textContent;
                pantallaJugador.innerHTML = "";
                divBotones.innerHTML = `
                    <button type="button" id="pedirCartaButton">Pedir Carta</button>
                    <button type="button" id="plantarseButton">Plantarse</button>
                `;
                //----------------SE INICIA EL JUEGO!!----------------
                iniciarJuego(nombreJugador, apuesta);
                //----------------SE INICIA EL JUEGO!!----------------
            });
        });
    }
}

// Función para iniciar el juego
function iniciarJuego(nombreJugador, apuesta) {
    //--------------------------CONSTANTES Y ELEMENTOS--------------------------
    const pedirCartaBtn = document.getElementById("pedirCartaButton");
    const plantarseBtn = document.getElementById("plantarseButton");
    const subseccionBanca = document.getElementById("subseccionBanca");
    const balanceTotalDineroJugador = document.getElementById("balanceTotalDineroJugador");
    const mensajeFinPartida = document.getElementById("mensajeFinPartida");
    const cartasBancaFinPartida = document.getElementById("cartasBancaFinPartida");
    //--------------------------CONSTANTES Y ELEMENTOS--------------------------

    // Función para recuperar el jugador del Local Storage si existe y coincide el nombre
    function obtenerJugadorLocalStorage(nombreJugador) {
        const jugadorGuardado = localStorage.getItem('jugador');
        if (jugadorGuardado) {
            const jugadorGuardadoObj = JSON.parse(jugadorGuardado);
            const nombreJugadorGuardado = jugadorGuardadoObj.nombre;
            if (nombreJugador === nombreJugadorGuardado) {
                return jugadorGuardadoObj;
            }
        }
        return null;
    }

    // Recuperar jugador del Local Storage si coincide con el nombre proporcionado
    const jugadorLocalStorage = obtenerJugadorLocalStorage(nombreJugador);

    let jugador;
    if (jugadorLocalStorage) {
        jugador = jugadorLocalStorage;
    } else {
        jugador = new Jugador(nombreJugador);
    }

    //--------------------------INICIO DEL JUEGO--------------------------
    const juego = new Juego(apuesta, nombreJugador);
    juego.jugador = jugador;
    juego.iniciarJuego();
    actualizarInterfaz();
    cartasBancaFinPartida.innerHTML = "";

    function actualizarInterfaz() {
        // --Info de la banca--
        subseccionBanca.innerHTML = `
            <h2>BANCA</h2>
            <ul>
                ${juego.banca.imprimirManoBanca().join('')}
            </ul>
        `;

        // --Info del Jugador--
        pantallaJugador.innerHTML = `
            <h3>Tus cartas son:</h3>
            <ul>
                ${juego.jugador.imprimirMano().join('')}
            </ul>
            <p>Tu puntuacion: ${juego.jugador.calcularPuntuacion()}</p>
            <p>Dinero apostado en esta partida: ${juego.apuesta}</p>
        `;

        // Informacion general de la partida
        if (juego.finalizado) {
            balanceTotalDineroJugador.textContent += juego.jugador.balance;
        }
    }

    //================================================EVENTOS================================================
    //-------------BOTON DE PEDIR CARTA-------------
    pedirCartaBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            // Por cada vez que el jugador pide una carta, la banca pedirá otra si su puntuación es menor o igual que 5 
            // (establecido en su lógica de clase)
            juego.repartirCartas();
            actualizarInterfaz();
            if (juego.jugador.calcularPuntuacion() > 7.5) {
                mensajeFinPartida.innerText = juego.finalizar();
                localStorage.setItem('jugador', JSON.stringify(juego.jugador));
                actualizarInterfaz();
                verCartasBanca();
                agregarBotonReinicio();
            }
        }
    });
    //-------------BOTON DE PLANTARSE-------------
    plantarseBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            mensajeFinPartida.innerText = juego.finalizar();
            localStorage.setItem('jugador', JSON.stringify(juego.jugador));
            actualizarInterfaz();
            verCartasBanca();
            agregarBotonReinicio();
        }
    });
    //================================================EVENTOS================================================

    function verCartasBanca(){
        cartasBancaFinPartida.innerHTML = `
        <h5>La BANCA tenia las cartas:</h5>
        <ul>
            ${juego.banca.imprimirMano().join('')}
        </ul>
    `;
    }

    function agregarBotonReinicio(){
        divBotones.innerHTML = `
            <button type="button" id="reiniciarButton">Reiniciar Juego</button>
        `;
        const reiniciarBtn = document.getElementById("reiniciarButton");
        //-------------BOTON DE REINCIO-------------
        reiniciarBtn.addEventListener("click", function() {
            // Limpiar el contenido de la pantalla del jugador y los botones
            pantallaJugador.innerHTML = "";
            divBotones.innerHTML = "";
            document.getElementById("nombreJugadorHeader").textContent = "";
            mensajeFinPartida.innerText = "";
            cartasBancaFinPartida.innerText = "";

            // Mostrar nuevamente el formulario para introducir el nombre
            pantallaJugador.innerHTML = `
                <label for="nombreJugadorInput">Introduce el nombre:</label>
                <input type="text" id="nombreJugadorInput" placeholder="Ingrese su nombre"><br>
                <button type="button" id="submitNombre">Aceptar</button>
            `;
            subseccionBanca.innerHTML = `
            <h2>BANCA</h2>
            <ul>
                
            </ul>
        `;

            // Volvemos a iniciar los escuchadores para los eventos del nombre y la apuesta
            iniciarEventos();
        });
    }

    // Comprobamos si la puntuacion del jugador es > de 7,5, si lo es finalizamos el juego
    if(juego.jugador.calcularPuntuacion() > 7.5){
        juego.finalizar();
        localStorage.setItem('jugador', JSON.stringify(juego.jugador));
    }
}
