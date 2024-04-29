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

//metodo para obtener un registro por ID

const getCocheById = (req, res) => { //http://127.0.0.1:3000/coches/?
    const idRegistro = req.params.id;
    db.query('SELECT * FROM coches WHERE id = ?', [idRegistro], (err, resultados) => {
        if (err) {
            console.error('Error al obtener el registro');
            res.status(500).json({error: 'Error interno del servidor'});
        }else{
            //verificar si se encontro el registro
            if (resultados.length > 0) {
                //devuelve el primer resultado
                res.json(resultados[0]);
            }else{
                res.status(404).json({error: 'registro no encontrado'});
            }
        }
        console.log();
    });
}

const crearCoche = (req, res) => {
    const {mensaje} = req.body;
    res.json({        
        recibido:true,
         mensaje
    });
}

// app.post('/api/enviar', (req, res) => {
//     const {mensaje} = req.body;
//     res.json({
//         recibido:true,
//         mensaje
//     });
// });


module.exports={
    getCoches,
    crearCoche,
    getCocheById
}