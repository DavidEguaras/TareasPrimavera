const express = require('express');
const router = express.Router();
const concesionariosController = require('../controllers/concesionarios_controller.js');

// Ruta para obtener todos los concesionarios
router.get('/', concesionariosController.getConcesionarios);

// Ruta para agregar un concesionario
router.post('/', concesionariosController.crearConcesionario);

// Ruta para obtener un concesionario por id
router.get('/:id', concesionariosController.getConcesionarioById);

// Ruta para modificar parcialmente un registro de un concesionario
router.patch('/:id', concesionariosController.patchConcesionario);

// Ruta para modificar por completo el registro de un concesionario
router.put('/:id', concesionariosController.putConcesionario);

// Ruta para eliminar por completo el registro de un concesionario
router.delete('/:id', concesionariosController.deleteConcesionarioById);

// Ruta para obtener todos los concesionarios de una marca específica
router.get('/marca/:marcaID', concesionariosController.getConcesionariosByMarca);

module.exports = router;
