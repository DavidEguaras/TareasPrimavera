const db = require('../DATABASES/db.js');

const getMarcas = (req, res) => {
    const nombreFiltro = req.query.nombre || '';
    const sqlQuery = 'SELECT * FROM marcas WHERE nombre LIKE ?';
    const filtro = '%' + nombreFiltro + '%';

    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query(sqlQuery, [filtro], (err, resultados) => {
            connection.release();
            if (err) {
                console.error('Error al obtener datos', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json(resultados);
            }
        });
    });
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
                console.error('Error al guardar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ recibido: true, nombre, cantidad, id: resultado.insertId });
            }
        });
    });
};

const patchMarca = (req, res) => {
    const { nombre, cantidad } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('UPDATE marcas SET nombre = ?, cantidad = ? WHERE id = ?', [nombre, cantidad, req.params.id], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al actualizar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ actualizado: true, nombre, cantidad, id: req.params.id });
            }
        });
    });
};

const putMarca = (req, res) => {
    const { nombre, cantidad } = req.body; 
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('UPDATE marcas SET nombre = ?, cantidad = ? WHERE id = ?', [nombre, cantidad, req.params.id], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al actualizar datos en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ actualizado: true, nombre, cantidad, id: req.params.id });
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

        // Primero eliminamos las ventas asociadas a los concesionarios de la marca
        connection.query('DELETE ventas FROM ventas INNER JOIN concesionarios ON ventas.concesionariosID = concesionarios.id WHERE concesionarios.marcaID = ?', [idMarca], (err, resultadoVentas) => {
            if (err) {
                console.error('Error al eliminar las ventas asociadas:', err);
                connection.release();
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }

            // Luego eliminamos los concesionarios asociados a la marca
            connection.query('DELETE FROM concesionarios WHERE marcaID = ?', [idMarca], (err, resultadoConcesionarios) => {
                if (err) {
                    console.error('Error al eliminar los concesionarios asociados:', err);
                    connection.release();
                    res.status(500).json({ error: 'Error interno del servidor' });
                    return;
                }

                // Finalmente, eliminamos la marca
                connection.query('DELETE FROM marcas WHERE id = ?', [idMarca], (err, resultadoMarca) => {
                    connection.release();
                    if (err) {
                        console.error('Error al eliminar la marca:', err);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    } else {
                        if (resultadoMarca.affectedRows > 0) {
                            res.json({ eliminado: true, id: idMarca });
                        } else {
                            res.status(404).json({ error: 'No se encontró ninguna marca con el ID proporcionado' });
                        }
                    }
                });
            });
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
