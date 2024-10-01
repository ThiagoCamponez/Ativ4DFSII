import DisciplinaDAO from "../Persistencia/disciplinaDAO.js";
import Especialidade from "./especialidade.js";

export default class Disciplina {
    #codigo;
    #descricao;
    #preco;
    #duracao;
    #especialidade;

    constructor(codigo = 0, descricao = "", preco = 0, duracao = 0, especialidade = null) {
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#preco = preco;
        this.#duracao = duracao;
        this.#especialidade = especialidade;
    }

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

    get preco() {
        return this.#preco;
    }

    set preco(novoPreco) {
        this.#preco = novoPreco;
    }

    get duracao() {
        return this.#duracao;
    }

    set duracao(novaDuracao) {
        this.#duracao = novaDuracao;
    }

    get especialidade() {
        return this.#especialidade;
    }

    set especialidade(novaEsp) {
        if (novaEsp instanceof Especialidade) {
            this.#especialidade = novaEsp;
        }
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao,
            preco: this.#preco,
            duracao: this.#duracao,
            especialidade: this.#especialidade
        };
    }

    //camada de modelo acessa a camada de persistencia
    async gravar() {
        const discDAO = new DisciplinaDAO();
        await discDAO.gravar(this);
    }

    async excluir() {
        const discDAO = new DisciplinaDAO();
        await discDAO.excluir(this);
    }

    async alterar() {
        const discDAO = new DisciplinaDAO();
        await discDAO.atualizar(this);
    }

    async consultar(termo) {
        const discDAO = new DisciplinaDAO();
        return await discDAO.consultar(termo);
    }
}
