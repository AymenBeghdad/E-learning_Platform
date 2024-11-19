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
      console.log({ message: 'Teacher deleted successfully' });
      res.status(200).send({ message: 'Teacher deleted successfully' });
     
    }else{
      console.log('Error ._. !!');
      res.status(500).send({ message: 'Teacher not found' });
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

  const { num, lastname , firstname, level, student_email, password } = req.body;

  db.query('INSERT INTO students (num, lastname, firstname, level, student_email, `password`) VALUES (?, ?, ?, ?, ?, ?)', [num, lastname, firstname, level, student_email, password], (err, result) => {
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
  
  if (!num) {
    return res.status(400).send({ message: 'Course ID is required' });
  }

  // SQL queries
  const deleteEnrollmentsSQL = `DELETE FROM enrollments WHERE student_id = ?`;
  const deleteStudentSQL = `DELETE FROM students WHERE num = ?`;

  // Start transaction
  db.beginTransaction((transactionErr) => {
    if (transactionErr) {
      console.error('Error starting transaction');
      return res.status(500).send({ message: 'Transaction error' });
    }

    // Step 1: Delete enrollments
    db.query(deleteEnrollmentsSQL, [num], (err1) => {
      if (err1) {
        console.error('Error deleting enrollments:', err1);
        db.rollback(() => {
          return res.status(500).send({ message: 'Error deleting enrollments' });
        });
      } else {
        // Step 2: Delete course
        db.query(deleteStudentSQL, [num], (err2, result) => {
          if (err2) {
            console.error('Error deleting student:', err2);
            db.rollback(() => {
              return res.status(500).send({ message: 'Error deleting student' });
            });
          } else {
            // Commit transaction
            db.commit((commitErr) => {
              if (commitErr) {
                console.error('Error committing transaction:', commitErr);
                db.rollback(() => {
                  return res.status(500).send({ message: 'Transaction commit error' });
                });
              } else {
                console.log('Student and related enrollments deleted successfully');
                return res.status(200).send({ message: 'Student and related enrollments deleted successfully' });
              }
            });
          }
        });
      }
    });
  });
});

// Router pour modifier les information d'etudiant
app.put('/modifier-student', (req,res) =>{

const num = req.query.num
const { lastname ,firstname, level, student_email, password } = req.body;
const sql = `UPDATE students SET  lastname = ?, firstname = ?, level = ?, student_email= ?, \`password\`= ? WHERE num = ?`;

db.query(sql , [lastname, firstname, level ,student_email, password, num], (err, result) => {
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

//Route pour enregistrer une iscription à un cour

app.post('/add_enrollment', (req,res) =>{

  const { student_id,course_id } = req.body;

  db.query('INSERT INTO enrollments (student_id, course_id) VALUES (?,?)', [student_id,course_id], (err, result) => {
    if(err){
      console.log('Erreur', err);
      res.status(500).send(`<h3>Erreur ._. !!</h3>`);
      return;
    }else{
      console.log('enrollment added succesfully');
      res.status(200).send(`<h3>enrollment added succesfully</h3>`);
    }
  });
});


// Route to retrieve all courses a student is enrolled in
app.get('/your_courses', (req, res) => {
  const num = req.query.num; 

  const sql = `
    SELECT * 
    FROM cours
    WHERE ID_cours IN (
      SELECT course_id 
      FROM enrollments 
      WHERE student_id = ?
    );
  `;

  db.query(sql, [num], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.json(results);
      }
  });
});

// Route pour ajouter un cours
app.post('/add-course', (req, res) => {
  const { title, responsable, Target, key, Informations } = req.body;

  
  const sql = `
    INSERT INTO cours (title, responsable, Target, \`key\`, Informations) 
    VALUES (?, ?, ?, ?, ?)
`;

  db.query(sql, [title, responsable, Target, key, Informations], (err, result) => {
    if (err) {
      console.error('Erreur:', err);
      res.status(500).send("<h3>Erreur ._. !!</h3>");
    } else {
      console.log('Course added successfully');
      res.status(200).send("<h3>Course added successfully</h3>");
    }
  });
});

// Router pour supprimer un cours

  app.delete('/delete-course', (req, res) => {
    const ID_cours = req.query.ID_cours;
  
    if (!ID_cours) {
      return res.status(400).send({ message: 'Course ID is required' });
    }
  
    // SQL queries
    const deleteEnrollmentsSQL = `DELETE FROM enrollments WHERE course_id = ?`;
    const deleteCourseSQL = `DELETE FROM cours WHERE ID_cours = ?`;
  
    // Start transaction
    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error('Error starting transaction');
        return res.status(500).send({ message: 'Transaction error' });
      }
  
      // Step 1: Delete enrollments
      db.query(deleteEnrollmentsSQL, [ID_cours], (err1) => {
        if (err1) {
          console.error('Error deleting enrollments:', err1);
          db.rollback(() => {
            return res.status(500).send({ message: 'Error deleting enrollments' });
          });
        } else {
          // Step 2: Delete course
          db.query(deleteCourseSQL, [ID_cours], (err2, result) => {
            if (err2) {
              console.error('Error deleting course:', err2);
              db.rollback(() => {
                return res.status(500).send({ message: 'Error deleting course' });
              });
            } else {
              // Commit transaction
              db.commit((commitErr) => {
                if (commitErr) {
                  console.error('Error committing transaction:', commitErr);
                  db.rollback(() => {
                    return res.status(500).send({ message: 'Transaction commit error' });
                  });
                } else {
                  console.log('Course and related enrollments deleted successfully');
                  return res.status(200).send({ message: 'Course and related enrollments deleted successfully' });
                }
              });
            }
          });
        }
      });
    });
  });

// Router pour modifier les information d'un cours

app.put('/modifier-cours', (req,res) =>{

const id_cours = req.query.id_cours
const {title, responsable, Target, course_key,Informations } = req.body;
const sql = `UPDATE cours SET  title = ?, responsable = ?, Target = ?,\`key\`= ?, Informations=? WHERE ID_cours = ?`;

db.query(sql , [title, responsable, Target,course_key,Informations,id_cours], (err, result) => {
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

// Route pour login un étudiant:

app.get('/students', (req, res) => { 
    
  const sql = `SELECT * FROM students where`;
  
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