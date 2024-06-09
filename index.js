const express = require("express");
const app = express();
const path = require('path');
const mysql = require("mysql");

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.json)
//app.use(express.urlencoded({extended:false}))

app.listen(3000, function(){


  console.log("Servidor creado");
  
}
)

const conexion = mysql.createConnection({
    host: "localhost",
    database:"ingenieria",
    user: "root",
    password: "postgres"
  });
  
  // Conectar a la base de datos  
  conexion.connect((err) => {
    if (err) {
      console.log("ERROR")
      console.error('Error de conexión: ' + err.stack);
      return;
    }
    console.log('Conectado a la base de datos con id ' + conexion.threadId);
    console.log("XXXXXXXXXXXXXXXXX");
})


app.get("/inicio",function(req,res){

  res.render("inicio.ejs");



});


app.get("/inicio/estudiantes",function(req,res){

    res.render("modulo1.ejs"); 
  // Realizar la consulta
      conexion.query('SELECT * FROM estudiantes LIMIT 10', (err, results, fields) => {
          if (err) {
            console.error('Error en la consulta: ' + err.stack);
            return;
          }
  
        console.log("consulta realizada con exito");
        console.log(results)
        console.log(typeof(results))
        console.log(results.length)
       // res.send(results)
      });
    });
  



app.get("/inicio/estudiantes/consolidado",function(req,res){
      
      conexion.query('SELECT * FROM estudiantes LIMIT 10', (err, results, fields) => {
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



app.get('/inicio/estudiantes/consolidado/', (req, res) => {
  const id = req.params.id; // Capturar el parámetro id de la URL
  console.log('ID recibido:', id);



  console.log(dat);
});

