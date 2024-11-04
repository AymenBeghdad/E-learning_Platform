import express, { json } from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;


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

  app.get("/hello", (req, res) => {
    res.send("Hello World!!")
  });

 // Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})