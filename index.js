const express = require("express");
const app = express();
const path = require('path');
const mysql = require("mysql");

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));
// Paquetes para manejo de archivos HTMl virtualizados, JSON, y transferencia de Body//
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Habilitacion del servidor en puerto 3000//
app.listen(3000, function(){

  console.log("Servidor creado");
  
}
)


// Conexion a base de datos creada //
const conexion = mysql.createConnection({
    host: "localhost",
    database:"ingenieria",
    user: "root",
    password: "postgres"
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


// CREACION DE ENDPOINTS //

//ENDPOINT GENERAL//

app.get("/inicio",function(req,res){

  res.render("inicio.ejs");// se llama a renderizar el archivo HTML denomindado inicio.ejs

});

//ENDPOINT SEGUNDA INTERFAZ//
app.get("/inicio/estudiantes",function(req,res){
    res.render("modulo1.ejs"); 
  // Realizar la consulta
      conexion.query('SELECT * FROM estudiantes LIMIT 10', (err, results, fields) => {
          if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return;
          }
  
        console.log("consulta realizada con exito");
        //console.log(results)
        console.log(typeof(results))
        console.log(results.length)
       // res.send(results)
      });
    });
  


//ENDPOINT CONSULTA INICIAL TOTAL DE ESTUDIANTES //
app.get("/inicio/estudiantes/consolidado",function(req,res){
      
      conexion.query('SELECT * FROM estudiantes', (err, results, fields) => {
          if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return;
          }
      res.send(results)
      });
});




app.get("/inicio/asignaturas",function(req,res){

  res.render("inicio.ejs");  

});


  

app.post("/validar",function(req,res){

    const dat= req.body;
    console.log(dat);
});


app.get('/inicio/estudiantes/consolidado/:cod_e', (req, res) => {
  const idd = req.params.cod_e; // Capturar el parámetro id de la URL
   
  conexion.query('SELECT cod_e, nom_e FROM estudiantes where cod_e=?',[idd],(err, results, fields) => {
    if (err) {
      console.error('Error en la consulta: ' + err.stack);
      return;
    }
    res.send(results)
    })
});

