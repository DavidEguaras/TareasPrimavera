const db = require('../DATABASES/db.js');

const getMarcas = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('SELECT * FROM marcas', (err, resultados) => {
            connection.release();
            if (err) {
                console.error('Error al obtener datos de marcas:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json(resultados);
            }
        });
    });
};

const getMarcaById = (req, res) => {
    const idMarca = req.params.id;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('SELECT * FROM marcas WHERE id = ?', [idMarca], (err, resultados) => {
            connection.release();
            if (err) {
                console.error('Error al obtener la marca:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                if (resultados.length > 0) {
                    res.json(resultados[0]);
                } else {
                    res.status(404).json({ error: 'Marca no encontrada' });
                }
            }
        });
    });
};

const crearMarca = (req, res) => {
    const { nombre, cantidad } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('INSERT INTO marcas (nombre, cantidad) VALUES (?, ?)', [nombre, cantidad], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al guardar datos de la marca en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ recibido: true, id: resultado.insertId, nombre, cantidad });
            }
        });
    });
};

const actualizarMarca = (req, res) => {
    const idMarca = req.params.id;
    const { nombre, cantidad } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('UPDATE marcas SET nombre = ?, cantidad = ? WHERE id = ?', [nombre, cantidad, idMarca], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al actualizar los datos de la marca en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ actualizado: true, id: idMarca, nombre, cantidad });
            }
        });
    });
};

const eliminarMarca = (req, res) => {
    const idMarca = req.params.id;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('DELETE FROM marcas WHERE id = ?', [idMarca], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al eliminar la marca:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                if (resultado.affectedRows > 0) {
                    res.json({ eliminado: true, id: idMarca });
                } else {
                    res.status(404).json({ error: 'Marca no encontrada' });
                }
            }
        });
    });
};

module.exports = {
    getMarcas,
    getMarcaById,
    crearMarca,
    actualizarMarca,
    eliminarMarca
};
