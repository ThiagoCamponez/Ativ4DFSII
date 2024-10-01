import { Router } from "express";
import AlunoCtrl from "../Controle/alunoCtrl.js";

const rotaAluno = new Router();
const alunoCtrl = new AlunoCtrl();

// Definição de endpoints que serão processadas pela camada de controle
// para um determinado aluno

rotaAluno
    .post('/', alunoCtrl.gravar)
    .put('/', alunoCtrl.atualizar)
    .delete('/', alunoCtrl.excluir)
    .get('/', alunoCtrl.consultar)
    .get('/:cpf', alunoCtrl.consultarPeloCPF);

export default rotaAluno;
