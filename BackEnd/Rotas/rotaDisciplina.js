import { Router } from "express";
import DisciplinaCtrl from "../Controle/disciplinaCtrl.js";

const disciplinaCtrl = new DisciplinaCtrl();
const rotaDisciplina = new Router();

rotaDisciplina
    .get('/', disciplinaCtrl.consultar)
    .get('/:termo', disciplinaCtrl.consultar)
    .post('/', disciplinaCtrl.gravar)
    .patch('/', disciplinaCtrl.atualizar)
    .put('/', disciplinaCtrl.atualizar)
    .delete('/', disciplinaCtrl.excluir);

export default rotaDisciplina;
