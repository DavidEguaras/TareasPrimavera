const express = require('express');
const rutasVentas = express.Router();
const ventasController = require('../controllers/ventas_controller');

// Ruta para obtener todas las ventas
rutasVentas.get('/', ventasController.getVentas);

// Ruta para crear una venta
rutasVentas.post('/', ventasController.crearVenta);

// Ruta para obtener una venta por su id
rutasVentas.get('/:id', ventasController.getVentaById);

// Ruta para eliminar una venta
rutasVentas.delete('/:id', ventasController.eliminarVenta);

module.exports = rutasVentas;
