import MatriculaDAO from "../Persistencia/matriculaDAO.js";

export default class Matricula {
    #codigo;
    #aluno;
    #data;
    #total;
    #itens;

    constructor(codigo, aluno, data, total, itens) {
        this.#codigo = codigo;
        this.#aluno = aluno;
        this.#data = data;
        this.#total = total;
        this.#itens = itens;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }

    // Código do Aluno
    get aluno() {
        return this.#aluno;
    }

    set aluno(novoAluno) {
        this.#aluno = novoAluno;
    }

    // Data
    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    // Total da Matrícula
    get total() {
        return this.#total;
    }

    set total(novoTotal) {
        this.#total = novoTotal;
    }

    // Disciplinas
    get itens() {
        return this.#itens;
    }

    set itens(novosItens) {
        this.#itens = novosItens;
    }

    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'aluno': this.#aluno,
            'data': this.#data,
            'total': this.#total,
            'itens': this.#itens
        };
    }

    async gravar() {
        const matriculaDAO = new MatriculaDAO();
        this.codigo = await matriculaDAO.gravar(this);
    }

    async atualizar() {
        const matriculaDAO = new MatriculaDAO();
        await matriculaDAO.alterar(this);
    }

    async apagar() {
        const matriculaDAO = new MatriculaDAO();
        await matriculaDAO.deletar(this);
    }

    async consultar(termoBusca) {
        const matriculaDAO = new MatriculaDAO();
        const listaMatriculas = await matriculaDAO.consultar(termoBusca);
        return listaMatriculas;
    }
}
