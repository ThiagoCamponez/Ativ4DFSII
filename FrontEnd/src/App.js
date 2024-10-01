import TelaCadastroDisciplina from "./componentes/Telas/TelaCadastroDisciplina";
import TelaCadastroEspecialidade from "./componentes/Telas/TelaCadastroEspecialidade";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import TelaLogin from "./componentes/Telas/TelaLogin";
import TelaCadastroMatricula from "./componentes/Telas/TelaCadastroMatricula"; // Alterado para Matricula
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

export const ContextoUsuarioLogado = createContext(null);

function App() {
  
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "",
    logado: false,
    token: ""
  });

  return (
    !usuarioLogado.logado ? 
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      <TelaLogin />
    </ContextoUsuarioLogado.Provider> :
    <div className="App">
      <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
        <BrowserRouter>
          <Routes>
            <Route path="/disciplina" element={<TelaCadastroDisciplina />} /> {/* Alterado para Disciplina */}
            <Route path="/especialidade" element={<TelaCadastroEspecialidade />} /> {/* Alterado para Especialidade */}
            <Route path="/matricula" element={<TelaCadastroMatricula />} /> {/* Alterado para Matricula */}
            <Route path="/" element={<TelaMenu />} />
            <Route path="*" element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </ContextoUsuarioLogado.Provider>
    </div>
  );
}

export default App;
