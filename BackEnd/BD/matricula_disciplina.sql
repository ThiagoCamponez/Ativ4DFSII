CREATE TABLE `matricula_disciplina` (
  `matricula_codigo` int(11) NOT NULL,
  `disciplina_codigo` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL DEFAULT 1,
  `preco_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`matricula_codigo`, `disciplina_codigo`),
  KEY `disciplina_codigo` (`disciplina_codigo`),
  CONSTRAINT `matricula_disciplina_ibfk_1` FOREIGN KEY (`matricula_codigo`) REFERENCES `matricula` (`codigo`) ON DELETE CASCADE,
  CONSTRAINT `matricula_disciplina_ibfk_2` FOREIGN KEY (`disciplina_codigo`) REFERENCES `disciplina` (`disc_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
