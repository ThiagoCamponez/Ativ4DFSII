import Aluno from '../Modelo/aluno.js';

// Esta classe irá manipular/controlar a entidade Aluno
export default class AlunoCTRL {

    // Método responsável por gravar os dados de um aluno
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;

            if (cpf && nome && endereco && bairro && cidade && uf && telefone && email) {
                // Gravar esse aluno
                const aluno = new Aluno(cpf, nome, endereco, bairro, cidade, uf, telefone, email);
                
                // Método assíncrono gravar que instancia a camada de persistência e grava um aluno no banco de dados
                aluno.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Aluno gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um aluno conforme documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou aluno no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    // Requisição HTTP do tipo PUT
    atualizar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;

            if (cpf && nome && endereco && bairro && cidade && uf && telefone && email) {
                // Atualizar esse aluno
                const aluno = new Aluno(cpf, nome, endereco, bairro, cidade, uf, telefone, email);

                // Método assíncrono atualizar que instancia a camada de persistência e atualiza um aluno no banco de dados
                aluno.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Aluno atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um aluno conforme documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou aluno no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;

            if (cpf) {
                // Excluir esse aluno
                const aluno = new Aluno(cpf);

                // Método assíncrono remover que instancia a camada de persistência e exclui um aluno no banco de dados
                aluno.removerDoBancoDados().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Aluno excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do aluno conforme documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou aluno no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            const aluno = new Aluno();

            // Método assíncrono que recupera os alunos do banco de dados
            aluno.consultar('').then((alunos) => {
                resposta.status(200).json({
                    status: true,
                    listaAlunos: alunos
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API"
            });
        }
    }

    // GET http://localhost:3000/alunos/111.111.111-11
    consultarPeloCPF(requisicao, resposta) {
        resposta.type("application/json");

        const cpf = requisicao.params['cpf'];

        if (requisicao.method === "GET") {
            const aluno = new Aluno();

            // Método assíncrono que recupera os alunos do banco de dados pelo CPF
            aluno.consultarCPF(cpf).then((aluno) => {
                resposta.status(200).json({
                    status: true,
                    listaAlunos: aluno
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API"
            });
        }
    }
}
