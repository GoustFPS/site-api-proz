// Captura de elementos
const nomeProduto = document.getElementById('nome-produto');
const valorProduto = document.getElementById('valor-produto');
const descricaoProduto = document.getElementById('descricao-produto');
const btnEnviar = document.getElementById('btn-enviar');
const feedbackUsuario = document.getElementById('feedback-usuario')
const produtosCadastrados = document.getElementById('produtos-cadastrados')

// 2. Funções
function gerarPost(e){
    feedbackUsuario.innerText = ''
    e.preventDefault()
    const jsonBody = JSON.stringify({
        produto: nomeProduto.value,
        valor: valorProduto.value,
        desc: descricaoProduto.value
    })
    // API passada na atividade não retorna valor https://httpbin.org/post
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: jsonBody
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)

        const post = document.createElement('div')
        post.classList.add('postagem')
        post.innerHTML = `
        ID: ${data.id} <h2>Produto: ${data.produto}</h2> <h3>R$: ${data.valor}</h3>
        Descrição:<p><strong>${data.desc}</strong></p>
        `
        produtosCadastrados.appendChild(post)
        // limpar formulário
nomeProduto.value = ''
valorProduto.value = ''
descricaoProduto.value = ''
alert('Postagem criada com sucesso!')
    })
    .catch((error) => {
        console.log(error)
        feedbackUsuario.innerText = 'Não foi possível gerar a postagem'
    })
}
// 3. Eventos
btnEnviar.addEventListener('click', (e) => gerarPost(e))
