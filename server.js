import express, { json } from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurer l'application pour utiliser body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON data

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  
  // Configuration de la base de données
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'platforme'
});
  
db.connect((err)=> {
    if(err){
        return console.error(err.message)
    } else {
        console.log("DATABASE connected successfuly!")
    }
});

/********************************************************************************************************************** */

//Route pour afficher les cours selon spécialités

app.get('/cours-spc', (req, res) => { 
    
  // Récupération du paramètre Target
  const spc = req.query.Target;
  
  // Requête SQL
  const sql = `SELECT * FROM cours WHERE Target = ?`;
  
  // Exécution de la requête
  db.query(sql, [spc], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(results);
    }
  });
});

//Route pour récupérer clé du cours
app.get('/cours-key', (req, res) => { 
    
  const key = req.query.title;
  const sql = 'SELECT key FROM cours WHERE title = ?';

  db.query(sql, [title], (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(results);
    }
  });
});


// Admin's Api:

// Route pour ajouter un enseignant
app.post('/add-teacher', (req,res) =>{

    const { fullname, Field ,Grade, teacher_email } = req.body;

    db.query('INSERT INTO teachers (fullname, Field, Grade, teacher_email) VALUES (?, ?, ?, ?)', [fullname, Field, Grade, teacher_email], (err, result) => {
      if(err){
        console.log('Erreur lors de poster votre demande, réessayez : ', err);
        res.status(500).send(`<h3>Erreur lors de poster votre demande, réessayez</h3>`);
        return;
      }else{
        console.log('Teacher added succesfully');
        res.status(200).send(`<h3>Teacher added succesfully</h3>`);
      }
    });
});

// Router pour supprimer un enseignant
app.delete('/delete-teacher', (req, res)=> {
  
  const name = req.query.fullname;
  const sql = `delete from teachers where fullname=?`
  
  db.query(sql , [name], (err, result)=> {
      
    if(!err){
      console.log('Teacher deleted ');
      res.status(200);
     
    }else{
      console.log('Error ._. !!');
      res.status(500).send(`<h3>Teacher deleted succesfully</h3>`);
    }
  
  });

});

// Router pour modifier les information d'enseignant
app.put('/modifier-teacher', (req,res) =>{
  
  const name = req.query.fullname
  const { Field ,Grade, teacher_email } = req.body;
  const sql = `UPDATE teachers SET  Field = ?, Grade = ?, teacher_email= ? WHERE fullname = ?`;

  db.query(sql , [Field, Grade, teacher_email, name], (err, result) => {
    if(err){
      console.log('Error : ', err);
      res.status(500).send(`<h3>Error please try again</h3>`);
      return;
    }else{
      console.log('Informations modified succesfully');
      res.status(200).send(`<h3>Informations modified succesfully</h3>`);
    }
  });
});


/********************************************************************************************************************** */

// Route pour ajouter un etudiant
app.post('/add-student', (req,res) =>{

  const { num, lastname , firstname, level, student_email } = req.body;

  db.query('INSERT INTO students (num, lastname, firstname, level, student_email) VALUES (?, ?, ?, ?, ?)', [num, lastname, firstname, level, student_email], (err, result) => {
    if(err){
      console.log('Erreur', err);
      res.status(500).send(`<h3>Erreur ._. !!</h3>`);
      return;
    }else{
      console.log('student added succesfully');
      res.status(200).send(`<h3>student added succesfully</h3>`);
    }
  });
});

// Router pour supprimer un etudiant

app.delete('/delete-student', (req, res)=> {

const num = req.query.num;
const sql = `delete from students where num = ?`

db.query(sql , [num], (err, result)=> {
    
  if(!err){
    console.log('Student deleted ');
    res.status(200);
   
  }else{
    console.log('Error ._. !!');
    res.status(500).send(`<h3>Student deleted succesfully</h3>`);
  }

});

});

// Router pour modifier les information d'etudiant
app.put('/modifier-student', (req,res) =>{

const num = req.query.num
const { lastname ,firstname, level, student_email } = req.body;
const sql = `UPDATE students SET  lastname = ?, firstname = ?, level = ?,student_email= ? WHERE num = ?`;

db.query(sql , [lastname, firstname, level ,student_email, num], (err, result) => {
  if(err){
    console.log('Error : ', err);
    res.status(500).send(`<h3>Error please try again</h3>`);
    return;
  }else{
    console.log('Informations modified succesfully');
    res.status(200).send(`<h3>Informations modified succesfully</h3>`);
  }
});
});

/********************* */

//Router pour afficher tous les cours

app.get('/cours', (req, res) => { 
    
  const sql = `SELECT * FROM cours`;
  
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(results);
    }
  });
});

//Router pour afficher tous les enseignants:

app.get('/teachers', (req, res) => { 
    
  const sql = `SELECT * FROM teachers`;
  
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(results);
    }
  });
});


//Router pour afficher tous les étudiants

app.get('/students', (req, res) => { 
    
  const sql = `SELECT * FROM students`;
  
  db.query(sql, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(results);
    }
  });
});



 // Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})