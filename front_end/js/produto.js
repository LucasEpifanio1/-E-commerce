// Produtos de exemplo
const produtos = [
    { id: 1, nome: "Notebook Gamer", preco: 4500, img: "https://via.placeholder.com/200" },
    { id: 2, nome: "Smartphone X", preco: 2200, img: "https://via.placeholder.com/200" },
    { id: 3, nome: "Fone Bluetooth", preco: 199, img: "https://via.placeholder.com/200" }
];

// Página: lista de produtos
function carregarProdutos() {
    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    lista.innerHTML = produtos.map(p => `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco}</p>
            <a class="btn" href="produto.html?id=${p.id}">Ver Detalhes</a>
        </div>
    `).join("");
}

// Página: detalhes do produto
function carregarDetalhes() {
    const container = document.getElementById("produto-detalhe");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const p = produtos.find(x => x.id === id);

    container.innerHTML = `
        <div class="detalhe">
            <img src="${p.img}">
            <h2>${p.nome}</h2>
            <p>Preço: R$ ${p.preco}</p>
            <button onclick="adicionarCarrinho(${p.id})" class="btn">Adicionar ao Carrinho</button>
        </div>
    `;
}

function adicionarCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(id);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
}

carregarProdutos();
carregarDetalhes();
