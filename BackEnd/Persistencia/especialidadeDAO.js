import Especialidade from "../Modelo/especialidade.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class EspecialidadeDAO {

    constructor() {
        this.init();
    }
    
    async init() {
        try {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS especialidade(
                    esp_codigo INT NOT NULL AUTO_INCREMENT,
                    esp_descricao VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_especialidade PRIMARY KEY(esp_codigo)
                );`;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao); 
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(especialidade) {
        if (especialidade instanceof Especialidade) {
            const sql = "INSERT INTO especialidade(esp_descricao) VALUES(?)"; 
            const parametros = [especialidade.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql, parametros); //prepara a sql e depois executa
            especialidade.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(especialidade) {
        if (especialidade instanceof Especialidade) {
            const sql = "UPDATE especialidade SET esp_descricao = ? WHERE esp_codigo = ?"; 
            const parametros = [especialidade.descricao, especialidade.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql, parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(especialidade) {
        if (especialidade instanceof Especialidade) {
            const sql = "DELETE FROM especialidade WHERE esp_codigo = ?"; 
            const parametros = [especialidade.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql, parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        
        if (!isNaN(parseInt(parametroConsulta))) {
            //consultar pelo código da especialidade
            sql = 'SELECT * FROM especialidade WHERE esp_codigo = ? order by esp_descricao';
            parametros = [parametroConsulta];
        } else {
            //consultar pela descricao
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM especialidade WHERE esp_descricao like ?";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);

        let listaEspecialidades = [];
        for (const registro of registros) {
            const especialidade = new Especialidade(registro.esp_codigo, registro.esp_descricao);
            listaEspecialidades.push(especialidade);
        }
        return listaEspecialidades;
    }

    async possuiDisciplinas(especialidade) {
        if (especialidade instanceof Especialidade) {
            const sql = `SELECT count(*) as qtd FROM disciplina d
                         INNER JOIN especialidade e ON d.esp_codigo = e.esp_codigo
                         WHERE e.esp_codigo = ?`;
            const parametros = [especialidade.codigo];
            const conexao = await conectar();
            const [registros] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
            return registros[0].qtd > 0;
        }
    }
}
