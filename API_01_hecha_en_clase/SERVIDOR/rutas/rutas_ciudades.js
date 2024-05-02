const express= require('express');
const rutasCiudades = express.Router();
const ciudadesController=require('../controllers/ciudadesController');
// Ruta para obtener datos desde la base de datos
//cambiamos app por la nueva constante rutasCiudades
rutasCiudades.get('/', ciudadesController.getCiudades);

// Ruta para enviar datos y guardar en la base de datos
rutasCiudades.post('/add', ciudadesController.crearCiudad);

// Ruta para obtener un registro por ID
rutasCiudades.get('/:id', ciudadesController.getCiudadById);

// Ruta para obtener los registros entre min y max de habitantes
rutasCiudades.get('/habitantes/:min/:max', ciudadesController.getCiudadesByHabitantes);

// Ruta para actulaizar un registro existente
rutasCiudades.put('/put/:id', ciudadesController.putCiudad);
rutasCiudades.patch('/patch/:id', ciudadesController.patchCiudad);
rutasCiudades.patch('/:id', ciudadesController.actualizarCiudad);
rutasCiudades.delete('/:id',ciudadesController.deleteCiudad );

//exportamos la constante routes
module.exports = rutasCiudades;