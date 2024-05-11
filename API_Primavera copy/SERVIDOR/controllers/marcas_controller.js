const db = require('../DATABASES/db.js');

const getMarcas = (req, res) => {
    db.getConnection((err, connection) =>{
        connection.query('SELECT * FROM marcas', (err, resultados) => {
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

const getMarcaById = (req, res) => {
    const idRegistro = req.params.id;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('SELECT * FROM marcas WHERE id = ?', [idRegistro], (err, resultados) => {
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

const crearMarca = (req, res) => {
    const { nombreMarca, cantidad } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('INSERT INTO marcas (nombre, cantidad) VALUES (?, ?)', [nombreMarca, cantidad], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al guardar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ recibido: true, nombreMarca, cantidad, id: resultado.insertId });
            }
        });
    });
};

const patchMarca = (req, res) => {
    const { nuevoNombre, cantidad } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('UPDATE marcas SET nombre = ?, cantidad = ? WHERE id = ?', [nuevoNombre, cantidad, req.params.id], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al actualizar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ actualizado: true, nuevoNombre, cantidad, id: req.params.id });
            }
        });
    });
};

const putMarca = (req, res) => {
    const { nuevoNombre, cantidad } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('UPDATE marcas SET nombre = ?, cantidad = ? WHERE id = ?', [nuevoNombre, cantidad, req.params.id], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al actualizar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ actualizado: true, nuevoNombre, cantidad, id: req.params.id });
            }
        });
    });
};

const deleteMarcaById = (req, res) => {
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
                    res.status(404).json({ error: 'No se encontró ninguna marca con el ID proporcionado' });
                }
            }
        });
    });
};


module.exports = {
    getMarcas,
    crearMarca,
    getMarcaById,
    patchMarca,
    putMarca,
    deleteMarcaById
};
