CREATE DATABASE  IF NOT EXISTS `platforme` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `platforme`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: platforme
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cours`
--

DROP TABLE IF EXISTS `cours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cours` (
  `ID_cours` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `responsable` varchar(255) DEFAULT NULL,
  `Target` varchar(255) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `Informations` text,
  PRIMARY KEY (`ID_cours`),
  KEY `responsable` (`responsable`),
  CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`responsable`) REFERENCES `teachers` (`fullname`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cours`
--

LOCK TABLES `cours` WRITE;
/*!40000 ALTER TABLE `cours` DISABLE KEYS */;
INSERT INTO `cours` VALUES (7,'Front End Web Developer','Doud Hayet','Software','t1q4ea','Become a Front-End Web Developer by completing a variety of projects for your portfolio - become an HTML, CSS and JavaScript pro!'),(18,'AI Programming with Python','Ferfera Soufian','Software','u3da61','Develop a strong foundation in Python programming for AI, utilizing tools like NumPy, pandas, and Matplotlib for data analysis and visualization. Learn how to use, build, and train machine learning models with popular Python libraries. Implement neural networks using PyTorch. Gain practical experience with deep learning frameworks by applying your skills through hands-on projects. Explore generative AI with Transformer neural networks, learn to build, train, and deploy them with PyTorch, and leverage pre-trained models for natural language processing tasks.'),(22,'Ethical hack','Doud Hayet','Security','tg5d89','This program will equip students with the skills they need to advance in their security career and become an Ethical Hacker or Penetration Tester.'),(23,'Introduction to AI','Doud Hayet','artificial intelligence','cd3CR6','This course will introduce you to the basics of AI. Topics include machine learning, probabilistic reasoning, robotics, computer vision, and natural language processing.'),(24,'Deep Learning','Hadjer Yakhlef','Artificial Intelligence','deEp21','Build foundational skills in deep learning by designing and training neural networks to solve complex real-world problems. You’ll begin with the essentials of neural networks, advancing to specialized architectures like Convolutional and Recurrent Neural Networks, along with Generative Adversarial Networks.'),(25,'Introduction to Generative AI with Google Cloud','Ferfera Soufian','Artificial Intelligence','jfj45f1','This is an introductory level microlearning course aimed at explaining what Generative AI is, how it is used, and how it differs from traditional machine learning methods. It also covers Google Tools to help you develop your own Gen AI apps.'),(26,'Analyzing Security Threats','Hadjer Yakhlef','Security','CR7JB0','You will learn about the OWASP Top 10 and that they pose a critical threat to organizations. Then, you’ll learn all of the ways to mitigate threats, including the OWASP Top 10. Lastly, you’ll learn what threat modeling is and build your own threat models.'),(27,'SQL for Data Analysis','Doud Hayet','Data Science','3DF5En','Learn how to execute core SQL commands to define, select, manipulate, control access, aggregate, and join data and data tables. Understand when and how to use subqueries, several window functions, and partitions to complete complex tasks.'),(28,'Data Visualization and D3.js','Ferfera Soufian','Data Science','A1f5G8','Learn the fundamentals of data visualization and apply design and narrative concepts to create your own visualization.');
/*!40000 ALTER TABLE `cours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `enrollment_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`enrollment_id`),
  KEY `student_id` (`student_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`num`),
  CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `cours` (`ID_cours`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES (4,32537211,7);
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `num` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `student_email` varchar(255) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB AUTO_INCREMENT=325372124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (12345678,'Brahimi','Hadjer','2nd year','hadjer@hotmail.com','password'),(32534312,'Chennoufi','Kawther','3rd year','chennoufiktr@yahoo.fr','password'),(32537211,'Beghdad','Aymen','3rd year','aymenbeghdad10@gmail.com','password');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `Field` varchar(255) DEFAULT NULL,
  `Grade` varchar(255) DEFAULT NULL,
  `teacher_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fullname`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (12,'Doud Hayet','Software engenerring','Professeur','doudhayet10@yahoo.com'),(16,'Ferfera Soufian','Algorithmic','Professeur','kamiskoko618@gmail.com'),(17,'Hadjer Yakhlef','Programming','Professeur','hadjeryakhlef@gmail.com');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-04 22:46:24
