//Cambiar la contraseña por defecto del usuario root
//require('dotenv').config()

const mysql = require("mysql2");

module.exports = () => {
  return mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'admin',
    database: 'control_asistencia'
  });
};
