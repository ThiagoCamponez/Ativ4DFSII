CREATE DATABASE  IF NOT EXISTS `sistemaensino` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `sistemaensino`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sistemaensino
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `matricula_disciplina`
--

DROP TABLE IF EXISTS `matricula_disciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matricula_disciplina` (
  `matricula_codigo` int(11) NOT NULL,
  `disciplina_codigo` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL DEFAULT 1,
  `preco_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`matricula_codigo`,`disciplina_codigo`),
  KEY `disciplina_codigo` (`disciplina_codigo`),
  CONSTRAINT `matricula_disciplina_ibfk_1` FOREIGN KEY (`matricula_codigo`) REFERENCES `matricula` (`codigo`) ON DELETE CASCADE,
  CONSTRAINT `matricula_disciplina_ibfk_2` FOREIGN KEY (`disciplina_codigo`) REFERENCES `disciplina` (`disc_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matricula_disciplina`
--

LOCK TABLES `matricula_disciplina` WRITE;
/*!40000 ALTER TABLE `matricula_disciplina` DISABLE KEYS */;
INSERT INTO `matricula_disciplina` VALUES (1,1,1,1500.00),(1,2,1,2000.00),(2,3,1,1200.00),(2,4,1,1300.00),(3,2,1,2000.00),(4,1,1,1500.00),(4,3,1,1200.00),(5,1,1,1500.00),(5,2,1,2000.00),(5,3,1,1200.00),(5,4,1,1300.00),(5,5,1,15000.00);
/*!40000 ALTER TABLE `matricula_disciplina` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-01 13:16:05
