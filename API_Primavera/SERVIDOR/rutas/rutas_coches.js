const express = require('express');
const rutasCoches = express.Router();
const cochesController = require('../controllers/coches_controller.js');



//ruta para obtener todos los coches
rutasCoches.get('/', cochesController.getCoches);

//ruta para agregar un coche
rutasCoches.post('/', cochesController.crearCoche);

//ruta para obtener un coche por id
rutasCoches.get('/:id', cochesController.getCocheById);

module.exports = rutasCoches;

