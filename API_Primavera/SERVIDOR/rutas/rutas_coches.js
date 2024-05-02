const express = require('express');
const rutasCoches = express.Router();
const cochesController = require('../controllers/coches_controller.js');



//ruta para obtener todos los coches
rutasCoches.get('/', cochesController.getCoches);

//ruta para agregar un coche
rutasCoches.post('/', cochesController.crearCoche);

//ruta para obtener un coche por id
rutasCoches.get('/:id', cochesController.getCocheById);

//ruta para modificar parcialmente un registro de un coche
rutasCoches.patch('/', cochesController.patchCoche);

//ruta para modificar por completo el registro de un coche
rutasCoches.put('/', cochesController.putCoche);



module.exports = rutasCoches;

