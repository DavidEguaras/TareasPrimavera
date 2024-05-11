const express = require('express');
const rutasVentas = express.Router();
const ventasController = require('../controllers/ventas_controller.js');

// Ruta para obtener todas las marcas
rutasVentas.get('/', ventasController);

// Ruta para agregar una marca
rutasVentas.post('/', ventasController.crearVentas);

// Ruta para obtener una marca por id
rutasVentas.get('/:id', ventasController.getVentaById);

// Ruta para eliminar por completo el registro de una marca
rutasVentas.delete('/:id', ventasController.deleteVentaById);

module.exports = rutasVentas;
