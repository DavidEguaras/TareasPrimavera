const express = require('express');
const rutasMarcas = express.Router();
const marcasController = require('../controllers/marcas_controller.js');

// Ruta para obtener todas las marcas
rutasMarcas.get('/', marcasController.getMarcas);

// Ruta para agregar una marca
rutasMarcas.post('/', marcasController.crearMarca);

// Ruta para obtener una marca por id
rutasMarcas.get('/:id', marcasController.getMarcaById);

// Ruta para modificar parcialmente un registro de una marca
rutasMarcas.patch('/:id', marcasController.patchMarca);

// Ruta para modificar por completo el registro de una marca
rutasMarcas.put('/:id', marcasController.putMarca);

// Ruta para eliminar por completo el registro de una marca
rutasMarcas.delete('/:id', marcasController.deleteMarcaById);

module.exports = rutasMarcas;
