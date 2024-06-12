
const express =require('express')
const router=express.Router();
const path = require('path');// importancion de modulo para manejar rutas de archivos locales
const mysql = require("mysql"); // importación de modulo 


router.use(express.static(path.join(__dirname, 'public')));// Servir archivos estáticos desde el directorio "public"
//router.set("view engine", "ejs");// Paquetes para manejo de archivos HTMl virtualizados, JSON, y transferencia de Body//
router.use(express.json());// paquete para manejo de archivos JSON
router.use(express.urlencoded({ extended: false })); // paquete para manejo de archivos JSON con URL

// acceso a archivo variables de entorno //

require('dotenv').config({path:'./.env'});

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


// CREACION DE ENDPOINTS //

//ENDPOINT GENERAL//

router.get("/inicio",function(req,res){
  console.log("Status code:" +res.statusCode)
    res.render("inicio.ejs");// se llama a renderizar el archivo HTML denomindado inicio.ejs
  
  });


  //ENDPOINT SEGUNDA INTERFAZ//
router.get("/inicio/estudiantes",function(req,res){
  console.log("Status code:" +res.statusCode)
  res.render("modulo1.ejs"); 
// Realizar la consulta
    conexion.query('SELECT * FROM estudiantes LIMIT 10', (err, results, fields) => {
        if (err) {
          console.error('Error en la consulta: ' + err.stack);
          return;
        }

      console.log("consulta realizada con exito");
      //console.log(results)
      
    });
  });



//ENDPOINT CONSULTA INICIAL TOTAL DE ESTUDIANTES //
router.get("/inicio/estudiantes/consolidado",function(req,res){
  console.log("Status code:" +res.statusCode)
      conexion.query('SELECT * FROM estudiantes', (err, results, fields) => {
        if (err) {
          console.error('Error en la consulta: ' + err.stack);
          return;
        }
    //console.log(results)
    res.send(results)
    
    });
});



// ENDPOINT RENDERIZACION PAGINA INICIAL MODULO PROFESORES//
router.get("/inicio/profesores",function(req,res){
console.log("Status code:" +res.statusCode)
res.render("profesores.ejs");  

});

// ENDPOINT RENDERIZACION PAGINA INICIAL MODULO ASIGNATURAS//
router.get("/inicio/asignaturas",function(req,res){
console.log("Status code:" +res.statusCode)
res.render("asignaturas.ejs");  
});


// ENDPOINT CONSLTA ESTUDIANTE ESPECIFICO //
router.get('/inicio/estudiantes/consolidado/:cod_e', (req, res) => {
console.log("Status code:" +res.statusCode)
const idd = req.params.cod_e; // Capturar el parámetro id de la URL
 
conexion.query('SELECT cod_e, nom_e FROM estudiantes where cod_e=?',[idd],(err, results, fields) => {
  if (err) {
    console.error('Error en la consulta: ' + err.stack);
    return;
  }
  res.send(results)
  })
});

//ENDPOINT GUARDADO ESTUDIANTE//

router.post('/inicio/estudiantes/consolidado/registro', (req, res) => {
const idd = req.body;
console.log("Status code:" +res.statusCode)
conexion.query('INSERT INTO estudiantes set ?',[idd],(err, results, fields) => {
  if (err) {
    console.error('No se pudo GUARDAR: ' + err.stack);
    res.send("Codigo de estudiante ya existente")
    return;
  }
  res.send(results)
  })
 
});

//ENDOPOINT ACTUALIZACION ESTUDIANTE//

router.put('/inicio/estudiantes/consolidado/actualizar', (req, res) => {
const idd = req.body;
const cod_e = idd.cod_e;
console.log("Status code:" +res.statusCode)
conexion.query('UPDATE estudiantes SET ? WHERE cod_e = ?', [idd, cod_e], (err, results, fields) => {
  if (err) {
    console.error('No se pudo ACTUALIZAR: ' + err.stack);
    res.send("Error de actualización");
    return;
  }
  res.send(results);
});

});


//ENDPOINT CONSULTA INICIAL TOTAL DE PROFESORES //
router.get("/inicio/profesores/consolidado",function(req,res){
console.log("Status code:" +res.statusCode)   
conexion.query('SELECT * FROM profesores', (err, results, fields) => {
    if (err) {
      console.error('Error en la consulta: ' + err.stack);
      return;
    }
res.send(results)
});
});

//ENDPOINT CONSULTA PROFESOR EN ESPECIFICO //
router.get('/inicio/profesores/consolidado/:cod_e', (req, res) => {
console.log("Status code:" +res.statusCode)
const idd = req.params.cod_e; // Capturar el parámetro id de la URL
 
conexion.query('SELECT * FROM profesores where id_p=?',[idd],(err, results, fields) => {
  if (err) {
    console.error('Error en la consulta: ' + err.stack);
    return;
  }
  res.send(results)
  })
});


//ENDPOINT GUARDADO PROFESOR//

router.post('/inicio/profesor/consolidado/registro', (req, res) => {
const idd = req.body;
console.log("Status code:" +res.statusCode)
conexion.query('INSERT INTO profesores set ?',[idd],(err, results, fields) => {
  if (err) {
    console.error('No se pudo GUARDAR: ' + err.stack);
    res.send("Id de profesor ya existente")
    return;
  }
  res.send(results)
  })
 
});


//ENDOPOINT ACTUALIZACION PROFESOR//

router.put('/inicio/profesores/consolidado/actualizar', (req, res) => {
const idd = req.body;
const id_p = idd.id_p;
console.log("Status code:" +res.statusCode)
conexion.query('UPDATE profesores SET ? WHERE id_p = ?', [idd, id_p], (err, results, fields) => {
  if (err) {
    console.error('No se pudo ACTUALIZAR: ' + err.stack);
    res.send("Error de actualización");
    return;
  }
  res.send(results);
});

});

//ENDPOINT CONSULTA INICIAL TOTAL DE ASIGNATURAS //
router.get("/inicio/asignaturas/consolidado",function(req,res){
console.log("Status code:" +res.statusCode)  
conexion.query('SELECT * FROM asignaturas', (err, results, fields) => {
    if (err) {
      console.error('Error en la consulta: ' + err.stack);
      return;
    }
res.send(results)
});
});


//ENDPOINT CONSULTA ASIGNATURAS EN ESPECIFICO //
router.get('/inicio/asignaturas/consolidado/:cod_e', (req, res) => {
const idd = req.params.cod_e; // Capturar el parámetro id de la URL
console.log("Status code:" +res.statusCode)
conexion.query('SELECT * FROM asignaturas where cod_a=?',[idd],(err, results, fields) => {
  if (err) {
    console.error('Error en la consulta: ' + err.stack);
    
    return;
  }
  res.send(results)
  })
});

//ENDPOINT REGISTRO ASIGNATURAS //
router.post('/inicio/asignaturas/consolidado/registro', (req, res) => {
const idd = req.body;
console.log("Status code:" +res.statusCode)
conexion.query('INSERT INTO asignaturas set ?',[idd],(err, results, fields) => {
  if (err) {
    console.error('No se pudo GUARDAR: ' + err.stack);
    res.send("Id de asignatura ya existente")
    return;
  }
  res.send(results)
  })
 
});


//ENDOPOINT ACTUALIZACION ASIGNATURA//

router.put('/inicio/asignaturas/consolidado/actualizar', (req, res) => {
const idd = req.body;
const cod_a = idd.cod_a;
console.log("Status code:" +res.statusCode)
conexion.query('UPDATE asignaturas SET ? WHERE cod_a = ?', [idd, cod_a], (err, results, fields) => {
  if (err) {
    console.error('No se pudo ACTUALIZAR: ' + err.stack);
    res.send("Error de actualización");
    return;
  }
  res.send(results);
});

});

//ENDPOINT CONSULTA PROFESORES EN ESPECIFICO CON MATERIAS IMPARTIDAS //
router.get('/inicio/profesores/consolidado/:cod_e/asignaturas', (req, res) => {
const idd = req.params.cod_e; // Capturar el parámetro id de la URL
//console.log(idd)
console.log("Status code:" +res.statusCode)
conexion.query('SELECT * FROM imparte where id_p=?',[idd],(err, results, fields) => {
  if (err) {
    console.error('Error en la consulta: ' + err.stack);
    return;
  }
  res.send(results)
  })
});


//ENDPOINT CONSULTA ASIGNATURAS EN ESPECIFICO CON SU PROFESOR QUE IMPARTE //
router.get('/inicio/asignaturas/consolidado/:cod_e/profesores', (req, res) => {
const idd = req.params.cod_e; // Capturar el parámetro id de la URL
//console.log(idd)
console.log("Status code:" +res.statusCode)
conexion.query('SELECT * FROM imparte where cod_a=?',[idd],(err, results, fields) => {
  if (err) {
    console.error('Error en la consulta: ' + err.stack);
    return;
  }
  res.send(results)
  })
});


//ENDPOINT ACTUALIZACION IMPARTE// (considerar que se toma como paramete el id de profesor codigo asignatura y grupo se edita es el horario)

router.put('/inicio/profesores/imparte', (req, res) => {
const idd = req.body;
const id_p = idd.id_p;
const cod_a=idd.cod_a;
const grupo=idd.grupo;
console.log("Status code:" +res.statusCode)
conexion.query('UPDATE imparte SET ? WHERE id_p = ? and cod_a=? and grupo=?', [idd, id_p,cod_a,grupo], (err, results, fields) => {
  if (err) {
    console.error('No se pudo ACTUALIZAR: ' + err.stack);
    res.send("Error de actualización");
    return;
  }
  res.send(results);
});
});


//ENDPOINT ACTUALIZACION INSCRIBE// (considerar que se toma como paramete el id de profesor codigo asignatura y grupo se edita es el horario)

router.put('/inicio/estudiantes/inscribe', (req, res) => {
const idd = req.body;
const cod=idd.cod_e;
console.log(idd.cod_e)
const id_p=idd.id_p;
const cod_a=idd.cod_a;
const grupo=idd.grupo;

console.log("Status code:" +res.statusCode)
conexion.query('UPDATE inscribe SET ? WHERE cod_e=? and id_p = ? and cod_a=? and grupo=? ', [idd,cod,id_p,cod_a,grupo], (err, results, fields) => {
  if (err) {
    console.error('No se pudo ACTUALIZAR: ' + err.stack);
    res.send("Error de actualización");
    return;
  }
  res.send(results);
});

});

module.exports= router; // exportacion a archivo principal de rutas o endpoints definidos