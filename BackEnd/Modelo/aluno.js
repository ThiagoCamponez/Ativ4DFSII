import AlunoDAO from '../Persistencia/alunoDAO.js';

export default class Aluno {

    #cpf;  //# define que um atributo seja privado
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #telefone;
    #email;

    //método construtor que define as informações necessárias para se criar um aluno
    constructor(cpf, nome, endereco, bairro, cidade, uf, telefone, email) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#telefone = telefone;
        this.#email = email;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        if (novoNome != "") //regra de negócio que impede que alunos existam com nomes vazios
            this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEnd) {
        this.#endereco = novoEnd;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get uf() {
        return this.#uf;
    }

    set uf(novaUf) {
        this.#uf = novaUf;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTel) {
        this.#telefone = novoTel;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    //override ou sobrescrita do método toJSON
    toJSON() {
        return {
            "cpf": this.#cpf,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "telefone": this.#telefone,
            "email": this.#email
        }
    }

    async gravar() {
        const alunoDAO = new AlunoDAO();
        await alunoDAO.incluir(this);
    }

    async atualizar() {
        const alunoBD = new AlunoDAO();
        await alunoBD.alterar(this);
    }

    async removerDoBancoDados() {
        const alunoBD = new AlunoDAO();
        await alunoBD.excluir(this);
    }

    async consultar(termo) {
        const alunoBD = new AlunoDAO();
        const alunos = await alunoBD.consultar(termo);
        return alunos;
    }

    async consultarCPF(cpf) {
        const alunoBD = new AlunoDAO();
        const alunos = await alunoBD.consultarCPF(cpf);
        return alunos;
    }
}
