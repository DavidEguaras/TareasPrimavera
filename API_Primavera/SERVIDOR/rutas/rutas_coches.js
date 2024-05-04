const express = require('express');
const rutasCoches = express.Router();
const cochesController = require('../controllers/coches_controller.js');

// Ruta para obtener todos los coches
rutasCoches.get('/', cochesController.getCoches);

// Ruta para agregar un coche
rutasCoches.post('/', cochesController.crearCoche);

// Ruta para obtener un coche por id
rutasCoches.get('/:id', cochesController.getCocheById);

// Ruta para modificar parcialmente un registro de un coche
rutasCoches.patch('/:id', cochesController.patchCoche);

// Ruta para modificar por completo el registro de un coche
rutasCoches.put('/:id', cochesController.putCoche);

module.exports = rutasCoches;

