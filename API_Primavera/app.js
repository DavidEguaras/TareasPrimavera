const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());


app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hola Mundo");
})

app.get('/api/datos', (req, res) => {
    const datos = {
        mensaje: "Has accedido a los datos",
        nombre: "David",
        edad: 19
    }
    res.send(datos);
});

app.post('/api/enviar', (req, res) => {
    const {mensaje} = req.body;
    res.json({
        recibido:true,
        mensaje
    });
});
const puerto = 3000;

app.listen(puerto, () => {
    console.log('servidor express escuchando en el puerto 3000');
});