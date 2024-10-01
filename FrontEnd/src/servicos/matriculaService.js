const urlBase = "http://localhost:4000/matricula";

export async function gravarMatricula(matricula, token) {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        credentials: 'include',
        body: JSON.stringify(matricula)
    });
    return await resposta.json();
}

export async function buscaTodasMatriculas(token) {
    const resposta = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Authorization": token
        },
        credentials: 'include'
    });
    return await resposta.json();
}

export async function excluirMatricula(matricula, token) {
    const resposta = await fetch(`${urlBase}/${matricula.codigo}`, {  // Adiciona o ID na URL
        method: "DELETE",
        headers: {
            "Authorization": token
        },
        credentials: 'include'
    });

    return await resposta.json();
}
