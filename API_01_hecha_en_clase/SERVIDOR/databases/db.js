const mysql = require('mysql');  // se instala con: npm i mysql
const db = mysql.createConnection({
    //propiedad host donde se ubica la base de datos Mysql
    host: '0.0.0.0',
    port: 3306,     // se puede camiar el puerto de mysql
  
    //usuario base de datos (por defecto sería root, pero hay que evitarlo)
    user: 'ejemplouser',
     //contraseña del usuario en mysql
    password: '123456',
    //nombre del esquema al que nos vamos a conectar
    database: 'ejemplodb'
  });

  
// Conexión a la base de datos
db.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });

module.exports=db;