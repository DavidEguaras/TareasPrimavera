const express = require('express');
const rutasConcesionarios = express.Router();
const concesionariosController = require('../controllers/concesionarios_controller.js');

// Ruta para obtener todos los concesionarios
rutasConcesionarios.get('/', concesionariosController.getConcesionarios);

// Ruta para agregar un concesionario
rutasConcesionarios.post('/', concesionariosController.crearConcesionario);

// Ruta para obtener un concesionario por id
rutasConcesionarios.get('/:id', concesionariosController.getConcesionarioById);

// Ruta para modificar parcialmente un registro de un concesionario
rutasConcesionarios.patch('/:id', concesionariosController.patchConcesionario);

// Ruta para modificar por completo el registro de un concesionario
rutasConcesionarios.put('/:id', concesionariosController.putConcesionario);

// Ruta para eliminar por completo el registro de un concesionario
rutasConcesionarios.delete('/:id', concesionariosController.deleteConcesionarioById);

// Ruta para obtener todos los concesionarios de una marca específica
rutasConcesionarios.get('/marca/:marcaID', concesionariosController.getConcesionariosByMarca);

module.exports = rutasConcesionarios;
