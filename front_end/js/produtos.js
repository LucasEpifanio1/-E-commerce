async function carregarProdutos() {
  try {
    // Rota correta para LISTAR produtos
    const response = await fetch("http://localhost:3000/produtos");
    const produtos = await response.json();

    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";

    produtos.forEach(produto => {
      lista.innerHTML += `
        <div class="card">
          <img src="${produto.foto_url}" alt="${produto.nome}">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <span class="preco">R$ ${produto.preco}</span>
        </div>
      `;
    });

  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

// Chama a função quando abrir a página
carregarProdutos();
