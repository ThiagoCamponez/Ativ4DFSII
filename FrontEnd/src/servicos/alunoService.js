export async function buscarTodosAlunos(token) {
    
    const resposta = await fetch("http://localhost:4000/aluno",
        {
            method: "GET",
            headers: {
                "Authorization": token
            },
            credentials: 'include'
        }
    );
    return await resposta.json();
}
