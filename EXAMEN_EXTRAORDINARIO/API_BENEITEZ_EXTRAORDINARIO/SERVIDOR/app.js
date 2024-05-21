const express = require('express');
const cors = require('cors');
const rutasMarcas = require('./routes/rutas_marcas.js');
const rutasConcesionarios = require('./routes/rutas_concesionarios.js');
const rutasVentas = require('./routes/rutas_ventas.js');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/marcas', rutasMarcas);
app.use('/concesionarios', rutasConcesionarios);
app.use('/ventas', rutasVentas);


const puerto = 3000;


app.listen(puerto, () => {
    console.log('servidor express escuchando en el puerto 3000');
});