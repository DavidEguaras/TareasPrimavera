const db = require('../DATABASES/db.js');

// Obtener todas las marcas
const getAllMarcas = (callback) => {
    db.getConnection((err, connection) => {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query('SELECT * FROM marcas', (err, resultados) => {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, resultados);
            }
        });
    });
};

const sliceMarcas = (req, res) => {
    const start = parseInt(req.query.start) || 0;
    const end = parseInt(req.query.end) || 5;
    getAllMarcas((err, marcas) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            const slicedMarcas = marcas.slice(start, end);
            res.json(slicedMarcas);
        }
    });
};

const reverseMarcas = (req, res) => {
    getAllMarcas((err, marcas) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            const reversedMarcas = marcas.reverse();
            res.json(reversedMarcas);
        }
    });
};

const sortMarcas = (req, res) => {
    const sortBy = req.query.sortBy || 'nombre';
    getAllMarcas((err, marcas) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            const sortedMarcas = marcas.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
            res.json(sortedMarcas);
        }
    });
};

const findMarca = (req, res) => {
    const id = parseInt(req.query.id);
    getAllMarcas((err, marcas) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            const foundMarca = marcas.find(marca => marca.id === id);
            res.json(foundMarca);
        }
    });
};

const filterMarcas = (req, res) => {
    const minCantidad = parseInt(req.query.minCantidad) || 0;
    getAllMarcas((err, marcas) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            const filteredMarcas = marcas.filter(marca => marca.cantidad >= minCantidad);
            res.json(filteredMarcas);
        }
    });
};

const mapMarcas = (req, res) => {
    getAllMarcas((err, marcas) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            const mappedMarcas = marcas.map(marca => ({ nombre: marca.nombre, cantidad: marca.cantidad }));
            res.json(mappedMarcas);
        }
    });
};

const reduceMarcas = (req, res) => {
    getAllMarcas((err, marcas) => {
        if (err) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            const totalCantidad = marcas.reduce((total, marca) => total + marca.cantidad, 0);
            res.json({ totalCantidad });
        }
    });
};

module.exports = {
    sliceMarcas,
    reverseMarcas,
    sortMarcas,
    findMarca,
    filterMarcas,
    mapMarcas,
    reduceMarcas
};
