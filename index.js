//Importaciones modulos //
const express = require("express"); // importacion modulo express
const app = express(); // creacion de variable con express
const path = require('path');// importancion de modulo para manejar rutas de archivos locales
const mysql = require("mysql"); // importación de modulo 



app.use(express.static(path.join(__dirname, 'public')));// Servir archivos estáticos desde el directorio "public"
app.set("view engine", "ejs");// Paquetes para manejo de archivos HTMl virtualizados, JSON, y transferencia de Body//
app.use(express.json());// paquete para manejo de archivos JSON
app.use(express.urlencoded({ extended: false })); // paquete para manejo de archivos JSON con URL

// acceso a archivo variables de entorno //

require('dotenv').config({path:'./.env'});


//Habilitacion del servidor en puerto 3000//
app.listen(3000, function(){

  console.log("Servidor creado");
  
}
);

// Conexion a base de datos creada //
const conexion = mysql.createConnection({
    host:process.env.host,
    database:process.env.database,
    user:process.env.user,
    password:process.env.password
  });
  
  // verificacion estado conexcion a base de datos //
  conexion.connect((err) => {
    if (err) {
      console.log("ERROR")
      console.error('Error de conexión: ' + err.stack);
      return;
    }
    console.log('Conectado a la base de datos con id ' + conexion.threadId);
    console.log("XXXXXXXXXXXXXXXXX");
})

const customerRoutes=require('./routes/routes.js'); // llamado a archivo de rutas
app.use('/',customerRoutes)//indicacion a la app de usar las rutas definidas


module.exports= conexion; // exportacion a archivo principal de rutas o endpoints definidos
