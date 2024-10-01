// camada de interface da API que traduz HTTP
import Disciplina from "../Modelo/disciplina.js";
import Especialidade from "../Modelo/especialidade.js";

export default class DisciplinaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            const preco = dados.preco;
            const duracao = dados.duracao;
            const esp_codigo = dados.especialidade.codigo;

            if (descricao && preco > 0 && duracao > 0 && esp_codigo > 0) {
                const especialidade = new Especialidade(esp_codigo);
                const disciplina = new Disciplina(0, descricao, preco, duracao, especialidade);
                // Resolver a promise
                disciplina.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": disciplina.codigo,
                        "mensagem": "Disciplina incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a disciplina: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, envie os dados da disciplina segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma disciplina!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            const preco = dados.preco;
            const duracao = dados.duracao;
            const esp_codigo = dados.especialidade.codigo;

            if (codigo && descricao && preco > 0 && duracao > 0 && esp_codigo > 0) {
                const especialidade = new Especialidade(esp_codigo);
                const disciplina = new Disciplina(codigo, descricao, preco, duracao, especialidade);
                // Resolver a promise
                disciplina.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Disciplina atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a disciplina: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da disciplina segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma disciplina!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const disciplina = new Disciplina(codigo);
                // Resolver a promise
                disciplina.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Disciplina excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a disciplina: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da disciplina!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma disciplina!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        // express, por meio do controle de rotas, será
        // preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const disciplina = new Disciplina();
            disciplina.consultar(termo).then((listaDisciplinas) => {
                resposta.json({
                    status: true,
                    listaDisciplinas
                });
            })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter as disciplinas: " + erro.message
                    });
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar disciplinas!"
            });
        }
    }
}
