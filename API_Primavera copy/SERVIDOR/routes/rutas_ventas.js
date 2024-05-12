const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas_controller');

// Ruta para obtener todas las ventas
router.get('/', ventasController.getVentas);

// Ruta para crear una venta
router.post('/', ventasController.crearVenta);

// Ruta para obtener una venta por su id
router.get('/:id', ventasController.getVentaById);

// Ruta para actualizar una venta
router.put('/:id', ventasController.actualizarVenta);

// Ruta para eliminar una venta
router.delete('/:id', ventasController.eliminarVenta);

module.exports = router;
