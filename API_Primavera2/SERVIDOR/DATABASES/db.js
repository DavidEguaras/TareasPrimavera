const mysql = require('mysql2');

const db = mysql.createPool({
    host: '127.0.0.1',
    port: 3307,
    user: 'alumno',
    password: 'password',
    database: 'ejemplo00'
})
/*
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3307,
    user: 'alumno',
    password: 'password',
    database: 'ejemplo00'
});
*/
// db.connect((err) =>{
//     if(err){
//         console.error('Error de conexion a la base de datos');
//     }else{
//         console.log('Conexion exitosa a la base de datos');
//     }
// });

module.exports = db;