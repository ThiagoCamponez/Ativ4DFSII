CREATE TABLE `disciplina` (
  `disc_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `disc_descricao` varchar(100) NOT NULL,
  `disc_preco` decimal(10,2) NOT NULL DEFAULT 0.00,
  `disc_duracao` int(11) NOT NULL COMMENT 'Duração em horas',
  `esp_codigo` int(11) NOT NULL,
  PRIMARY KEY (`disc_codigo`),
  KEY `fk_especialidade` (`esp_codigo`),
  CONSTRAINT `fk_especialidade` FOREIGN KEY (`esp_codigo`) REFERENCES `especialidade` (`esp_codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
