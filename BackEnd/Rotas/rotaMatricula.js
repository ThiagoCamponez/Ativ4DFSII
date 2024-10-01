import { Router } from "express";
import MatriculaCtrl from "../Controle/matriculaCtrl.js";

const rotaMatricula = new Router();
const matriculaCtrl = new MatriculaCtrl();

rotaMatricula
    .get('/', matriculaCtrl.consultar)
    .get('/:termo', matriculaCtrl.consultar)
    .post('/', matriculaCtrl.gravar)
    // .patch('/', matriculaCtrl.atualizar) // Caso queira adicionar atualização no futuro
    // .put('/', matriculaCtrl.atualizar)   // Caso queira adicionar atualização no futuro
    .delete('/:id', matriculaCtrl.excluir); // Ajuste aqui para passar o ID da matrícula na URL

export default rotaMatricula;
