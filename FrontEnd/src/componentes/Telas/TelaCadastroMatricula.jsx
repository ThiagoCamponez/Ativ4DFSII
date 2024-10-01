import Pagina from "../Templates/Pagina";
import FormCadMatricula from "./Formularios/FormCadMatricula";
import TabelaMatriculas from "./Tabelas/TabelaMatriculas";
import { useState, useEffect, useContext } from "react";
import { buscaTodasMatriculas } from "../../servicos/matriculaService"; // Certifique-se de ter o service correto para matriculas
import { ContextoUsuarioLogado } from "../../App";

export default function TelaMatricula(props) {

    const contextoUsuario = useContext(ContextoUsuarioLogado);

    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizarTela, setAtualizarTela] = useState(false); // Estado para atualizar a tela
    const [listaDeMatriculas, setListaDeMatriculas] = useState([]); // Ajustado para "matriculas"

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        buscaTodasMatriculas(token).then((resposta) => {
            if (resposta.status) {
                setListaDeMatriculas(resposta.listaMatriculas); // Corrigido para listaMatriculas
            } else {
                alert(resposta.mensagem);
            }
        }).catch((erro) => {
            alert("Erro ao enviar a requisição: " + erro.message);
        });
    }, [contextoUsuario.usuarioLogado.token, exibirTabela]); // Dependência do token

    return (
        <Pagina>
            <h1 className="mb-02 text-center">Gestão de Matrículas</h1>
            {
                exibirTabela ? 
                <TabelaMatriculas 
                    exibirTabela={exibirTabela} 
                    setExibirTabela={setExibirTabela}
                    listaDeMatriculas={listaDeMatriculas} // Ajustado para "matriculas"
                    setAtualizarTela={setAtualizarTela} // Passar prop para atualizar a tela
                /> 
                : 
                <FormCadMatricula 
                    exibirTabela={exibirTabela} 
                    setExibirTabela={setExibirTabela}
                    setAtualizarTela={setAtualizarTela} // Passar prop para atualizar a tela após cadastro
                />
            }
        </Pagina>
    );
}
