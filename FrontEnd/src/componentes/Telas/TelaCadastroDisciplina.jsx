import { Alert } from "react-bootstrap";
import FormCadDisciplinas from "./Formularios/FormCadDisciplina";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaDisciplinas from "./Tabelas/TabelaDisciplinas";
import { consultarTodos } from "../../servicos/disciplinaService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroDisciplina(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState({
        codigo: 0,
        descricao: "",
        especialidade: {
            codigo: 0,
            descricao: ""
        }
    });

    const [listaDeDisciplinas, setListaDeDisciplinas] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token).then((resposta) => {
            if (resposta.status) {
                setListaDeDisciplinas(resposta.listaDisciplinas);
            } else {
                alert(resposta.mensagem);
            }
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [atualizarTela, exibirTabela]);

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Disciplinas</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaDisciplinas
                            listaDeDisciplinas={listaDeDisciplinas}
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            setDisciplinaSelecionada={setDisciplinaSelecionada}
                            setAtualizarTela={setAtualizarTela} /> :
                        <FormCadDisciplinas
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao}
                            modoEdicao={modoEdicao}
                            setDisciplinaSelecionada={setDisciplinaSelecionada}
                            disciplinaSelecionada={disciplinaSelecionada}
                            setAtualizarTela={setAtualizarTela} />
                }
            </Pagina>
        </div>
    );
}
