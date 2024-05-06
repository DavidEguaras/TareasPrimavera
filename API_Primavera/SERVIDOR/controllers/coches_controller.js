const db = require('../DATABASES/db.js');

const getCoches = (req, res) => {
    // Consulta a la base de datos
    db.getConnection((err, connection) =>{
        connection.query('SELECT * FROM coches', (err, resultados) => {
            if (err) {
                console.error('Error al obtener datos', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json(resultados);
                connection.release();
            }
        });
    })
};

const getCocheById = (req, res) => {
    const idRegistro = req.params.id;
    db.query('SELECT * FROM coches WHERE id = ?', [idRegistro], (err, resultados) => {
        if (err) {
            console.error('Error al obtener el registro:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            // Verificar si se encontró el registro
            if (resultados.length > 0) {
                res.json(resultados[0]); // Devuelve el primer resultado (que debería ser único)
            } else {
                res.status(404).json({ error: 'Registro no encontrado' });
            }
        }
    });
};

// Método para crear un coche
const crearCoche = (req, res) => {
    const { nombreCoche, cantidad } = req.body;
    // Insertar datos en la base de datos
    db.query('INSERT INTO coches (nombre, cantidad) VALUES (?, ?)', [nombreCoche, cantidad], (err, resultado) => {
        if (err) {
            console.error('Error al guardar datos en la base de datos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json({ recibido: true, nombreCoche, cantidad, id: resultado.insertId });
        }
    });
};

const patchCoche = (req, res) => {
    const { nuevoNombre, cantidad } = req.body;
    db.query('UPDATE coches SET nombre = ?, cantidad = ? WHERE id = ?', [nuevoNombre, cantidad, req.params.id], (err, resultado) => {
        if (err) {
            console.error('Error al actualizar datos en la base de datos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json({ actualizado: true, nuevoNombre, cantidad, id: req.params.id });
        }
    });
};

const putCoche = (req, res) => {
    const { nuevoNombre, cantidad } = req.body;
    db.query('UPDATE coches SET nombre = ?, cantidad = ? WHERE id = ?', [nuevoNombre, cantidad, req.params.id], (err, resultado) => {
        if (err) {
            console.error('Error al actualizar datos en la base de datos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json({ actualizado: true, nuevoNombre, cantidad, id: req.params.id });
        }
    });
};

const deleteCocheById = (req, res) => {
    const idCoche = req.params.id;
    // Consulta para eliminar el coche por su ID
    db.query('DELETE FROM coches WHERE id = ?', [idCoche], (err, resultado) => {
        if (err) {
            console.error('Error al eliminar el coche:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            // Verificar si se eliminó algún registro
            if (resultado.affectedRows > 0) {
                res.json({ eliminado: true, id: idCoche });
            } else {
                res.status(404).json({ error: 'No se encontró ningún coche con el ID proporcionado' });
            }
        }
    });
};

module.exports = {
    getCoches,
    crearCoche,
    getCocheById,
    patchCoche,
    putCoche,
    deleteCocheById
};
