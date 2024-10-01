CREATE TABLE `matricula` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `aluno_cpf` varchar(14) NOT NULL,
  `data_matricula` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `aluno_cpf` (`aluno_cpf`),
  CONSTRAINT `matricula_ibfk_1` FOREIGN KEY (`aluno_cpf`) REFERENCES `aluno` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
