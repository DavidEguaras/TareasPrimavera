const express = require('express');
const cors = require('cors');
const rutasCoches = require('./routes/rutas_marcas.js');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/coches', rutasCoches);


const puerto = 3000;


app.listen(puerto, () => {
    console.log('servidor express escuchando en el puerto 3000');
});