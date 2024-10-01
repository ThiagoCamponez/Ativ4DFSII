import { Button, Container, Table } from "react-bootstrap";
import { useContext } from "react";
import { ContextoUsuarioLogado } from "../../../App";
import { excluirMatricula } from "../../../servicos/matriculaService";

export default function TabelaMatriculas(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function handleExcluirMatricula(matricula) {
        const token = contextoUsuario.usuarioLogado.token;
        if (window.confirm(`Deseja excluir a matrícula do aluno ${matricula.aluno.nome}?`)) {
            excluirMatricula(matricula, token)
                .then((resposta) => {
                    props.setAtualizarTela(true);
                    alert(resposta.mensagem);
                }).catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                });
        }
    }

    return (
        <Container>
            <Button className="mb-3" variant="primary"
                onClick={() => {
                    props.setExibirTabela(false);
                }}>
                Adicionar Matrícula
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Aluno</th>
                        <th>Data da Matrícula</th>
                        <th>Total da Matrícula</th>
                        <th>Qtd. de disciplinas matriculadas</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.listaDeMatriculas?.map((matricula) => {
                        return (
                            <tr key={matricula.codigo}>
                                <td>{matricula.codigo}</td>
                                <td>{matricula.aluno.nome}</td>
                                <td>{matricula.data}</td>
                                <td>{matricula.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                <td>{matricula.itens.length}</td>
                                <td>
                                    <Button variant="warning">
                                        Alterar
                                    </Button>{' '}
                                    <Button variant="danger"
                                        onClick={() => handleExcluirMatricula(matricula)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </Container>
    );
}
