// Importamos la clase Juego desde el archivo
import { Juego } from "./clases/juego.js";

let nombreJugador;
let apuesta;
const pantallaJugador = document.getElementById("pantallaJugador");
const divBotones = document.getElementById("divBotones")
iniciarEventos();

//Evento para el nombre, cuando se introduce, se agrega el html necesario para la apuesta
function iniciarEventos(){
    document.getElementById("submitNombre").addEventListener("click", function(event) {
        event.preventDefault();
        nombreJugador = document.getElementById("nombreJugadorInput").value;
        document.getElementById("nombreJugadorHeader").textContent = nombreJugador;
        pantallaJugador.innerHTML = "";
        pantallaJugador.innerHTML = `
            <label for="apuestaInput">Introduce la apuesta</label>
            <input type="text" id="apuestaInput" placeholder="Ingresa tu apuesta"><br>
            <button type="button" id="submitApuesta">Introducir Apuesta</button>
        `;
    
        //Evento para la apuesta, cuando se introduce, se agrega el html de los botones del juego
        document.getElementById("submitApuesta").addEventListener("click", function(event) {
           
                event.preventDefault();
                apuesta = parseFloat(document.getElementById("apuestaInput").value);
                const nombreJugador = document.getElementById("nombreJugadorHeader").textContent;
                pantallaJugador.innerHTML = "";
                divBotones.innerHTML = `
                    <button type="button" id="reiniciarButton">Reiniciar Juego</button>
                    <button type="button" id="pedirCartaButton">Pedir Carta</button>
                    <button type="button" id="plantarseButton">Plantarse</button>
                `;
                iniciarJuego(nombreJugador, apuesta);
            
        });
        
    });
}



// Función para iniciar el juego
function iniciarJuego(nombreJugador, apuesta) {
    const pedirCartaBtn = document.getElementById("pedirCartaButton");
    const plantarseBtn = document.getElementById("plantarseButton");
    const reiniciarBtn = document.getElementById("reiniciarButton");
    const subseccionBanca = document.getElementById("subseccionBanca");
    const balanceTotalDineroJugador = document.getElementById("balanceTotalDineroJugador");
    const dineroApostado = document.getElementById("dineroApostado");
    const mensajeFinPartida = document.getElementById("mensajeFinPartida");
    const cartasBancaFinPartida = document.getElementById("cartasBancaFinPartida");
    let jugador; 
    // Creamos una instancia del juego
    const juego = new Juego(apuesta, nombreJugador);
    juego.iniciarJuego();
    actualizarInterfaz();

    // Función para actualizar la interfaz
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

        //Informacion general de la partida
        if (juego.finalizado) {
            balanceTotalDineroJugador.textContent += juego.jugador.balance;
        }
        

    }

    //===========================EVENTOS===========================
    // Funcionalidad del botón de reinicio
    reiniciarBtn.addEventListener("click", function() {
           // Limpiar el contenido de la pantalla del jugador y los botones
        pantallaJugador.innerHTML = "";
        divBotones.innerHTML = "";

        // Restablecer el nombre del jugador
        document.getElementById("nombreJugadorHeader").textContent = "";

        // Mostrar nuevamente el formulario para introducir el nombre
        pantallaJugador.innerHTML = `
            <label for="nombreJugadorInput">Introduce el nombre:</label>
            <input type="text" id="nombreJugadorInput" placeholder="Ingrese su nombre"><br>
            <button type="button" id="submitNombre">Aceptar</button>
        `;

        // Limpiar mensaje de fin de partida
        mensajeFinPartida.innerText = "";
        iniciarEventos();
    });
    //------Evento para pedir carta-------
    pedirCartaBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            //Por cada vez que el jugador pide una carta, la banca pedirá otra si su puntuación es menor o igual que 5 
            //(establecido en su lógica de clase)
            juego.repartirCartas();
            actualizarInterfaz();
            if (juego.jugador.calcularPuntuacion() > 7.5) {
                mensajeFinPartida.innerText = juego.finalizar();
                actualizarInterfaz();
            }
        }
    });
    //-------Evento para plantarse-------
    plantarseBtn.addEventListener("click", function() {
        if (!juego.finalizado) {
            mensajeFinPartida.innerText = juego.finalizar();
            actualizarInterfaz();
             cartasBancaFinPartida.innerHTML = `
            <h2>La BANCA tenia las cartas:</h2>
            <ul>
                ${juego.banca.imprimirMano().join('')}
            </ul>
        `;
        }
    });
    //===========================EVENTOS===========================

    //comprobamos si la puntuacion del jugador es > de 7,5, si lo es finalizamos el juego
    if(juego.jugador.calcularPuntuacion() > 7.5){
        juego.finalizar();
    }
}
