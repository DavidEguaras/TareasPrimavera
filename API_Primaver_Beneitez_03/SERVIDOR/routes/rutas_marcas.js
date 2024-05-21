const express = require('express');
const rutasMarcas = express.Router();
const marcasController = require('../controllers/marcas_controller.js');

// Ruta para obtener todos los coches
rutasMarcas.get('/', marcasController.getMarcas);

// Ruta para agregar un coche
rutasMarcas.post('/', marcasController.crearMarca);

// Ruta para obtener un coche por id
rutasMarcas.get('/:id', marcasController.getMarcaById);

// Ruta para modificar parcialmente un registro de un coche
rutasMarcas.patch('/:id', marcasController.patchMarca);

// Ruta para modificar por completo el registro de un coche
rutasMarcas.put('/:id', marcasController.putMarca);

// Ruta para eliminar por completo el registro de un coche
rutasMarcas.delete('/:id', marcasController.deleteMarcaById)

module.exports = rutasMarcas;

