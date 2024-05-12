const db = require('../DATABASES/db.js');

const getVentas = (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('SELECT * FROM ventas', (err, resultados) => {
            connection.release();
            if (err) {
                console.error('Error al obtener datos de ventas:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json(resultados);
            }
        });
    });
};

const crearVenta = (req, res) => {
    const { marcaID, concesionariosID, cantidad_vendida } = req.body;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('INSERT INTO ventas (marcaID, concesionariosID, cantidad_vendida) VALUES (?, ?, ?)', [marcaID, concesionariosID, cantidad_vendida], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al guardar datos de la venta en la base de datos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                res.json({ recibido: true, marcaID, concesionariosID, cantidad_vendida, id: resultado.insertId });
            }
        });
    });
};

const getVentaById = (req, res) => {
    const idVenta = req.params.id;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('SELECT * FROM ventas WHERE id = ?', [idVenta], (err, resultados) => {
            connection.release();
            if (err) {
                console.error('Error al obtener la venta:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                if (resultados.length > 0) {
                    res.json(resultados[0]);
                } else {
                    res.status(404).json({ error: 'Venta no encontrada' });
                }
            }
        });
    });
};


const eliminarVenta = (req, res) => {
    const idVenta = req.params.id;
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener conexión:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        connection.query('DELETE FROM ventas WHERE id = ?', [idVenta], (err, resultado) => {
            connection.release();
            if (err) {
                console.error('Error al eliminar la venta:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            } else {
                if (resultado.affectedRows > 0) {
                    res.json({ eliminado: true, id: idVenta });
                } else {
                    res.status(404).json({ error: 'No se encontró ninguna venta con el ID proporcionado' });
                }
            }
        });
    });
};

module.exports = {
    getVentas,
    crearVenta,
    actualizarVenta,
    eliminarVenta
};
