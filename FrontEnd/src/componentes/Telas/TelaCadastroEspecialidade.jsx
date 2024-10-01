import { Alert } from "react-bootstrap";
import FormCadEspecialidade from "./Formularios/FormCadEspecialidade";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaEspecialidades from "./Tabelas/TabelaEspecialidades";
import { consultarTodos } from "../../servicos/especialidadeService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroEspecialidade(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState({ codigo: 0, descricao: "" });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaDeEspecialidades, setListaDeEspecialidades] = useState([]);

    useEffect(() => {
        consultarTodos(contextoUsuario.usuarioLogado.token).then((resposta) => {
            if (resposta.status) {
                setListaDeEspecialidades(resposta.listaEspecialidades);
            } else {
                alert(resposta.mensagem);
            }
        })
    }, [listaDeEspecialidades]);

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Especialidades</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaEspecialidades
                            listaDeEspecialidades={listaDeEspecialidades}
                            setExibirTabela={setExibirTabela}
                            especialidadeSelecionada={especialidadeSelecionada}
                            setEspecialidadeSelecionada={setEspecialidadeSelecionada}
                            setModoEdicao={setModoEdicao} /> :
                        <FormCadEspecialidade
                            setExibirTabela={setExibirTabela}
                            especialidadeSelecionada={especialidadeSelecionada}
                            setEspecialidadeSelecionada={setEspecialidadeSelecionada}
                            setModoEdicao={setModoEdicao}
                            modoEdicao={modoEdicao} />
                }
            </Pagina>
        </div>
    );
}
