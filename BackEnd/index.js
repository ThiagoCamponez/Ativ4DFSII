import express from 'express';
import cors from 'cors';
import rotaEspecialidade from './Rotas/rotaEspecialidade.js';
import rotaDisciplina from './Rotas/rotaDisciplina.js';
import session from 'express-session';
import dotenv from 'dotenv';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import { verificarAutenticacao } from './Seguranca/autenticar.js';
import rotaMatricula from './Rotas/rotaMatricula.js';
import rotaAluno from './Rotas/rotaAluno.js';

dotenv.config(); // Carrega as variáveis de ambiente extraindo elas do arquivo .env

const host = '0.0.0.0';
const porta = 4000;

const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: true, // A cada requisição a sessão precisa ser atualizada
    saveUninitialized: true, // Salvar sessões não iniciadas
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 1000 * 60 * 15 // Tempo máximo de ociosidade para considerar a sessão vencida
    }
}));

app.use(cors({
    credentials: true, // Middleware para passar "Access-Control-Allow-Credentials" no cabeçalho das requisições
    origin: ["http://localhost:3000", "http://192.168.0.101:3000"],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Atualização das rotas
app.use('/especialidade', verificarAutenticacao, rotaEspecialidade);
app.use('/disciplina', verificarAutenticacao, rotaDisciplina);
app.use('/aluno', verificarAutenticacao, rotaAluno);
app.use('/matricula', verificarAutenticacao, rotaMatricula);
app.use('/autenticacao', rotaAutenticacao);

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});
