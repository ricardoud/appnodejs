
const express =require('express')
const router=express.Router();

// CREACION DE ENDPOINTS //

//ENDPOINT GENERAL//

router.get("/inicio",function(req,res){

    res.render("inicio.ejs");// se llama a renderizar el archivo HTML denomindado inicio.ejs
  
  });


  //ENDPOINT SEGUNDA INTERFAZ//
router.get("/inicio/estudiantes",function(req,res){
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
router.get("/inicio/estudiantes/consolidado",function(req,res){
    
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

res.render("profesores.ejs");  

});

// ENDPOINT RENDERIZACION PAGINA INICIAL MODULO ASIGNATURAS//
router.get("/inicio/asignaturas",function(req,res){
res.render("asignaturas.ejs");  
});


// ENDPOINT CONSLTA ESTUDIANTE ESPECIFICO //
router.get('/inicio/estudiantes/consolidado/:cod_e', (req, res) => {
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
router.get('/inicio/asignaturas/consolidado/:cod_e/profesores', (req, res) => {
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

router.put('/inicio/profesores/imparte', (req, res) => {
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

router.put('/inicio/estudiantes/inscribe', (req, res) => {
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

module.exports= router; // exportacion a archivo principal de rutas o endpoints definidos