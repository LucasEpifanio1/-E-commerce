// --------------------------------------
// Lista de produtos e carrinho
// --------------------------------------
let todosProdutos = [];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// --------------------------------------
// 1. Carregar produtos do backend
// --------------------------------------
async function carregarProdutos() {
  try {
    const response = await fetch("http://localhost:3000/produtos");
    todosProdutos = await response.json();
    exibirProdutos(todosProdutos);
    atualizarCarrinho();
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

// --------------------------------------
// 2. Exibir produtos no layout
// --------------------------------------
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

      <button onclick="adicionarCarrinho(${produto.id})" 
        style="margin-top:8px; padding:6px;">
        Adicionar ao Carrinho
      </button>
    `;

    lista.appendChild(card);
  });
}

// --------------------------------------
// 3. Filtrar produtos por categoria
// --------------------------------------
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

document.getElementById("categoria")?.addEventListener("change", filtrarProdutos);

// --------------------------------------
// 4. Buscar produtos pelo nome
// --------------------------------------
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

document.getElementById("campoBusca")?.addEventListener("keypress", e => {
  if (e.key === "Enter") buscarProduto();
});

document.getElementById("btnBuscar")?.addEventListener("click", buscarProduto);

// --------------------------------------
// 5. Ordenar por preço
// --------------------------------------
document.getElementById("ordenar")?.addEventListener("change", () => {
  const opcao = document.getElementById("ordenar").value;
  let listaOrdenada = [...todosProdutos];

  if (opcao === "menor") {
    listaOrdenada.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
  } else if (opcao === "maior") {
    listaOrdenada.sort((a, b) => parseFloat(b.preco) - parseFloat(a.preco));
  }

  exibirProdutos(listaOrdenada);
});

// --------------------------------------
// 6. Adicionar ao carrinho
// --------------------------------------
function adicionarCarrinho(id) {
  const produto = todosProdutos.find(p => p.id === id);
  if (!produto) return;

  carrinho.push(produto);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

// --------------------------------------
// 7. Remover do carrinho
// --------------------------------------
function removerCarrinho(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

// --------------------------------------
// 8. Atualizar a exibição do carrinho
// --------------------------------------
function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalTxt = document.getElementById("total-carrinho");

  if (!lista || !totalTxt) return; // segurança

  lista.innerHTML = "";

  let total = 0;

  carrinho.forEach((p, i) => {
    // Converter preço corretamente
    const preco = parseFloat(String(p.preco).replace(",", "."));
    total += preco;

    const item = document.createElement("div");
    item.style.borderBottom = "1px solid #ccc";
    item.style.marginBottom = "8px";
    item.style.paddingBottom = "6px";

    item.innerHTML = `
      <strong>${p.nome}</strong><br>
      R$ ${preco.toFixed(2)}
      <br>
      <button onclick="removerCarrinho(${i})" style="margin-top:5px;">
        Remover
      </button>
    `;

    lista.appendChild(item);
  });

  totalTxt.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// --------------------------------------
// 9. Inicialização
// --------------------------------------
carregarProdutos();
