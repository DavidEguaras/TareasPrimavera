const db = require('../DATABASES/db.js');

const getConcesionarios = (req, res) => {
    db.getConnection((err, connection) =>{
        connection.query('SELECT * FROM concesionarios', (err, resultados) => {
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

const getConcesionarioById = (req, res) => {
    const idRegistro = req.params.id;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('SELECT * FROM concesionarios WHERE id = ?', [idRegistro], (err, resultados) => {
            connection.release();
            if (err) {
                console.error('Error al obtener el registro:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                if (resultados.length > 0) {
                    res.json(resultados[0]);
                } else {
                    res.status(404).json({ error: 'Registro no encontrado' });
                }
            }
        });
    });
};

const crearConcesionario = (req, res) => {
    const { nombreConcesionario, marcaID } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('INSERT INTO concesionarios (nombre, marcaID) VALUES (?, ?)', [nombreConcesionario, marcaID], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al guardar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ recibido: true, nombreConcesionario, marcaID, id: resultado.insertId });
            }
        });
    });
};

const patchConcesionario = (req, res) => {
    const { nuevoNombre, marcaID } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('UPDATE concesionarios SET nombre = ?, marcaID = ? WHERE id = ?', [nuevoNombre, marcaID, req.params.id], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al actualizar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ actualizado: true, nuevoNombre, marcaID, id: req.params.id });
            }
        });
    });
};

const putConcesionario = (req, res) => {
    const { nuevoNombre, marcaID } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('UPDATE concesionarios SET nombre = ?, marcaID = ? WHERE id = ?', [nuevoNombre, marcaID, req.params.id], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al actualizar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ actualizado: true, nuevoNombre, marcaID, id: req.params.id });
            }
        });
    });
};

const deleteConcesionarioById = (req, res) => {
    const idConcesionario = req.params.id;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('DELETE FROM concesionarios WHERE id = ?', [idConcesionario], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al eliminar el concesionario:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                if (resultado.affectedRows > 0) {
                    res.json({ eliminado: true, id: idConcesionario });
                } else {
                    res.status(404).json({ error: 'No se encontró ningún concesionario con el ID proporcionado' });
                }
            }
        });
    });
};

module.exports = {
    getConcesionarios,
    crearConcesionario,
    getConcesionarioById,
    patchConcesionario,
    putConcesionario,
    deleteConcesionarioById
};
