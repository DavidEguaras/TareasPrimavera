import {Jugador} from "./jugador.js";

export class Juego {
    constructor(nombreJugador1, nombreJugador2) {
        this.jugador1 = new Jugador(nombreJugador1);
        this.jugador2 = new Jugador(nombreJugador2);
        this.finalizado = false;
        this.fichaJugador1 = 'X';
        this.fichaJugador2 = 'O';
        this.filas = 3;
        this.columnas = 3;
        this.tablero = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.turno = this.jugador1;
        this.tableroHTML = document.getElementById('tablero');
        this.crearTableroHTML();
    }

    crearTableroHTML() {
        for (let i = 0; i < this.filas; i++) {
            const fila = document.createElement('tr');
            for (let j = 0; j < this.columnas; j++) {
                const celda = document.createElement('td');
                celda.dataset.fila = i;
                celda.dataset.columna = j;
                //pasamos el juego con this al bind para asegurarnos que el evento puede acceder al juego correctamente
                celda.addEventListener('click', this.manejarClic.bind(this));
                fila.appendChild(celda);
            }
            this.tableroHTML.appendChild(fila);
        }
    }

    manejarClic(event) {
        // event.target se refiere al elemento del DOM en el que ocurrio el evento
        // es una propiedad de los elementos del DOM que te permite acceder a los atributos de datos (data attributes) del elemento
        // event.target.dataset.fila se refiere al valor del atributo de datos llamado fila en la celda especifica en la que se hizo clic.
        const fila = parseInt(event.target.dataset.fila);
        const columna = parseInt(event.target.dataset.columna);
        this.realizarMovimiento(fila, columna);
    }

    actualizarTableroHTML() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                this.tableroHTML.rows[i].cells[j].textContent = this.tablero[i][j];
            }
        }
    }

    comprobarTresEnRaya() {
        // El metodo some prueba si al menos un elemento en el array cumple con la condicion implementada por la funcion proporcionada.
        const fichaGanadora = this.tablero.some((fila) => {
        return fila[0] !== '' && fila[0] === fila[1] && fila[0] === fila[2];
        });

        if (fichaGanadora) {
            this.finalizado = true;
            return true;
        }

        for (let i = 0; i < this.columnas; i++) {
            if (this.tablero[0][i] !== '' && this.tablero[0][i] === this.tablero[1][i] && this.tablero[0][i] === this.tablero[2][i]) {
                this.finalizado = true;
                return true;
            }
        }

        if (this.tablero[0][0] !== '' && this.tablero[0][0] === this.tablero[1][1] && this.tablero[0][0] === this.tablero[2][2]) {
            this.finalizado = true;
            return true;
        }

        if (this.tablero[0][2] !== '' && this.tablero[0][2] === this.tablero[1][1] && this.tablero[0][2] === this.tablero[2][0]) {
            this.finalizado = true;
            return true;
        }

        return false;
    }

    realizarMovimiento(fila, columna) {
        if (!this.finalizado && this.tablero[fila][columna] === '') {
            if (this.turno === this.jugador1) {
                this.tablero[fila][columna] = this.fichaJugador1;
                this.turno = this.jugador2;
            } else {
                this.tablero[fila][columna] = this.fichaJugador2;
                this.turno = this.jugador1;
            }
            if (this.comprobarTresEnRaya()) {
                console.log('¡Tres en raya! El jugador ' + (this.turno === this.jugador1 ? this.jugador2.nombre : this.jugador1.nombre) + ' ha ganado.');
                this.reiniciarJuego();
            } else {
                console.log('Movimiento realizado por ' + (this.turno === this.jugador1 ? this.jugador2.nombre : this.jugador1.nombre));
            }
        } else {
            console.log('la casilla está ocupada, elige otra.');
        }
        this.actualizarTableroHTML();
    }

    reiniciarJuego() {
        this.tablero = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.finalizado = false;
        this.turno = this.jugador1;
        console.log('Juego reiniciado.');
        this.actualizarTableroHTML();
    }
}
