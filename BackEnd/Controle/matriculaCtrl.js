import Aluno from "../Modelo/aluno.js";
import Matricula from "../Modelo/matricula.js";
import Disciplina from "../Modelo/disciplina.js";
import ItemMatricula from "../Modelo/itemMatricula.js";

export default class MatriculaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            // Extraindo dados de uma nova matrícula
            const aluno = dados.aluno;
            const dataMatricula = new Date(dados.dataMatricula).toLocaleDateString();
            const totalMatricula = dados.totalMatricula;
            const itensMatricula = dados.itens;
            // Instanciando um objeto do tipo Matricula
            const objAluno = new Aluno(aluno.cpf);
            // Instanciando uma lista de objetos do tipo ItemMatricula
            let itens = [];
            for (const item of itensMatricula) {
                // Instanciando um objeto do tipo Disciplina
                const disciplina = new Disciplina(item.codigo);
                // Instanciando um objeto do tipo ItemMatricula
                const objItem = new ItemMatricula(disciplina, item.quantidade, item.precoUnitario);
                itens.push(objItem);
            }
            const matricula = new Matricula(0, objAluno, dataMatricula, totalMatricula, itens);
            // Resolver a promise
            matricula.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Matrícula registrada com sucesso!",
                    "codigo": matricula.codigo
                });
            })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a matrícula: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'GET') {
            // Tentar obter o código da matrícula a partir dos parâmetros da URL
            let termo = requisicao.params.termo;
            const matricula = new Matricula(0);
            matricula.consultar(termo).then((listaMatriculas) => {
                resposta.status(200).json({
                    "status": true,
                    "listaMatriculas": listaMatriculas
                });
            })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar a matrícula: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE') {
            const matriculaId = requisicao.params.id; // Capturando o ID da matrícula da URL

            if (matriculaId) {
                const matricula = new Matricula(matriculaId);

                // Chamando o método excluir do modelo Matricula
                matricula.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: `Matrícula com código ${matriculaId} excluída com sucesso!`
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: `Erro ao excluir a matrícula: ${erro.message}`
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "ID da matrícula não foi fornecido!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método de requisição inválido!"
            });
        }
    }
}
