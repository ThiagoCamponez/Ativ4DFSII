CREATE DATABASE IF NOT EXISTS sistemaensino;
USE sistemaensino;

CREATE TABLE `especialidade` (
  `esp_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `esp_descricao` varchar(100) NOT NULL,
  PRIMARY KEY (`esp_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
