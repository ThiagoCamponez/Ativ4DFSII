export default class ItemMatricula {
    #disciplina;
    #quantidade;
    #precoUnitario;
    #subtotal;

    constructor(disciplina, quantidade, precoUnitario, subtotal) {
        this.#disciplina = disciplina;
        this.#quantidade = quantidade;
        this.#precoUnitario = precoUnitario;
        this.#subtotal = quantidade * precoUnitario;
    }

    // Métodos de acesso (get) e modificação (set)
    get disciplina() {
        return this.#disciplina;
    }

    set disciplina(novaDisciplina) {
        this.#disciplina = novaDisciplina;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }

    get precoUnitario() {
        return this.#precoUnitario;
    }

    set precoUnitario(novoPrecoUnitario) {
        this.#precoUnitario = novoPrecoUnitario;
    }

    get subtotal() {
        this.#subtotal = this.#quantidade * this.#precoUnitario;
        return this.#subtotal;
    }

    // JSON
    toJSON() {
        return {
            'disciplina': this.#disciplina,
            'quantidade': this.#quantidade,
            'precoUnitario': this.#precoUnitario,
            'subtotal': this.#subtotal
        };
    }
}
