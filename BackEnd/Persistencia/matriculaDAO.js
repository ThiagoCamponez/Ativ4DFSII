import Matricula from "../Modelo/matricula.js";
import Aluno from "../Modelo/aluno.js";
import Especialidade from "../Modelo/especialidade.js";
import Disciplina from "../Modelo/disciplina.js";
import ItemMatricula from "../Modelo/itemMatricula.js";
import conectar from "./conexao.js";

export default class MatriculaDAO {
    async gravar(matricula) {
        // Uma matrícula no banco de dados grava registro na tabela matrícula e também na tabela matricula_disciplina
        if (matricula instanceof Matricula) {
            const conexao = await conectar();
            // garantir a transação das operações para que seja realizada de forma atômica
            await conexao.beginTransaction();
            try {
                // inserir na tabela matricula
                const sql = 'INSERT INTO matricula(aluno_cpf, data_matricula, total) VALUES(?,str_to_date(?,"%d/%m/%Y"),?)';
                const parametros = [matricula.aluno.cpf, matricula.data, matricula.total];
                const retorno = await conexao.execute(sql, parametros);
                matricula.codigo = retorno[0].insertId;
                // inserir na tabela item matricula
                const sql2 = 'INSERT INTO matricula_disciplina(matricula_codigo, disciplina_codigo, quantidade, preco_unitario) VALUES(?,?,?,?)';
                for (const item of matricula.itens) {
                    let parametros2 = [matricula.codigo, item.disciplina.codigo, item.quantidade, item.precoUnitario];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit(); //se chegou até aqui sem erros, confirmaremos as inclusões
                global.poolConexoes.releaseConnection(conexao);
            } catch (error) {
                await conexao.rollback(); //voltar o banco de dados ao estado anterior
                throw error; //throw = lançar
            }
        }
    }

    async alterar(matricula) {
        // Implementação do método alterar
    }

    async excluir(matricula) {
        const conexao = await conectar();
        try {
            await conexao.beginTransaction();

            // Excluir primeiro os itens relacionados na tabela matricula_disciplina
            const sql1 = 'DELETE FROM matricula_disciplina WHERE matricula_codigo = ?';
            await conexao.execute(sql1, [matricula.codigo]);

            // Excluir a matrícula na tabela matricula
            const sql2 = 'DELETE FROM matricula WHERE codigo = ?';
            await conexao.execute(sql2, [matricula.codigo]);

            await conexao.commit();
            global.poolConexoes.releaseConnection(conexao);

        } catch (error) {
            await conexao.rollback(); // Desfazer as operações caso haja erro
            global.poolConexoes.releaseConnection(conexao);
            throw error;
        }
    }

    async consultar(termoBusca) {
        const listaMatriculas = [];
        const conexao = await conectar();
        let sql = "";
        let parametros = [];

        if (!isNaN(termoBusca)) { // Assegurando que seja um código de matrícula do tipo inteiro
            sql = `SELECT m.codigo, m.aluno_cpf, m.data_matricula, m.total,
                        a.nome, a.endereco, a.telefone,
                        disc.disc_descricao, disc.disc_preco, disc.disc_duracao,
                        esp.esp_codigo, esp.esp_descricao,
                        i.disciplina_codigo, i.quantidade, i.preco_unitario, i.quantidade * i.preco_unitario as subtotal
                    FROM matricula as m
                    INNER JOIN aluno as a ON m.aluno_cpf = a.cpf
                    INNER JOIN matricula_disciplina as i ON i.matricula_codigo = m.codigo
                    INNER JOIN disciplina as disc ON disc.disc_codigo = i.disciplina_codigo
                    INNER JOIN especialidade as esp ON disc.esp_codigo = esp.esp_codigo
                    WHERE m.codigo = ?`;
            parametros = [termoBusca];
        } else {
            sql = `SELECT m.codigo, m.aluno_cpf, m.data_matricula, m.total,
                        a.nome, a.endereco, a.telefone,
                        disc.disc_descricao, disc.disc_preco, disc.disc_duracao,
                        esp.esp_codigo, esp.esp_descricao,
                        i.disciplina_codigo, i.quantidade, i.preco_unitario, i.quantidade * i.preco_unitario as subtotal
                    FROM matricula as m
                    INNER JOIN aluno as a ON m.aluno_cpf = a.cpf
                    INNER JOIN matricula_disciplina as i ON i.matricula_codigo = m.codigo
                    INNER JOIN disciplina as disc ON disc.disc_codigo = i.disciplina_codigo
                    INNER JOIN especialidade as esp ON disc.esp_codigo = esp.esp_codigo
                    ORDER BY m.codigo`; // Adicionando ORDER BY para garantir a ordem das matrículas
        }

        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        if (registros.length > 0) {
            let matriculaAtual = null;

            for (const registro of registros) {
                // Verifica se já estamos tratando a matrícula atual
                if (!matriculaAtual || matriculaAtual.codigo !== registro.codigo) {
                    // Cria uma nova matrícula, se a matrícula atual for diferente ou nula
                    const aluno = new Aluno(
                        registro.aluno_cpf,
                        registro.nome,
                        registro.telefone,
                        registro.endereco
                    );

                    matriculaAtual = new Matricula(
                        registro.codigo,
                        aluno,
                        new Date(registro.data_matricula).toLocaleDateString('pt-BR'),
                        registro.total,
                        []
                    );

                    listaMatriculas.push(matriculaAtual); // Adiciona a nova matrícula à lista
                }

                // Adiciona os itens à matrícula atual
                const especialidade = new Especialidade(registro.esp_codigo, registro.esp_descricao);
                const disciplina = new Disciplina(
                    registro.disciplina_codigo,
                    registro.disc_descricao,
                    registro.disc_preco,
                    registro.disc_duracao,
                    especialidade
                );

                const itemMatricula = new ItemMatricula(
                    disciplina,
                    registro.quantidade,
                    registro.preco_unitario,
                    registro.subtotal
                );

                matriculaAtual.itens.push(itemMatricula); // Adiciona o item à matrícula atual
            }
        }

        return listaMatriculas;
    }
}
