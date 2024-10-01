import EspecialidadeDAO from "../Persistencia/especialidadeDAO.js";
//não esqueça do .js no final da importação

export default class Especialidade {
    //definição dos atributos privados
    #codigo;
    #descricao;

    constructor(codigo = 0, descricao = '') {
        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    //métodos de acesso públicos

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDesc) {
        this.#descricao = novaDesc;
    }

    //override do método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao
        };
    }

    //camada de modelo acessa a camada de persistencia
    async gravar() {
        const espDAO = new EspecialidadeDAO();
        await espDAO.gravar(this);
    }

    async excluir() {
        const espDAO = new EspecialidadeDAO();
        await espDAO.excluir(this);
    }

    async atualizar() {
        const espDAO = new EspecialidadeDAO();
        await espDAO.atualizar(this);
    }

    async consultar(parametro) {
        const espDAO = new EspecialidadeDAO();
        return await espDAO.consultar(parametro);
    }

    async possuiDisciplinas() {
        const espDAO = new EspecialidadeDAO();
        return await espDAO.possuiDisciplinas(this);
    }
}
