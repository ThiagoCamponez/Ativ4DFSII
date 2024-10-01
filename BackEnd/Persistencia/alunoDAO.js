import Aluno from '../Modelo/aluno.js';
import conectar from "./conexao.js";

export default class AlunoDAO {

    async incluir(aluno) {
        if (aluno instanceof Aluno) {
            const conexao = await conectar();
            const sql = "INSERT INTO aluno(cpf, nome, endereco, bairro, cidade, \
                                           estado, telefone, email) \
                                           VALUES(?,?,?,?,?,?,?,?)";
            const valores = [aluno.cpf, aluno.nome, aluno.endereco,
                             aluno.bairro, aluno.cidade, aluno.uf,
                             aluno.telefone, aluno.email];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(aluno) {
        if (aluno instanceof Aluno) {
            const conexao = await conectar();
            const sql = "UPDATE aluno SET nome=?, endereco = ?,bairro = ?, \
                                      cidade = ?, estado = ?,telefone = ?, email = ? \
                       WHERE cpf=?";
            const valores = [aluno.nome, aluno.endereco,
                             aluno.bairro, aluno.cidade, aluno.uf,
                             aluno.telefone, aluno.email, aluno.cpf];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(aluno) {
        if (aluno instanceof Aluno) {
            const conexao = await conectar();
            const sql = "DELETE FROM aluno WHERE cpf=?";
            const valores = [aluno.cpf];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM aluno WHERE nome LIKE ?";
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaAlunos = [];
        for (const row of rows) {
            const aluno = new Aluno(row['cpf'], row['nome'],
                row['endereco'], row['bairro'], row['cidade'], row['estado'],
                row['telefone'], row['email']);
            listaAlunos.push(aluno);
        }
        return listaAlunos;
    }

    async consultarCPF(cpf) {
        const conexao = await conectar();
        const sql = "SELECT * FROM aluno WHERE cpf = ?";
        const valores = [cpf];
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaAlunos = [];
        for (const row of rows) {
            const aluno = new Aluno(row['cpf'], row['nome'],
                row['endereco'], row['bairro'], row['cidade'], row['estado'],
                row['telefone'], row['email']);
            listaAlunos.push(aluno);
        }
        return listaAlunos;
    }
}
