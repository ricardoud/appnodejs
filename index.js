//Importaciones modulos //
const express = require("express"); // importacion modulo express
const app = express(); // creacion de variable con express
const path = require('path');// importancion de modulo para manejar URLs
const mysql = require("mysql"); // importación de modulo 


// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));
// Paquetes para manejo de archivos HTMl virtualizados, JSON, y transferencia de Body//
app.set("view engine", "ejs");
app.use(express.json());// paquete para manejo de archivos JSON
app.use(express.urlencoded({ extended: false })); // paquete para manejo de archivos JSON con URL


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
      //console.log(results)
      res.send(results)
      });
});




app.get("/inicio/profesores",function(req,res){

  res.render("profesores.ejs");  

});

app.get("/inicio/asignaturas",function(req,res){

  res.render("asignaturas.ejs");  

});



  

app.post("/validar",function(req,res){

    const dat= req.body;
    console.log(dat);
});

// ENDPOINT CONSLTA ESTUDIANTE ESPECIFICO //
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

//ENDPOINT GUARDADO ESTUDIANTE//

app.post('/inicio/estudiantes/consolidado/registro', (req, res) => {
  const idd = req.body;
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

app.put('/inicio/estudiantes/consolidado/actualizar', (req, res) => {
  const idd = req.body;
  const cod_e = idd.cod_e;
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
app.get("/inicio/profesores/consolidado",function(req,res){
      
  conexion.query('SELECT * FROM profesores', (err, results, fields) => {
      if (err) {
        console.error('Error en la consulta: ' + err.stack);
        return;
      }
  res.send(results)
  });
});

//ENDPOINT CONSULTA PROFESOR EN ESPECIFICO //
app.get('/inicio/profesores/consolidado/:cod_e', (req, res) => {
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

app.post('/inicio/profesor/consolidado/registro', (req, res) => {
  const idd = req.body;
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

app.put('/inicio/profesores/consolidado/actualizar', (req, res) => {
  const idd = req.body;
  const id_p = idd.id_p;
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
app.get("/inicio/asignaturas/consolidado",function(req,res){
      
  conexion.query('SELECT * FROM asignaturas', (err, results, fields) => {
      if (err) {
        console.error('Error en la consulta: ' + err.stack);
        return;
      }
  res.send(results)
  });
});


//ENDPOINT CONSULTA ASIGNATURAS EN ESPECIFICO //
app.get('/inicio/asignaturas/consolidado/:cod_e', (req, res) => {
  const idd = req.params.cod_e; // Capturar el parámetro id de la URL
   
  conexion.query('SELECT * FROM asignaturas where cod_a=?',[idd],(err, results, fields) => {
    if (err) {
      console.error('Error en la consulta: ' + err.stack);
      
      return;
    }
    res.send(results)
    })
});
//ENDPOINT REGISTRO ASIGNATURAS //
app.post('/inicio/asignaturas/consolidado/registro', (req, res) => {
  const idd = req.body;
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

app.put('/inicio/asignaturas/consolidado/actualizar', (req, res) => {
  const idd = req.body;
  const cod_a = idd.cod_a;
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
app.get('/inicio/profesores/consolidado/:cod_e/asignaturas', (req, res) => {
  const idd = req.params.cod_e; // Capturar el parámetro id de la URL
  console.log(idd)
  conexion.query('SELECT * FROM imparte where id_p=?',[idd],(err, results, fields) => {
    if (err) {
      console.error('Error en la consulta: ' + err.stack);
      return;
    }
    res.send(results)
    })
});


//ENDPOINT CONSULTA ASIGNATURAS EN ESPECIFICO CON SU PROFESOR QUE IMPARTE //
app.get('/inicio/asignaturas/consolidado/:cod_e/profesores', (req, res) => {
  const idd = req.params.cod_e; // Capturar el parámetro id de la URL
  console.log(idd)
  conexion.query('SELECT * FROM imparte where cod_a=?',[idd],(err, results, fields) => {
    if (err) {
      console.error('Error en la consulta: ' + err.stack);
      return;
    }
    res.send(results)
    })
});


//ENDPOINT ACTUALIZACION IMPARTE// (considerar que se toma como paramete el id de profesor codigo asignatura y grupo se edita es el horario)

app.put('/inicio/profesores/imparte', (req, res) => {
  const idd = req.body;
  const id_p = idd.id_p;
  const cod_a=idd.cod_a;
  const grupo=idd.grupo;
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

app.put('/inicio/estudiantes/inscribe', (req, res) => {
  const idd = req.body;
  const cod=idd.cod_e;
  console.log(idd.cod_e)
  const id_p=idd.id_p;
  const cod_a=idd.cod_a;
  const grupo=idd.grupo;
  

  conexion.query('UPDATE inscribe SET ? WHERE cod_e=? and id_p = ? and cod_a=? and grupo=? ', [idd,cod,id_p,cod_a,grupo], (err, results, fields) => {
    if (err) {
      console.error('No se pudo ACTUALIZAR: ' + err.stack);
      res.send("Error de actualización");
      return;
    }
    res.send(results);
  });

});

