// =======================================================
// PRODUTOS.JS — COMPLETO (filtro, pesquisa e ordenação)
// =======================================================

// Lista completa de produtos
let todosProdutos = [];

// -------------------------------------------------------
// 1. Carregar produtos do backend
// -------------------------------------------------------
async function carregarProdutos() {
  try {
    const response = await fetch("http://localhost:3000/produtos");
    todosProdutos = await response.json();
    exibirProdutos(todosProdutos);
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

// -------------------------------------------------------
// 2. Exibir produtos na página
// -------------------------------------------------------
function exibirProdutos(produtos) {
  const lista = document.getElementById("lista-produtos");
  const msg = document.getElementById("msg-cat");

  lista.innerHTML = "";
  msg.innerHTML = "";

  if (!produtos || produtos.length === 0) {
    msg.textContent = "Nenhum produto encontrado.";
    return;
  }

  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${produto.foto_url}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <span class="preco">R$ ${produto.preco}</span>
    `;

    lista.appendChild(card);
  });
}

// -------------------------------------------------------
// 3. Filtrar produtos por categoria
// -------------------------------------------------------
function filtrarProdutos() {
  const categoriaSelecionada = document.getElementById("categoria").value;

  if (categoriaSelecionada === "0") {
    exibirProdutos(todosProdutos);
    return;
  }

  const filtrados = todosProdutos.filter(
    p => p.categoria_id == categoriaSelecionada
  );

  exibirProdutos(filtrados);
}

// Listener do select de categoria
document.getElementById("categoria")?.addEventListener("change", filtrarProdutos);

// -------------------------------------------------------
// 4. Buscar produto pelo nome
// -------------------------------------------------------
async function buscarProduto() {
  const termo = document.getElementById("campoBusca").value.trim();

  if (termo === "") {
    exibirProdutos(todosProdutos);
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/produtos/pesquisar?q=${termo}`);
    const encontrados = await response.json();
    exibirProdutos(encontrados);
  } catch (erro) {
    console.error("Erro na busca:", erro);
  }
}

// Enter ativa a busca
document.getElementById("campoBusca")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") buscarProduto();
});

// Botão ativa a busca
document.getElementById("btnBuscar")?.addEventListener("click", buscarProduto);

// -------------------------------------------------------
// 5. Ordenação por preço
// -------------------------------------------------------
function ordenarProdutos() {
  const select = document.getElementById("ordenar").value;
  let listaOrdenada = [...todosProdutos];

  if (select === "menor") {
    listaOrdenada.sort((a, b) => a.preco - b.preco);
  }

  if (select === "maior") {
    listaOrdenada.sort((a, b) => b.preco - a.preco);
  }

  exibirProdutos(listaOrdenada);
}

// Listener do select de ordenação
document.getElementById("ordenar")?.addEventListener("change", ordenarProdutos);

// -------------------------------------------------------
// 6. Inicializar tudo
// -------------------------------------------------------
carregarProdutos();
