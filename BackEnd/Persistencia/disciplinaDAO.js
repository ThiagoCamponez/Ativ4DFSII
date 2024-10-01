import Disciplina from '../Modelo/disciplina.js';
import Especialidade from '../Modelo/especialidade.js';
import conectar from './conexao.js';

export default class DisciplinaDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS disciplina(
                disc_codigo INT NOT NULL AUTO_INCREMENT,
                disc_descricao VARCHAR(100) NOT NULL,
                disc_preco DECIMAL(10,2) NOT NULL DEFAULT 0,
                disc_duracao INT NOT NULL, 
                esp_codigo INT NOT NULL,
                CONSTRAINT pk_disciplina PRIMARY KEY(disc_codigo),
                CONSTRAINT fk_especialidade FOREIGN KEY(esp_codigo) REFERENCES especialidade(esp_codigo)
            )
        `;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(disciplina) {
        if (disciplina instanceof Disciplina) {
            const sql = `INSERT INTO disciplina(disc_descricao, disc_preco, disc_duracao, esp_codigo)
                VALUES(?, ?, ?, ?)`;
            const parametros = [disciplina.descricao, disciplina.preco, disciplina.duracao, disciplina.especialidade.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            disciplina.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(disciplina) {
        if (disciplina instanceof Disciplina) {  
            const sql = `UPDATE disciplina SET disc_descricao = ?, disc_preco = ?, disc_duracao = ?, esp_codigo = ?
            WHERE disc_codigo = ?`;
            const parametros = [disciplina.descricao, disciplina.preco, disciplina.duracao, disciplina.especialidade.codigo, disciplina.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(disciplina) {
        if (disciplina instanceof Disciplina) {
            const sql = `DELETE FROM disciplina WHERE disc_codigo = ?`;
            const parametros = [disciplina.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo) {
            termo = "";
        }

        const conexao = await conectar();
        let listaDisciplinas = [];

        if (!isNaN(parseInt(termo))) {
            //consulta pelo código da disciplina
            const sql = `SELECT d.disc_codigo, d.disc_descricao, d.disc_preco, d.disc_duracao, e.esp_codigo, e.esp_descricao
                         FROM disciplina d 
                         INNER JOIN especialidade e ON d.esp_codigo = e.esp_codigo
                         WHERE d.disc_codigo = ?
                         ORDER BY d.disc_descricao`;
            const parametros = [termo];
            const [registros] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            for (const registro of registros) {
                const especialidade = new Especialidade(registro.esp_codigo, registro.esp_descricao);
                const disciplina = new Disciplina(registro.disc_codigo, registro.disc_descricao, registro.disc_preco, registro.disc_duracao, especialidade);
                listaDisciplinas.push(disciplina);
            }
        } else {
            //consulta pela descrição da disciplina
            const sql = `SELECT d.disc_codigo, d.disc_descricao, d.disc_preco, d.disc_duracao, e.esp_codigo, e.esp_descricao
                         FROM disciplina d 
                         INNER JOIN especialidade e ON d.esp_codigo = e.esp_codigo
                         WHERE d.disc_descricao like ?
                         ORDER BY d.disc_descricao`;
            const parametros = ['%' + termo + '%'];
            const [registros] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);

            for (const registro of registros) {
                const especialidade = new Especialidade(registro.esp_codigo, registro.esp_descricao);
                const disciplina = new Disciplina(registro.disc_codigo, registro.disc_descricao, registro.disc_preco, registro.disc_duracao, especialidade);
                listaDisciplinas.push(disciplina);
            }
        }

        return listaDisciplinas;
    }
}
