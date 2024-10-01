import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import CaixaSelecao from '../../busca/CaixaSelecao';
import { useState, useContext } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { alterar, gravar } from '../../../servicos/disciplinaService';

export default function FormCadDisciplinas(props) {

    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(props.disciplinaSelecionada.especialidade);
    const [disciplina, setDisciplina] = useState(props.disciplinaSelecionada);
    const [validado, setValidado] = useState(false);

    function manipularMudanca(evento) {
        setDisciplina({
            ...disciplina,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento) {
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const dados = { ...disciplina, especialidade: especialidadeSelecionada };
            if (!props.modoEdicao) {
                gravar(dados, token).then((resposta) => {
                    alert(resposta.mensagem);
                    if (resposta.status) {
                        props.setExibirTabela(true);
                    }
                }).catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                });
            }
            else {
                alterar(dados, token).then((resposta) => {
                    alert(resposta.mensagem);
                    props.setModoEdicao(false);
                    setDisciplina({
                        codigo: 0,
                        descricao: "",
                        preco: 0,
                        duracao: 0,
                        especialidade: {
                            codigo: 0,
                            descricao: ""
                        }
                    });
                    props.setDisciplinaSelecionada({
                        codigo: 0,
                        descricao: "",
                        preco: 0,
                        duracao: 0,
                        especialidade: {
                            codigo: 0,
                            descricao: ""
                        }
                    });
                }).catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                });
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.stopPropagation();
        evento.preventDefault();
    }

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={disciplina.codigo}
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código da disciplina!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={disciplina.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição da disciplina!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="6">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        id="preco"
                        name="preco"
                        value={disciplina.preco}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o preço da disciplina!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Duração (em horas)</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        id="duracao"
                        name="duracao"
                        value={disciplina.duracao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a duração da disciplina!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Col md={8}>
                    <Form.Label>Especialidade:</Form.Label>
                    <CaixaSelecao enderecoFonteDados={"http://localhost:4000/especialidade"} 
                                  campoChave={"codigo"}
                                  campoExibicao={"descricao"}
                                  funcaoSelecao={setEspecialidadeSelecionada}
                                  localLista={"listaEspecialidades"}
                                  tokenAcesso={contextoUsuario.usuarioLogado.token} />
                </Col>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? 'Alterar' : 'Cadastrar'}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
        </Form>
    );
}
