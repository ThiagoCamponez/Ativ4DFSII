// camada de interface da API que traduz HTTP
import Especialidade from "../Modelo/especialidade.js";

export default class EspecialidadeCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            if (descricao) {
                const especialidade = new Especialidade(0, descricao);
                // Resolver a promise
                especialidade.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": especialidade.codigo,
                        "mensagem": "Especialidade incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a especialidade: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição da especialidade!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma especialidade!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            if (codigo && descricao) {
                const especialidade = new Especialidade(codigo, descricao);
                // Resolver a promise
                especialidade.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Especialidade atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a especialidade: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e a descrição da especialidade!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma especialidade!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const especialidade = new Especialidade(codigo);
                especialidade.possuiDisciplinas().then(possui => {
                    if (possui == false) {
                        especialidade.excluir().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Especialidade excluída com sucesso!"
                            });
                        })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Erro ao excluir a especialidade: " + erro.message
                                });
                            });
                    } else {
                        resposta.status(400).json({
                            "status": false,
                            "mensagem": "Esta especialidade possui disciplinas e não pode ser excluída!"
                        });
                    }

                }); //possuiDisciplinas 
                //resolver a promise
                
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da especialidade!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma especialidade!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        // Express, por meio do controle de rotas, será
        // preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const especialidade = new Especialidade();
            especialidade.consultar(termo).then((listaEspecialidades) => {
                resposta.json({
                    status: true,
                    listaEspecialidades
                });
            })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível obter as especialidades: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar especialidades!"
            });
        }
    }
}
