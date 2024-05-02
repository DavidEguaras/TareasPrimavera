const { log } = require('console');
const db = require('../DATABASES/db.js');


const getCoches = (req, res) => { //http://127.0.0.1:3000/coches
    //consulta a la base de datos
    db.query('SELECT * FROM coches', (err, resultados) => {
        if(err){
            console.error('Error al obtener datos', err);
            res.status(500).json({ error : 'Error interno del servidor'})
        }else{
            res.json(resultados);
        }
    })
}

const getCocheById = (req, res) =>{
   const idRegistro = req.params.id;
   db.query('SELECT * FROM coches WHERE id = ?', [idRegistro], (err, resultados)=>{
      if(err){
        console.error('Error al obtener el registro:', err);
        res.status(500).json({eror: 'Error interno del servidore'});
      } else {
        // verificar si ese encontró el registro
        if (resultados.length > 0) {
          res.json(resultados[0]); // devuelve el primer resultado (que debería ser único);
        } else {
          res.status(404).json({error: 'registro no encontrado'});
        }
      }
  })
}

//Metodo para crear un coche
const crearCoche = (req,res)=>{
    const {nuevoNombre, cantidad} = req.body;
     // Insertar datos en la base de datos
     db.query('INSERT INTO coches (nombre, cantidad) VALUES (?, ?)',
                    [nuevoNombre, cantidad], (err, resultado) => {
      if (err) {
        console.error('Error al guardar datos en la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json({ recibido: true, nuevoNombre, cantidad, id: resultado.insertId });
      }
    });
  };  


const patchCoche = (req, res) => {
    const {nuevoNombre, cantidad} = req.body;
    db.query('UPDATE coches SET nombre = ?, cantidad = ?',[nuevoNombre, cantidad], (err, resultado) => {
        if (err) {
          console.error('Error al guardar datos en la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          res.json({ recibido: true, nuevoNombre, cantidad, id: resultado.insertId });
        }
    });
}

const putCoche = (req, res) => {
    const {nuevoNombre, cantidad} = req.body;
    db.query('INSERT INTO coches (nombre, cantidad) VALUES (?,?)',[nuevoNombre, cantidad], (err, resultado) => {
        if (err) {
          console.error('Error al guardar datos en la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          res.json({ recibido: true, nuevoNombre, cantidad, id: resultado.insertId });
        }
    });
}

const deleteCocheById = (req, res) => {
  const idRegistro = req.params.id;
  db.query('DELETE * FROM coches WHERE id = ?', [idRegistro], (err, resultados)=>{
     if(err){
       console.error('Error al obtener el registro:', err);
       res.status(500).json({eror: 'Error interno del servidore'});
     } else {
       // verificar si ese encontró el registro
       if (resultados.length > 0) {
         res.json(resultados[0]); // devuelve el primer resultado (que debería ser único);
       } else {
         res.status(404).json({error: 'registro no encontrado'});
       }
     }
 })
}

module.exports={
    getCoches,
    crearCoche,
    getCocheById,
    patchCoche,
    putCoche,
    deleteCocheById
}