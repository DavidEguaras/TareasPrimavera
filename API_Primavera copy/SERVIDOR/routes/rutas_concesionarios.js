const express = require('express');
const rutasConcesionarios = express.Router();
const concesionariosController = require('../controllers/concesionarios_controller.js');

// Ruta para obtener todas las marcas
rutasConcesionarios.get('/', concesionariosController);

// Ruta para agregar una marca
rutasConcesionarios.post('/', concesionariosController.crearConcesionario);

// Ruta para obtener una marca por id
rutasConcesionarios.get('/:id', concesionariosController.getConcesionarioById);

// Ruta para modificar parcialmente un registro de una marca
rutasConcesionarios.patch('/:id', concesionariosController.patchConcesionario);

// Ruta para modificar por completo el registro de una marca
rutasConcesionarios.put('/:id', concesionariosController.putConcesionario);

// Ruta para eliminar por completo el registro de una marca
rutasConcesionarios.delete('/:id', concesionariosController.deleteConcesionarioById);

module.exports = rutasConcesionarios;
