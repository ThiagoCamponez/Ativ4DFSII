import { Router } from "express";
import EspecialidadeCtrl from "../Controle/especialidadeCtrl.js";

// Rotas é o mapeamento das requisições da web para um determinado
// endpoint da aplicação

const especialidadeCtrl = new EspecialidadeCtrl();
const rotaEspecialidade = new Router();

rotaEspecialidade
    .get('/', especialidadeCtrl.consultar)
    .get('/:termo', especialidadeCtrl.consultar)
    .post('/', especialidadeCtrl.gravar)
    .patch('/', especialidadeCtrl.atualizar)
    .put('/', especialidadeCtrl.atualizar)
    .delete('/', especialidadeCtrl.excluir);

export default rotaEspecialidade;
