import { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import BarraBusca from "../../busca/BarraBusca";
import CaixaSelecao from "../../busca/CaixaSelecao";
import TabelaItensVenda from "../Tabelas/TabelaItensMatricula";
import { buscarTodosAlunos } from "../../../servicos/alunoService";
import { ContextoUsuarioLogado } from "../../../App";
import { gravarMatricula } from "../../../servicos/matriculaService";

export default function FormCadMatricula(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [validado, setValidado] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState({});
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState({});
    const [quantidade, setQuantidade] = useState(1);
    const [subTotal, setSubTotal] = useState(0.00);

    // Inicialize o estado matricula corretamente
    const [matricula, setMatricula] = useState({
        codigo: 0,
        dataMatricula: new Date().toISOString().substring(0, 10),
        totalMatricula: 0,
        aluno: {},
        disciplinas: [] // Deve ser um array
    });

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        buscarTodosAlunos(token).then((resposta) => {
            if (resposta.status) {
                setAlunos(resposta.listaAlunos);
            }
        });
    }, []); // didMount

    const manipularMudanca = (e) => {
        const { name, value } = e.target;
        setMatricula({ ...matricula, [name]: value });
    };

    const manipulaSubmissao = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const form = event.currentTarget;
        if (form.checkValidity()) {
            const dadosParaEnviar = {
                aluno: { cpf: alunoSelecionado.cpf }, // CPF do aluno selecionado
                dataMatricula: matricula.dataMatricula,
                totalMatricula: matricula.totalMatricula,
                itens: matricula.disciplinas.map(disciplina => ({
                    codigo: disciplina.codigo,
                    quantidade: disciplina.quantidade,
                    precoUnitario: disciplina.preco
                }))
            };
            
            const token = contextoUsuario.usuarioLogado.token;
            gravarMatricula(dadosParaEnviar, token).then((resposta) => {
                if (resposta.status) {
                    alert(resposta.mensagem + " Nº da matrícula: " + resposta.codigo);
                    props.setExibirTabela(true);
                } else {
                    alert(resposta.mensagem);
                }
            }).catch((erro) => {
                alert(erro.message);
            });
        } else {
            setValidado(true);
        }
    };

    return (
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="idMatricula">
                    <Form.Label>Matrícula nº</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="0"
                        defaultValue="0"
                        disabled
                        name="codigo" // Renomeie para "codigo"
                        value={matricula.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="dataMatricula">
                    <Form.Label>Data da Matrícula</Form.Label>
                    <Form.Control
                        type="date"
                        required
                        name="dataMatricula"
                        value={matricula.dataMatricula}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a data da matrícula.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="totalMatricula">
                    <Form.Label>Total da Matrícula</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="0,00"
                        value={matricula.totalMatricula}
                        name="totalMatricula"
                        required
                        disabled
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o valor total da matrícula
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="12" controlId="aluno">
                    <Form.Label>Aluno:</Form.Label>
                    <BarraBusca campoBusca={"nome"}
                        campoChave={"cpf"}
                        dados={alunos}
                        funcaoSelecao={(aluno) => {
                            setAlunoSelecionado(aluno);
                            setMatricula({ ...matricula, aluno: aluno });
                        }}
                        placeHolder={"Selecione um aluno"}
                        valor={""} />
                </Form.Group>
            </Row>
            <Row>
                <Container className="m-3 border">
                    <Row className="m-3">
                        <Col md={2}>
                            <Form.Label>Selecione uma disciplina</Form.Label>
                        </Col>
                        <Col>
                            <CaixaSelecao enderecoFonteDados={"http://localhost:4000/disciplina"}
                                campoChave={"codigo"}
                                campoExibicao={"descricao"}
                                funcaoSelecao={(item) => {
                                    setDisciplinaSelecionada(item);
                                    setQuantidade(1);
                                    setSubTotal(item.preco); // Supondo que 'preco' seja a propriedade correta
                                }}
                                localLista={'listaDisciplinas'}
                                tokenAcesso={contextoUsuario.usuarioLogado.token} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}>
                            <Row>
                                <Col md={1}>
                                    <Form.Group>
                                        <Form.Label>Código:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            value={disciplinaSelecionada?.codigo}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Descrição da Disciplina:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            value={disciplinaSelecionada?.descricao} />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Preço R$:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            value={disciplinaSelecionada?.preco} />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>Qtd</Form.Label>
                                        <Form.Control type="number"
                                            min={1}
                                            value={quantidade}
                                            onChange={(evento) => {
                                                const qtd = parseInt(evento.target.value);
                                                if (qtd > 0) {
                                                    setQuantidade(qtd);
                                                    if (disciplinaSelecionada) {
                                                        setSubTotal(disciplinaSelecionada.preco * qtd);
                                                    }
                                                }
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group>
                                        <Form.Label>SubTotal</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled
                                            value={Number(subTotal).toFixed(2)} />
                                    </Form.Group>
                                </Col>
                                <Col md={1} className="middle">
                                    <Form.Group>
                                        <Form.Label>Adicionar</Form.Label>
                                        <Button onClick={() => {
                                                if (disciplinaSelecionada) {
                                                    const subTotalFormatado = parseFloat(subTotal).toFixed(2);
                                                    setMatricula(prevMatricula => ({
                                                        ...prevMatricula,
                                                        disciplinas: [...prevMatricula.disciplinas, {
                                                            codigo: disciplinaSelecionada.codigo,
                                                            descricao: disciplinaSelecionada.descricao,
                                                            preco: disciplinaSelecionada.preco,
                                                            quantidade: quantidade,
                                                            subtotal: subTotalFormatado
                                                        }],
                                                        totalMatricula: (parseFloat(prevMatricula.totalMatricula) + parseFloat(subTotal)).toFixed(2)
                                                    }));
                                                }
                                            }}>

                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-bag-plus-fill"
                                                viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                            </svg>
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <p><strong>Lista de disciplinas escolhidas</strong></p>
                        <TabelaItensVenda
                            listaItens={matricula.disciplinas}
                            setMatricula={setMatricula}
                            dadosMatricula={matricula} />
                    </Row>
                </Container>
            </Row>
            <Button type="submit">Confirmar Matrícula</Button> 
            <Button variant="secondary"
                onClick={() => props.setExibirTabela(true)}>Cancelar</Button>
        </Form>
    );
}
